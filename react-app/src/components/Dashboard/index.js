import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserBooks, updateBookStatus } from "../../store/books";
import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { BsCheckCircle, BsXCircle } from "react-icons/bs";
import AddBook from "../Forms/AddBook";
import DeleteModal from "../Modals/Books/DeleteModal";
import UpdateModal from "../Modals/Books/UpdateModal";
import { toast } from "react-toastify";
import { useHistory } from "react-router-dom";
import { fetchUserStats } from "../../store/stats";

function createData(
  isFinished,
  title,
  author,
  genre,
  pages,
  dateFinished,
  reflections,
  month
) {
  return {
    isFinished,
    title,
    author,
    genre,
    pages,
    dateFinished,
    reflections,
    month,
  };
}

const Dashboard = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const userBooks = useSelector((state) => state.books.allBooks);
  const currentUser = useSelector((state) => state.session.user);
  const userStats = useSelector((state) => state.stats);

  const [modalShow, setModalShow] = useState(false);
  const [modalType, setModalType] = useState(null);
  const [selectedBook, setSelectedBook] = useState(null);

  const determineStrongestMonth = (data) => {
    let strongestMonth;
    let currMax = -Infinity;
    for (let month in data) {
      if (data[month] > currMax) {
        currMax = data[month];
        strongestMonth = month;
      }
    }
    return strongestMonth;
  };

  const handleModalClose = async () => {
    await dispatch(fetchUserBooks(currentUser.id));
    setModalShow(false);
    setModalType(null);
    setSelectedBook(null);
  };

  useEffect(() => {
    dispatch(fetchUserBooks(currentUser.id));
    dispatch(fetchUserStats(currentUser.id));
  }, [dispatch]);

  return (
    <div>
      <h1>{currentUser?.email}'s Books</h1>
      <div
        style={{
          width: "1220px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="center">Finished?</TableCell>
                <TableCell align="center">Title</TableCell>
                <TableCell align="center">Author</TableCell>
                <TableCell align="center">Genre</TableCell>
                <TableCell align="center">Pages</TableCell>
                <TableCell align="center">Date Finished</TableCell>
                <TableCell align="center">Reflections</TableCell>
                <TableCell align="center">Month</TableCell>
                <TableCell align="center"></TableCell>
                <TableCell align="center"></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {userBooks &&
                Object.values(userBooks).map((row, idx) => (
                  <TableRow
                    key={idx}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell align="center">
                      {row.is_finished ? (
                        <BsCheckCircle style={{ color: "green" }} />
                      ) : (
                        <BsXCircle style={{ color: "red" }} />
                      )}
                    </TableCell>
                    <TableCell align="center">{row.title}</TableCell>
                    <TableCell align="center">{row.author}</TableCell>
                    <TableCell align="center">{row.genre}</TableCell>
                    <TableCell align="center">{row.pages}</TableCell>
                    <TableCell align="center">{row.date_finished}</TableCell>
                    <TableCell align="center">{row.reflections}</TableCell>
                    <TableCell align="center">{row.month}</TableCell>
                    <TableCell align="center">
                      <button
                        onClick={() => {
                          setModalShow(true);
                          setModalType("Update");
                          setSelectedBook(row);
                        }}
                      >
                        Edit
                      </button>
                    </TableCell>
                    <TableCell align="center">
                      <button
                        onClick={() => {
                          setModalShow(true);
                          setModalType("Delete");
                          setSelectedBook(row);
                        }}
                      >
                        Delete
                      </button>
                    </TableCell>
                  </TableRow>
                ))}
              <AddBook
                userId={currentUser.id}
                onEnter={() => {
                  dispatch(fetchUserBooks(currentUser.id));
                }}
              />
            </TableBody>
          </Table>
        </TableContainer>
      </div>
      {modalShow && modalType === "Delete" ? (
        <DeleteModal
          bookId={selectedBook.id}
          onClose={handleModalClose}
          userId={currentUser.id}
        />
      ) : modalShow && modalType === "Update" ? (
        <UpdateModal
          book={selectedBook}
          onClose={handleModalClose}
          userId={currentUser.id}
        />
      ) : (
        ""
      )}
      <div>
        <h2>Your Stats</h2>
        <div>
          <p>You have read {userStats["numBooks"]} books.</p>
          <p>You have read a total of {userStats["pages"]} pages.</p>
          <p>
            Your strongest month so far is{" "}
            {determineStrongestMonth(userStats["byMonth"])}.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
