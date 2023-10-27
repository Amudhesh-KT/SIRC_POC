import { Box, TextField } from "@mui/material";
import React from "react";
import TelegramIcon from "@mui/icons-material/Telegram";
const ChatMsgSent = () => {
  return (
    <Box p={2}>
      <Box display="flex" alignItems="center">
        <TextField
          id="outlined-search"
          placeholder="Type a Message"
          size="small"
          type="search"
          variant="outlined"
          fullWidth
        />
        <TelegramIcon style={{ marginRight: "10px", marginLeft: "10px" }} />
      </Box>
    </Box>
  );
};

export default ChatMsgSent;
