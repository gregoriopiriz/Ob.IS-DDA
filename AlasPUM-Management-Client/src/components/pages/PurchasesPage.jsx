import React, { Component } from 'react';
import config from '../../config/config';
import Axios from 'axios';
import {
    Table,
    Row
} from 'antd';
import Websocket from 'react-websocket';

class PurchasesPage extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    componentDidMount() {
        this.fetch()
    }

    handleTableChange = () => {
        this.fetch();
    };

    fetch = () => {
        this.setState({ loading: true });
        Axios
            .get(config.API.GetAllPurchases)
            .then(success => {
                this.setState({
                    loading: false,
                    data: success.data,
                });
            })
            .catch(error => console.error(error));
    };

    render() {
        const tableColumns = [

            {
                title: 'Nombre Completo',
                dataIndex: 'fullName',
                key: 'fullName',
            },
            {
                title: 'Fecha de la Compra',
                dataIndex: 'purchaseDate',
                key: 'purchaseDate',
                render: date => date.substring(0, 10)
            },
            {
                title: 'Tipo de Pago',
                dataIndex: 'paymentType',
                key: 'paymentType',
                render: type => type.charAt(0).toUpperCase() + type.slice(1)
            },
            {
                title: 'Precio Total',
                dataIndex: 'totalPrice',
                key: 'totalPrice',
                render: price => '$ ' + price
            },
            {
                title: 'Correo Electrónico',
                dataIndex: 'email',
                key: 'email',
            },
        ]
        return (
            <>
                <Row>
                    <Table
                        dataSource={this.state.data}
                        loading={this.state.loading}
                        columns={tableColumns}
                        style={{ width: '100%' }}
                        onChange={this.handleTableChange}
                    />
                    <Websocket url={config.WebSocket.baseUrl}
                        onMessage={(m) => {
                            this.handleTableChange()
                        }} />
                </Row>
            </>
        );
    }
}

export default PurchasesPage;