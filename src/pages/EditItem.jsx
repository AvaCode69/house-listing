//EditItem.jsx

import React, { useEffect, useState } from "react";
import axios from "axios";
import { post_url as url } from "../utils/constants";
import { useListsContext } from "../context/lists_context";
import { FiPlus, FiX } from "react-icons/fi";
import { useParams, useNavigate } from "react-router-dom";
import { Loading } from "../components";

const EditItem = () => {
  const {
    setFormData,
    formData,
    fetchSingleItem,
    addToList,

    setAddItemMessage,
    addItemMessage,
    single_item,
    edit_item,
    updateList,
    fetchLists,
    editItem,
    editData,
    setEditData,
    validateFormFields,
  } = useListsContext();
  const navigate = useNavigate();
  const { id } = useParams();
  const [invalidEditItems, setInvalidEditItems] = useState([]);
  const [imageURL, setImageURL] = useState("");
  useEffect(() => {
    editItem(`${url}/${id}`);
  }, [id]);

  const validateForm = () => {
    const invalidFieldsList = validateFormFields(editData);
    setInvalidEditItems(invalidFieldsList);

    return invalidFieldsList.length === 0;
  };

  const {
    image,
    price,
    description,
    size,
    streetName,
    houseNumber,
    numberAddition,
    hasGarage,
    zip,
    city,
    bedrooms,
    bathrooms,
    constructionYear,
  } = editData;
  console.log("edit_item", editData);

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "image" && files.length > 0) {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(files[0]);

      fileReader.onload = (e) => {
        const base64Image = e.target.result;
        setEditData((prevData) => ({
          ...prevData,
          [name]: base64Image,
        }));
      };
    } else {
      setEditData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setEditData((prevData) => ({ ...prevData, image: file }));

    const url = URL.createObjectURL(file);
    setImageURL(url);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      setAddItemMessage("Required field(s) missing");
      return;
    }

    try {
      // Send the updated item data to the server using an HTTP PUT request
      await updateList(`${url}/${id}`, editData); // Pass the formData here
      navigate(`/`);
      fetchLists();
    } catch (error) {
      // Handle any errors that occur during the update
      console.error("Error updating item:", error);
    }
  };

  const getFieldClassName = (fieldName) =>
    invalidEditItems.includes(fieldName) ? "invalid" : "";

  console.log("setImageURL", setImageURL);

  return (
    <section className="container">
      <div className="wrap">
        <form className="" onSubmit={handleSubmit}>
       <div className="item-form">
         <label>
            Price:
            <input
              type="text"
              name="price"
              value={price}
              onChange={handleChange}
              className={getFieldClassName("price")}
            />
          </label>
          <label>
            Bedrooms:
            <input
              type="text"
              name="bedrooms"
              value={bedrooms}
              onChange={handleChange}
              className={getFieldClassName("bedrooms")}
            />
          </label>
          <label>
            Bathrooms:
            <input
              type="text"
              name="bathrooms"
              value={bathrooms}
              onChange={handleChange}
              className={getFieldClassName("bathrooms")}
            />
          </label>
          <label>
            Size:
            <input
              type="text"
              name="size"
              value={size}
              onChange={handleChange}
              className={getFieldClassName("size")}
            />
          </label>
          <label>
            Street Name:
            <input
              type="text"
              name="streetName"
              value={streetName}
              onChange={handleChange}
              className={getFieldClassName("streetName")}
            />
          </label>
          <label>
            House Number:
            <input
              type="text"
              name="houseNumber"
              value={houseNumber}
              onChange={handleChange}
              className={getFieldClassName("houseNumber")}
            />
          </label>
          <label>
            Number Addition:
            <input
              type="text"
              name="numberAddition"
              value={numberAddition}
              onChange={handleChange}
              className={getFieldClassName("numberAddition")}
            />
          </label>
          <label>
            ZIP:
            <input
              type="text"
              name="zip"
              value={zip}
              onChange={handleChange}
              className={getFieldClassName("zip")}
            />
          </label>
          <label>
            City:
            <input
              type="text"
              name="city"
              value={city}
              onChange={handleChange}
              className={getFieldClassName("city")}
            />
          </label>

          <label className="upload-label">
            Upload Images:
            <div className={`upload-container ${getFieldClassName("image")}`}>
              <div className="upload-preview">
                {image && (
                  <div className="image-preview">
                    <div className="image-item">
                      <img src={image} alt="Image Preview" />
                      <button
                        type="button"
                        className="remove-image-btn"
                        onClick={() => {
                          setImageURL("");
                          setEditData((prevData) => ({
                            ...prevData,
                            image: null,
                          }));
                        }}
                      >
                        <FiX />
                      </button>
                    </div>
                  </div>
                )}
                <input
                  type="file"
                  name="image"
                  multiple
                  accept="image/jpeg, image/png"
                  onChange={(e) => {
                    handleImageChange(e);
                    handleChange(e);
                  }}
                  className="upload-input"
                />

                <div
                  className={`upload-icon-container ${
                    image ? "hidden" : ""
                  }`}
                >
                  <FiPlus className="upload-icon" />
                </div>
              </div>
            </div>
          </label>

          <label>
            Construction Year:
            <input
              type="text"
              name="constructionYear"
              value={constructionYear}
              onChange={handleChange}
              className={getFieldClassName("constructionYear")}
            />
          </label>
          <label>
            Has Garage:
            <select name="hasGarage" value={hasGarage} onChange={handleChange}>
              <option value="no">No</option>
              <option value="yes">Yes</option>
            </select>
          </label>
          </div>
       <div  className="textarea-form">
          <label>
            Description:
            <textarea
              name="description"
              value={description}
              onChange={handleChange}
              className={getFieldClassName("description")}   rows={10}  cols={15} 
            ></textarea>
          </label>
         </div>
      
          <button type="submit">Save</button>
          {addItemMessage && <p className="message">{addItemMessage}</p>}
        </form>
        </div>
    </section>
  );
};

export default EditItem;
