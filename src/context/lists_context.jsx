//lists_context.jsx
import axios from "axios";

import React, {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";
import reducer from "../reducers/lists_reducer";
import { post_url as url } from "../utils/constants";
import {
  SIDEBAR_OPEN,
  SIDEBAR_CLOSE,
  GET_LISTS_BEGIN,
  GET_LISTS_SUCCESS,
  GET_LISTS_ERROR,
  REMOVE_LIST_ITEM,
  ADD_TO_LIST,
  GET_SINGLE_ITEM_SUCCESS,
  GET_SINGLE_ITEM_ERROR,
  GET_SINGLE_ITEM_BEGIN,
  OPEN_MODAL,
  CLOSE_MODAL,
  EDIT_ITEM,
  UPDATE_ITEM,
  PRICE_LOWEST,
  SIZE_SMALLEST,
  FILTER_ITEM,
} from "../actions";

const initialState = {
  isSidebarOpen: false,
  lists_loading: true,
  lists_error: false,
  lists: [],
  single_item_loading: false,
  single_item_error: false,
  single_item: {},
  postId: "",
  removeMessage: "",
  isOpen: false,
  modalItemId: null,
  edit_item: {},
  filterLists: [],
};

const ListsContext = createContext();

export const ListsProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [imageURL, setImageURL] = useState("");
  const [addItemMessage, setAddItemMessage] = useState("");

  const [formData, setFormData] = useState({
    price: "1500",
    bedrooms: "2",
    bathrooms: "2",
    size: "200",
    streetName: "Utrecht",
    houseNumber: "255",
    numberAddition: "56",
    zip: "1487TD",
    city: "Utrecht",
    image: "",
    constructionYear: "156",
    hasGarage: "no",
    description:
      "ontrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum",
  });
  const [editData, setEditData] = useState({});
  const openSidebar = () => {
    dispatch({ type: SIDEBAR_OPEN });
  };

  const closeSidebar = () => {
    dispatch({ type: SIDEBAR_CLOSE });
  };
  const openModal = (id) => {
    dispatch({ type: OPEN_MODAL, payload: id });
  };
  const closeModal = () => {
    dispatch({ type: CLOSE_MODAL });
  };
  const sortPrice = () => {
    dispatch({ type: PRICE_LOWEST });
  };

  const fetchLists = async () => {
    dispatch({ type: GET_LISTS_BEGIN });

    try {
      const response = await axios.get(url, {
        method: "GET",
        headers: { "content-type": "application/json" },
      });
      const lists = response.data;
      // console.log(lists);

      dispatch({ type: GET_LISTS_SUCCESS, payload: lists });
    } catch (error) {
      dispatch({ type: GET_LISTS_ERROR });
    }
  };

  const fetchSingleItem = async (urlId) => {
    dispatch({ type: GET_SINGLE_ITEM_BEGIN });
    const response = await axios.get(urlId);
    const singleItem = response.data;
    try {
      dispatch({ type: GET_SINGLE_ITEM_SUCCESS, payload: singleItem });
      //setFormData(singleItem);
    } catch {
      dispatch({ type: GET_SINGLE_ITEM_ERROR });
    }
  };
  const sortSize = () => {
    dispatch({ type: SIZE_SMALLEST });
  };

  useEffect(() => {
    state.filterLists = [...state.lists];
  }, [state.filterLists, state.lists]);

  const filter = (e) => {
    let text = e.target.value;
    dispatch({ type: FILTER_ITEM, payload: text });
  };

  const removeItem = async () => {
    const id = state.modalItemId;
    try {
      const response = await axios.delete(`${url}/${id}`);

      if (response.status === 200) {
        dispatch({ type: REMOVE_LIST_ITEM, payload: id });
        fetchLists(url);
      }
    } catch (error) {
      console.log("Error removing item:", error);
    }
  };
  const editItem = async (url) => {
    const response = await axios.get(url);
    const editItem = response.data;
    try {
      // dispatch({ type: EDIT_ITEM, payload: editItem });
      setEditData(editItem);
    } catch {
      dispatch({ type: GET_SINGLE_ITEM_ERROR });
    }
  };

  const updateList = async (url, editData) => {
    try {
      const response = await axios.put(url, editData, {
        headers: { "content-type": "application/json" },
      });
      // console.log(response.data); // Log the response data to verify the updated data from the server

      // Update the formData state directly with the response data
      setEditData(response.data);
    } catch (error) {
      console.error("Error updating house:", error);
    }
  };
  const addToList = async (formData) => {
    try {
      const response = await axios.post(url, formData, {
        headers: { "content-type": "application/json" },
      });
      setAddItemMessage("");

      dispatch({ type: ADD_TO_LIST, payload: response.data });
      if (response.status === 201) {
        // setAddItemMessage("Item added successfully");
        fetchLists(url);

        setFormData({
          price: "",
          bedrooms: "",
          bathrooms: "",
          size: "",
          streetName: "",
          houseNumber: "",
          numberAddition: "",
          zip: "",
          city: "",
          image: "",
          id: "",
          constructionYear: "",
          hasGarage: "no",
          description: "",
        });

        setImageURL("");
      }
    } catch (error) {
      dispatch({ type: GET_SINGLE_ITEM_ERROR });
    }
  };

  const validateFormFields = (data) => {
    const invalidFieldsList = [];
    const requiredFields = [
      "price",
      "bedrooms",
      "bathrooms",
      "size",
      "description",
      "streetName",
      "houseNumber",
      "numberAddition",
      "zip",
      "city",
      "constructionYear",
      "description",
      "image",
    ];
    requiredFields.forEach((field) => {
      if (!isNotEmpty(data[field])) {
        invalidFieldsList.push(field);
      }
    });

    return invalidFieldsList;
  };

  const isNotEmpty = (value) => {
    const trimmedValue = String(value).trim();
    return trimmedValue !== "";
  };

  useEffect(() => {
    fetchLists();
  }, []);

  useEffect(() => {
    dispatch({ type: GET_LISTS_SUCCESS, payload: state.lists }); // Clear the message state
  }, [state.lists]);

  /*

  useEffect(() => {
    const timeout = setTimeout(() => {
      dispatch({ type: GET_LISTS_SUCCESS, payload: state.lists }); // Clear the message state
    }, 2000);

    return () => clearTimeout(timeout);
  }, [state.lists]);


*/

  return (
    <ListsContext.Provider
      value={{
        ...state,
        removeItem,
        openSidebar,
        closeSidebar,
        fetchLists,
        fetchSingleItem,
        formData,
        setFormData,
        addToList,
        imageURL,
        setImageURL,
        setAddItemMessage,
        addItemMessage,
        openModal,
        closeModal,
        editItem,
        updateList,
        editData,
        setEditData,
        validateFormFields,
        sortPrice,
        sortSize,
        filter,
      }}
    >
      {children}
    </ListsContext.Provider>
  );
};

export const useListsContext = () => {
  return useContext(ListsContext);
};
