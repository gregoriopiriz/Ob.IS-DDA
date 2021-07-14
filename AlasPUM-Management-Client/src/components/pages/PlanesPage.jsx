import React, { Component } from 'react';
import {
    Button,
    Row,
    Table,
    Drawer,
    Popconfirm,
    Modal
} from 'antd';
import { FaPlus } from 'react-icons/fa';
import Axios from 'axios';
import config from '../../config/config';
import { PlanesPageContextProvider, PlanesPageContext } from '../contexts/PlanesPageContext';
import AddPlaneForm from '../AddPlaneForm';
import DefineSeatsRowsForm from '../DefineSeatsRowsForm';
import {
    EditOutlined,
    DeleteOutlined
} from '@ant-design/icons';
import ButtonGroup from 'antd/lib/button/button-group';
import UpdatePlaneForm from '../UpdatePlaneForm';



class PlanesPage extends Component {

    static contextType = PlanesPageContext;

    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            data: [],
            updatePlaneModal: false
        }
    }


    componentDidMount() {
        this.fetch();
    }

    handleTableChange = () => {
        this.fetch();
    };

    fetch = () => {
        this.setState({ loading: true });
        Axios
            .get(config.API.GetAllPlanes)
            .then(success => {
                this.setState({
                    loading: false,
                    data: success.data,
                });
            })
            .catch(error => console.error(error));
    };

    deletePlane = (p) => {
        Axios.put(config.API.DeletePlane, p)
    }

    showUpdatePlaneModal = () => {
        this.context.toggleUpdateModal();
    };


    render() {


        const tableColumns = [
            {
                title: 'Número',
                dataIndex: 'number',
                key: 'number',
            },
            {
                title: 'Modelo',
                dataIndex: 'planeModel',
                key: 'planeModel',
            },
            {
                title: 'Fecha de ingreso',
                dataIndex: 'entryDate',
                key: 'entryDate',
                render: date => date.substring(0, 10)
            },
            {
                title: 'Horas de vuelo',
                dataIndex: 'flightHours',
                key: 'flightHours',
            },
            {
                title: 'Video',
                dataIndex: 'videoURL',
                key: 'videoURL',
            },
            {
                title: '',
                dataIndex: 'actions',
                render: (text, record) =>
                    <PlanesPageContext.Consumer>
                        {context => {
                            return (

                                <ButtonGroup>
                                    <Button icon={<EditOutlined />} onClick={() => { context.toggleUpdateModal() }}>
                                        Editar
                                    </Button>
                                    <Modal
                                        title="Modificar aeronave"
                                        visible={context.updatePlaneModal}
                                        onCancel={() => { context.toggleUpdateModal() }}
                                        footer={[

                                        ]}
                                    >
                                        <UpdatePlaneForm plane={record} />
                                    </Modal>
                                    <Popconfirm title="Estás seguro/a que desea eliminar esta aeronave?" onConfirm={() => this.deletePlane(record)}>
                                        <Button icon={<DeleteOutlined />}>
                                            Eliminar
                                        </Button>
                                    </Popconfirm>
                                </ButtonGroup>
                            )
                        }}
                    </PlanesPageContext.Consumer>
            },
        ]


        return (
            <PlanesPageContextProvider>
                <PlanesPageContext.Consumer>
                    {function (context) {
                        return (
                            <>
                                <Drawer
                                    title="Agregar una aeronave"
                                    placement="right"
                                    width={424}
                                    closable={false}
                                    onClose={() => context.toggleAddPlaneDrawer()}
                                    visible={context.visibleAddPlaneDrawer}
                                >
                                    <AddPlaneForm />
                                    <Drawer
                                        title="Definir filas"
                                        placement="right"
                                        width={424}
                                        closable={false}
                                        onClose={() => context.toggleDefineSeatsRowsDrawer()}
                                        visible={context.visibleDefineSeatsRowsDrawer}
                                    >
                                        <DefineSeatsRowsForm />
                                    </Drawer>
                                </Drawer>
                            </>
                        )
                    }}
                </PlanesPageContext.Consumer>
                <Row justify='end' style={{ marginBottom: 24 }}>
                    <PlanesPageContext.Consumer>
                        {function (context) {
                            return (
                                <Button
                                    icon={<FaPlus style={{ marginRight: 8 }} />}
                                    onClick={() => context.toggleAddPlaneDrawer()}
                                >
                                    Agregar una aeronave
                                </Button>
                            )
                        }}
                    </PlanesPageContext.Consumer>
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
            </PlanesPageContextProvider >
        );
    }
}

export default PlanesPage;