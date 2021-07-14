import React, { Component, createContext } from 'react';

export const HomePageContext = createContext();

export class HomePageContextProvider extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visibleAddUserDrawer: false,
        }
    }


    render() {
        const toggleAddUserDrawer = () => {
            this.setState({ visibleAddUserDrawer: this.state.visibleAddUserDrawer ? false : true })
        }
        const providerValue = {
            visibleAddUserDrawer: this.state.visibleAddUserDrawer,
            toggleAddUserDrawer: toggleAddUserDrawer
        }
        return (
            <HomePageContext.Provider value={providerValue}>
                {this.props.children}
            </HomePageContext.Provider>
        );
    }
}