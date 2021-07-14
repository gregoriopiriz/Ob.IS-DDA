import { Badge, Calendar, Row, Typography } from 'antd';
import React, { Component } from 'react';
import { FlightsPageContext } from './contexts/FlightsPageContext';
import './PricesCalendar.css';
import moment from 'moment';

class PricesCalendar extends Component {
    static contextType = FlightsPageContext;
    constructor(props) {
        super(props);
        this.state = {}
    }
    render() {
        const getListData = (value) => {
            let currVal = this.context.currentFlightPrices;
            let allData = [];
            let data=[];

            currVal.forEach(p => {
                let from = moment(p.from);
                let to = moment(p.to);
                let diff = to.diff(from, 'days');
                allData.push({
                    day: from,
                    prices: [
                        { type: 'Economy', price: p.economyPrice },
                        { type: 'Premium', price: p.premiumPrice },
                        { type: 'Business', price: p.businessPrice },
                        { type: 'First Class', price: p.firstClassPrice },
                    ]
                })
            });

            
            console.log('value:',value)
            console.log(allData)
            allData.forEach(p => {
                console.log(p.day)
                if(p.day == value.day){
                    data.push(p);
                }
                else{
                    data.push({day: value, prices: []});
                }
            })
            
            return data
        }

        const dateCellRender = (value) => {
            const listData = getListData(value);
            const data = listData.prices;
            return (
                <Row>
                    {/* {data.map(p => (
                        <>
                            <Typography.Text strong>
                                {'$ ' + p.price}
                            </Typography.Text>
                            <Typography.Text type='secondary' style={{ marginLeft: 10 }}>
                                {p.type}
                            </Typography.Text>
                        </>
                    ))} */}
                </Row>
            );
        }
        return (
            <>
                <Calendar
                    dateCellRender={dateCellRender}
                />
            </>
        );
    }
}

export default PricesCalendar;