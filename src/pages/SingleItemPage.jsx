import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useListsContext } from "../context/lists_context";
import { post_url as url } from "../utils/constants";
import { Loading, Error, PageHero, Modal } from "../components";
import { Link } from "react-router-dom";
import {
  FaShower,
  FaBed,
  FaParking ,FaMapMarked,
  FaRuler,FaMoneyBill,FaCube,
  FaTrash,
  FaEdit 
} from "react-icons/fa";
import RecommendHouse from "./RecommendHouse";
//import {ListView} from "../components/index"

const SingleItemPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const {
    lists_loading: loading,
    lists_error: error,
    single_item: item,
    fetchSingleItem,
     single_item,
    openModal,
    isOpen,
  } = useListsContext();

  useEffect(() => {
    fetchSingleItem(`${url}/${id}`);
  }, [id]);

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
    constructionYear,hasGarage
  } = single_item;

  console.log(single_item);
  return (
    <section className="main">
      {isOpen && <Modal />}
      <PageHero title={city} item />
    
      <div className="single-product">
        <div className="left-column">
          <img src={image} />
          <div className="in-left-part">
            <div className="title-line">
              <h2>{street}</h2>
              <div className="single-list-modify">
              <Link to={`/edit/${id}`} className="edit-btn">
                  <FaEdit />
                </Link>
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
              
              </div>
            </div>

            <p>
              <FaMapMarked/>{zip}{"   "}{city}
              
            </p>
            <div className="some-info">
            <p><FaMoneyBill/>{price}</p>
            <p><FaRuler/>{size}</p>
            <p><FaCube/>{constructionYear ? `built in ${constructionYear}` : null}</p>
          
            <p>
              {" "}
              <FaBed />
              {bedrooms}
            </p>
            <p>
              <FaShower />
              {bathrooms}
            </p>
            <p>
              <FaParking />
              {hasGarage}
            </p>
            </div>
         

            <p>{description}</p>
          </div>
        </div>

        <div className="rigth-column">
          <h4>Recommended for you</h4>
          <RecommendHouse location={city} idItem={id}/>
        </div>
      </div>

      <div className="product-center"></div>
    </section>
  );
};

export default SingleItemPage;
