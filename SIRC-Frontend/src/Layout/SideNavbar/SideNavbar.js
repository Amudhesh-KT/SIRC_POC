import NextLink from "next/link";
import {
  Box,
  Drawer,
  useMediaQuery,
  List,
  Typography,
  ListItem,
  Collapse,
  ListItemIcon,
  ListItemText,
  IconButton,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import SimpleBar from "simplebar-react";
import { useRouter } from "next/router";
import React from "react";
import { MdOutlineSpaceDashboard } from "react-icons/md";
import { RiMenu2Fill } from "react-icons/ri";
import { useState } from "react";
import { useEffect } from "react";
import Logo from "../../../assets/Logo.png";
import Image from "next/image";
import { FiCheckCircle, FiInbox, FiXCircle } from "react-icons/fi";
function SideNavbar(
  { isMobileSidebarOpen, onSidebarClose, isSidebarOpen, toggleSidebar },
  props
) {
  const [open, setOpen] = React.useState(true);
  const router = useRouter();
  const pathDirect = router.pathname;
  const location = router.pathname;
  const pathWithoutLastPart = router.pathname.slice(
    0,
    router.pathname.lastIndexOf("/")
  );
  const lgUp = useMediaQuery((theme) => theme.breakpoints.up("lg"));
  const handleClick = (index) => {
    if (open === index) {
      setOpen((prevopen) => !prevopen);
    } else {
      setOpen(index);
    }
  };
  const [oldFinalmenuList, setoldFinalmenuList] = useState([
    {
      title: "Dashboard",
      icon: <MdOutlineSpaceDashboard />,
      href: "/dashboard",
    },
    {
      title: "Inbox",
      icon: <FiInbox />,
      href: "/inbox",
    },
    {
      title: "Approved",
      icon: <FiCheckCircle />,
      href: "/approved",
    },
    {
      title: "Rejected",
      icon: <FiXCircle />,
      href: "/rejected",
    },
  ]);
  const [FinalMenuList, setFinalMenuList] = useState([
    {
      title: "Dashboard",
      icon: <MdOutlineSpaceDashboard />,
      href: "/dashboard",
    },
    {
      title: "Inbox",
      icon: <FiInbox />,
      href: "/inbox",
    },
    {
      title: "Approved",
      icon: <FiCheckCircle />,
      href: "/approved",
    },
    {
      title: "Rejected",
      icon: <FiXCircle />,
      href: "/rejected",
    },
  ]);
  const [search, setsearch] = useState("");
  useEffect(() => {
    let temp = oldFinalmenuList.filter((e) => {
      if (search === "") return true;
      else {
        if (e.navlabel) return false;
        else {
          return e.title.toLowerCase().includes(search.toLowerCase());
        }
      }
    });
    console.log(temp);
    setFinalMenuList([...temp]);
  }, [search]);

  const SidebarContent = (
    <Box maxHeight="100%" overflow={"hidden"}>
      <Box
        px={2}
        pt={2}
        pb={0}
        display="flex"
        alignItems="center"
        justifyContent={"space-between"}
      >
        <Image src={Logo} alt="" />
        <IconButton
          edge="start"
          onClick={toggleSidebar}
          aria-label="menu"
          size="large"
          sx={{
            color: "#fff",
            p: 0,
            m: 0,
          }}
        >
          <RiMenu2Fill />
        </IconButton>
      </Box>
      <SimpleBar style={{ height: "85%" }}>
        <Box p={2} pt={0}>
          <Box mt={2} height="85%" overflow={"hidden"}>
            {FinalMenuList && (
              <List>
                {FinalMenuList.map((item, index) => {
                  //  {/********SubHeader**********/}
                  if (item.subheader) {
                    return (
                      <li key={item.subheader + index}>
                        <Typography
                          variant="subtitle2"
                          fontWeight="500"
                          sx={{ my: 2, mt: index == 0 ? 0 : 4, opacity: "0.4" }}
                        >
                          {item.subheader}
                        </Typography>
                      </li>
                    );
                    // {/********If Sub Menu**********/}
                    // {/* eslint no-else-return: "off" */}
                  } else if (item.children) {
                    return (
                      <React.Fragment key={item.title}>
                        <ListItem
                          button
                          component="li"
                          onClick={() => handleClick(index)}
                          selected={pathWithoutLastPart === item.href}
                          sx={{
                            mb: 1,
                            ...(pathWithoutLastPart === item.href && {
                              color: "white",
                              backgroundColor: (theme) =>
                                `${theme.palette.primary.main}!important`,
                            }),
                          }}
                        >
                          <ListItemIcon
                            sx={{
                              ...(pathWithoutLastPart === item.href && {
                                color: "white",
                                fontSize: "16px",
                              }),
                            }}
                          >
                            {item.icon}
                          </ListItemIcon>
                          <ListItemText> {item.title}</ListItemText>
                          {index === open ||
                          pathWithoutLastPart === item.href ? (
                            <ExpandMoreIcon fontSize="16px" />
                          ) : (
                            <ChevronRightIcon fontSize="16px" />
                          )}
                        </ListItem>
                        <Collapse
                          in={
                            index === open || pathWithoutLastPart === item.href
                          }
                          timeout="auto"
                          unmountOnExit
                        >
                          <List component="li" disablePadding>
                            {item.children.map((child) => {
                              return (
                                <NextLink
                                  key={child.title}
                                  href={child.href}
                                  onClick={onSidebarClose}
                                >
                                  <ListItem
                                    button
                                    selected={pathDirect === child.href}
                                    sx={{
                                      mb: 1,
                                      ...(pathDirect === child.href && {
                                        color: "primary.main",
                                        backgroundColor:
                                          "transparent!important",
                                      }),
                                    }}
                                  >
                                    <ListItemIcon
                                      sx={{
                                        ...(pathDirect === child.href && {
                                          color: "primary.main",
                                          fontSize: "16px",
                                        }),
                                      }}
                                    >
                                      {child.icon}
                                    </ListItemIcon>
                                    <ListItemText>{child.title}</ListItemText>
                                  </ListItem>
                                </NextLink>
                              );
                            })}
                          </List>
                        </Collapse>
                      </React.Fragment>
                    );
                    //  {/********If Sub No Menu**********/}
                  } else {
                    return (
                      <List
                        component="li"
                        disablePadding
                        key={item.title + index}
                      >
                        <NextLink href={item.href}>
                          <ListItem
                            onClick={() => handleClick(index)}
                            button
                            selected={pathDirect === item.href}
                            sx={{
                              mb: 1,
                              ...(pathDirect === item.href && {
                                color: "#fff",
                                backgroundColor:
                                  "rgba(255,255,255,0.1) !important",
                                fontWeight: "600",
                              }),
                              color: "#fff",
                            }}
                          >
                            <ListItemIcon
                              sx={{
                                ...(pathDirect === item.href && {
                                  color: "white",
                                }),
                                color: "#fff",
                                fontSize: "16px",
                              }}
                            >
                              {item.icon}
                            </ListItemIcon>
                            <ListItemText onClick={onSidebarClose}>
                              {item.title}
                            </ListItemText>
                          </ListItem>
                        </NextLink>
                      </List>
                    );
                  }
                })}
              </List>
            )}
          </Box>
        </Box>
      </SimpleBar>
    </Box>
  );
  if (lgUp) {
    return (
      <Drawer
        anchor="left"
        open={isSidebarOpen}
        variant="persistent"
        PaperProps={{
          sx: {
            width: "265px",
            border: "0 !important",
            boxShadow: "0px 7px 30px 0px rgb(113 122 131 / 11%)",
            background: "#00A887",
          },
        }}
      >
        {SidebarContent}
      </Drawer>
    );
  }
  return (
    <Drawer
      anchor="left"
      open={isMobileSidebarOpen}
      onClose={onSidebarClose}
      PaperProps={{
        sx: {
          width: "265px",
          border: "0 !important",
          background: "#00A887",
        },
      }}
      variant="temporary"
    >
      {SidebarContent}
    </Drawer>
  );
}

export default SideNavbar;
