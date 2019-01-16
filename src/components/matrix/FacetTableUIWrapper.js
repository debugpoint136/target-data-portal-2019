import React from 'react';
import TableRenderer from './TableRenderer';
import FacetTableUI from './FacetTableUI';
// import '../../css/facet.css';
import '../../css/pivottable.css';
// import '../../App.css'

class FacetTableUIWrapper extends React.PureComponent {

    constructor(props) {
        super(props)
        this.state = {
            facetState: props,
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
        this.props.onDataSelect(selected)
    }

    componentWillReceiveProps(nextProps) {
        this.setState({facetState: nextProps});
    }

    render() {
        return <FacetTableUI
            renderers={Object.assign({}, TableRenderer)}
            {...this.state.facetState}
            onChange={s => this.setState({facetState: s})}
            onClick={this.handleCellClick}
            unusedOrientationCutoff={Infinity}
            />;
    }
}

export default FacetTableUIWrapper;

function getFiltered(data, cell, keys) {
    let filteredResults = data.filter(item => keys.map(key => item[key] === cell[key]).reduce((acc, cum) => acc && cum))
    return filteredResults
}