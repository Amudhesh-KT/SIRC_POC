import {
  TextField,
  Box,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from "@mui/material";
// import {  } from "@mui/system";
import React from "react";

const ChatListing = () => {
  return (
    <div>
      <Box p={2} sx={{ pt: "21px", pb: "21px" }}>
        <TextField
          id="outlined-search"
          placeholder="Search contacts"
          size="small"
          type="search"
          variant="outlined"
          fullWidth
        />
      </Box>
      <Divider />
      <List
        sx={{
          height: { lg: "calc(100vh - 280px)" },
          sm: { height: "100vh" },
          p: 1,
        }}
      >
        <ListItem button alignItems="flex-start">
          <ListItemAvatar>
            <img
              src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
              width="45px"
              height="45px"
              className="roundedCircle"
            />
          </ListItemAvatar>
          <ListItemText primary="Dhanush" secondary="Sales Executive" />
        </ListItem>
        <ListItem button alignItems="flex-start">
          <ListItemAvatar>
            <img
              src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
              width="45px"
              height="45px"
              className="roundedCircle"
            />
          </ListItemAvatar>
          <ListItemText primary="Rajesh kumar" secondary="Sales Executive" />
        </ListItem>
      </List>
    </div>
  );
};

export default ChatListing;
