import React, { Component, createContext } from 'react';

export const PlanesPageContext = createContext();

export class PlanesPageContextProvider extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visibleAddPlaneDrawer: false,
            visibleAddSeatsDrawer: false,
            visibleDefineSeatsRowsDrawer: false,
            visibleDefineSeatsDrawer: false,
            updatePlaneModal: false,
            planeData : {},
            rowsData : {}
        }
    }

    render() {

        const toggleUpdateModal = () => {
            this.setState({ updatePlaneModal: this.state.updatePlaneModal ? false : true })
        }

        const setPlaneData = (data) => {
            this.setState({ planeData : data })
        }
        const setRowsData = (data) => {
            this.setState({ rowsData : data })
        }
        const toggleAddPlaneDrawer = () => {
            this.setState({ visibleAddPlaneDrawer: this.state.visibleAddPlaneDrawer ? false : true })
        }
        const toggleAddSeatsDrawer = () => {
            this.setState({ visibleAddSeatsDrawer: this.state.visibleAddSeatsDrawer ? false : true })
        }
        const toggleDefineSeatsRowsDrawer = () => {
            this.setState({ visibleDefineSeatsRowsDrawer: this.state.visibleDefineSeatsRowsDrawer ? false : true })
        }
        const toggleDefineSeatsDrawer = () => {
            this.setState({ visibleDefineSeatsDrawer: this.state.visibleDefineSeatsDrawer ? false : true })
        }
        const providerValue = {
            planeData : this.state.planeData,
            rowsData : this.state.rowsData,
            visibleAddPlaneDrawer: this.state.visibleAddPlaneDrawer,
            visibleAddSeatsDrawer: this.state.visibleAddSeatsDrawer,
            visibleDefineSeatsRowsDrawer: this.state.visibleDefineSeatsRowsDrawer,
            visibleDefineSeatsDrawer: this.state.visibleDefineSeatsDrawer,
            updatePlaneModal: this.state.updatePlaneModal,
            toggleUpdateModal: toggleUpdateModal,
            setPlaneData : setPlaneData,
            setRowsData : setRowsData,
            toggleAddPlaneDrawer: toggleAddPlaneDrawer,
            toggleAddSeatsDrawer: toggleAddSeatsDrawer,
            toggleDefineSeatsRowsDrawer: toggleDefineSeatsRowsDrawer,
            toggleDefineSeatsDrawer: toggleDefineSeatsDrawer
        }
        return (
            <PlanesPageContext.Provider value={providerValue}>
                {this.props.children}
            </PlanesPageContext.Provider>
        );
    }
}