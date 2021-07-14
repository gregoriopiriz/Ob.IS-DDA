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
    constructor(props) {
        super(props);
        this.state = {}
    }
    render() {
        return (
            <Form
                layout='vertical'
                onFinish={this.onFinish}
            >
                <Form.Item
                    label='Económico'
                    name='economyQuantity'
                    rules={[{ required: true, message: 'Por favor llene este campo' }]}
                >
                    <InputNumber min={0} defaultValue={0} style={{ width: '100%' }} />
                </Form.Item>
                <Form.Item
                    label='Premium'
                    name='premiumeconomyQuantity'
                    rules={[{ required: true, message: 'Por favor llene este campo' }]}
                >
                    <InputNumber min={0} defaultValue={0} style={{ width: '100%' }} />
                </Form.Item>
                <Form.Item
                    label='Empresarial'
                    name='businessQuantity'
                    rules={[{ required: true, message: 'Por favor llene este campo' }]}
                >
                    <InputNumber min={0} defaultValue={0} style={{ width: '100%' }} />
                </Form.Item>
                <Form.Item
                    label='Primera Clase'
                    name='firstClassQuantity'
                    rules={[{ required: true, message: 'Por favor llene este campo' }]}
                >
                    <InputNumber min={0} defaultValue={0} style={{ width: '100%' }} />
                </Form.Item>
                <Form.Item>
                    <Row justify='end'>
                        <PlanesPageContext.Consumer>
                            {context => {
                                return (
                                    <Button 
                                    // htmlType="submit"
                                    onClick={()=> {context.toggleDefineSeatsDrawer()}} 
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