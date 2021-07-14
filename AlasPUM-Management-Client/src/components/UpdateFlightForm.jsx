
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
import Axios from 'axios';
import config from '../config/config';

class UpdateFlightForm extends Component {
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
        const flight = this.props.flight
        if (flight.type == 'National') {
            return (
                <Form
                    layout='vertical'
                    initialValues={{
                        ['_id']: flight._id,
                        ['number']: flight.number,
                        ['type']: flight.type,
                        ['planeNumber']: flight.planeNumber,
                        ['origin']: flight.origin,
                        ['destination']: flight.destination,
                        // ['departureDate']: flight.departureDate,
                        // ['arrivalDate']: flight.arrivalDate,
                        ['totalMiles']: flight.totalMiles,
                    }}
                >
                    <Form.Item
                        label='ID'
                        name='_id'
                        rules={[{ required: true, message: 'Por favor llene este campo' }]}
                        hidden
                    >
                        <InputNumber style={{ width: '100%' }} />
                    </Form.Item>
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
                        <Select disabled>
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
                            <Button
                                htmlType="submit"
                                onClick={() => { }}
                            >
                                Continuar
                            </Button>
                        </Row>
                    </Form.Item>
                </Form >
            )
        }
        else {
            return (
                <Form
                    layout='vertical'
                    initialValues={{
                        ['_id']: flight._id,
                        ['number']: flight.number,
                        ['type']: flight.type,
                        ['planeNumber']: flight.planeNumber,
                        ['origin']: flight.origin,
                        ['destination']: flight.destination,
                        // ['departureDate']: flight.departureDate,
                        // ['arrivalDate']: flight.arrivalDate,
                        ['totalMiles']: flight.totalMiles,
                        ['documentation']: flight.documentation,
                    }}
                >
                    <Form.Item
                        label='Número'
                        name='number'
                        rules={[{ required: true, message: 'Por favor llene este campo' }]}
                        hidden
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
                        <Select disabled>
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
                            <Button
                                htmlType="submit"
                                onClick={() => { }}
                            >
                                Continuar
                            </Button>
                        </Row>
                    </Form.Item>
                </Form >
            )
        }
    }
}

export default UpdateFlightForm;