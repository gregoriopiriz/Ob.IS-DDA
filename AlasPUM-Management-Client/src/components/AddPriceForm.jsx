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
    DatePicker
} from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';

import { PlanesPageContextProvider, PlanesPageContext } from './contexts/PlanesPageContext';
import Axios from 'axios';
import config from '../config/config';
import { FlightsPageContext } from './contexts/FlightsPageContext';

class AddPriceForm extends Component {
    static contextType = FlightsPageContext;
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    render() {
        const onFinish = (values) => {
            Axios
            .post(config.API.AddPrices, values)
            .then(success => {
                this.context.toggleAddPriceDrawer();
                notification['success']({
                    message: 'Precios agregados exitosamente'
                });
            })
        };
        return (
            <Form

                layout='horizontal'
                onFinish={onFinish}
            >
                <Form.Item
                    label="Numero de vuelo"
                    name='flightNumber'
                    rules={[{ required: true, message: 'Por favor llene este campo' }]}
                >
                    <InputNumber />
                </Form.Item>
                <Divider/>
                <Form.List name="rows">
                    {(fields, { add, remove }) => (
                        <>
                            {fields.map(field => (
                                <>
                                    <Form.Item
                                        style={{ justifyContent: 'space-between', width: '100%' }}
                                        {...field}
                                        label="Desde"
                                        name={[field.name, 'from']}
                                        fieldKey={[field.fieldKey, 'from']}
                                        rules={[{ required: true, message: 'Por favor llene este campo' }]}
                                    >
                                        <DatePicker />
                                    </Form.Item>
                                    <Form.Item
                                        style={{ justifyContent: 'space-between', width: '100%' }}
                                        {...field}
                                        label="Hasta"
                                        name={[field.name, 'to']}
                                        fieldKey={[field.fieldKey, 'to']}
                                        rules={[{ required: true, message: 'Por favor llene este campo' }]}
                                    >
                                        <DatePicker />
                                    </Form.Item>
                                    <Form.Item
                                        style={{ justifyContent: 'space-between', width: '100%' }}
                                        {...field}
                                        label="Precio Economico"
                                        name={[field.name, 'economyPrice']}
                                        fieldKey={[field.fieldKey, 'economyPrice']}
                                        rules={[{ required: true, message: 'Por favor llene este campo' }]}
                                    >
                                        <InputNumber />
                                    </Form.Item>
                                    <Form.Item
                                        style={{ justifyContent: 'space-between', width: '100%' }}
                                        {...field}
                                        label="Precio Premium"
                                        name={[field.name, 'premiumPrice']}
                                        fieldKey={[field.fieldKey, 'premiumPrice']}
                                        rules={[{ required: true, message: 'Por favor llene este campo' }]}
                                    >
                                        <InputNumber />
                                    </Form.Item>
                                    <Form.Item
                                        style={{ justifyContent: 'space-between', width: '100%' }}
                                        {...field}
                                        label="Precio Empresarial"
                                        name={[field.name, 'businessPrice']}
                                        fieldKey={[field.fieldKey, 'businessPrice']}
                                        rules={[{ required: true, message: 'Por favor llene este campo' }]}
                                    >
                                        <InputNumber />
                                    </Form.Item>
                                    <Form.Item
                                        style={{ justifyContent: 'space-between', width: '100%' }}
                                        {...field}
                                        label="Precio Primera Clase"
                                        name={[field.name, 'firstClassPrice']}
                                        fieldKey={[field.fieldKey, 'firstClassPrice']}
                                        rules={[{ required: true, message: 'Por favor llene este campo' }]}
                                    >
                                        <InputNumber />
                                    </Form.Item>

                                    <Button block type='dashed' icon={<MinusCircleOutlined />} onClick={() => remove(field.name)}>
                                        Eliminar precio
                                    </Button>

                                    <Divider />
                                </>
                            ))}

                            <Form.Item>
                                <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                                    Añadir precio
                            </Button>
                            </Form.Item>
                        </>
                    )}
                </Form.List>
                <Form.Item>
                    <Row justify='end'>
                        <FlightsPageContext.Consumer>
                            {context => {
                                return (
                                    <Button
                                        htmlType="submit"
                                    >
                                        Agregar
                                    </Button>
                                )
                            }}
                        </FlightsPageContext.Consumer>
                    </Row>
                </Form.Item>
            </Form>
        );
    }
}

export default AddPriceForm;