import React, { Component, createContext } from 'react';

export const PageLayoutContext = createContext();

export class PageLayoutContextProvider extends Component {
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
            <PageLayoutContext.Provider value={providerValue}>
                {this.props.children}
            </PageLayoutContext.Provider>
        );
    }
}