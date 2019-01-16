import React from 'react';
import {Table} from 'semantic-ui-react'

const ResultTable = (props) => {

    const renderRows = Object
        .keys(props.data)
        .map((item, i) => {
            return (
                <Table.Row key={i}>
                    <Table.Cell>{item}</Table.Cell>
                    <Table.Cell>{props.data[item]}</Table.Cell>
                </Table.Row>
            )
        })
    return (
        <Table definition>
            <Table.Body>
                {renderRows}
            </Table.Body>
        </Table>
    );
}

export default ResultTable
