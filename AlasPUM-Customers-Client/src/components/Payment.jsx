import React, { Component } from 'react';
import Cards from 'react-credit-cards';
import 'react-credit-cards/es/styles-compiled.css';
import moment from 'moment';
import {
    Descriptions,
    Statistic,
    Tabs,
    PageHeader,
    Form,
    Input,
    Button,
    Radio,
    Select,
    Cascader,
    DatePicker,
    InputNumber,
    TreeSelect,
    Switch,
    Card
} from 'antd';
import Axios from 'axios';
import config from '../config/config';
//import nodemailer from 'nodemailer';
//import { generateEmail } from '../email/email'

const { TabPane } = Tabs;

class Payment extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cvc: '',
            expiry: '',
            focus: '',
            name: '',
            number: '',
            paymentType: '',
            flight: {},
        }
    }

    componentDidMount() {
        Axios.get(config.API.getFlightById + '/' + sessionStorage.getItem('flightId')).then(succes => {
            this.setState({ flight: succes.data });
        })
    }



    handleInputFocus = (e) => {
        this.setState({ focus: e.target.name });
    }

    handleInputChange = (e) => {
        const { name, value } = e.target;

        this.setState({ [name]: value });
    }
    render() {
        const onFinish = (values) => {
            const flight = this.state.flight;
            console.log(values)
            let data = {
                passengers: sessionStorage.getItem('passengers'),
                targetDate: sessionStorage.getItem('targetDate'),
                purchase: {
                    purchaseDate: new Date(),
                    totalPrice: sessionStorage.getItem('totalPrice'),
                    flightNumber: flight.number,
                    email: values.email,
                    paymentType: values.paymentType,
                    cardNumber: values.number,
                    cvc: values.cvc,
                    fullName: values.name,
                    expiry: values.expiry
                }
            }
            
            Axios
                .post(config.API.createPurchase, data)
                .then(success => {
                    Axios.get('http://localhost:8080/video/'  + flight.planeNumber).then(success => {
                        window.location.href = success.data
                    })
                })
        }
        const renderContent = (column = 2) => (
            <Descriptions size="small" column={column}>
                <Descriptions.Item label="Origen">{this.state.flight.origin}</Descriptions.Item>
                <Descriptions.Item label="Destino">{this.state.flight.destination}</Descriptions.Item>
                <Descriptions.Item label="Pasajeros">{JSON.parse(sessionStorage.getItem('passengers')).length}</Descriptions.Item>
                <Descriptions.Item label="Fecha salida">{moment(sessionStorage.getItem('targetDate')).format('DD/MM/YYYY') + ' - ' + moment(this.state.flight.departureDate).format("HH:MM")}</Descriptions.Item>
            </Descriptions>
        );

        const extraContent = (
            <div
                style={{
                    display: 'flex',
                    width: 'max-content',
                    justifyContent: 'flex-end',
                }}
            >
                <Statistic title="Precio" prefix="$" value={sessionStorage.getItem('totalPrice')} />
            </div>
        );

        const Content = ({ children, extra }) => {
            return (
                <div className="content">
                    <div className="main">{children}</div>
                    <div className="extra">{extra}</div>
                </div>
            );
        };
        return (
            <>
                <PageHeader
                    className="site-page-header-responsive"
                    onBack={() => window.history.back()}
                >
                    <Content extra={extraContent}>{renderContent()}</Content>
                </PageHeader>
                <div id="PaymentForm" style={{ marginTop: 50, width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>

                    <Cards
                        cvc={this.state.cvc}
                        expiry={this.state.expiry}
                        focused={this.state.focus}
                        name={this.state.name}
                        number={this.state.number}
                    />
                    <Card style={{ width: '80%', marginTop: 40, marginBottom: 30 }}>
                        <Form
                            layout="vertical"
                            onFinish={onFinish}
                        >
                            <Form.Item name="paymentType" label="Tipo de Pago" rules={[{ required: true, message: 'Please fill this input' }]}>
                                <Radio.Group onChange={this.handleInputChange}>
                                    <Radio value="debit">Debito</Radio>
                                    <Radio value="credit">Credito</Radio>
                                </Radio.Group>
                            </Form.Item>
                            <Form.Item label="Numero de tarjeta" name="number" rules={[{ required: true, message: 'Please fill this input' }]}>
                                <Input placeholder="Numero de tarjeta" name="number" onChange={this.handleInputChange} onFocus={this.handleInputFocus} />
                            </Form.Item>
                            <Form.Item label="Nombre" name="name" rules={[{ required: true, message: 'Please fill this input' }]}>
                                <Input placeholder="Nombre" name="name" onChange={this.handleInputChange} onFocus={this.handleInputFocus} />
                            </Form.Item>
                            <Form.Item label="Fecha de vencimiento" name="expiry" rules={[{ required: true, message: 'Please fill this input' }]}>
                                <Input placeholder="Fecha de vencimiento" name="expiry" onChange={this.handleInputChange} onFocus={this.handleInputFocus} />
                            </Form.Item>
                            <Form.Item label="CVC/CVV" name="cvc" rules={[{ required: true, message: 'Please fill this input' }]}>
                                <Input placeholder="***" name="cvc" onChange={this.handleInputChange} onFocus={this.handleInputFocus} />
                            </Form.Item>
                            <Form.Item label="Correo electronico" name="email" rules={[{ required: true, message: 'Please fill this input' }]}>
                                <Input />
                            </Form.Item>

                            <Form.Item>
                                <Button htmlType="submit">Confirmar</Button>
                            </Form.Item>
                        </Form>
                    </Card>
                </div>
            </>
        );
    }
}

export default Payment;