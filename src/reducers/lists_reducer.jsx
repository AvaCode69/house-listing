// lists_reducer.jsx
import {
  SIDEBAR_OPEN,
  SIDEBAR_CLOSE,
  GET_LISTS_BEGIN,
  GET_LISTS_SUCCESS,
  GET_LISTS_ERROR,
  ADD_TO_LIST,
  REMOVE_LIST_ITEM,
  GET_SINGLE_ITEM_SUCCESS,
  GET_SINGLE_ITEM_ERROR,
  GET_SINGLE_ITEM_BEGIN,
  OPEN_MODAL,
  CLOSE_MODAL,
  EDIT_ITEM,
  UPDATE_ITEM,
  PRICE_LOWEST,
  SIZE_SMALLEST,
  FILTER_ITEM,RECOMMEND_LIST
} from "../actions";

const lists_reducer = (state, action) => {
  if (action.type === SIDEBAR_OPEN) {
    return { ...state, isSidebarOpen: true };
  }
  if (action.type === SIDEBAR_CLOSE) {
    return { ...state, isSidebarOpen: false };
  }
  if (action.type === OPEN_MODAL) {
    return { ...state, isOpen: true, modalItemId: action.payload };
  }
  if (action.type === CLOSE_MODAL) {
    return { ...state, isOpen: false };
  }

  if (action.type === REMOVE_LIST_ITEM) {
    return {
      ...state,

      removeMessage: "Item removed successfully",
    };
  }

  if (action.type === PRICE_LOWEST) {
    const newSortList = state.lists.sort((a, b) => {
      return a.price - b.price;
    });
    return { ...state, lists: newSortList };
  }

  if (action.type === SIZE_SMALLEST) {
    const newSortList = state.lists.sort((a, b) => {
      return a.size - b.size;
    });
    return { ...state, lists: newSortList };
  }

  if (action.type === GET_LISTS_BEGIN) {
    return { ...state, lists_loading: true };
  }
  if (action.type === GET_LISTS_SUCCESS) {
    return {
      ...state,
      lists_loading: false,
      lists: action.payload,
      removeMessage: " ",
      addMessage: "",
    };
  }
  if (action.type === GET_LISTS_ERROR) {
    return { ...state, lists_loading: false, lists_error: true };
  }

  if (action.type === GET_SINGLE_ITEM_BEGIN) {
    return {
      ...state,
      single_item_loading: false,
      single_item_error: false,
    };
  }

  if (action.type === GET_SINGLE_ITEM_SUCCESS) {
    return {
      ...state,
      lists_loading: false,
      single_item: action.payload,
    };
  }
  if (action.type === GET_SINGLE_ITEM_ERROR) {
    return { ...state, single_item_error: false, single_item_loading: true };
  }

  if (action.type === ADD_TO_LIST) {
    return {
      ...state,
      single_item_loading: true,
      single_item: action.payload,
    };
  }
  if (action.type === EDIT_ITEM) {
    return {
      ...state,
      lists_loading: false,
      edit_item: action.payload, // Assign the editItem function to edit_item property
    };
  }

  if (action.type === FILTER_ITEM) {
    if (action.payload) {
      const updateLists = state.filterLists.filter((item) =>
        item.city.toLowerCase().startsWith(action.payload.toLowerCase())
      );

      return {
        ...state,
        lists_loading: false,
        filterLists: updateLists,
      };
    } else {
      return {
        ...state,
        lists_loading: false,
        filterLists: [...state.filterLists],
      };
    }
  }
  if (action.type === RECOMMEND_LIST) {
    if (action.payload) {
      const updateLists = state.filterLists.filter((item) =>
      item.id !== action.payload.idItem && item.city.startsWith(action.payload.location) ,
      console.log("aaa"+ action.payload.location)
      );

      return {
        ...state,
        lists_loading: false,
        recommendNewList: updateLists,
      };
    }  
  }

  if (action.type === UPDATE_ITEM) {
    return {
      ...state,

      lists_loading: false,
    };
  }
  throw new Error(`No Matching - action type`);
};

export default lists_reducer;
