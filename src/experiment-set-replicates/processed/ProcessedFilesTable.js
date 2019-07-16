import React, { Component } from 'react';
import {Icon, Table} from 'semantic-ui-react';
import { fetchProcessedFileStats, getPipelineOutDirOnly } from './utils';
const COLORS = ['orange', 'pink', 'purple', 'teal', 'green', 'red', 'blue', 'yellow', 'grey', 'indigo', 'orange', 'pink', 'purple', 'teal'];
class ProcessedFilesTable extends Component {
    state = { rowsData: [], outDir: null, index: null }

    componentDidMount() {
        const { file, assay, index } = this.props;
        const outDir = getPipelineOutDirOnly(file, assay);
        const res = fetchProcessedFileStats(outDir, assay, file.uuid);
        res.then(resp => {
            this.setState({ rowsData: resp, outDir: outDir, index: index });
        })
    }

    render() { 
        if (this.state.rowsData.length === 0) {
            return <Table.Row>
                        <Table.Cell colSpan='5' textAlign='center'>Looking up..</Table.Cell>
                    </Table.Row>
        }
        const { bioRepIndex } = this.props;
        return ( 
            this.state.rowsData.map((rowData, index) => {
                const { date, name, type, size } = rowData;
                return <Table.Row key={`${index}-${type}`}>
                        { (bioRepIndex) ? <Table.Cell textAlign='center'>
                            <div className={`text-sm font-sans bg-${COLORS[bioRepIndex-1]}-lighter text-grey-darker`}>{bioRepIndex}</div>
                        </Table.Cell>: null}
                        <Table.Cell textAlign='center'>
                            <div className="text-xs font-mono font-hairline text-grey-dark">{this.state.index}</div>
                        </Table.Cell>
                        <Table.Cell>
                            <div className="text-sm text-grey-darker">{DownloadFileName(this.state.outDir, name)}</div>
                        </Table.Cell> 
                        <Table.Cell>
                            <div className="text-sm text-green-darker">{type.slice(1)}</div>
                        </Table.Cell>
                        <Table.Cell>
                            <div className="text-sm text-grey-dark">{size}</div>
                        </Table.Cell>
                        <Table.Cell>
                            <div className="text-xs font-mono font-hairline text-grey-dark">{date}</div>
                        </Table.Cell>
                    </Table.Row>})
        );
    }
}


export default ProcessedFilesTable;

const DownloadFileName = (outDir, filename) => {
    const path = outDir + '/' + filename;
    return ( <div className="sdfasd">{filename} <a href={path}><Icon name='download' /></a></div>); 
}