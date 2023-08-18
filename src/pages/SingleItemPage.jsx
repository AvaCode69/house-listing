import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useListsContext } from "../context/lists_context";
import { post_url as url } from "../utils/constants";
import { Loading, Error, PageHero, Modal } from "../components";
import { Link } from "react-router-dom";
import { FaShower, FaBed, FaRuler, FaTrash, FaEdit } from "react-icons/fa";

const SingleItemPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const {
    lists_loading: loading,
    lists_error: error,
    single_item: item,
    fetchSingleItem,
    formData,
    single_item,
    openModal,
    isOpen,
  } = useListsContext();

  useEffect(() => {
    fetchSingleItem(`${url}/${id}`);
  }, []);

  useEffect(() => {
    if (error) {
      setTimeout(() => {
        navigate("/");
      }, 3000);
    }
  }, [error]);

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <Error />;
  }

  const {
    image,
    price,
    description,
    size,
    street,
    zip,
    city,
    bedrooms,
    bathrooms,
    constructionYear,
  } = single_item;

  console.log(single_item);
  return (
    <section className="main">
      {isOpen && <Modal />}
      <PageHero title={city} item />
      <div className="section section-center page">
        <Link to="/" className="btn">
          back to Home
        </Link>
        <img src={image} />
        <div className="single-list-modify">
          <button
            type="button"
            className="remove-btn"
            onClick={() => {
              console.log("Button clicked");
              console.log(id);
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
        <div className="product-center">
          <h2>{street}</h2>
          <p>
            {zip}
            {city}
          </p>
          <p>{price}</p>
          <p>{size}</p>
          <p>{constructionYear ? `built in ${constructionYear}` : null}</p>

          <p>{description}</p>
        </div>
      </div>
    </section>
  );
};

export default SingleItemPage;
