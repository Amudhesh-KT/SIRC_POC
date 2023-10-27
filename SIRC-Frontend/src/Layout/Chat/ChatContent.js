import {
  Box,
  Divider,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from "@mui/material";
import React from "react";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
const ChatContent = (props) => {
  return (
    <div style={{ height: "85%" }}>
      <Box>
        <Box
          display="flex"
          alignItems="center"
          p={2}
          sx={{
            pt: "8px",
            pb: "7px",
          }}
        >
          <Box
            sx={{
              display: { xs: "block", md: "block", lg: "none" },
              mr: "10px",
            }}
          >
            <MenuRoundedIcon onClick={props.onSideOpen} />
          </Box>
          <ListItem dense disableGutters>
            <ListItemAvatar>
              <img
                src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
                width="45px"
                height="45px"
                className="roundedCircle"
              />
            </ListItemAvatar>
            <ListItemText
              primary={
                <Typography variant="h4" className="heading4">
                  Dhanush
                </Typography>
              }
              secondary="Online"
            />
          </ListItem>
        </Box>
        <Divider />
        <Box p={2}>
          <Box display="flex" alignItems="center" flexDirection="row" gap={1}>
            <img
              src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
              width="45px"
              height="45px"
              className="roundedCircle"
            />
            <div className="pl-3">
              <Box
                mb={1}
                sx={{
                  p: 2,
                  backgroundColor: "primary.light",
                  borderRadius: "6px",
                }}
              >
                Hello, and Welcome! What can I do for you?
              </Box>
            </div>
          </Box>
          <Box
            display="flex"
            alignItems="center"
            flexDirection="row-reverse"
            gap={1}
          >
            <img
              src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
              width="45px"
              height="45px"
              className="roundedCircle"
            />
            <div className="pl-3">
              <Box
                mb={1}
                sx={{
                  p: 2,
                  backgroundColor: "secondary.light",
                  borderRadius: "6px",
                }}
              >
                Send Invoice Details and RFP's
              </Box>
            </div>
          </Box>
        </Box>
      </Box>
    </div>
  );
};

export default ChatContent;
