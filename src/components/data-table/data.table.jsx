import React, { Component } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
const BasicTable = () => {
  const rows = [
    {
      id: 1143155,
      product: "test",

      customer: "test",
      date: "test",
      amount: 785,
      method: "test",
      status: "test",
    },
    {
      id: 2235235,
      product: "test",

      customer: "test",
      date: "test",
      amount: 900,
      method: "test",
      status: "test",
    },
    {
      id: 2342353,
      product: "test",

      customer: "test",
      date: "test",
      amount: 35,
      method: "test",
      status: "test",
    },
    {
      id: 2357741,
      product: "test",

      customer: "test",
      date: "test",
      amount: 920,
      method: "test",
      status: "test",
    },
    {
      id: 2342355,
      product: "test",

      customer: "test",
      date: " test",
      amount: 2000,
      method: "test",
      status: "test",
    },
  ];
  return (
    <TableContainer component={Paper} className="table">
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell className="tableCell">test ID</TableCell>

            <TableCell className="tableCell">test</TableCell>
            <TableCell className="tableCell">test</TableCell>
            <TableCell className="tableCell">test</TableCell>
            <TableCell className="tableCell">test </TableCell>
            <TableCell className="tableCell">test</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.id}>
              <TableCell className="tableCell">{row.id}</TableCell>
              <TableCell className="tableCell">{row.customer}</TableCell>
              <TableCell className="tableCell">{row.date}</TableCell>
              <TableCell className="tableCell">{row.amount}</TableCell>
              <TableCell className="tableCell">{row.method}</TableCell>
              <TableCell className="tableCell">
                <span className={`status ${row.status}`}>{row.status}</span>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default BasicTable;
