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
import moment from 'moment'
import Axios from 'axios';
import config from '../config/config';

class UpdatePlaneForm extends Component {

    static contextType = PlanesPageContext;

    constructor(props) {
        super(props);
        this.state = {}
    }
    render() {

        const onFinish = (values) => {
            Axios
                .put(config.API.UpdatePlane, values)
                .then(success => {
                    this.context.toggleUpdateModal()
                })
                .catch(error => { console.log(error) });
        }

        const plane = this.props.plane;



        return (
            <Form
                layout='vertical'
                initialValues={{
                    ['_id']: plane._id,
                    ['number']: plane.number,
                    ['planeModel']: plane.planeModel,
                    ['entryDate']: moment(plane.entryDate),
                    ['flightHours']: plane.flightHours,
                    ['videoURL']: plane.videoURL
                }}
                onFinish={onFinish}
            >
                <Form.Item
                    label='ID'
                    name='_id'
                    hidden
                    rules={[{ required: true, message: 'Por favor llene este campo' }]}
                >
                    <Input />
                </Form.Item>
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
                        <Button
                            htmlType="submit"
                            onClick={() => { }}
                        >
                            Guardar cambios
                        </Button>
                    </Row>
                </Form.Item>

            </Form>
        );
    }
}

export default UpdatePlaneForm;