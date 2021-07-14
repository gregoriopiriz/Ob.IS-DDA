import React, { Component } from 'react';
import {
    Form,
    Select,
    Input,
    Button,
    Space,
    Row,
    InputNumber,
    Divider,
    notification,
    Typography
} from 'antd';

import Axios from 'axios';
import config from '../config/config';
import { Link } from 'react-router-dom';

class Passengers extends Component {

    constructor(props) {
        super(props);
        this.state = {
            passengers: new URLSearchParams(window.location.search).get('passengersQuantity')
        }
    }

    componentDidMount() {
        const button = document.getElementById('addPassengerButton');
        for (let i = 0; i < this.state.passengers; i++) {
            button.click()
        }
    }


    render() {
        const onFinish = async (values) => {
            sessionStorage.setItem('passengers', JSON.stringify(values.passengers));
            window.location.href = '/payment'
        };

        return (
            <>
                <Typography.Title style={{ width: '100%', textAlign: "center" }}>
                    Pasajeros
                </Typography.Title>
                <Form
                    layout='horizontal'
                    onFinish={onFinish}
                >
                    <Form.List name="passengers">
                        {(fields, { add, remove }) => (
                            <>
                                {fields.map(field => (
                                    <>
                                        <Divider>
                                        </Divider>
                                        <Form.Item
                                            {...field}
                                            label="Nombre completo"
                                            name={[field.name, 'fullName']}
                                            fieldKey={[field.fieldKey, 'fullName']}
                                            rules={[{ required: true, message: 'Por favor llene este campo' }]}
                                        >
                                            <Input />
                                        </Form.Item>
                                        <Form.Item
                                            {...field}
                                            label="Documentacion"
                                            name={[field.name, 'documentation']}
                                            fieldKey={[field.fieldKey, 'documentation']}
                                            rules={[{ required: true, message: 'Por favor llene este campo' }]}
                                        >
                                            <Input />
                                        </Form.Item>
                                        <Divider />
                                    </>
                                ))}

                                <Form.Item style={{ display: "none" }}>
                                    <Button id="addPassengerButton" type="dashed" onClick={() => add()} block>
                                        Añadir Pasajero
                                </Button>
                                </Form.Item>
                            </>
                        )}
                    </Form.List>
                    <Form.Item>
                            <Button htmlType='submit'>
                                Continuar
                            </Button>
                    </Form.Item>
                </Form >
            </>
        );
    }
}

export default Passengers;