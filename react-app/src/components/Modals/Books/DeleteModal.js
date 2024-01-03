import { IoClose } from "react-icons/io5";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { deleteUserBook, fetchUserBooks } from "../../../store/books";

const DeleteModal = ({ bookId, onClose, userId }) => {
  const dispatch = useDispatch();
  const handleDelete = () => {
    try {
      dispatch(deleteUserBook(bookId));
      toast.success("Successfully delete book.", {
        position: "top-center",
        autoClose: 3000,
        theme: "dark",
      });
      dispatch(fetchUserBooks(userId));
      onClose();
    } catch (error) {
      toast.error("Unable to delete book", {
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
        <div>
          <IoClose height={18} width={18} onClick={onClose} />
        </div>
        <div>
          <h2>Are you sure you want to delete this book?</h2>
        </div>
        <div>
          <button onClick={handleDelete}>Yes, Delete</button>
          <button onClick={onClose}>No, Keep</button>
        </div>
      </div>
    </>
  );
};

export default DeleteModal;
