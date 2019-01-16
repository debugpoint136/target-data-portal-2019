import React from 'react';
import PropTypes from 'prop-types';
import {FacetData} from './Utilities';
import TableRenderer from './TableRenderer';

class FacetTable extends React.PureComponent {
  render() {
    const Renderer = this.props.renderers[
      this.props.rendererName in this.props.renderers
        ? this.props.rendererName
        : Object.keys(this.props.renderers)[0]
    ];
    return <Renderer {...this.props} />;
  }
}

FacetTable.propTypes = Object.assign({}, FacetData.propTypes, {
  rendererName: PropTypes.string,
  renderers: PropTypes.objectOf(PropTypes.func),
});

FacetTable.defaultProps = Object.assign({}, FacetData.defaultProps, {
  rendererName: 'Table',
  renderers: TableRenderer,
});

export default FacetTable;
