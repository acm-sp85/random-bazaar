import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import CardMedia from "@mui/material/CardMedia";
import { borderRadius } from "@mui/system";

function ItemInfo(info) {
  const [itemInfo, setItemInfo] = useState(info);
  const [user, setUser] = useState(info.currentUser);
  const history = useHistory();
  const bull = (
    <Box
      component="span"
      sx={{ display: "inline-block", mx: "2px", transform: "scale(0.8)" }}
    >
      •
    </Box>
  );

  useEffect(() => {
    fetch(`/items/${info.props.history.location.state}`, {
      credentials: "include",
    }).then((res) => {
      if (res.ok) {
        res.json().then((item_info) => {
          setItemInfo(item_info);
        });
      }
    });
  }, []);

  const contactOwnerAction = () => {
    console.log("now send a message " + itemInfo.owner_id);
    history.push({
      pathname: "/messager",
      state: itemInfo.owner_id,
    });
  };

  return (
    <div>
      <Box
        className="centered__itemInfo"
        sx={{
          maxWidth: 600,
          border: "1px solid lightgrey",
          borderRadius: 5,
          padding: 2,
          boxShadow: 2,
        }}
      >
        <React.Fragment>
          <CardContent>
            <CardMedia
              component="img"
              height="300"
              image={itemInfo.image}
              alt="Paella dish"
            />
            <Typography
              sx={{ fontSize: 14 }}
              color="text.secondary"
              gutterBottom
            >
              Item status: {itemInfo.type}
            </Typography>
            <Typography variant="h5" component="div">
              {itemInfo.item_name}
            </Typography>
            <Typography sx={{ mb: 1.5 }} color="text.secondary">
              {itemInfo.category_name} - {itemInfo.location}
            </Typography>
            <Typography variant="body2">
              {itemInfo.description}
              <br />
            </Typography>
            {itemInfo.type == "Sell" ? (
              <Typography variant="body2">
                ${itemInfo.price}
                <br />
              </Typography>
            ) : (
              <></>
            )}
          </CardContent>
          <CardActions>
            {user ? (
              <Button size="small" onClick={contactOwnerAction}>
                Contact owner - {itemInfo.owner}
              </Button>
            ) : (
              <Button
                size="small"
                onClick={() => {
                  history.push({
                    pathname: "/login",
                  });
                }}
              >
                Log in to contact owner
              </Button>
            )}
          </CardActions>
        </React.Fragment>
      </Box>
    </div>
  );
}

export default ItemInfo;
