import React, { Component } from 'react';
import {
    FlexboxGrid,
    Panel,
    Icon
} from "rsuite";
import {
    T
} from 'react-translator-component';


class TripSearch extends Component {
    render() {
        return (
            <FlexboxGrid justify='center' align='middle'>
                <FlexboxGrid.Item>
                    <Panel style={{ width: 324 }} header={<h3> <Icon icon='search' size='2x' style={{ marginRight: '1rem' }} /> {T('Search a trip')}!</h3>} bordered></Panel>
                </FlexboxGrid.Item>
            </FlexboxGrid>
        );
    }
}

export default TripSearch;