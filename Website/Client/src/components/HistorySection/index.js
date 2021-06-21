import firebase from "firebase/app";
import "firebase/firestore";

import { useState, useEffect } from "react";

import {
  HeroContainer,
  GhostContainer,
  HeroContent,
  HeroH1,
  HeroEmpty,
} from "./HistoryElements";

import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import styles from "./history.module.css";
import { Ghost } from "react-kawaii";

const HistorySection = () => {
  const [data, setData] = useState(() => []);

  useEffect(() => {
    const id = window.localStorage.getItem("id");
    const db = firebase.firestore();
    var userRef = db.collection("user").doc(id);
    userRef.get().then((doc) => {
      const hist = doc.data().hist;
      setData(hist);
    });
  }, []);

  const columns = [
    { id: "time", label: "Time", minWidth: "100%", align: "center" },
    { id: "current", label: "Initial", minWidth: "100%", align: "center" },
    {
      id: "destination",
      label: "Destination",
      minWidth: "100%",
      align: "center",
    },
  ];

  const rows = data.reverse();

  const useStyles = makeStyles({
    root: {
      width: "100%",
    },
    container: {
      maxHeight: 800,
    },
  });

  const classes = useStyles();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return data.length === 0 ? (
    <GhostContainer>
      <HeroH1>History</HeroH1>
      <HeroEmpty>None</HeroEmpty>
      <Ghost size={240} mood="blissful" color="#E0E4E8" />
    </GhostContainer>
  ) : (
    <HeroContainer id="history">
      <HeroContent>
        <HeroH1>History</HeroH1>
        <Paper className={classes.root} style={{ minWidth: "142%" }}>
          <TableContainer className={classes.container}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  {columns.map((column) => (
                    <TableCell
                      key={column.id}
                      align={column.align}
                      className={styles.header}
                      style={{ minWidth: column.minWidth }}
                    >
                      {column.label}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {rows
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row) => {
                    return (
                      <TableRow
                        hover
                        role="checkbox"
                        tabIndex={-1}
                        key={row.code}
                      >
                        {columns.map((column) => {
                          const value = row[column.id];
                          return (
                            <TableCell
                              key={column.id}
                              align={column.align}
                              className={styles.body}
                            >
                              {column.format && typeof value === "number"
                                ? column.format(value)
                                : value}
                            </TableCell>
                          );
                        })}
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[10]}
            component="div"
            count={rows.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onChangePage={handleChangePage}
            onChangeRowsPerPage={handleChangeRowsPerPage}
          />
        </Paper>
      </HeroContent>
    </HeroContainer>
  );
};

export default HistorySection;
