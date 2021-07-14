import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {
    Card, Col, Row, Popconfirm
} from 'antd';
import moment from 'moment';
import { T } from 'react-translator-component';
import { Link, Redirect, Router } from 'react-router-dom';

class Tablix extends Component {
    constructor(props) {
        super(props);
        this.state = {
            targetDate: this.props.date,
            passengersQuantity: this.props.pq
        }
    }
    render() {

        const targetDate = this.state.targetDate;
        const date = targetDate.clone();

        const data = this.props.data;
        const prices = data.prices;

        const getPrice = (date) => {
            var isIn = false;
            for (let i = 0; i < prices.length; i++) {
                const element = prices[i];
                if (moment(element.date).format('DD/MM') === date.format('DD/MM')) {
                    isIn = true;
                    return { price: element.economyPrice * this.state.passengersQuantity, priceId: element._id, flightId: data.flights[0]._id, date: element.date }
                }
            }
        }

        let oneWayPrices = [
            [targetDate.subtract(3, 'days').format('DD/MM'), targetDate.add(1, 'days').format('DD/MM'), targetDate.add(1, 'days').format('DD/MM'), targetDate.add(1, 'days').format('DD/MM'), targetDate.add(1, 'days').format('DD/MM'), targetDate.add(1, 'days').format('DD/MM'), targetDate.add(1, 'days').format('DD/MM')],
            [getPrice(date.subtract(3, 'days')), getPrice(date.add(1, 'days')), getPrice(date.add(1, 'days')), getPrice(date.add(1, 'days')), getPrice(date.add(1, 'days')), getPrice(date.add(1, 'days')), getPrice(date.add(1, 'days'))],
        ];

        return (
            <>
                <Row style={{ width: '100%' }}>
                    {
                        oneWayPrices[0].map((p, index) => {
                            return (
                                <div style={{ border: '1px solid #ccc', textAlign: 'center', fontWeight: 'bold', width: '14%' }}>
                                    {p}
                                </div>
                            )
                        })
                    }
                    {
                        oneWayPrices[1].map((p, index) => {
                            return (

                                <Popconfirm
                                    title={T("Seguro que desea comprar este vuelo?")}
                                    onConfirm={() => {
                                        sessionStorage.setItem('flightId', data.flights[0]._id)
                                        sessionStorage.setItem('totalPrice', p.price)
                                    }}
                                    onCancel={() => { }}
                                    okText={
                                        <Link to={'/passengers?passengersQuantity=' + this.state.passengersQuantity}>
                                            {
                                                T("Si")
                                            }
                                        </Link>
                                    }
                                    cancelText={T("No")}
                                >
                                    <div style={{ border: '1px solid #ccc', textAlign: 'center', width: '14%' }}>
                                        {p.price}
                                    </div>
                                </Popconfirm>
                            )
                        })
                    }
                </Row>
            </>
        );
    }
}

export default Tablix;