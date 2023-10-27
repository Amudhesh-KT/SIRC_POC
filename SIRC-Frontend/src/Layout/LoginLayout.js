import { Box, Grid } from "@mui/material";
import Image from "next/image";
import React from "react";
import { useCallback } from "react";
import { useRouter } from "next/router";
import { useEffect } from "react";
// loginImg.png
function LoginLayout({ children }) {
  // let router = useRouter();
  // useEffect(() => {
  //   if (localStorage.getItem("kupex-company")) {
  //     router.push("/Dashboard/dashboard1");
  //   }
  // }, []);

  return (
    <>
      {/* <Grid
        container
        sx={{
          height: "100vh",
          position: "relative",
          background: " #0000000b",
        }}
      > */}
      {children}
      {/* <Grid
          item
          xs={12}
          sm={11}
          md={10}
          lg={10}
          display="flex"
          sx={{
            background: (theme) =>
              `${theme.palette.mode === "dark" ? "#1c1f25" : "tansparent"}`,
          }}
        >
          {children}
        </Grid> */}
      {/* </Grid> */}
    </>
  );
}

export default LoginLayout;
