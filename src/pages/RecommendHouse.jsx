import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useListsContext } from "../context/lists_context";
import { post_url as url } from "../utils/constants";
import { Loading, Error, PageHero, Modal } from "../components";
import { Link } from "react-router-dom";
import {
  FaShower,
  FaBed,
  FaRuler,
} from "react-icons/fa";

const RecommendHouse = ({ location ,idItem}) => {
  const { id } = useParams();
  const [newList, setNewList] = useState([]); // Define newList using useState

  const {
    filterLists, fetchSingleItem,
  } = useListsContext();
  useEffect(() => {
    fetchSingleItem(`${url}/${id}`);
  }, [id]);
 
  useEffect(() => {
    const updateLists = filterLists.filter((item) => {
      return item.id !== idItem && item.city.toLowerCase().startsWith(location.toLowerCase());
    });
    setNewList(updateLists);
  }, [id,location]);

  return (
    <section className="similar-product-list">
      {newList.map((item) => {
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
          
          </article>
        );
      })}
     </section>
    
  );
};

export default RecommendHouse;
