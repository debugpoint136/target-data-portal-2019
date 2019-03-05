import React, { Component } from 'react';
import {Table} from 'semantic-ui-react';

class ProcessedFilesScaffoldAll extends Component {
    state = {  }
    render() { 
        return ( 
            <div className='border border-grey-light border-solid border-t-4 border-t-red rounded'>
            <Table structured>
                <Table.Header>
                    <Table.Row className="text-blue font-semibold text-sm font-sans">
                        <Table.HeaderCell textAlign='center'>Bio Replicate</Table.HeaderCell>
                        <Table.HeaderCell textAlign='center'>Tech Replicate</Table.HeaderCell>
                        <Table.HeaderCell textAlign='center'>UUID</Table.HeaderCell>
                        <Table.HeaderCell textAlign='left'>File type</Table.HeaderCell>
                        <Table.HeaderCell textAlign='left'>File size</Table.HeaderCell>
                        <Table.HeaderCell textAlign='left'>Date added</Table.HeaderCell>
                        {/* <Table.HeaderCell textAlign='center'>Submission</Table.HeaderCell> */}
                        {/* <Table.HeaderCell textAlign='center'>Run type</Table.HeaderCell>
                        <Table.HeaderCell textAlign='center'>Read</Table.HeaderCell>
                        <Table.HeaderCell textAlign='center'>File size</Table.HeaderCell>
                        <Table.HeaderCell textAlign='center'>Date added</Table.HeaderCell> */}
                    </Table.Row>
                </Table.Header>
                {this.props.children}
            </Table>
            </div>
        );
    }
}

export default ProcessedFilesScaffoldAll;