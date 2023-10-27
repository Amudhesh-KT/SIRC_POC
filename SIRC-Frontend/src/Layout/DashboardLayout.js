import {
  experimentalStyled,
  useMediaQuery,
  Container,
  Box,
  Tooltip,
  IconButton,
  Card,
  Typography,
  Divider,
  TextField,
} from "@mui/material";
import { useSelector } from "react-redux";
import HeaderNavbar from "./HeaderNavbar/HeaderNavbar";
import SideNavbar from "./SideNavbar/SideNavbar";
import React from "react";
import { BsFillChatLeftTextFill } from "react-icons/bs";
import SimpleBar from "simplebar-react";
import { FaTelegramPlane } from "react-icons/fa";
import { FiSettings, FiX } from "react-icons/fi";
import ChatLogo from "../../assets/Chat-Logo.png";
import ChatLogo1 from "../../assets/Chat1.png";
import ChatLogoWhite from "../../assets/ChatLogoWhite.png";
import Image from "next/image";
import { IoIosResize } from "react-icons/io";
import { IoPaperPlaneOutline } from "react-icons/io5";
import { AiOutlineFullscreenExit } from "react-icons/ai";
const MainWrapper = experimentalStyled("div")(() => ({
  display: "flex",
  minHeight: "100vh",
  overflow: "hidden",
  width: "100%",
}));

const ContentWrapper = experimentalStyled("div")(({ theme }) => ({
  display: "flex",
  flex: "1 1 auto",
  overflow: "hidden",
  backgroundColor: theme.palette.background.default,
  [theme.breakpoints.up("lg")]: {
    paddingTop: "64px",
  },
  [theme.breakpoints.down("lg")]: {
    paddingTop: "64px",
  },
}));

function DashboardLayout({ children }) {
  const [isSidebarOpen, setSidebarOpen] = React.useState(true);
  const [isMobileSidebarOpen, setMobileSidebarOpen] = React.useState(false);
  const ThemeCustom = useSelector((state) => state.CustomizerReducer);
  const [showDrawer, setShowDrawer] = React.useState(false);
  const lgUp = useMediaQuery((theme) => theme.breakpoints.up("lg"));
  const [toggleWidth, setToggleWidth] = React.useState(false);
  return (
    <MainWrapper>
      <HeaderNavbar
        sx={{
          // paddingLeft: isSidebarOpen && lgUp ? "265px" : "",
          zIndex: 100,
          backgroundColor:
            ThemeCustom.activeMode === "dark" ? "#20232a" : "#00A885",
        }}
        toggleSidebar={() => setSidebarOpen(!isSidebarOpen)}
        toggleMobileSidebar={() => setMobileSidebarOpen(true)}
      />
      {/* <SideNavbar
        toggleSidebar={() => setSidebarOpen(!isSidebarOpen)}
        isSidebarOpen={isSidebarOpen}
        isMobileSidebarOpen={isMobileSidebarOpen}
        onSidebarClose={() => setMobileSidebarOpen(false)}
      /> */}
      <ContentWrapper>
        <Container
          maxWidth={false}
          sx={{
            paddingTop: "20px",
            // paddingLeft: isSidebarOpen && lgUp ? "280px!important" : "",
          }}
        >
          <Box
          // sx={{ minHeight: "calc(100vh - 170px)" }}
          >
            {children}
          </Box>
        </Container>
        {!showDrawer ? (
          <Image
            onClick={() => setShowDrawer(!showDrawer)}
            src={ChatLogo}
            style={{
              height: "130px",
              width: "130px",
              position: "fixed",
              right: "-20px",
              bottom: "-40px",
              zIndex: 999,
              cursor: "pointer",
            }}
          />
        ) : (
          <IconButton
            onClick={() => {
              setShowDrawer(!showDrawer);
              setToggleWidth(false);
            }}
            sx={{
              p: 1.5,
              fontWeight: 300,
              position: "fixed",
              right: { xs: "5px", sm: "10px", md: "20px" },
              bottom: "15px",
              backgroundColor: "#7473c0",
              "&:hover": {
                backgroundColor: "#7473c0",
              },
              color: "#fff",
              zIndex: 999,
            }}
          >
            {<FiX />}
          </IconButton>
        )}

        <Box
          sx={{
            display: showDrawer ? "block" : "none",
            position: "fixed",
            right: { xs: "5px", sm: "10px", md: "20px" },
            bottom: { xs: "100px", md: "60px" },
            maxHeight: !toggleWidth ? { xs: "430px", md: "548px" } : "580px",
            width: !toggleWidth ? { xs: "310px", md: "365px" } : "706px",
            zIndex: 999,
          }}
        >
          <Box
            sx={{
              borderRadius: "none",
              background: "none",
            }}
          >
            <Box
              sx={{
                width: "100%",
                height: "51px",
                background: "#7473c0",
                borderRadius: "22px 22px 0px 0px",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                px: 2,
              }}
            >
              <Box display="flex" alignItems={"center"}>
                <Image src={ChatLogoWhite} />
                <Box display="flex" flexDirection={"column"} pl={1}>
                  <Typography variant="h6" color="#fff" fontWeight={600}>
                    {"Digital Assistant"}
                  </Typography>
                  <Typography variant="caption" sx={{ color: "#fff" }}>
                    {"Powered by SIRC Digital Labs"}
                  </Typography>
                </Box>
              </Box>

              <Box display="flex">
                {!toggleWidth ? (
                  <IconButton
                    size="small"
                    sx={{ color: "#fff", display: { xs: "none", sm: "flex" } }}
                    onClick={() => setToggleWidth(!toggleWidth)}
                  >
                    <IoIosResize />
                  </IconButton>
                ) : (
                  <IconButton
                    size="small"
                    sx={{ color: "#fff" }}
                    onClick={() => setToggleWidth(!toggleWidth)}
                  >
                    <AiOutlineFullscreenExit />
                  </IconButton>
                )}
                <IconButton size="small" sx={{ color: "#fff" }}>
                  <FiSettings />
                </IconButton>
              </Box>
            </Box>
            <Box
              display="flex"
              flexDirection={"column"}
              sx={{ height: { xs: "300px", md: "381px" }, background: "#fff" }}
            >
              <Box
                display="flex"
                alignItems={"center"}
                sx={{ px: 2, py: 1, width: "100%" }}
              >
                <Image src={ChatLogo1} alt="conv-logo" />
                <Box
                  display={"flex"}
                  flexDirection={"column"}
                  sx={{ px: 2, maxWidth: "75%" }}
                >
                  <Typography variant="caption" color="grey" fontSize={"10px"}>
                    10/22/2023 11:09:06 AM
                  </Typography>
                  <Box
                    display={"flex"}
                    alignItems={"center"}
                    sx={{
                      minHeight: "32px",
                      background: "#f2f1f9",
                      border: "1px solid #6e6da8",
                      borderRadius: "18px 18px 18px 0px",
                    }}
                  >
                    <Typography variant="h6" sx={{ color: "#666666", p: 1 }}>
                      Lorem Ipsum is simply dummy text.
                    </Typography>
                  </Box>
                </Box>
              </Box>
              <Box
                display="flex"
                alignItems={"center"}
                flexDirection={"row-reverse"}
                sx={{ px: 2, py: 1, width: "100%" }}
              >
                <Box
                  display={"flex"}
                  flexDirection={"column"}
                  sx={{ px: 2, maxWidth: "75%" }}
                >
                  <Typography variant="caption" color="grey" fontSize={"10px"}>
                    10/22/2023 11:09:06 AM
                  </Typography>
                  <Box
                    display={"flex"}
                    alignItems={"center"}
                    sx={{
                      minHeight: "32px",
                      background: "#e6f7f3",
                      border: "1px solid #00A886",
                      borderRadius: "18px 18px 0px 18px",
                    }}
                  >
                    <Typography variant="h6" sx={{ color: "#666666", p: 1 }}>
                      Hii There
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </Box>
            <div className="group">
              <Box
                py={3}
                px={2}
                display={"flex"}
                alignItems={"center"}
                justifyContent={"space-between"}
              >
                <input
                  placeholder="Start a new chat..."
                  style={{
                    height: "32px",
                    borderRadius: "18px",
                    border: "none",
                    boxShadow: "none",
                    outline: "none",
                    paddingLeft: "20px",
                    width: "100%",
                    "&:focus": {
                      border: "none",
                      boxShadow: "none",
                      outline: "none",
                    },
                  }}
                />
                <IconButton
                  sx={{
                    background: "#fff",
                    color: "#7473C0",
                    "&:hover": {
                      background: "#fff",
                    },
                    height: "34px",
                    width: "34px",
                    ml: 1,
                  }}
                >
                  <IoPaperPlaneOutline />
                </IconButton>
              </Box>
            </div>
          </Box>
        </Box>
      </ContentWrapper>
    </MainWrapper>
  );
}

export default DashboardLayout;
