import React, { Component } from 'react';
import {
    Form,
    Input,
    Button,
    Row,
    InputNumber,
    DatePicker,
    Select,
    Tabs,
    Typography,
    notification,
    TimePicker
} from 'antd';
import { FlightsPageContextProvider, FlightsPageContext } from './contexts/FlightsPageContext';
import Axios from 'axios';
import config from '../config/config';

class AddFlightForm extends Component {
    static contextType = FlightsPageContext;
    constructor(props) {
        super(props);
        this.state = {
            planes: []
        }
    }

    componentDidMount = () => {
        Axios
            .get(config.API.GetAllPlanes)
            .then(success => {
                this.setState({ planes: success.data });
            })
            .catch(error => console.error(error));
    }

    render() {
        const onFinishNational = (values) => {
            Axios
                .post(config.API.AddFlight, values)
                .then(success => {
                    console.log(success.data);
                    this.context.toggleAddFlightDrawer();
                    notification['success']({
                        message: 'Vuelo agregado exitosamente'
                    });
                })
                .catch(error => console.error(error));
        }

        const onFinishRegionalOrIntercontinental = (values) => {
            Axios
            .post(config.API.AddFlight, values)
            .then(success => {
                console.log(success.data);
                this.context.toggleAddFlightDrawer();
                notification['success']({
                    message: 'Vuelo agregado exitosamente'
                });
            })
            .catch(error => console.error(error));
        }

        return (
            <Tabs defaultActiveKey="1">
                <Tabs.TabPane tab='Nacional' key='1'>
                    <Form
                        layout='vertical'
                        onFinish={onFinishNational}
                    >
                        <Form.Item
                            label='Número'
                            name='number'
                            rules={[{ required: true, message: 'Por favor llene este campo' }]}
                        >
                            <InputNumber style={{ width: '100%' }} />
                        </Form.Item>
                        <Form.Item
                            label='Tipo'
                            name='type'
                            rules={[{ required: true, message: 'Por favor llene este campo' }]}
                        >
                            <Select>
                                <Select.Option value='National'>
                                    Nacional
                                </Select.Option>
                            </Select>
                        </Form.Item>
                        <Form.Item
                            label='Aeronave'
                            name='planeNumber'
                            rules={[{ required: true, message: 'Por favor llene este campo' }]}
                        >
                            <Select>
                                {
                                    this.state.planes.map(plane => {
                                        return (
                                            <Select.Option value={plane.number}>
                                                <Typography.Text strong> {plane.number} </Typography.Text>  <Typography.Text type='secondary'> {plane.planeModel}</Typography.Text>
                                            </Select.Option>
                                        )
                                    })
                                }
                            </Select>
                        </Form.Item>
                        <Form.Item
                            label='Origen'
                            name='origin'
                            rules={[{ required: true, message: 'Por favor llene este campo' }]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            label='Destino'
                            name='destination'
                            rules={[{ required: true, message: 'Por favor llene este campo' }]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            label='Hora de salida'
                            name='departureDate'
                            rules={[{ required: true, message: 'Por favor llene este campo' }]}
                        >
                            <TimePicker style={{ width: '100%' }} />
                        </Form.Item>
                        <Form.Item
                            label='Hora de llegada'
                            name='arrivalDate'
                            rules={[{ required: true, message: 'Por favor llene este campo' }]}
                        >
                            <TimePicker style={{ width: '100%' }} />
                        </Form.Item>
                        <Form.Item
                            label='Millas Totales'
                            name='totalMiles'
                            rules={[{ required: true, message: 'Por favor llene este campo' }]}
                        >
                            <InputNumber style={{ width: '100%' }} />
                        </Form.Item>
                        <Form.Item>
                            <Row justify='end'>
                                <FlightsPageContext.Consumer>
                                    {context => {
                                        return (
                                            <Button
                                                htmlType="submit"
                                                onClick={() => { }}
                                            >
                                                Continuar
                                            </Button>
                                        )
                                    }}
                                </FlightsPageContext.Consumer>
                            </Row>
                        </Form.Item>
                    </Form >
                </Tabs.TabPane>
                <Tabs.TabPane tab='Regional / Intercontinental' key='2'>
                    <Form
                        layout='vertical'
                        onFinish={onFinishRegionalOrIntercontinental}
                    >
                        <Form.Item
                            label='Número'
                            name='number'
                            rules={[{ required: true, message: 'Por favor llene este campo' }]}
                        >
                            <InputNumber style={{ width: '100%' }} />
                        </Form.Item>
                        <Form.Item
                            label='Tipo'
                            name='type'
                            rules={[{ required: true, message: 'Por favor llene este campo' }]}
                        >
                            <Select>
                                <Select.Option value='Regional'>
                                    Regional
                                </Select.Option>
                                <Select.Option value='Intercontinental'>
                                    Intercontinental
                                </Select.Option>
                            </Select>
                        </Form.Item>
                        <Form.Item
                            label='Aeronave'
                            name='planeNumber'
                            rules={[{ required: true, message: 'Por favor llene este campo' }]}
                        >
                            <Select>
                                {
                                    this.state.planes.map(plane => {
                                        return (
                                            <Select.Option value={plane.number}>
                                                <Typography.Text strong> {plane.number} </Typography.Text>  <Typography.Text type='secondary'> {plane.planeModel}</Typography.Text>
                                            </Select.Option>
                                        )
                                    })
                                }
                            </Select>
                        </Form.Item>
                        <Form.Item
                            label='Origen'
                            name='origin'
                            rules={[{ required: true, message: 'Por favor llene este campo' }]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            label='Destino'
                            name='destination'
                            rules={[{ required: true, message: 'Por favor llene este campo' }]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            label='Hora de salida'
                            name='departureDate'
                            rules={[{ required: true, message: 'Por favor llene este campo' }]}
                        >
                            <TimePicker format='HH:mm' style={{ width: '100%' }} />
                        </Form.Item>
                        <Form.Item
                            label='Hora de llegada'
                            name='arrivalDate'
                            rules={[{ required: true, message: 'Por favor llene este campo' }]}
                        >
                            <TimePicker format='HH:mm' style={{ width: '100%' }} />
                        </Form.Item>
                        <Form.Item
                            label='Millas Totales'
                            name='totalMiles'
                            rules={[{ required: true, message: 'Por favor llene este campo' }]}
                        >
                            <InputNumber style={{ width: '100%' }} />
                        </Form.Item>
                        <Form.Item
                            label='Documentacion'
                            name='documentation'
                            rules={[{ required: true, message: 'Por favor llene este campo' }]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item>
                            <Row justify='end'>
                                <FlightsPageContext.Consumer>
                                    {context => {
                                        return (
                                            <Button
                                                htmlType="submit"
                                                onClick={() => { }}
                                            >
                                                Continuar
                                            </Button>
                                        )
                                    }}
                                </FlightsPageContext.Consumer>
                            </Row>
                        </Form.Item>
                    </Form >
                </Tabs.TabPane>
            </Tabs>
        );
    }
}

export default AddFlightForm;