//HomePage.jsx

import { ItemList, Loading, Error, Modal } from "../components";
import { Link } from "react-router-dom";
import { useListsContext } from "../context/lists_context";
const HomePage = () => {
  const {
    lists_loading: loading,
    lists_error: error,
    isOpen,
    sortPrice,
    sortSize,
    filter,
    filterLists,
  } = useListsContext();
  if (loading) {
    return <Loading />;
  }
  if (error) {
    return <Error />;
  }
  return (
    <main>
      {isOpen && <Modal />}

      <section>
        <div className="header-list ">
          <h2>Houses </h2>
          <Link to="/addItem" className="cart-btn">
            <button className="btn">+ Create new </button>
          </Link>
        </div>
        <div className="section-center">
          <input
            type="text"
            name="text"
            placeholder="search"
            className="search-input"
            onChange={filter}
          />

          <div>
            <button className="btn" onClick={sortPrice}>
              price
            </button>
            <button className="btn" onClick={sortSize}>
              Size
            </button>
          </div>
        </div>
      </section>
      <section></section>
      {filterLists.length > 0 ? <h4>{filterLists.length}found</h4> : null}
      <ItemList />
    </main>
  );
};

export default HomePage;
