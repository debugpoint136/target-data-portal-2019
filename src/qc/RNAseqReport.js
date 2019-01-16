import React from 'react';
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    LineChart,
    Line
} from 'recharts';
import _ from 'lodash';
import {COLORS} from '../../utils';

class RNAseqReport extends React.Component {

    render() {
        const {
            errorMsg,
            renderError,
            noDataFromAPI,
            data,
            error,
            chartHeight,
            chartWidth,
            handleWidthChange,
            handleHeightChange,
            increaseHeight,
            decreaseHeight,
            increaseWidth,
            decreaseWidth
        } = this.props;

        if (errorMsg) {
            return renderError();
        }
        if (noDataFromAPI) {
            return <div className="lead alert alert-danger">Error! No report could be loaded from the selected datasets!</div>
        }

        return (
            <div>
                {(Object.keys(data).length === 0) ? 'Loading...': 
                <div>
                <div>
                    {error && error.map((item) => <div className="alert alert-danger" key={item}>Report {item}
                        is not loaded properly, please check your path and report format.</div>)
                    }
                </div>
                <div>
                    {data && <div>
                        <div>
                            <form>
                                <label>
                                    Chart width:
                                    <input
                                        type="text"
                                        name="chartwidth"
                                        value={chartWidth}
                                        onChange={handleWidthChange}/>px
                                </label>
                                <button onClick={increaseWidth}>+</button>
                                <button onClick={decreaseWidth}>-</button>
                                <br/>

                                <label>
                                    Chart height:
                                    <input
                                        type="text"
                                        name="chartheight"
                                        value={chartHeight}
                                        onChange={handleHeightChange}/>px
                                </label>
                                <button onClick={increaseHeight}>+</button>
                                <button onClick={decreaseHeight}>-</button>
                            </form>
                        </div>
                        <h1>Mapping</h1>
                        <div>
                            {console.log(data['mapping_stats'])}
                            <BarChart
                                width={chartWidth}
                                height={chartHeight}
                                data={data['mapping_stats']}
                                margin={{
                                top: 5,
                                right: 30,
                                left: 20,
                                bottom: 5
                            }}>
                                <CartesianGrid strokeDasharray="3 3"/>
                                <XAxis dataKey="name"/>
                                <YAxis/>
                                <Tooltip/>
                                <Legend/>
                                <Bar dataKey="reads_aligned_exactly_1_time" fill="#8884d8"/>
                                <Bar dataKey="reads_aligned_0_time" fill="#82ca9d"/>
                            </BarChart>
                        </div>
                        <h1>Library complexity</h1>
                        <div>
                            <BarChart
                                width={chartWidth}
                                height={chartHeight}
                                data={data['library_complexity']}
                                margin={{
                                top: 5,
                                right: 30,
                                left: 20,
                                bottom: 5
                            }}>
                                <CartesianGrid strokeDasharray="3 3"/>
                                <XAxis dataKey="name"/>
                                <YAxis/>
                                <Tooltip/>
                                <Legend/>
                                <Bar dataKey="before_alignment_library_duplicates_percentage" fill="#8884d8"/>
                                <Bar dataKey="after_alignment_PCR_duplicates_percentage" fill="#82ca9d"/>
                            </BarChart>
                        </div>

                        <h1>Mapping feature distribution</h1>
                        <div>
                            <BarChart
                                width={chartWidth}
                                height={600}
                                data={data['gene_type']}
                                margin={{
                                top: 5,
                                right: 30,
                                left: 100,
                                bottom: 200
                            }}>
                                <CartesianGrid strokeDasharray="3 3"/>
                                <XAxis dataKey="name" interval={0} angle={-45} textAnchor="end"/>
                                <YAxis/>
                                <Tooltip/>
                                <Legend verticalAlign="top"/> {_.without(Object.keys(data['gene_type'][0]), 'name').map((entry, idx) => {
                                    return <Bar dataKey={entry} fill={COLORS[idx]}/>
                                })
}
                            </BarChart>
                        </div>

                        <h1>RseQC report</h1>
                        <h2>GC content</h2>
                        <div>
                            <BarChart
                                width={chartWidth}
                                height={chartHeight}
                                data={data['gc_content']}
                                margin={{
                                top: 5,
                                right: 30,
                                left: 20,
                                bottom: 5
                            }}>
                                <CartesianGrid strokeDasharray="3 3"/>
                                <XAxis dataKey="name"/>
                                <YAxis/>
                                <Tooltip/>
                                <Legend/> {_.without(Object.keys(data['gc_content'][0]), 'name').map((entry, idx) => {
                                    return <Bar dataKey={entry} fill={COLORS[idx]}/>
                                })
}
                            </BarChart>
                        </div>
                        <h2>Reads distribution</h2>
                        <div>
                            <BarChart
                                width={chartWidth}
                                height={chartHeight}
                                data={data['reads_distribution']}
                                margin={{
                                top: 5,
                                right: 30,
                                left: 20,
                                bottom: 5
                            }}>
                                <CartesianGrid strokeDasharray="3 3"/>
                                <XAxis dataKey="name"/>
                                <YAxis/>
                                <Tooltip/>
                                <Legend/> {_.without(Object.keys(data['reads_distribution'][0]), 'name').map((entry, idx) => {
                                    return <Bar dataKey={entry} fill={COLORS[idx]}/>
                                })
}
                            </BarChart>
                        </div>
                        <h2>Splice junction</h2>
                        <div>
                            <BarChart
                                width={chartWidth}
                                height={chartHeight}
                                data={data['splice_junction']}
                                margin={{
                                top: 5,
                                right: 30,
                                left: 20,
                                bottom: 5
                            }}>
                                <CartesianGrid strokeDasharray="3 3"/>
                                <XAxis dataKey="name"/>
                                <YAxis/>
                                <Tooltip/>
                                <Legend/> {_.without(Object.keys(data['splice_junction'][0]), 'name').map((entry, idx) => {
                                    return <Bar dataKey={entry} fill={COLORS[idx]}/>
                                })
}
                            </BarChart>
                        </div>
                        <h2>Splice events</h2>
                        <div>
                            <BarChart
                                width={chartWidth}
                                height={chartHeight}
                                data={data['splice_events']}
                                margin={{
                                top: 5,
                                right: 30,
                                left: 20,
                                bottom: 5
                            }}>
                                <CartesianGrid strokeDasharray="3 3"/>
                                <XAxis dataKey="name"/>
                                <YAxis/>
                                <Tooltip/>
                                <Legend/> {_.without(Object.keys(data['splice_events'][0]), 'name').map((entry, idx) => {
                                    return <Bar dataKey={entry} fill={COLORS[idx]}/>
                                })
}
                            </BarChart>
                        </div>

                        <h1>Gene body covergae</h1>
                        <div>
                            <LineChart
                                width={chartWidth}
                                height={chartHeight}
                                data={data['genebody']}
                                margin={{
                                top: 5,
                                right: 30,
                                left: 50,
                                bottom: 5
                            }}>
                                <XAxis dataKey="name"/>
                                <YAxis/>
                                <CartesianGrid strokeDasharray="3 3"/>
                                <Tooltip/>
                                <Legend/> {_.without(Object.keys(data['genebody'][0]), 'name').map((entry, idx) => {
                                    return <Line
                                        type="monotone"
                                        dataKey={entry}
                                        stroke={COLORS[idx]}
                                        activeDot={{
                                        r: 8
                                    }}
                                        key={entry}/>
                                })
}
                            </LineChart>
                        </div>

                        <h1>Yield distribution</h1>
                        <h2>expected distinction</h2>
                        <div>
                            <LineChart
                                width={chartWidth}
                                height={chartHeight}
                                data={data['yield_distro']}
                                margin={{
                                top: 5,
                                right: 30,
                                left: 50,
                                bottom: 5
                            }}>
                                <XAxis dataKey="name"/>
                                <YAxis/>
                                <CartesianGrid strokeDasharray="3 3"/>
                                <Tooltip/>
                                <Legend/> {_.without(Object.keys(data['yield_distro'][0]), 'name').map((entry, idx) => {
                                    return <Line
                                        type="monotone"
                                        dataKey={entry}
                                        stroke={COLORS[idx]}
                                        activeDot={{
                                        r: 8
                                    }}
                                        key={entry}/>
                                })
}
                            </LineChart>
                        </div>

                        <h1>Saturation</h1>
                        <h2>saturation by cpm_from_1_to_10</h2>
                        <div>
                            <LineChart
                                width={chartWidth}
                                height={chartHeight}
                                data={data['saturation_cpm_from_1_to_10']}
                                margin={{
                                top: 5,
                                right: 30,
                                left: 50,
                                bottom: 5
                            }}>
                                <XAxis dataKey="name"/>
                                <YAxis/>
                                <CartesianGrid strokeDasharray="3 3"/>
                                <Tooltip/>
                                <Legend/> {_.without(Object.keys(data['saturation_cpm_from_1_to_10'][0]), 'name').map((entry, idx) => {
                                    return <Line
                                        type="monotone"
                                        dataKey={entry}
                                        stroke={COLORS[idx]}
                                        activeDot={{
                                        r: 8
                                    }}
                                        key={entry}/>
                                })
}
                            </LineChart>
                        </div>
                        <h2>saturation by cpm_from_10_to_50</h2>
                        <div>
                            <LineChart
                                width={chartWidth}
                                height={chartHeight}
                                data={data['saturation_cpm_from_10_to_50']}
                                margin={{
                                top: 5,
                                right: 30,
                                left: 50,
                                bottom: 5
                            }}>
                                <XAxis dataKey="name"/>
                                <YAxis/>
                                <CartesianGrid strokeDasharray="3 3"/>
                                <Tooltip/>
                                <Legend/> {_.without(Object.keys(data['saturation_cpm_from_10_to_50'][0]), 'name').map((entry, idx) => {
                                    return <Line
                                        type="monotone"
                                        dataKey={entry}
                                        stroke={COLORS[idx]}
                                        activeDot={{
                                        r: 8
                                    }}
                                        key={entry}/>
                                })
}
                            </LineChart>
                        </div>
                        <h2>saturation by cpm_greater_than_50</h2>
                        <div>
                            <LineChart
                                width={chartWidth}
                                height={chartHeight}
                                data={data['saturation_cpm_greater_than_50']}
                                margin={{
                                top: 5,
                                right: 30,
                                left: 50,
                                bottom: 5
                            }}>
                                <XAxis dataKey="name"/>
                                <YAxis/>
                                <CartesianGrid strokeDasharray="3 3"/>
                                <Tooltip/>
                                <Legend/> {_.without(Object.keys(data['saturation_cpm_greater_than_50'][0]), 'name').map((entry, idx) => {
                                    return <Line
                                        type="monotone"
                                        dataKey={entry}
                                        stroke={COLORS[idx]}
                                        activeDot={{
                                        r: 8
                                    }}
                                        key={entry}/>
                                })
}
                            </LineChart>
                        </div>
                        <h2>saturation by total_genes</h2>
                        <div>
                            <LineChart
                                width={chartWidth}
                                height={chartHeight}
                                data={data['saturation_total_genes']}
                                margin={{
                                top: 5,
                                right: 30,
                                left: 50,
                                bottom: 5
                            }}>
                                <XAxis dataKey="name"/>
                                <YAxis/>
                                <CartesianGrid strokeDasharray="3 3"/>
                                <Tooltip/>
                                {console.log(data['saturation_total_genes'])}
                                <Legend/> {_.without(Object.keys(data['saturation_total_genes'][0]), 'name').map((entry, idx) => {
                                    return <Line
                                        type="monotone"
                                        dataKey={entry}
                                        stroke={COLORS[idx]}
                                        activeDot={{
                                        r: 8
                                    }}
                                        key={entry}/>
                                })
}
                            </LineChart>
                        </div>

                    </div>
                    }
                    </div>
                </div>
                }
            </div>
        )
    }
}

export default RNAseqReport;