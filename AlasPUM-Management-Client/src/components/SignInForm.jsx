import React, { Component } from 'react';
import {
    Form,
    Input,
    Button,
    Row,
    Card
} from 'antd';

import axios from 'axios';
import config from '../config/config'

class SignInForm extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    onFinish = values => {
        axios
            .post(config.API.SignIn, values)
            .then(success => {
                if (success.data.token) {
                    sessionStorage.setItem('token', success.data.token)
                    window.location.href = 'http://localhost:3001';
                }
            })
            .catch(error => console.error(error));
    };

    render() {
        return (
            <Form
                layout='vertical'
                onFinish={this.onFinish}
            >
                <Form.Item
                    label='Nombre de usuario'
                    name='username'
                    rules={[{ required: true, message: 'Por favor ingrese su nombre de usuario' }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label='Contraseña'
                    name='password'
                    rules={[{ required: true, message: 'Por favor ingrese su contraseña' }]}
                >
                    <Input.Password />
                </Form.Item>
                <Form.Item>
                    <Row justify='end'>
                        <Button htmlType="submit">Iniciar Sesión</Button>
                    </Row>
                </Form.Item>
            </Form >
        );
    }
}

export default SignInForm;