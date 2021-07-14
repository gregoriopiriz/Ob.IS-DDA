import React, { Component } from 'react';
import {
    Card,
    Tabs,
    Form,
    DatePicker,
    InputNumber,
    Input,
    Button,
    Row,
    Modal
} from 'antd';
import { T } from 'react-translator-component';
import Axios from 'axios';
import config from '../config/config.js'
import Tablix from './Tablix.jsx';
class SearchFlightForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            isModalVisible: false,
            targetDate: '',
            passengersQuantity: 1
        }
    }
    render() {
        const onFinishOneWay = async (values) => {
            console.log(values);
            sessionStorage.setItem('targetDate', values.departureDate)
            this.setState({passengersQuantity: values.passengersQuantity})
            await Axios
                .post(config.API.searchFlight, values)
                .then(success => {
                    this.setState({isModalVisible: true, data: success.data, targetDate: values.departureDate})
                })
                .catch(error => console.error(error));
        }
        return (
            <>
                <Modal
                    title={T("Tabla de precios")}
                    visible={this.state.isModalVisible}
                    footer={null}
                >
                    <Tablix data={this.state.data} pq={this.state.passengersQuantity} date={this.state.targetDate}/>
                </Modal>
                <Card style={{ width: 324 }}>
                    <Row style={{ width: '100%' }}>
                        <Tabs defaultActiveTabKey='1' style={{ width: '100%' }}>
                            <Tabs.TabPane key='1' tab={T('One way')} style={{ width: '100%' }}>
                                <Form
                                    layout='vertical'
                                    onFinish={onFinishOneWay}
                                    style={{ width: '100%' }}
                                >
                                    <Form.Item
                                        label={T('Fecha de ida')}
                                        rules={[{required: true, message: ''}]}
                                        name='departureDate'
                                    >
                                        <DatePicker placeholder="Selecionar Fecha" style={{ width: '100%' }} />
                                    </Form.Item>
                                    <Form.Item
                                        label={T('Cantidad de Pasajeros')}
                                        rules={[{required: true, message: ''}]}
                                        name='passengersQuantity'
                                    >
                                        <InputNumber style={{ width: '100%' }} />
                                    </Form.Item>
                                    <Form.Item
                                        label={T('Origen')}
                                        rules={[{required: true, message: ''}]}
                                        name='origin'
                                    >
                                        <Input />
                                    </Form.Item>
                                    <Form.Item
                                        label={T('Destino')}
                                        rules={[{required: true, message: ''}]}
                                        name='destination'
                                    >
                                        <Input />
                                    </Form.Item>
                                    <Form.Item>
                                        <Row justify='end' style={{ width: '100%' }}>
                                            <Button type="primary" htmlType="submit">
                                                {T('Buscar')}
                                            </Button>
                                        </Row>
                                    </Form.Item>
                                </Form>
                            </Tabs.TabPane>
                            <Tabs.TabPane key='2' tab={T('Round trip')}>
                                <Form>
                                    <Row justify='space-between'>
                                        <Form.Item
                                            label={T('Ida')}
                                            rules={[{required: true, message: ''}]}
                                            style={{ width: '48%' }}
                                        >
                                            <DatePicker />
                                        </Form.Item>
                                        <Form.Item
                                            label={T('Vuelta')}
                                            rules={[{required: true, message: ''}]}
                                            style={{ width: '48%' }}
                                        >
                                            <DatePicker />
                                        </Form.Item>
                                    </Row>
                                    <Form.Item
                                        label={T('Cantidad de Pasajeros')}
                                        rules={[{required: true, message: ''}]}
                                    >
                                        <InputNumber style={{ width: '100%' }} />
                                    </Form.Item>
                                    <Form.Item
                                        label={T('Origen')}
                                        rules={[{required: true, message: ''}]}
                                    >
                                        <Input />
                                    </Form.Item>
                                    <Form.Item
                                        label={T('Destino')}
                                        rules={[{required: true, message: ''}]}
                                    >
                                        <Input />
                                    </Form.Item>
                                    <Form.Item>
                                        <Row justify='end' style={{ width: '100%' }}>
                                            <Button type="primary" htmlType="submit">
                                                {T('Buscar')}
                                            </Button>
                                        </Row>
                                    </Form.Item>
                                </Form>
                            </Tabs.TabPane>
                        </Tabs>
                    </Row>
                </Card>
            </>
        );
    }
}

export default SearchFlightForm;