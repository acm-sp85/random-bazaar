import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import Button from "@mui/material/Button";
import "../styles/EditItems.css";

function EditItem(itemToEdit) {
  const [user, setUser] = useState("");
  const [description, setDescription] = useState("");
  const [category_id, setCategory_id] = useState("");
  const [city_id, setCity_id] = useState("");
  const [item_type_id, setItem_type_id] = useState("");
  const [image, setImage] = useState("");
  const [item_name, setItem_name] = useState("");
  const [price, setPrice] = useState("");
  const [image_file, setImage_file] = useState(null);
  const history = useHistory();

  useEffect(() => {
    window.scrollTo(0, 0);
    const config = {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    };

    fetch(`/items/${itemToEdit.props.history.location.state}`, config)
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          // DO BETTER ERROR HANDLING
          console.log("ERROORRRR");
        }
      })
      .then((result) => {
        setDescription(result.description);
        setCategory_id(result.category_id);
        setCity_id(result.city_id);
        setItem_type_id(result.item_type_id);
        setItem_name(result.item_name);
        setPrice(result.price);
        setImage(result.image);
        setImage_file(result.image_file);
      });
  }, [itemToEdit]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("description", description);
    formData.append("category_id", category_id);
    formData.append("city_id", city_id);
    formData.append("item_type_id", item_type_id);
    formData.append("item_name", item_name);
    formData.append("price", price);
    // formData.append("image_file", image_file);
    fetch(`/items/${itemToEdit.props.history.location.state}`, {
      method: "PATCH",
      body: formData,
    }).then((response) => {
      if (response.ok) {
        console.log(itemToEdit.props.history.location.setUsersItems);
        response.json().then((edited_item) => {
          console.log(edited_item);
          history.push("/manage-items");
          // -------
          // info.setCurrentUser({
          //   ...info.currentUser,
          //   wishlists: [...info.currentUser.wishlists, item_wished],
          // });
          // -------
          // itemToEdit.props.history.location.setUsersItems({
          //   ...itemToEdit.props.history.location.usersItems,
          // });
        });
      } else {
        response.json().then((error) => {
          console.log(error.error);
        });
      }
    });
  };
  const handleCategory = (e) => {
    setCategory_id(e.target.value);
  };
  const handleBorough = (e) => {
    setCity_id(e.target.value);
  };
  const handleItemType = (e) => {
    setItem_type_id(e.target.value);
  };

  return (
    <div className="centered">
      <h1>Edit Item</h1>
      <form onSubmit={handleSubmit}>
        <input
          className="custom-imputs"
          type="text"
          placeholder="Item name..."
          value={item_name}
          onChange={(e) => setItem_name(e.target.value)}
        />
        <br />
        <select value={category_id} onChange={handleCategory}>
          <option value="nill">Category</option>
          <option value="1">Vehicles</option>
          <option value="2">Art</option>
          <option value="3">Games</option>
          <option value="4">Books</option>
          <option value="5">Electronics</option>
          <option value="6">Furniture</option>
        </select>
        <br />

        <select value={city_id} onChange={handleBorough}>
          <option value="nill">Borough</option>
          <option value="1">Manhattan</option>
          <option value="2">Brooklyn</option>
          <option value="3">Queens</option>
          <option value="4">Bronx</option>
          <option value="5">Staten Island</option>
        </select>

        <br />
        <input
          className="custom-imputs"
          type="text"
          placeholder="Description..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <br />
        <select value={item_type_id} onChange={handleItemType}>
          <option value="1">Sell</option>
          <option value="2">Trade</option>
          <option value="3">Borrow</option>
          <option value="4">Donate</option>
        </select>
        {item_type_id == "1" ? (
          <input
            className="custom-imputs"
            type="text"
            placeholder="Price..."
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        ) : (
          <></>
        )}

        <br />
    
        {image_file ? (
          <img src={image_file} style={{ maxHeight: "80px" }} />
        ) : (
          <img src={image} style={{ maxHeight: "80px" }} />
        )}

        <br />
        <button
          onClick={() => {
            history.push({
              pathname: "image-upload",
              state: itemToEdit.props.history.location.state,
            });
          }}
        >
          Change Image
        </button>
        <br />
        <Button type="submit">UPDATE ITEM</Button>
      </form>
    </div>
  );
}

export default EditItem;
