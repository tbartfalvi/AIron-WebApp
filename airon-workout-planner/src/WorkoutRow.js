import React, { useState, useEffect } from 'react';
import {
    TableRow,
    TableCell,
    TableSelectRow,
  } from '@carbon/react';


const WorkoutRow = ({
    row,
    getRowProps,
    getSelectionProps,
    handleRowSelection,
    handleRowAdd
}) => {
    const [isRowSelected, setIsRowSelected] = useState(false);

    useEffect(() => {
        handleRowAdd(row);
    }, []);

    const onChangeClick = () => {
        setIsRowSelected(!isRowSelected);
    };

    useEffect(() => {
        handleRowSelection(row.id, isRowSelected);
    }, [isRowSelected]);

    return (
        <TableRow {...getRowProps({ row })} key={row.id}>
            <TableSelectRow {...getSelectionProps({ row })} onChange={onChangeClick} />
            {row.cells.map(cell => (
                <TableCell key={cell.id}>{cell.value}</TableCell>
            ))}
        </TableRow>
    );
};

export default WorkoutRow;