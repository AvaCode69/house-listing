//ListView.jsx;

import React from "react";
import { Link } from "react-router-dom";
import {} from "react-icons/fa";
import { FaShower, FaBed, FaRuler, FaTrash, FaEdit } from "react-icons/fa";
import { useListsContext } from "../context/lists_context";
import { post_url as url } from "../utils/constants";
import { ItemList, Loading, Error } from "../components";
import { useNavigate } from "react-router-dom";

const ListView = ({ lists }) => {
  const {
    lists_loading: loading,
    lists_error: error,
    removeMessage,
    openModal,
    editItem,
    single_item,
  } = useListsContext();
  const navigate = useNavigate();

  const redirectEdit = (id) => {
    navigate(`/${id}`);
  };

  if (loading) {
    return <Loading />;
  }
  if (error) {
    return <Error />;
  }

  return (
    <section className="lists">
      {removeMessage && <p className="message">{removeMessage}</p>}
      {lists.map((item) => {
        const {
          id,
          image,
          price,
          size,
          street,
          zip,
          city,
          bedrooms,
          bathrooms,
        } = item;
        return (
          <article className="single-list" key={id}>
            <Link to={`/${id}`} className=" ">
              <img src={image} />{" "}
            </Link>
            <div>
              <h5>{street}</h5>
              <p className="price">€{price}</p>
              <p className="location">
                {zip} {city}
              </p>
              <div className="single-list-info">
                <p>
                  <FaBed />
                  {bedrooms}{" "}
                </p>
                <p>
                  <FaShower />
                  {bathrooms}
                </p>
                <p>
                  <FaRuler />
                  {size} m2
                </p>
              </div>
            </div>
            <div className="single-list-modify">
              <button
                type="button"
                className="remove-btn"
                onClick={() => {
                  openModal(id);
                }}
              >
                {" "}
                <FaTrash />{" "}
              </button>
              <Link to={`/edit/${id}`} className="edit-btn">
                <FaEdit />
              </Link>
            </div>
          </article>
        );
      })}
    </section>
  );
};

export default ListView;
