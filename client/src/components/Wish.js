import React, { useState, useEffect } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import useHandleClickInfo from "./useHandleClickInfo";

function Wish(props) {
  const [images, setImages] = useState(null);
  const handleInfo = useHandleClickInfo(props.info.item_info.id);

  useEffect(() => {
    console.log(props.info.item_info);
  });
  const handleDelete = (e) => {
    console.log(props.info.id);
    console.log(props.setWished_items);

    const filteredItems = props.wished_items.filter(
      (item) => item.id != props.info.id
    );
    props.setWished_items(filteredItems);
    const config = {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({}),
    };
    fetch(`/wishlists/${props.info.id}`, config).then(
      console.log("Item deleted, id: " + props.info.id)
    );
  };
  return (
    // <div>{console.log(props)}</div>
    <div key={props.info.item_info.id}>
      {/* {props.info.item_info.image_file ? (
        <img
          src={props.info.item_info.image_file}
          className="wishlist__card link"
          onClick={handleInfo}
        />
      ) : (
        <img
          src={props.info.item_info.image}
          className="wishlist__card link"
          onClick={handleInfo}
        />
      )} */}

      <div style={{ display: "flex", marginBottom: "10px" }}>
        <DeleteIcon
          color="error"
          fontSize="small"
          onClick={handleDelete}
          key={props.info.item_info.id}
          className="link"
        />
        <div
          onClick={handleInfo}
          style={{ marginLeft: "15px", marginTop: "5px" }}
        >
          <p style={{ cursor: "pointer" }}> {props.info.item_info.item_name}</p>

          <p
            style={{ marginLeft: "15px", fontSize: "11px", cursor: "pointer" }}
          >
            {" "}
            {props.info.item_info.description}
          </p>
        </div>
      </div>
    </div>
  );
}

export default Wish;
