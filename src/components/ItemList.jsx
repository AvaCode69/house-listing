//ItemList.jsx

import React from "react";
import { useListsContext } from "../context/lists_context";
import ListView from "./ListView";
import { Loading } from "../components";

const ItemList = () => {
  const { filterLists,lists_loading: loading } = useListsContext();

  if (loading) {
    return <Loading />;
  }
  if (filterLists.length < 1) {
    return (
      <section className="main">
        <h5 style={{ textTransform: "none" }}>Sorry, no House exist.</h5>
      </section>
    );
  }

  return <ListView lists={filterLists} />;
};

export default ItemList;
