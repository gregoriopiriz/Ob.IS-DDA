import React, { Component } from 'react';
import {
    Row,
    Descriptions,
    Col,
    DatePicker,
    Input
} from 'antd'
import Axios from 'axios';
import config from '../../config/config';

class HomePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            moreAndLessVoidSeatsSince: '',
            moreAndLessVoidSeatsUntil: '',
            mostSelled: '305',
            lessSelled: '201',
        }
    }

    moreAndLessVoidSeats() {

        Axios.get(config.API.Reports + `/moreAndLessVoidSeats?since=${this.state.moreAndLessVoidSeatsSince.substring(0,10)}&until=${this.state.moreAndLessVoidSeatsUntil.substring(0,10)}`).then(success => {
            console.log(success.data)
        })
    }

    render() {

        const handleMoreAndLessVoidSeatsSince = (e) => {
            if (e.target.name == 'moreAndLessVoidSeatSince') {
                this.setState({ moreAndLessVoidSeatsSince: e.target.value })
            } else if (e.target.name == 'moreAndLessVoidSeatUntil') {
                this.setState({ moreAndLessVoidSeatsUntil: e.target.value })
            }
            if (this.state.moreAndLessVoidSeatsSince !== '' && this.state.moreAndLessVoidSeatsUntil !== '') {
                this.moreAndLessVoidSeats()
            }
        }

        return (
            <Row gutter={[26, 26]}>
                <Col span={8}>
                    <Descriptions bordered layout='vertical' title="Clientes con más compras realizadas">
                        <Descriptions.Item label="Desde">
                            <DatePicker bordered={false} />
                        </Descriptions.Item>
                        <Descriptions.Item label="Hasta">
                            <DatePicker bordered={false} />
                        </Descriptions.Item>
                    </Descriptions>
                    <Descriptions bordered>
                        <Descriptions.Item label="#1" span={6}>
                            Juan Píriz
                       </Descriptions.Item>
                        <Descriptions.Item label="#2" span={6}>
                            Roberto Ruíz
                       </Descriptions.Item>
                        <Descriptions.Item label="#3" span={6}>
                            Tomas Fernandez
                       </Descriptions.Item>
                        <Descriptions.Item label="#4" span={6}>
                            Ramiro Gonzales
                       </Descriptions.Item>
                        <Descriptions.Item label="#5" span={6}>
                            Humberto rodriguez
                       </Descriptions.Item>
                    </Descriptions>
                </Col>
                <Col span={8}>
                    <Descriptions bordered layout='vertical' title="Vuelos con más y menos asientos vacíos">
                        <Descriptions.Item label="Desde">
                            <Input placeholder="YYYY-MM-DD" name="moreAndLessVoidSeatSince" onChange={handleMoreAndLessVoidSeatsSince} bordered={false} />
                        </Descriptions.Item>
                        <Descriptions.Item label="Hasta">
                            <Input placeholder="YYYY-MM-DD" name="moreAndLessVoidSeatUntil" onChange={handleMoreAndLessVoidSeatsSince} bordered={false} />
                        </Descriptions.Item>
                    </Descriptions>
                    <Descriptions bordered >
                        <Descriptions.Item label="Con mas asientos vendidos" span={6}>
                            {this.state.mostSelled}
                       </Descriptions.Item>
                        <Descriptions.Item label="Con menos asientos vendidos" span={6}>
                            {this.state.lessSelled}
                        </Descriptions.Item>
                    </Descriptions>
                </Col>
                <Col span={16}>
                    <Descriptions bordered layout='vertical' title="Porcentaje de ocupación de vuelos">
                        <Descriptions.Item label="Desde">
                        </Descriptions.Item>
                        <Descriptions.Item label="Hasta">
                        </Descriptions.Item>
                    </Descriptions>
                    <Descriptions bordered>
                        <Descriptions.Item label="Vuelo 305" span={6}>
                            89%
                       </Descriptions.Item>
                        <Descriptions.Item label="Vuelo 201" span={6}>
                            53%
                        </Descriptions.Item>
                    </Descriptions>
                </Col>
            </Row>
        );

    }
}

export default HomePage;