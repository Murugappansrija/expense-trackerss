// import React from 'react'

// const Categories = () => {
//   return (
//     <div>Categories</div>
//   )
// }

// export default Categories

import DeleteSharpIcon from "@mui/icons-material/DeleteSharp";
import EditSharpIcon from "@mui/icons-material/EditSharp";
import IconButton from "@mui/material/IconButton";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import dayjs from "dayjs";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Cookies from "js-cookie";
import { useSelector } from "react-redux";
import { Container } from "@mui/material";
import Cookies from "js-cookie";

import * as React from "react";

export default function Categories() {
    const token = Cookies.get('token')
  const user = useSelector((state) => state.auth.user);
  function categoryName(id) {
    const category = user.categories.find((category) => category._id === id);
    return category ? category.label : "NA";
  }

  function formatDate(date) {
    return dayjs(date).format("DD-MMM-YYYY");
  }
  async function remove(id){
      const res = await fetch(`${process.env.REACT_APP_API_URL}/category`,{
        method:'DELETE',
        headers:{
            Authorization: `Bearer ${token}`,
        }
      })
  }
  return (
    <Container>
      <Typography sx={{ marginTop: 10 }} variant="h6">
        List of Categories
      </Typography>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="center">Label</TableCell>

              <TableCell align="center">Icon</TableCell>
              <TableCell align="center">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {user.categories.map((row) => (
              <TableRow
                key={row._id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell align="center" component="th" scope="row">
                  {row.label}
                </TableCell>
                <TableCell align="center">{row.icon}</TableCell>
                {/* <TableCell align="center">{categoryName(row.category_id)}</TableCell>

                <TableCell align="center">{formatDate(row.date)}</TableCell> */}
                <TableCell align="center">
                  <IconButton
                    color="primary"
                    component="label"
                    // onClick={() => setEdittransaction(row)}
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    color="warning"
                    component="label"
                     onClick={() => remove(row._id)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
}
