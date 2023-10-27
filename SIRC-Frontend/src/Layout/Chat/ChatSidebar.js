import { Drawer } from "@mui/material";
import React from "react";
import ChatListing from "./ChatListing";
import { useMediaQuery } from "@mui/material";
const ChatSidebar = (props) => {
  const drawerWidth = 290;
  const lgUp = useMediaQuery((theme) => theme.breakpoints.up("lg"));
  if (lgUp) {
    return (
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: { position: "relative" },
        }}
        variant="permanent"
      >
        <ChatListing />
      </Drawer>
    );
  }
  return (
    <div>
      <Drawer
        open={props.mobileSideOpen}
        onClose={props.onSideClose}
        variant="temporary"
        sx={{ zIndex: 1, [`& .MuiDrawer-paper`]: { paddingTop: "70px" } }}
      >
        <ChatListing />
      </Drawer>
    </div>
  );
};

export default ChatSidebar;
