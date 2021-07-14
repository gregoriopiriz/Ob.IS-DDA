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
    notification
} from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';

import { PlanesPageContextProvider, PlanesPageContext } from './contexts/PlanesPageContext';
import Axios from 'axios';
import config from '../config/config';

class DefineSeatsRow extends Component {
    static contextType = PlanesPageContext;
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    addPlaneWithSeats() {
        var data = {};
        data.plane = this.context.planeData;
        data.rows = this.context.rowsData;
        Axios
            .post(config.API.AddPlaneWithSeats, data)
            .then(success => {
                this.context.toggleDefineSeatsRowsDrawer();
                this.context.toggleAddPlaneDrawer();
                notification['success']({
                    message: 'Aeronave agregada exitosamente'
                });
            })
    }
    render() {
        const onFinish = (values) => {
            this.context.setRowsData(values.rows);
            this.addPlaneWithSeats();
        };
        return (
            <Form
                
                layout='horizontal'
                onFinish={onFinish}
            >
                <Form.List name="rows">
                    {(fields, { add, remove }) => (
                        <>
                            {fields.map(field => (
                                <>

                                    <Form.Item
                                        style={{ width: '100%' }}
                                        {...field}
                                        label="Identificador de la fila"
                                        name={[field.name, 'rowID']}
                                        fieldKey={[field.fieldKey, 'rowID']}
                                        rules={[{ required: true, message: 'Por favor llene este campo' }]}
                                    >
                                        <Input />
                                    </Form.Item>
                                    <Form.Item
                                        style={{ justifyContent: 'space-between', width: '100%' }}
                                        {...field}
                                        label="Economy"
                                        name={[field.name, 'economySeatsQuantity']}
                                        fieldKey={[field.fieldKey, 'seatsQuantity']}
                                        rules={[{ required: true, message: 'Por favor llene este campo' }]}
                                    >
                                        <InputNumber defaultValue={0} min={0} />
                                    </Form.Item>
                                    <Form.Item
                                        style={{ justifyContent: 'space-between', width: '100%' }}
                                        {...field}
                                        label="Premium"
                                        name={[field.name, 'premiumSeatsQuantity']}
                                        fieldKey={[field.fieldKey, 'seatsQuantity']}
                                        rules={[{ required: true, message: 'Por favor llene este campo' }]}
                                    >
                                        <InputNumber defaultValue={0} min={0} />
                                    </Form.Item>
                                    <Form.Item
                                        style={{ justifyContent: 'space-between', width: '100%' }}
                                        {...field}
                                        label="Empresarial"
                                        name={[field.name, 'businessSeatsQuantity']}
                                        fieldKey={[field.fieldKey, 'seatsQuantity']}
                                        rules={[{ required: true, message: 'Por favor llene este campo' }]}
                                    >
                                        <InputNumber defaultValue={0} min={0} />
                                    </Form.Item>
                                    <Form.Item
                                        style={{ justifyContent: 'space-between', width: '100%' }}
                                        {...field}
                                        label="PrimeraClase"
                                        name={[field.name, 'firstClassSeatsQuantity']}
                                        fieldKey={[field.fieldKey, 'seatsQuantity']}
                                        rules={[{ required: true, message: 'Por favor llene este campo' }]}
                                    >
                                        <InputNumber defaultValue={0} min={0} />
                                    </Form.Item>

                                    <Button block type='dashed' icon={<MinusCircleOutlined />} onClick={() => remove(field.name)}>
                                        Eliminar fila
                                    </Button>

                                    <Divider />
                                </>
                            ))}

                            <Form.Item>
                                <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                                    Añadir fila
                            </Button>
                            </Form.Item>
                        </>
                    )}
                </Form.List>
                <Form.Item>
                    <Row justify='end'>
                        <PlanesPageContext.Consumer>
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
                        </PlanesPageContext.Consumer>
                    </Row>
                </Form.Item>
            </Form>
        );
    }
}

export default DefineSeatsRow;