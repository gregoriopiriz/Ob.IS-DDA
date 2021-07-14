import React, { Component } from 'react';
import {
    Button,
    Row,
    Table,
    Drawer,
    Popconfirm,
    Modal
} from 'antd';
import ButtonGroup from 'antd/lib/button/button-group';
import { FaPlus } from 'react-icons/fa';
import Axios from 'axios';
import config from '../../config/config';
import { FlightsPageContextProvider, FlightsPageContext } from '../contexts/FlightsPageContext';
import AddFlightForm from '../AddFlightForm';
import AddPriceForm from '../AddPriceForm';
import PricesCalendar from '../PricesCalendar';
import {
    EditOutlined,
    DeleteOutlined,
    DollarOutlined
} from '@ant-design/icons';
import UpdateFlightForm from '../UpdateFlightForm';


class FlightsPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            data: []
        }
    }


    componentDidMount() {
        this.fetch();
    }

    handleTableChange = () => {
        this.fetch();
    };


    deletePlane = (f) => {
        Axios.put(config.API.DeleteFlight, f)
    }

    fetch = () => {
        this.setState({ loading: true });

        Axios
            .get(config.API.GetAllFlights)
            .then(success => {
                this.setState({
                    loading: false,
                    data: success.data,
                });
            })
            .catch(error => console.error(error));
    };

    render() {

        const tableColumns = [
            {
                title: 'Número',
                dataIndex: 'number',
                key: 'number',
            },
            {
                title: 'Tipo',
                dataIndex: 'type',
                key: 'type',
            },
            {
                title: 'Aeronave',
                dataIndex: 'planeNumber',
                key: 'planeNumber',
            },
            {
                title: 'Origen',
                dataIndex: 'origin',
                key: 'origin',
            },
            {
                title: 'Destino',
                dataIndex: 'destination',
                key: 'destination',
            },
            {
                title: 'Hora de salida',
                dataIndex: 'departureDate',
                render: date => date.substring(11, 16)
            },
            {
                title: 'Hora de llegada',
                dataIndex: 'arrivalDate',
                render: date => date.substring(11, 16)
            },
            {
                title: 'Millas totales',
                dataIndex: 'totalMiles',
                key: 'totalMiles',
            },
            {
                title: '',
                dataIndex: 'actions',
                render: (text, record) => {
                    return (
                        <FlightsPageContext.Consumer>
                            {context =>
                                <>
                                    <ButtonGroup>
                                        <Button icon={<DollarOutlined />} onClick={() => { context.openPricesCalendar(record.number) }}>
                                            Precios
                                    </Button>
                                        <Button icon={<EditOutlined />} onClick={() => { context.toggleUpdateModal() }}>
                                            Editar
                                        </Button>
                                        <Popconfirm title="Estás seguro/a que desea eliminar este vuelo?" onConfirm={() => { this.deletePlane(record) }}>
                                            <Button icon={<DeleteOutlined />}>
                                                Eliminar
                                            </Button>
                                        </Popconfirm>
                                    </ButtonGroup>
                                    <Modal
                                        title="Precios"
                                        visible={context.pricesCalendar}
                                        onCancel={() => { context.closePricesCalendar() }}
                                        width={1200}
                                        footer={[

                                        ]}
                                    >
                                        <PricesCalendar />
                                    </Modal>
                                    <Modal
                                        title="Modificar vuelo"
                                        visible={context.visibleUpdateModal}
                                        onCancel={() => { context.toggleUpdateModal() }}
                                        width={600}
                                        footer={[

                                        ]}
                                    >
                                        <UpdateFlightForm flight={record}/> 
                                    </Modal>
                                </>
                            }
                        </FlightsPageContext.Consumer>
                    )
                }
            },
        ]



        return (
            <FlightsPageContextProvider>
                <FlightsPageContext.Consumer>
                    {function (context) {
                        return (
                            <>
                                <Drawer
                                    title="Agregar un vuelo"
                                    placement="right"
                                    width={424}
                                    closable={false}
                                    onClose={() => context.toggleAddFlightDrawer()}
                                    visible={context.visibleAddFlightDrawer}
                                >
                                    <AddFlightForm />
                                </Drawer>
                                <Drawer
                                    title="Agregar precios"
                                    placement="right"
                                    width={424}
                                    closable={false}
                                    onClose={() => context.toggleAddPriceDrawer()}
                                    visible={context.visibleAddPriceDrawer}
                                >
                                    <AddPriceForm />
                                </Drawer>
                            </>
                        )
                    }}
                </FlightsPageContext.Consumer>
                <Row justify='end' style={{ marginBottom: 24 }}>
                    <FlightsPageContext.Consumer>
                        {function (context) {
                            return (
                                <>
                                    <Button
                                        icon={<FaPlus style={{ marginRight: 8 }} />}
                                        onClick={() => context.toggleAddPriceDrawer()}
                                        style={{ marginRight: 20 }}
                                    >
                                        Agregar precios
                                    </Button>
                                    <Button
                                        icon={<FaPlus style={{ marginRight: 8 }} />}
                                        onClick={() => context.toggleAddFlightDrawer()}
                                    >
                                        Agregar un vuelo
                                    </Button>
                                </>
                            )
                        }}
                    </FlightsPageContext.Consumer>
                </Row>
                <Row>
                    <Table
                        dataSource={this.state.data}
                        loading={this.state.loading}
                        columns={tableColumns}
                        style={{ width: '100%' }}
                        onChange={this.handleTableChange}
                    />
                </Row>
            </FlightsPageContextProvider>
        );
    }
}

export default FlightsPage;