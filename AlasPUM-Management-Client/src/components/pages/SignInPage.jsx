import React, { Component } from 'react';
import {
    Row,
    Card
} from "antd";
import SignInForm from '../SignInForm';

class SignInPage extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    render() {
        return (
            <Row
                style={{ width: '100vw', height: '100vh' }}
                align='middle'
                justify='center'
            >
                <Card bordered style={{ width: 324 }}>
                    <SignInForm />
                </Card>
            </Row>
        );
    }
}

export default SignInPage;