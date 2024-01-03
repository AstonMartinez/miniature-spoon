import "../Modal.css";
import { IoClose } from "react-icons/io5";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { fetchUserBooks, updateUserBook } from "../../../store/books";
import { toast } from "react-toastify";

const UpdateModal = ({ book, onClose, userId }) => {
  const dispatch = useDispatch();
  const [inputs, setInputs] = useState({
    title: book.title,
    author: book.author,
    genre: book.genre,
    pages: book.pages,
    dateFinished: book.date_finished,
    reflections: book.reflections,
    month: book.month || "January",
  });

  const [isFinished, setIsFinished] = useState(book.is_finished);

  const handleInputChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    return;
  };

  const handleSubmit = async () => {
    const updatedBook = {
      title: inputs.title,
      author: inputs.author,
      genre: inputs.genre,
      pages: inputs.pages,
      date_finished:
        inputs.dateFinished === "mm/dd/yyyy" ? "" : inputs.dateFinished,
      reflections: inputs.reflections,
      month: inputs.month,
      is_finished: isFinished === true ? "true" : "false",
    };

    try {
      dispatch(updateUserBook(book.id, updatedBook));
      toast.success("Book updated", {
        position: "top-center",
        autoClose: 3000,
        theme: "dark",
      });
      dispatch(fetchUserBooks(userId));
      onClose();
    } catch (error) {
      toast.error(error.message, {
        position: "top-center",
        autoClose: 3000,
        theme: "dark",
      });
    }
  };

  return (
    <>
      <div id="modal-backdrop" onClick={onClose}></div>
      <div className="modal-content-container">
        <div className="close-button-holder">
          <IoClose width={18} height={18} onClick={onClose} />
        </div>
        <div className="modal-inner">
          <h2>Update Book</h2>
          <section>
            <label htmlFor="title">
              Title<span className="required-span">*</span>&nbsp;
            </label>
            <input
              value={inputs.title}
              onChange={(e) => handleInputChange(e)}
              name="title"
            />
          </section>
          <section>
            <label htmlFor="author">
              Author<span className="required-span">*</span>&nbsp;
            </label>
            <input
              value={inputs.author}
              onChange={(e) => handleInputChange(e)}
              name="author"
            />
          </section>
          <section>
            <label htmlFor="genre">Genre</label>&nbsp;
            <input
              value={inputs.genre}
              onChange={(e) => handleInputChange(e)}
              name="genre"
            />
          </section>
          <section>
            <label htmlFor="pages">Pages</label> &nbsp;
            <input
              type="number"
              value={inputs.pages}
              onChange={(e) => handleInputChange(e)}
            />
          </section>
          <section>
            <label htmlFor="dateFinished">Date Finished</label> &nbsp;
            <input
              type="date"
              onChange={(e) => handleInputChange(e)}
              name="dateFinished"
            />
          </section>
          <section>
            <label htmlFor="reflections">Reflections</label> &nbsp;
            <textarea
              name="reflections"
              value={inputs.reflections}
              onChange={(e) => handleInputChange(e)}
            />
          </section>
          <section>
            <label htmlFor="month">
              Month<span className="required-span">*</span> &nbsp;
            </label>
            <select
              name="month"
              value={inputs.month}
              onChange={(e) => handleInputChange(e)}
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
          </section>
          <section>
            <label htmlFor="isFinished">Finished?</label> &nbsp;
            <input
              type="checkbox"
              checked={isFinished}
              onChange={() => setIsFinished(!isFinished)}
            />
          </section>
          <section>
            <button onClick={handleSubmit}>Submit</button>
          </section>
        </div>
      </div>
    </>
  );
};

export default UpdateModal;
