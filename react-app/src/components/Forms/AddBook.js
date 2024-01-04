import React, { useState } from "react";
import { useDispatch } from "react-redux";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import { createNewBook, fetchUserBooks } from "../../store/books";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Forms.css";

const inputStyle1 = {
  width: "20px",
};

const inputStyle3 = {
  width: "30px",
};

const inputStyle2 = {
  width: "110px",
};

const AddBook = ({ userId, onEnter }) => {
  const dispatch = useDispatch();
  const [inputs, setInputs] = useState({
    title: "",
    author: "",
    genre: "",
    pages: "",
    reflections: "",
    month: "January",
  });

  const [dateFinished, setDateFinished] = useState("mm/dd/yyyy");

  const [isFinished, setIsFinished] = useState(false);

  const handleInputChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleDateChange = (e) => {
    const newValue = e.target.value;
    setDateFinished(newValue);
  };

  const handleSubmit = async () => {
    const newBook = {
      title: inputs.title,
      author: inputs.author,
      genre: inputs.genre,
      pages: inputs.pages,
      date_finished: dateFinished === "mm/dd/yyyy" ? "" : dateFinished,
      reflections: inputs.reflections,
      month: inputs.month,
      is_finished: isFinished,
    };

    try {
      dispatch(createNewBook(newBook));
      toast.success("Book added", {
        position: "top-center",
        autoClose: 3000,
        theme: "dark",
      });
      dispatch(fetchUserBooks(userId));
      onEnter();
    } catch (error) {
      console.log(error);
      toast.error("An error occured", {
        position: "top-center",
        autoClose: 3000,
        theme: "dark",
      });
    }
  };

  const handleReset = () => {
    setIsFinished(false);
    setInputs({
      title: "",
      author: "",
      genre: "",
      pages: "",
      dateFinished: "",
      reflections: "",
      month: "",
    });
    return;
  };

  return (
    <>
      <ToastContainer />
      <TableRow sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
        <TableCell align="center">
          <input
            type="checkbox"
            checked={isFinished}
            onChange={() => setIsFinished(!isFinished)}
            style={inputStyle1}
          />
        </TableCell>
        <TableCell align="center">
          <input
            type="text"
            name="title"
            id="title"
            value={inputs.title}
            onChange={(e) => handleInputChange(e)}
            style={inputStyle2}
          />
        </TableCell>
        <TableCell align="center">
          <input
            type="text"
            name="author"
            id="author"
            value={inputs.author}
            onChange={(e) => handleInputChange(e)}
            style={inputStyle2}
          />
        </TableCell>
        <TableCell align="center">
          <input
            type="text"
            name="genre"
            id="genre"
            value={inputs.genre}
            onChange={(e) => handleInputChange(e)}
            style={inputStyle2}
          />
        </TableCell>
        <TableCell align="center">
          <input
            type="number"
            name="pages"
            id="pages"
            value={inputs.pages}
            onChange={(e) => handleInputChange(e)}
            style={inputStyle3}
          />
        </TableCell>
        <TableCell align="center">
          <input
            type="date"
            name="date"
            id="date"
            onChange={(e) => {
              handleDateChange(e);
            }}
            value={dateFinished}
            style={inputStyle2}
          />
        </TableCell>
        <TableCell align="center">
          <textarea
            name="reflections"
            id="reflections"
            value={inputs.reflections}
            onChange={(e) => handleInputChange(e)}
            style={inputStyle2}
          />
        </TableCell>
        <TableCell align="center">
          <select
            name="month"
            id="month"
            value={inputs.month}
            onChange={(e) => handleInputChange(e)}
            style={inputStyle2}
          >
            <option value="January">January</option>
            <option value="February">February</option>
            <option value="March">March</option>
            <option value="April">April</option>
            <option value="May">May</option>
            <option value="June">June</option>
            <option value="July">July</option>
            <option value="August">August</option>
            <option value="September">September</option>
            <option value="October">October</option>
            <option value="November">November</option>
            <option value="December">December</option>
          </select>
        </TableCell>
        <TableCell align="center">
          <button id="submit-button" onClick={handleSubmit}>
            Submit
          </button>
        </TableCell>
        <TableCell align="center">
          <button id="cancel-button" onClick={handleReset}>
            Cancel
          </button>
        </TableCell>
      </TableRow>
    </>
  );
};

export default AddBook;
