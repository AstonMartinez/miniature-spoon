const GET_BOOKS = "books/getBooks";
const GET_ONE_BOOK = "books/getOne";
const CREATE_BOOK = "books/createBook";
const UPDATE_BOOK = "books/updateBook";
const DELETE_BOOK = "books/deleteBook";

const getBooks = (data) => ({
  type: GET_BOOKS,
  payload: data,
});

const getOne = (data) => ({
  type: GET_ONE_BOOK,
  payload: data,
});

const createBook = (data) => ({
  type: CREATE_BOOK,
  payload: data,
});

const updateBook = (data) => ({
  type: UPDATE_BOOK,
  payload: data,
});

const deleteBook = (data) => ({
  type: DELETE_BOOK,
  payload: data,
});

export const fetchUserBooks = (userID) => async (dispatch) => {
  try {
    const response = await fetch(`/api/books/${userID}`);

    if (response.ok) {
      const data = await response.json();
      dispatch(getBooks(data));
      return data;
    } else {
      const errors = await response.json();
      return errors;
    }
  } catch (error) {
    const errors =
      error && error.json ? await error.json() : { message: error.toString() };
    return errors;
  }
};

export const fetchOneBook = (bookId) => async (dispatch) => {
  try {
    const response = await fetch(`/api/books/${bookId}`);

    if (response.ok) {
      const data = await response.json();
      dispatch(getOne(data));
      return data;
    } else {
      const errors = await response.json();
      return errors;
    }
  } catch (error) {
    const errors =
      error && error.json ? await error.json() : { message: error.toString() };
    return errors;
  }
};

export const createNewBook = (bookData) => async (dispatch) => {
  try {
    const response = await fetch("/api/books/new", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(bookData),
    });

    if (response.ok) {
      const data = await response.json();
      dispatch(createBook(data));
      return data;
    } else {
      const errors = await response.json();
      return errors;
    }
  } catch (error) {
    const errors =
      error && error.json ? await error.json() : { message: error.toString() };
    return errors;
  }
};

export const updateUserBook = (bookId, bookData) => async (dispatch) => {
  try {
    const response = await fetch(`/api/books/${bookId}/update`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(bookData),
    });

    if (response.ok) {
      const data = await response.json();
      dispatch(updateBook(data));
      return data;
    } else {
      const errors = await response.json();
      return errors;
    }
  } catch (error) {
    const errors =
      error && error.json ? await error.json() : { message: error.toString() };
    return errors;
  }
};

export const deleteUserBook = (bookId) => async (dispatch) => {
  try {
    const response = await fetch(`/api/books/${bookId}/delete`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      const data = await response.json();
      dispatch(deleteBook(data));
      return data;
    } else {
      const errors = await response.json();
      return errors;
    }
  } catch (error) {
    const errors =
      error && error.json ? await error.json() : { message: error.toString() };
    return errors;
  }
};

const initialState = { allBooks: {}, singleBook: {} };

export default function booksReducer(state = initialState, action) {
  let newState = Object.assign({ ...state });
  switch (action.type) {
    case GET_BOOKS:
      newState.allBooks = action.payload;
      return newState;
    case GET_ONE_BOOK:
    case CREATE_BOOK:
    case UPDATE_BOOK:
      newState.singleBook = action.payload;
      newState.allBooks[action.payload.id] = action.payload;
      return newState;
    case DELETE_BOOK:
      delete newState[action.payload];
      return newState;
    default:
      return state;
  }
}
