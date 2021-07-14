import React, { Component } from 'react';
import {
    Form,
    Input,
    Button,
    Row,
    Card,
    notification
} from 'antd';

import axios from 'axios';
import config from '../config/config'
import { PageLayoutContext } from './contexts/PageLayoutContext';

class SignUpForm extends Component {

    static contextType = PageLayoutContext

    constructor(props) {
        super(props);
        this.state = {}
    }

    onFinish = values => {
        axios
            .post(config.API.SignUp, values)
            .then(success => {
                this.context.toggleAddUserDrawer();
                notification['success']({
                    message: 'Usuario agregado exitosamente'
                });
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
                    rules={[{ required: true, message: 'Por favor ingrese un nombre de usuario' }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label='Contraseña'
                    name='password'
                    rules={[{ required: true, message: 'Por favor ingrese una contraseña' }]}
                >
                    <Input.Password />
                </Form.Item>
                <Form.Item>
                    <Row justify='end'>
                        <Button htmlType="submit">Agregar usuario</Button>
                    </Row>
                </Form.Item>
            </Form >
        );
    }
}

export default SignUpForm;