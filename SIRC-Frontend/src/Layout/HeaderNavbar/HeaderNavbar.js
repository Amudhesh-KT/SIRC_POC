import {
  AppBar,
  Box,
  IconButton,
  Toolbar,
  Button,
  Typography,
  useMediaQuery,
  Menu,
  MenuItem,
  Divider,
} from "@mui/material";
import Image from "next/image";
import { MdOutlineMenu } from "react-icons/md";
import React, { useState } from "react";
import User from "../../../assets/Users.png";
import { BsChevronDown } from "react-icons/bs";
import { FiBell, FiLogOut, FiMenu, FiSettings } from "react-icons/fi";
import Logo from "../../../assets/Logo.png";
import { useRouter } from "next/navigation";
const HeaderNavbar = ({
  sx,
  customClass,
  toggleSidebar,
  toggleMobileSidebar,
  position,
}) => {
  const router = useRouter();
  const lgUp = useMediaQuery((theme) => theme.breakpoints.up("md"));
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <AppBar
      sx={sx}
      position={position}
      elevation={0}
      className={customClass}
      // style={{ background: "#F6F8F9" }}
    >
      <Toolbar>
        {/* <IconButton
          size="large"
          color="inherit"
          aria-label="menu"
          onClick={toggleMobileSidebar}
          sx={{
            display: {
              lg: "none",
              xs: "flex",
            },
          }}
        >
          <MdOutlineMenu />
        </IconButton> */}
        <Box display="flex" alignItems={"center"}>
          <Image src={Logo} alt="" />
          <Box
            sx={{
              width: "1px",
              backgroundColor: "#fff",
              height: "45px",
              mx: 2,
              display: { xs: "none", sm: "flex" },
            }}
          />
          <Box
            display="flex"
            flexDirection={"column"}
            sx={{ display: { xs: "none", sm: "flex" } }}
          >
            <Typography variant="h5" color="#fff" fontWeight={600}>
              {"My Workspace"}
            </Typography>
            <Typography variant="caption" sx={{ color: "#fff" }}>
              {"Powered by SIRC Digital Labs"}
            </Typography>
          </Box>
        </Box>
        <Box flexGrow={1} />

        {lgUp ? (
          <Box display="flex" alignItems="center">
            <IconButton size="medium" sx={{ p: 0, mx: 1.5, color: "#fff" }}>
              <FiBell />
            </IconButton>
            <Typography variant="h5" color="#fff">
              {"Ahmed"}
            </Typography>
            <Image
              src={User}
              alt="user-image"
              className="roundedCircle"
              width={40}
              height={40}
              style={{
                borderRadius: "50px",
                marginRight: "10px",
                marginLeft: "10px",
              }}
              onClick={() => {
                router.push("/login");
                localStorage.clear();
              }}
            />
            <IconButton size="small" sx={{ p: 0, m: 0, color: "#fff" }}>
              <BsChevronDown />
            </IconButton>
            <IconButton size="medium" sx={{ p: 0, mx: 1.5, color: "#fff" }}>
              <FiSettings />
            </IconButton>
          </Box>
        ) : (
          <>
            <IconButton onClick={handleClick}>
              <Image
                src={User}
                alt="user-image"
                className="roundedCircle"
                width={40}
                height={40}
                style={{
                  borderRadius: "50px",
                }}
              />
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              id="account-menu"
              open={open}
              onClose={handleClose}
              onClick={handleClose}
              PaperProps={{
                elevation: 0,
                sx: {
                  width: "250px",
                  overflow: "visible",
                  filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                  mt: 1.5,
                  "& .MuiAvatar-root": {
                    width: 32,
                    height: 32,
                    ml: -0.5,
                    mr: 1,
                  },
                  "&:before": {
                    content: '""',
                    display: "block",
                    position: "absolute",
                    top: 0,
                    right: 22,
                    width: 10,
                    height: 10,
                    bgcolor: "background.paper",
                    transform: "translateY(-50%) rotate(45deg)",
                    zIndex: 0,
                  },
                },
              }}
              transformOrigin={{ horizontal: "right", vertical: "top" }}
              anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
            >
              <MenuItem onClick={handleClose}>
                <IconButton size="small" sx={{ mx: 2 }}>
                  <FiBell />
                </IconButton>
                Notification
              </MenuItem>
              <MenuItem onClick={handleClose}>
                <IconButton size="small" sx={{ mx: 2 }}>
                  <FiSettings />
                </IconButton>
                Settings
              </MenuItem>
              <MenuItem
                onClick={() => {
                  router.push("/login");
                  localStorage.clear();
                }}
              >
                <IconButton size="small" sx={{ mx: 2 }}>
                  <FiLogOut />
                </IconButton>
                Logout
              </MenuItem>
            </Menu>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default HeaderNavbar;
