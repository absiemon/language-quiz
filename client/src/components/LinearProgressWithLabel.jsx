import { Box, LinearProgress } from "@mui/material";
import React from "react";

function LinearProgressWithLabel(props) {
  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <Box sx={{ width: "100%", mr: 1 }}>
        <LinearProgress
          variant="determinate"
          {...props}
          sx={{
            backgroundColor: "white",
            borderRadius: "20px",
            height: "13px",
            "& .css-5xe99f-MuiLinearProgress-bar1": {
              backgroundColor: "#083156",
            },
          }}
        />
      </Box>
    </Box>
  );
}

export default LinearProgressWithLabel;
