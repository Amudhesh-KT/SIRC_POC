import {
  Box,
  Button,
  Grid,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import React from "react";
import LoginBg from "../../assets/loginbg.png";
import Image from "next/image";
import SIRCColor from "../../assets/sirc-color.png";
import { useRouter } from "next/navigation";
// import Microsoft from "../../assets/microsoft.png";
const Login = () => {
  let router = useRouter();
  const lgUp = useMediaQuery((theme) => theme.breakpoints.up("sm"));
  const mdUp = useMediaQuery((theme) => theme.breakpoints.up("lg"));
  return (
    <Grid container spacing={0} sx={{ height: "100vh" }}>
      <Grid
        item
        xs={12}
        sm={12}
        md={6}
        lg={6}
        position={"relative"}
        sx={{
          display: { xs: "none", md: "flex" },
          height: "100vh",
          position: "relative",
        }}
      >
        <Image
          src={LoginBg}
          alt="Image Alt Text"
          layout="fill"
          objectFit="cover"
        />
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Typography
            variant="h1"
            sx={{
              color: "#fff",
              fontSize: mdUp ? "3.5rem" : "3rem",
              fontWeight: 400,
              lineHeight: "74px",
            }}
          >
            Leading the
          </Typography>
          <Typography
            variant="h1"
            sx={{
              color: "#fff",
              fontSize: mdUp ? "3.5rem" : "3rem",
              fontWeight: 600,
              lineHeight: "74px",
            }}
          >
            Circular Economy
          </Typography>
          <Typography
            variant="h1"
            sx={{
              color: "#fff",
              fontSize: mdUp ? "3.5rem" : "3rem",
              fontWeight: 400,
              lineHeight: "74px",
            }}
          >
            in Saudi Arabia
          </Typography>
        </Box>
      </Grid>
      <Grid
        item
        xs={12}
        sm={12}
        md={6}
        lg={6}
        display={"flex"}
        alignItems={"center"}
        justifyContent={"center"}
        flexDirection={"column"}
      >
        <Box my={1}>
          <Image src={SIRCColor} />
        </Box>
        <Box
          my={1.5}
          display={"flex"}
          alignItems={"center"}
          justifyContent={"center"}
          flexDirection={"column"}
        >
          <Typography
            variant="h5"
            fontWeight={"600"}
            sx={{ letterSpacing: 0.8 }}
          >
            My Workspace
          </Typography>
          <Typography
            variant="caption"
            fontWeight={"400"}
            sx={{ letterSpacing: 0.8 }}
          >
            Get more things done
          </Typography>
        </Box>
        <Typography
          variant="h6"
          fontWeight={700}
          color="primary.dark"
          sx={{
            borderBottom: `4px solid ${useTheme().palette.primary.main}`,
          }}
        >
          Login
        </Typography>
        <Box
          display="flex"
          alignItems={"center"}
          justifyContent={"center"}
          flexDirection={"column"}
          my={2}
        >
          <Box my={1}>
            <input
              type="email"
              placeholder="Email"
              style={{
                width: lgUp ? "385px" : "300px",
                height: "56px",
                borderRadius: 30,
                paddingLeft: "30px",
                border: "none",
                outline: "none",
                boxShadow: "none",
                background: "#f6f7f9",
              }}
            />
          </Box>
          <Box my={1}>
            <input
              type="password"
              placeholder="Password"
              style={{
                width: lgUp ? "385px" : "300px",
                height: "56px",
                borderRadius: 30,
                paddingLeft: "30px",
                border: "none",
                outline: "none",
                boxShadow: "none",
                background: "#f6f7f9",
              }}
            />
          </Box>
          <Button
            sx={{
              color: "#fff",
              background: "#24B496",
              "&:hover": {
                color: "#fff",
                background: "#24B496",
              },
              width: "100%",
              my: 1,
              height: "56px",
              borderRadius: 30,
              fontWeight: 500,
            }}
            onClick={() => router.push("/")}
          >
            Login
          </Button>
          {/* <Button
            sx={{
              background: "#fff",
              border: "1px solid #24B496",
              color: "#24B496",
              width: "100%",
              my: 1,
              height: "56px",
              borderRadius: 30,
              fontWeight: 500,
            }}
          >
            <Image
              src={Microsoft}
              height="20"
              width="20"
              style={{ marginLeft: "10px", marginRight: "10px" }}
            />
            Microsoft
          </Button> */}
        </Box>
      </Grid>
    </Grid>
  );
};

Login.Layout = true;
export default Login;
