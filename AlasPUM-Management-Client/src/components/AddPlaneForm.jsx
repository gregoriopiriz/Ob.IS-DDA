import React, { Component } from 'react';
import {
    Form,
    Input,
    Button,
    Row,
    InputNumber,
    DatePicker
} from 'antd';
import { PlanesPageContextProvider, PlanesPageContext } from './contexts/PlanesPageContext';

class AddPlaneForm extends Component {
    static contextType = PlanesPageContext;
    constructor(props) {
        super(props);
        this.state = {}
    }
    render() {
        const onFinish = (values) => {
            this.context.setPlaneData(values);
            console.log('Received values of form:', values);
        }
        return (
            <Form
                autoComplete={false}
                layout='vertical'
                onFinish={onFinish}
            >
                <Form.Item
                    label='Número'
                    name='number'
                    rules={[{ required: true, message: 'Por favor llene este campo' }]}
                >
                    <InputNumber style={{ width: '100%' }} />
                </Form.Item>
                <Form.Item
                    label='Modelo'
                    name='planeModel'
                    rules={[{ required: true, message: 'Por favor llene este campo' }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label='Fecha de Ingreso'
                    name='entryDate'
                    rules={[{ required: true, message: 'Por favor llene este campo' }]}
                >
                    <DatePicker style={{ width: '100%' }} />
                </Form.Item>
                <Form.Item
                    label='Horas de Vuelo'
                    name='flightHours'
                    rules={[{ required: true, message: 'Por favor llene este campo' }]}
                >
                    <InputNumber style={{ width: '100%' }} />
                </Form.Item>
                <Form.Item
                    label='URL del Video'
                    name='videoURL'
                    rules={[{ required: true, message: 'Por favor llene este campo' }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item>
                    <Row justify='end'>
                        <PlanesPageContext.Consumer>
                            {context => {
                                return (
                                    <Button
                                        htmlType="submit"
                                        onClick={() => { context.toggleDefineSeatsRowsDrawer() }}
                                    >
                                        Continuar
                                    </Button>
                                )
                            }}
                        </PlanesPageContext.Consumer>
                    </Row>
                </Form.Item>

            </Form>
        );
    }
}

export default AddPlaneForm;