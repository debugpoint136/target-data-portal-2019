import React from 'react';
import PropTypes from 'prop-types';
import {PivotData} from './Utilities';
import { root } from 'postcss';
let rootRowLabel = null;
let rowCnt = 0;

// const COLORS = [
//   ['red-darker', 'red-dark', 'red', 'red-light', 'red-lighter', 'red-lightest'],
//   ['teal-darker', 'teal-dark', 'teal', 'teal-light', 'teal-lighter', 'teal-lightest'],
//   ['green-darker', 'green-dark', 'green', 'green-light', 'green-lighter', 'green-lightest']
// ];

const COLORS = ['orange', 'teal','pink', 'blue', 'green', 'purple','indigo', 'yellow', 'red', 'blue', 'orange', 'teal','pink', 'green', 'purple','indigo', 'yellow', 'red', 'blue', 'orange', 'teal','pink', 'green', 'purple','indigo', 'yellow', 'red', 'orange', 'teal','pink', 'green', 'purple','indigo', 'yellow', 'red', 'blue', 'orange', 'teal','pink', 'green', 'purple','indigo', 'yellow', 'red', 'orange', 'teal','pink', 'green', 'purple','indigo', 'yellow', 'red', 'blue', 'orange', 'teal','pink', 'green', 'purple','indigo', 'yellow', 'red', 'orange', 'teal','pink', 'green', 'purple','indigo', 'yellow', 'red', 'blue', 'orange', 'teal','pink', 'green', 'purple','indigo', 'yellow', 'red', 'orange', 'teal','pink', 'green', 'purple','indigo', 'yellow', 'red', 'blue', 'orange', 'teal','pink', 'green', 'purple','indigo', 'yellow', 'red', 'orange', 'teal','pink', 'green', 'purple','indigo', 'yellow', 'red', 'blue', 'orange', 'teal','pink', 'green', 'purple','indigo', 'yellow', 'red'];
// helper function for setting row/col-span in pivotTableRenderer
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

function redColorScaleGenerator(values) {
  const min = Math
    .min
    .apply(Math, values);
  const max = Math
    .max
    .apply(Math, values);
  return x => {
    // eslint-disable-next-line no-magic-numbers
    const nonRed = 255 - Math.round(255 * (x - min) / (max - min));
    return {backgroundColor: `rgb(255,${nonRed},${nonRed})`};
  };
}

function makeRenderer(opts = {}) {
  class TableRenderer extends React.PureComponent {
    render() {
      const pivotData = new PivotData(this.props);      
      const colAttrs = pivotData.props.cols;
      const rowAttrs = pivotData.props.rows;
      const handleCellClick = this.props.onClick;
      const rowKeys = pivotData.getRowKeys();
      const colKeys = pivotData.getColKeys();
      const grandTotalAggregator = pivotData.getAggregator([], []);

      let valueCellColors = () => {};
      let rowTotalColors = () => {};
      let colTotalColors = () => {};
      
      if (opts.heatmapMode) {
        const colorScaleGenerator = this.props.tableColorScaleGenerator;
        const rowTotalValues = colKeys.map(x => pivotData.getAggregator([], x).value());
        rowTotalColors = colorScaleGenerator(rowTotalValues);
        const colTotalValues = rowKeys.map(x => pivotData.getAggregator(x, []).value());
        colTotalColors = colorScaleGenerator(colTotalValues);

        if (opts.heatmapMode === 'full') {
          const allValues = [];
          rowKeys.map(r => colKeys.map(c => allValues.push(pivotData.getAggregator(r, c).value())));
          const colorScale = colorScaleGenerator(allValues);
          valueCellColors = (r, c, v) => colorScale(v);
        } else if (opts.heatmapMode === 'row') {
          const rowColorScales = {};
          // eslint-disable-next-line
          rowKeys.map(r => {
            const rowValues = colKeys.map(x => pivotData.getAggregator(r, x).value());
            rowColorScales[r] = colorScaleGenerator(rowValues);
          });
          valueCellColors = (r, c, v) => rowColorScales[r](v);
        } else if (opts.heatmapMode === 'col') {
          const colColorScales = {};
          // eslint-disable-next-line
          colKeys.map(c => {
            const colValues = rowKeys.map(x => pivotData.getAggregator(x, c).value());
            colColorScales[c] = colorScaleGenerator(colValues);
          });
          valueCellColors = (r, c, v) => colColorScales[c](v);
        }
      }

      return (
        <table className="pvtTable">
          <thead>
            {colAttrs
              .map(function (c, j) {
                let rootLabel = null;
                let cnt = 0;
                return (
                  <tr key={`colAttr${j}`}>
                    {j === 0 && rowAttrs.length !== 0 && (<th colSpan={rowAttrs.length} rowSpan={colAttrs.length}/>)}
                    <th className="pvtAxisLabel">{c}</th>
                    {colKeys
                      .map(function (colKey, i) {

                        // dpuru start
                        if (!rootLabel) {
                          rootLabel = colKey[0];
                        } else if (rootLabel !== colKey[0]) {
                          rootLabel = colKey[0];
                          cnt++;
                        }

                        let classNameStr = `pvtColLabel  `;

                        if (colAttrs.length !== 1 && colKey[j] === rootLabel) { // top most
                          classNameStr = `pvtColLabel bg-${COLORS[cnt]}-light p-8 text-md font-sans text-grey-darkest`;
                        } else if (colAttrs.length > 3) { // more than 3 attributes?
                          classNameStr = `pvtColLabel text-xs bg-grey-lighter text-base font-thin font-sans text-grey-darker`;
                        } else {
                          classNameStr = `pvtColLabel  bg-${COLORS[cnt]}-lighter italic font-thin text-base font-sans text-grey-darkest shadow`;
                        }

                        if (colAttrs.length > 1 && colAttrs.length - 1 === j) { // bottom most
                          classNameStr = `pvtColLabel  bg-${COLORS[cnt]}-lightest shadow p-8 font-hairline text-sm italic font-sans text-grey-darkest`;
                        }

                        // dpuru end
                        const x = spanSize(colKeys, i, j);
                        if (x === -1) {
                          return null;
                        }
                        return (
                          <th
                            className={classNameStr}
                            key={`colKey${i}`}
                            colSpan={x}
                            rowSpan={j === colAttrs.length - 1 && rowAttrs.length !== 0
                            ? 2
                            : 1}>
                            {(colAttrs.length > 1 && colAttrs.length - 1 === j) ? <div className="rotate text-xs">{colKey[j]}</div> : colKey[j]}
                          </th>
                        );
                      })}

                    {j === 0 && (
                      <th
                        className="pvtTotalLabel"
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
                      <th className="pvtAxisLabel" key={`rowAttr${i}`}>
                        {r}
                      </th>
                    );
                  })}
                <th className="pvtTotalLabel">
                  {colAttrs.length === 0
                    ? 'Totals'
                    : null}
                </th>
              </tr>
            )}
          </thead>

          <tbody>
            {
              rowKeys
              .map(function (rowKey, i) {
                    
                const totalAggregator = pivotData.getAggregator(rowKey, []);
                return (
                  <tr key={`rowKeyRow${i}`}>
                    {rowKey
                      .map(function (txt, j) {
                        // dpuru start
                        if (rowCnt > 25) {
                          rowCnt = 0;
                        };
                        if (!rootRowLabel) {
                          rootRowLabel = rowKey[0];
                        } else if (rootRowLabel !== rowKey[0]) {
                          rootRowLabel = rowKey[0];
                          rowCnt++;
                        }
                        
                        let rowClassNameStr = `pvtRowLabel`;

                        if (rowAttrs.length !== 1 && rowKey[j] === rootRowLabel) {
                          rowClassNameStr = `pvtRowLabel p-8 bg-${COLORS[rowCnt+7]}-light text-md font-sans text-grey-darkest`;
                        } else if (rowAttrs.length > 3) {
                          rowClassNameStr = `pvtRowLabel bg-grey-lighter text-md font-sans text-grey-darker`;
                        } else {
                          rowClassNameStr = `pvtRowLabel bg-${COLORS[rowCnt+7]}-lighter italic font-thin text-base font-sans text-grey-darkest shadow`;
                        }

                        if (rowAttrs.length > 1 && rowAttrs.length - 1 === j) {
                          rowClassNameStr = `pvtRowLabel bg-${COLORS[rowCnt+7]}-lightest shadow italic font-thin text-md font-sans text-grey-darkest`;
                        }
                        // dpuru end
                        const x = spanSize(rowKeys, i, j);
                        if (x === -1) {
                          return null;
                        }
                        return (
                          <th
                            key={`rowKeyLabel${i}-${j}`}
                            className={rowClassNameStr}
                            rowSpan={x}
                            colSpan={j === rowAttrs.length - 1 && colAttrs.length !== 0
                            ? 2
                            : 1}>
                            {((rowAttrs.length !== 1 && rowKey[j] === rootRowLabel && x > 3)) ? <div className="rotate90">{txt}</div>: txt}
                          </th>
                        );
                      })}
                    {colKeys
                      .map(function (colKey, j) {
                        const aggregator = pivotData.getAggregator(rowKey, colKey);

                        // let selectionStateCSS  = (aggregator.hasOwnProperty('selectedCount')) ? (aggregator.selectedCount.selected.length === 0 ? '' : 'pvtValSelected') : ''
                        // className={"pvtVal " + (aggregator.selectedCount.selected.length === 0 ? '' : 'pvtValSelected')}
                        let selectionStateCSS = aggregator.value() ? "pvtValue text-3xl font-mono text-grey-darker" : "pvtNoValue bg-grey-lighter";
                        
                        return (
                          <td
                            className={`pvtVal ${selectionStateCSS}`}
                            key={`pvtVal${i}-${j}`}
                            style={valueCellColors(rowKey, colKey, aggregator.value())}
                            onClick={() => {
                            handleCellClick(formatCellInfo(rowAttrs, rowKey, colAttrs, colKey, aggregator.value()))
                          }}>
                            {aggregator.format(aggregator.value())}
                          </td>
                        );
                      })}
                    <td className="pvtTotal" style={colTotalColors(totalAggregator.value())}>
                      {totalAggregator.format(totalAggregator.value())}
                    </td>
                  </tr>
                );
              })}

            <tr>
              <th
                className="pvtTotalLabel"
                colSpan={rowAttrs.length + (colAttrs.length === 0
                ? 0
                : 1)}>
                Totals
              </th>

              {colKeys
                .map(function (colKey, i) {
                  const totalAggregator = pivotData.getAggregator([], colKey);
                  return (
                    <td
                      className="pvtTotal"
                      key={`total${i}`}
                      style={rowTotalColors(totalAggregator.value())}>
                      {totalAggregator.format(totalAggregator.value())}
                    </td>
                  );
                })}

              <td className="pvtGrandTotal">
                {grandTotalAggregator.format(grandTotalAggregator.value())}
              </td>
            </tr>
          </tbody>
        </table>
      );
    }
  }

  TableRenderer.defaultProps = PivotData.defaultProps;
  TableRenderer.propTypes = PivotData.propTypes;
  TableRenderer.defaultProps.tableColorScaleGenerator = redColorScaleGenerator;
  TableRenderer.propTypes.tableColorScaleGenerator = PropTypes.func;
  return TableRenderer;
}

class TSVExportRenderer extends React.PureComponent {
  render() {
    const pivotData = new PivotData(this.props);
    const rowKeys = pivotData.getRowKeys();
    const colKeys = pivotData.getColKeys();
    if (rowKeys.length === 0) {
      rowKeys.push([]);
    }
    if (colKeys.length === 0) {
      colKeys.push([]);
    }

    const headerRow = pivotData
      .props
      .rows
      .map(r => r);
    if (colKeys.length === 1 && colKeys[0].length === 0) {
      headerRow.push(this.props.aggregatorName);
    } else {
      colKeys.map(c => headerRow.push(c.join('-')));
    }

    const result = rowKeys.map(r => {
      const row = r.map(x => x);
      // eslint-disable-next-line
      colKeys.map(c => {
        const v = pivotData
          .getAggregator(r, c)
          .value();
        row.push(v
          ? v
          : '');
      });
      return row;
    });

    result.unshift(headerRow);

    return (<textarea
      value={result
      .map(r => r.join('\t'))
      .join('\n')}
      style={{
      width: window.innerWidth / 2,
      height: window.innerHeight / 2
    }}
      readOnly={true}/>);
  }
}

TSVExportRenderer.defaultProps = PivotData.defaultProps;
TSVExportRenderer.propTypes = PivotData.propTypes;

export default {
  Table : makeRenderer(),
  'Table Heatmap' : makeRenderer({heatmapMode: 'full'}),
  'Table Col Heatmap' : makeRenderer({heatmapMode: 'col'}),
  'Table Row Heatmap' : makeRenderer({heatmapMode: 'row'}),
  'Exportable TSV' : TSVExportRenderer
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