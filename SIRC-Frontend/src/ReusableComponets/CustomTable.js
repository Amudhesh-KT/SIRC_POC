import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Typography } from "@mui/material";
const CustomTable = ({ columns, rows, name }) => {
  return (
    <div>
      <Typography variant="h6" fontWeight={500} color="#5c6980">
        {name}
      </Typography>
      <TableContainer sx={{ py: 1 }}>
        <Table sx={{ minWidth: "100%" }} aria-label="simple table">
          <TableHead>
            <TableRow sx={{ background: "#00A885" }}>
              {columns.map((e) => {
                return (
                  <TableCell
                    align="center"
                    sx={{ p: "4px 10px", color: "#fff" }}
                  >
                    {e}
                  </TableCell>
                );
              })}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.itemno}>
                {Object.values(row).map((e) => {
                  return <TableCell sx={{ p: "6px 10px" }}>{e}</TableCell>;
                })}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default CustomTable;
