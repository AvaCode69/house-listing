// AddItem.jsx

import React, { useContext, useState } from "react";
import axios from "axios";
import { post_url as url } from "../utils/constants";
import { useListsContext } from "../context/lists_context";
import { FiPlus, FiX } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { Loading } from "../components";

const AddItem = () => {
  const {
    setFormData,
    formData,
    invalidFields,
    fetchLists,
    addToList,
    imageURL,
    setImageURL,
    setAddItemMessage,
    addItemMessage,
    single_item,
    lists,
    fetchSingleItem,
    validateFormFields,
  } = useListsContext();
  const navigate = useNavigate();
  const [invalidAddItems, setInvalidAddItems] = useState([]);

  const validateForm = () => {
    const invalidFieldsList = validateFormFields(formData);
    setInvalidAddItems(invalidFieldsList);

    return invalidFieldsList.length === 0;
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "image" && files.length > 0) {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(files[0]);

      fileReader.onload = (e) => {
        const base64Image = e.target.result;
        setFormData((prevData) => ({
          ...prevData,
          [name]: base64Image,
        }));
      };
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setFormData((prevData) => ({ ...prevData, image: file }));

    const url = URL.createObjectURL(file);
    setImageURL(url);
  };

  const handleSubmit = async (e) => {
    const { name } = e.target;

    e.preventDefault();
    setAddItemMessage("");

    if (!validateForm()) {
      setAddItemMessage("required field missing");
      return;
    } else {
      addToList(formData);

      const id = lists[lists.length - 1].id;
      navigate(`/${id}`);
    }
  };

  const getFieldClassName = (fieldName) =>
    invalidAddItems.includes(fieldName) ? "invalid" : "";

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
              value={formData.price}
              onChange={handleChange}
              className={getFieldClassName("price")}
            />
          </label>
          <label>
            Bedrooms:
            <input
              type="text"
              name="bedrooms"
              value={formData.bedrooms}
              onChange={handleChange}
              className={getFieldClassName("bedrooms")}
            />
          </label>
          <label>
            Bathrooms:
            <input
              type="text"
              name="bathrooms"
              value={formData.bathrooms}
              onChange={handleChange}
              className={getFieldClassName("bathrooms")}
            />
          </label>
          <label>
            Size:
            <input
              type="text"
              name="size"
              value={formData.size}
              onChange={handleChange}
              className={getFieldClassName("size")}
            />
          </label>
          <label>
            Street Name:
            <input
              type="text"
              name="streetName"
              value={formData.streetName}
              onChange={handleChange}
              className={getFieldClassName("streetName")}
            />
          </label>
          <label>
            House Number:
            <input
              type="text"
              name="houseNumber"
              value={formData.houseNumber}
              onChange={handleChange}
              className={getFieldClassName("houseNumber")}
            />
          </label>
          <label>
            Number Addition:
            <input
              type="text"
              name="numberAddition"
              value={formData.numberAddition}
              onChange={handleChange}
              className={getFieldClassName("numberAddition")}
            />
          </label>
          <label>
            ZIP:
            <input
              type="text"
              name="zip"
              value={formData.zip}
              onChange={handleChange}
              className={getFieldClassName("zip")}
            />
          </label>
          <label>
            City:
            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={handleChange}
              className={getFieldClassName("city")}
            />
          </label>
          <label className="upload-label">
            Upload Images:
            <div className={`upload-container ${getFieldClassName("image")}`}>
              <div className="upload-preview">
                {imageURL && (
                  <div className="image-preview">
                    <div className="image-item">
                      <img src={imageURL} alt="Image Preview" />
                      <button
                        type="button"
                        className="remove-image-btn"
                        onClick={() => {
                          setImageURL("");
                          formData.image = "";
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
                    imageURL.length > 0 ? "hidden" : ""
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
              value={formData.constructionYear}
              onChange={handleChange}
              className={getFieldClassName("constructionYear")}
            />
          </label>
          <label>
            Has Garage:
            <select
              name="hasGarage"
              value={formData.hasGarage}
              onChange={handleChange}
            >
              <option value="no">No</option>
              <option value="yes">Yes</option>
            </select>
          </label>
       </div>
       <div  className="textarea-form">
       <label >
            Description:  </label>
            <textarea 
              name="description"
              value={formData.description}
              onChange={handleChange}
              className={getFieldClassName("description")}   rows={10}  cols={15}
            ></textarea>
       </div>
        
          <button type="submit">Send Post</button>
          {addItemMessage && <p className="message">{addItemMessage}</p>}
        </form>
      </div>
    </section>
  );
};

export default AddItem;
