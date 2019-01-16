import React from 'react';
import {FacetData} from './Utilities';

// helper function for setting row/col-span in facetTableRenderer
const spanSize = function (arr, i, j) {
  let x;
  if (i !== 0) {
    let asc,
      end;
    let noDraw = true;
    for (x = 0, end = j, asc = end >= 0; asc
      ? x <= end
      : x >= end; asc
      ? x++
      : x--) {
      if (arr[i - 1][x] !== arr[i][x]) {
        noDraw = false;
      }
    }
    if (noDraw) {
      return -1;
    }
  }
  let len = 0;
  while (i + len < arr.length) {
    let asc1,
      end1;
    let stop = false;
    for (x = 0, end1 = j, asc1 = end1 >= 0; asc1
      ? x <= end1
      : x >= end1; asc1
      ? x++
      : x--) {
      if (arr[i][x] !== arr[i + len][x]) {
        stop = true;
      }
    }
    if (stop) {
      break;
    }
    len++;
  }
  return len;
};

function makeRenderer(opts = {}) {
  class TableRenderer extends React.PureComponent {
    render() {
      const facetData = new FacetData(this.props);      
      const colAttrs = facetData.props.cols;
      const rowAttrs = facetData.props.rows;
      const handleCellClick = this.props.onClick;
      const rowKeys = facetData.getRowKeys();
      const colKeys = facetData.getColKeys();

      let valueCellColors = () => {};
      let rowTotalColors = () => {};
      let colTotalColors = () => {};

      return (
        <table className="facetTable">
          <thead>
            {colAttrs
              .map(function (c, j) {
                return (
                  <tr key={`colAttr${j}`}>
                    {j === 0 && rowAttrs.length !== 0 && (<th colSpan={rowAttrs.length} rowSpan={colAttrs.length}/>)}
                    <th className="facetAxisLabel">{c}</th>
                    {colKeys
                      .map(function (colKey, i) {
                        const x = spanSize(colKeys, i, j);
                        if (x === -1) {
                          return null;
                        }
                        return (
                          <th
                            className="facetColLabel"
                            key={`colKey${i}`}
                            colSpan={x}
                            rowSpan={j === colAttrs.length - 1 && rowAttrs.length !== 0
                            ? 2
                            : 1}>
                            {colKey[j]}
                          </th>
                        );
                      })}

                    {j === 0 && (
                      <th
                        className="facetTotalLabel"
                        rowSpan={colAttrs.length + (rowAttrs.length === 0
                        ? 0
                        : 1)}>
                        Totals
                      </th>
                    )}
                  </tr>
                );
              })}

            {rowAttrs.length !== 0 && (
              <tr>
                {rowAttrs
                  .map(function (r, i) {
                    return (
                      <th className="facetAxisLabel" key={`rowAttr${i}`}>
                        {r}
                      </th>
                    );
                  })}
                <th className="facetTotalLabel">
                  {colAttrs.length === 0
                    ? 'Totals'
                    : null}
                </th>
              </tr>
            )}
          </thead>

          <tbody>
            {rowKeys
              .map(function (rowKey, i) {
                const totalAggregator = facetData.getAggregator(rowKey, []);
                return (
                  <tr key={`rowKeyRow${i}`}>
                    {rowKey
                      .map(function (txt, j) {
                        const x = spanSize(rowKeys, i, j);
                        if (x === -1) {
                          return null;
                        }
                        return (
                          <th
                            key={`rowKeyLabel${i}-${j}`}
                            className="facetRowLabel"
                            rowSpan={x}
                            colSpan={j === rowAttrs.length - 1 && colAttrs.length !== 0
                            ? 2
                            : 1}>
                            {txt}
                          </th>
                        );
                      })}
                    {colKeys
                      .map(function (colKey, j) {
                        const aggregator = facetData.getAggregator(rowKey, colKey);

                        let selectionStateCSS  = (aggregator.hasOwnProperty('selectedCount')) ? (aggregator.selectedCount.selected.length === 0 ? '' : 'facetValSelected') : ''
                        // className={"facetVal " + (aggregator.selectedCount.selected.length === 0 ? '' : 'facetValSelected')}
                        return (
                          <td
                            className={`facetVal ${selectionStateCSS}`}
                            key={`facetVal${i}-${j}`}
                            style={valueCellColors(rowKey, colKey, aggregator.value())}
                            onClick={() => {
                            handleCellClick(formatCellInfo(rowAttrs, rowKey, colAttrs, colKey, aggregator.value()))
                          }}>
                            {aggregator.format(aggregator.value())}
                          </td>
                        );
                      })}
                    <td className="facetTotal" style={colTotalColors(totalAggregator.value())}>
                      {totalAggregator.format(totalAggregator.value())}
                    </td>
                  </tr>
                );
              })}

            <tr>
              <th
                className="facetTotalLabel"
                colSpan={rowAttrs.length + (colAttrs.length === 0
                ? 0
                : 1)}>
                Totals
              </th>

              {colKeys
                .map(function (colKey, i) {
                  const totalAggregator = facetData.getAggregator([], colKey);
                  return (
                    <td
                      className="facetTotal"
                      key={`total${i}`}
                      style={rowTotalColors(totalAggregator.value())}>
                      {totalAggregator.format(totalAggregator.value())}
                    </td>
                  );
                })}

              
            </tr>
          </tbody>
        </table>
      );
    }
  }

  return TableRenderer;
}

export default {
  Table : makeRenderer()
};

function formatCellInfo(rowAttrs, rowKey, colAttrs, colKey, val) {

  let tmp = {
    count: val
  }
  rowAttrs.forEach((elem, i) => {
    tmp[elem] = rowKey[i]
  })

  colAttrs.forEach((elem, i) => {
    tmp[elem] = colKey[i]
  })

  return tmp
}