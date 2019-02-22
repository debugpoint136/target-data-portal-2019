import React from 'react';
import TableRenderers from './TableRenderers';
import PivotTableUI from './PivotTableUI';
import './pivottable.css';

import { timingSafeEqual } from 'crypto';

export default class PivotTableUIWrapper extends React.PureComponent {
    constructor(props) {
        super(props)
        this.state = {
            pivotState: props,
            selectedData: []
        };
    }

    handleCellClick = (cell) => {
        let keys = Object.keys(cell)
        var index = keys.indexOf('count');
        if (index > -1) {
            keys.splice(index, 1);
        }
        let selected = getFiltered(this.props.data, cell, keys)
        this.setState({selectedData: selected})
        this.props.onDataSelect(cell)
    }

    componentWillReceiveProps(nextProps) {
        this.setState({pivotState: nextProps});
    }

    handleFacetStateChange = (s) => {
        this.setState({ pivotState: s});
        this.props.handleFacetReshape(s);
    }

    componentWillUnmount() {
        localStorage.setItem('facets', JSON.stringify({ rows: this.state.pivotState.rows, cols: this.state.pivotState.cols }))
    }

    render() {
        return <PivotTableUI
            renderers={Object.assign({}, TableRenderers)}
            {...this.state.pivotState}
            onChange={s => this.handleFacetStateChange(s)}
            onClick={this.handleCellClick}
            unusedOrientationCutoff={Infinity}/>;
    }
}

function getFiltered(data, cell, keys) {

    let filteredResults = data.filter(item => keys.map(key => item[key] === cell[key]).reduce((acc, cum) => acc && cum))

    return filteredResults

}