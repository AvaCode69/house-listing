//ItemList.jsx

import React from "react";
import { useListsContext } from "../context/lists_context";
import ListView from "./ListView";
const ItemList = () => {
  const { filterLists } = useListsContext();

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
