import React, { Component, createContext } from 'react';
import Axios from 'axios';
import config from '../../config/config';

export const FlightsPageContext = createContext();

export class FlightsPageContextProvider extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visibleAddFlightDrawer: false,
            visibleAddPriceDrawer: false,
            pricesCalendar: false,
            currentFlightPrices: [],
            visibleUpdateModal: false
        }
    }

    render() {

        const openPricesCalendar = (number) => {
            Axios
                .get(config.API.GetPricesByFlightNumber + `/${number}`)
                .then(success => {
                    this.setState({currentFlightPrices: success.data});
                })
                .catch(error => {
                    console.log(error);
                })
            this.setState({ pricesCalendar: true });
        }
        const closePricesCalendar = () => {
            this.setState({ pricesCalendar: false });
        }
        const toggleUpdateModal = () => {
            this.setState({ visibleUpdateModal: this.state.visibleUpdateModal ? false : true })
        }
        const toggleAddFlightDrawer = () => {
            this.setState({ visibleAddFlightDrawer: this.state.visibleAddFlightDrawer ? false : true })
        }
        const toggleAddPriceDrawer = () => {
            this.setState({ visibleAddPriceDrawer: this.state.visibleAddPriceDrawer ? false : true })
        }
        const providerValue = {
            visibleAddFlightDrawer: this.state.visibleAddFlightDrawer,
            visibleAddPriceDrawer: this.state.visibleAddPriceDrawer,
            toggleAddFlightDrawer: toggleAddFlightDrawer,
            toggleAddPriceDrawer: toggleAddPriceDrawer,
            pricesCalendar: this.state.pricesCalendar,
            openPricesCalendar: openPricesCalendar,
            closePricesCalendar: closePricesCalendar,
            currentFlightPrices: this.state.currentFlightPrices,
            toggleUpdateModal: toggleUpdateModal,
            visibleUpdateModal: this.state.visibleUpdateModal
        }
        return (
            <FlightsPageContext.Provider value={providerValue}>
                {this.props.children}
            </FlightsPageContext.Provider>
        );
    }
}