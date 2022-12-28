import React, { useEffect, useState } from "react";
import { getAllReferees } from "./Service.js";
import CustomLoading from "../loading/CustomLoading";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
const Referees = () => {
  const [referees, setReferees] = useState([]);
  const [refereesLoading, setRefereesLoading] = useState(false);
  useEffect(() => {
    getAllReferees(setReferees, setRefereesLoading);
  }, []);

  return (
    <div>
      <h1 className="mb-5 text-left">Referees</h1>
      <div className="d-flex flex-wrap">
        {refereesLoading && <CustomLoading />}
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Id</TableCell>
                <TableCell align="center">Name</TableCell>
                <TableCell align="center">Email</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {referees.map((referee) => (
                <TableRow
                  key={referee.name}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {referee.refereeId}
                  </TableCell>
                  <TableCell align="center">{referee.refereeName}</TableCell>
                  <TableCell align="center">{referee.refereeEmail}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
};

export default Referees;
