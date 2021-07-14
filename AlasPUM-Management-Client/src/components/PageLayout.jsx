import React, { Component } from 'react';
import {
    Layout,
    Menu,
    Drawer,
    Button
} from 'antd';
import {
    FaPlane,
    FaPlaneDeparture,
    FaUser,
    FaChartBar,
    FaUserPlus,
    FaMoneyBillWaveAlt
} from 'react-icons/fa';
import { PageLayoutContext, PageLayoutContextProvider } from './contexts/PageLayoutContext';

import SignUpForm from './SignUpForm';

class PageLayout extends Component {

    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        return (
            <PageLayoutContextProvider>
                <Layout style={{ width: '100vw', height: '100vh' }}>
                    <PageLayoutContext.Consumer>
                        {(context) => {
                            return (
                                <>
                                    <Drawer
                                        title="Agregar un usuario"
                                        placement="right"
                                        width={324}
                                        closable={false}
                                        onClose={() => context.toggleAddUserDrawer()}
                                        visible={context.visibleAddUserDrawer}
                                    >
                                        <SignUpForm />
                                    </Drawer>
                                </>
                            )
                        }}
                    </PageLayoutContext.Consumer>
                    <Layout>
                        <Layout.Sider width={224}>
                            <Menu
                                mode="inline"
                                defaultSelectedKeys={this.props.defaultSelectedKeys}
                                style={{ height: '100%', borderRight: 0 }}
                            >
                                <Menu.Item key="dashboard" icon={<FaChartBar style={{ marginRight: 8 }} />} onClick={() => { window.location.href = 'http://localhost:3001/'; }}>
                                    Tablero
                                </Menu.Item>
                                <Menu.SubMenu key="users" icon={<FaUser style={{ marginRight: 8 }} />} title='Usuarios'>
                                    <Menu.Item key='addUser' disabled>
                                        <PageLayoutContext.Consumer>
                                            {(context) => {
                                                return (
                                                    <Button icon={<FaUserPlus style={{ marginRight: 8 }} size={16} />} type='text' onClick={ () => context.toggleAddUserDrawer()}>
                                                        Agregar usuario 
                                                    </Button>
                                                )
                                            }}
                                        </PageLayoutContext.Consumer>
                                    </Menu.Item>
                                </Menu.SubMenu>
                                <Menu.Item key="planes" icon={<FaPlane style={{ marginRight: 8 }} />} onClick={() => { window.location.href = 'http://localhost:3001/planes'; }}>
                                    Aeronaves
                                </Menu.Item>
                                <Menu.Item key="flights" icon={<FaPlaneDeparture style={{ marginRight: 8 }} />} onClick={() => { window.location.href = 'http://localhost:3001/flights'; }} >
                                    Vuelos
                                </Menu.Item>
                                <Menu.Item key="purchases" icon={<FaMoneyBillWaveAlt style={{ marginRight: 8 }} />} onClick={() => { window.location.href = 'http://localhost:3001/purchases'; }} >
                                    Compras
                                </Menu.Item>
                            </Menu>
                        </Layout.Sider>
                        <Layout style={{ padding: 24 }}>
                            <Layout.Content
                                style={{
                                    padding: 24,
                                    margin: 0,
                                    backgroundColor: '#141414'
                                }}
                            >
                                {this.props.children}
                            </Layout.Content>
                        </Layout>
                    </Layout>
                </Layout >
            </PageLayoutContextProvider>
        );
    }
}

export default PageLayout;