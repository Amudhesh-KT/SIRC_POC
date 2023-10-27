import { Typography } from "@mui/material";
import React from "react";

const CustomText = ({ primary, secondary }) => {
  return (
    <div>
      <Typography variant="caption" fontWeight={300} color="#5c6980">
        {primary}
      </Typography>
      <Typography variant="h6" fontWeight={500} color="#5c6980">
        {secondary}
      </Typography>
    </div>
  );
};

export default CustomText;
