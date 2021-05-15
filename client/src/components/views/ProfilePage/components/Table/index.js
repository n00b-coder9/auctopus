/* eslint-disable react/prop-types */
import React from 'react';
import {
  Table,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  Chip,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  success: {
    backgroundColor: theme.palette.success.main,
    color: '#fff',
  },
  warning: {
    backgroundColor: theme.palette.warning.main,
    color: '#fff',
  },
  secondary: {
    backgroundColor: theme.palette.secondary.main,
    color: '#fff',
  },
}));

const states = {
  sold: 'success',
  bought: 'warning',
};

export default function TableComponent({ data }) {
  console.log(data);
  const classes = useStyles();
  const keys = Object.keys(data[0]).map((i) => i.toUpperCase());
  keys.shift(); // delete "id" key

  return (
    <Table className="mb-0">
      <TableHead>
        <TableRow>
          {keys.map((key) => (
            <TableCell
              style={{ flex: 1 }} key={key}>{key == 'DATE' ? 'DATE(mm-dd)' : key}</TableCell>
          ))}
        </TableRow>
      </TableHead>
      <TableBody>
        {data.map(({ id, title, description, date, category, basePrice, status }) => (
          <TableRow key={id}>
            <TableCell className="pl-3 fw-normal">{title}</TableCell>
            <TableCell>{description}</TableCell>
            <TableCell>{date.substring(5)}</TableCell>
            <TableCell>{category}</TableCell>
            <TableCell>{basePrice}</TableCell>
            <TableCell>
              <Chip label={status} classes={{ root: classes[states[status.toLowerCase()]] }} />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
