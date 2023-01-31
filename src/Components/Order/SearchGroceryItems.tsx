import {
  IconButton,
  InputBase,
  List,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
  makeStyles,
} from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import SearchTwoToneIcon from "@material-ui/icons/SearchTwoTone";
import PlusOneIcon from "@material-ui/icons/PlusOne";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import React, { useState, useEffect } from "react";
import { createAPIEndpoint, ENDPOINTS } from "../../api";

const useStyles = makeStyles((theme) => ({
  searchPaper: {
    padding: "2px 4px",
    display: "flex",
    alignItems: "center",
  },
  searchInput: {
    marginLeft: theme.spacing(1.5),
    flex: 1,
  },
  listRoot: {
    marginTop: theme.spacing(1),
    maxHeight: 450,
    overflow: "auto",
    "& li:hover": {
      cursor: "pointer",
      backgroundColor: "#E3E3E3",
    },
    "& li:hover .MuiButtonBase-root": {
      display: "block",
      color: "#000",
    },
    "& .MuiButtonBase-root": {
      display: "none",
    },
    "& .MuiButtonBase-root:hover": {
      backgroundColor: "transparent",
    },
  },
}));

export default function SearchGroceryItems() {
  const [groceryItems, setGroceryItems] = useState([]);
  const [searchList, setSearchList] = useState([]);
  const [searchKey, setSearchKey] = useState("");
  const classes = useStyles();

  useEffect(() => {
    createAPIEndpoint(ENDPOINTS.GROCERYITEM)
      .fetchAll()
      .then((res) => {
        setGroceryItems(res.data);
        setSearchList(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div>
      <Paper>
        <Paper className={classes.searchPaper}>
          <InputBase
            className={classes.searchInput}
            value={searchKey}
            onChange={(e) => setSearchKey(e.target.value)}
            placeholder="Search grocery items"
          />
          <IconButton>
            <SearchTwoToneIcon />
          </IconButton>
        </Paper>
      </Paper>
      <List>
        {groceryItems.map((item, idx) => (
          <ListItem key={idx}>
            <ListItemText
              primary={item.groceryName}
              secondary={"$" + item.price}
            />
          </ListItem>
        ))}
      </List>
    </div>
  );
}
