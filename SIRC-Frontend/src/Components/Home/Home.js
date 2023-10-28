import {
  Card,
  Typography,
  Box,
  Divider,
  IconButton,
  Button,
  Grid,
  Chip,
  Popper,
  Fade,
  DialogContent,
  TextareaAutosize,
  ButtonBase,
  Menu,
  Checkbox,
  FormControlLabel,
  styled,
} from "@mui/material";
import React, { useState } from "react";
import { useMediaQuery } from "@mui/material";
import { Drawer } from "@mui/material";
import {
  FiCheck,
  FiCheckCircle,
  FiDownload,
  FiFile,
  FiFileText,
  FiFilter,
  FiInfo,
  FiSearch,
  FiX,
  FiXCircle,
} from "react-icons/fi";
import SimpleBar from "simplebar-react";
import { GoDotFill } from "react-icons/go";
import { IoIosArrowDropleft } from "react-icons/io";

import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import { RxEnterFullScreen } from "react-icons/rx";
import { MdFlightTakeoff, MdFullscreenExit } from "react-icons/md";
import CustomText from "../../ReusableComponets/CustomText";
import CustomTable from "../../ReusableComponets/CustomTable";
import { BsCalendarX, BsClipboard } from "react-icons/bs";

const Home = ({
  state,
  currentItem,
  setCurrentItem,
  setSearch,
  selectedCheckboxes,
  handleCheckboxChange,
  handleCancelChip,
  selectedPriority,
  handlePriorityChange,
  handleRequest,
  list,
}) => {
  const [mobileSideOpen, SetMobileSideOpen] = useState(true);
  const lgUp = useMediaQuery((theme) => theme.breakpoints.up("md"));

  // Popover
  const [open, setOpen] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    setOpen((previousOpen) => !previousOpen);
  };

  const canBeOpen = open && Boolean(anchorEl);
  const id = canBeOpen ? "transition-popper" : undefined;

  const [openDialog, setOpenDialog] = React.useState(false);
  const [fullscreen, setFullScreen] = React.useState(false);

  const [alertDialog, setAlertDialog] = React.useState({
    open: false,
    type: "",
  });

  const [customDialog, setCustomDialog] = useState({ open: false, type: "" });

  const [anchorEl3, setAnchorEl3] = useState(null);
  const handleClick3 = (event) => {
    setAnchorEl3(event.currentTarget);
  };
  const handleClose3 = () => {
    setAnchorEl3(null);
  };

  function toPascalCase(str) {
    return str
      ?.replaceAll("_", " ")
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  }

  function formatDate(inputDateStr) {
    const dateParts = inputDateStr.split(".");
    const day = dateParts[0];
    const month = dateParts[1];
    const year = dateParts[2];

    const monthNames = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    const date = new Date(`${month}/${day}/${year}`);
    const monthName = monthNames[date.getMonth()];
    const formattedDate = `${monthName} ${day}, ${year}`;

    return formattedDate;
  }

  const groupedCards = {};
  [...state].forEach((e, i) => {
    const createdOnDate = e.Created_on;
    if (!groupedCards[createdOnDate]) {
      groupedCards[createdOnDate] = [];
    }

    groupedCards[createdOnDate].push(e);
  });

  const keysArray = Object.keys(groupedCards);

  keysArray.sort(function (a, b) {
    let [dayA, monthA, yearA] = a.split(".").map(Number);
    let [dayB, monthB, yearB] = b.split(".").map(Number);

    if (yearA !== yearB) {
      return yearB - yearA;
    } else if (monthA !== monthB) {
      return monthB - monthA;
    } else {
      return dayB - dayA;
    }
  });

  const sortedGroupedCards = {};
  keysArray.forEach((key) => {
    sortedGroupedCards[key] = groupedCards[key];
  });

  const [commentVal, setCommentVal] = useState("");

  const StyledGridOverlay = styled("div")(({ theme }) => ({
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
    "& .ant-empty-img-1": {
      fill: theme.palette.mode === "light" ? "#aeb8c2" : "#262626",
    },
    "& .ant-empty-img-2": {
      fill: theme.palette.mode === "light" ? "#f5f5f7" : "#595959",
    },
    "& .ant-empty-img-3": {
      fill: theme.palette.mode === "light" ? "#dce0e6" : "#434343",
    },
    "& .ant-empty-img-4": {
      fill: theme.palette.mode === "light" ? "#fff" : "#1c1c1c",
    },
    "& .ant-empty-img-5": {
      fillOpacity: theme.palette.mode === "light" ? "0.8" : "0.08",
      fill: theme.palette.mode === "light" ? "#f5f5f5" : "#fff",
    },
  }));

  return (
    <>
      <div>
        <Box display="flex">
          {lgUp ? (
            <Box
              display={"flex"}
              flexDirection={"column"}
              sx={{
                width: { md: "40%", lg: "27%" },
                height: "calc(100vh - 100px)",
              }}
            >
              <Box
                display={"flex"}
                alignItems={"center"}
                sx={{ margin: "10px 0px", position: "relative" }}
              >
                <Box
                  display={"flex"}
                  alignItems={"center"}
                  sx={{ position: "absolute", mx: 1 }}
                >
                  <FiSearch size={20} style={{ color: "#00A885" }} />
                </Box>
                <input
                  placeholder="Search here"
                  style={{
                    borderRadius: "12px 0px 0px 12px",
                    outline: "none",
                    boxShadow: "none",
                    border: "1px solid #00A885",
                    height: "42px",
                    fontSize: "16px",
                    paddingLeft: "30px",
                    width: "100%",
                  }}
                  onChange={(e) => setSearch(e.target.value)}
                />
                <ButtonBase sx={{ p: 0, m: 0 }}>
                  <Box
                    sx={{
                      height: "42px",
                      width: "48px",
                      background: "#00A885",
                      color: "#fff",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      cursor: "pointer",
                      borderRadius: "0px 12px 12px 0px",
                    }}
                    onClick={handleClick3}
                  >
                    <FiFilter size={20} />
                  </Box>
                </ButtonBase>

                <Menu
                  id="msgs-menu"
                  anchorEl={anchorEl3}
                  keepMounted
                  open={Boolean(anchorEl3)}
                  onClose={handleClose3}
                  anchorOrigin={{ horizontal: "left", vertical: "bottom" }}
                  transformOrigin={{ horizontal: "left", vertical: "top" }}
                  sx={{
                    "& .MuiMenu-paper": {
                      width: "270px",
                      right: 0,
                      top: "70px ",
                      borderRadius: "12px",
                      boxShadow:
                        "0px 12px 42px -4px rgba(24, 39, 75, 0.12), 0px 8px 18px -6px rgba(24, 39, 75, 0.12)",
                    },
                    "& .MuiList-padding": {
                      p: "15px",
                    },
                  }}
                >
                  <Typography
                    variant="subtitle2"
                    fontWeight={300}
                    color={"#5c6980"}
                  >
                    Type
                  </Typography>
                  <Box display="flex" flexDirection={"column"}>
                    <FormControlLabel
                      value="PO"
                      control={<Checkbox />}
                      label={
                        <Typography>
                          Purchase Order
                          <span
                            style={{
                              color: "#f59616",
                              padding: "0px 7px",
                              fontSize: "14px",
                            }}
                          >
                            ( {list.filter((e) => e.id.includes("PO")).length} )
                          </span>
                        </Typography>
                      }
                      checked={selectedCheckboxes.includes("PO")}
                      onChange={handleCheckboxChange}
                    />
                    <FormControlLabel
                      value="PR"
                      control={<Checkbox />}
                      label={
                        <Typography>
                          Purchase Request
                          <span
                            style={{
                              color: "#f59616",
                              padding: "0px 7px",
                              fontSize: "14px",
                            }}
                          >
                            ( {list.filter((e) => e.id.includes("PR")).length} )
                          </span>
                        </Typography>
                      }
                      checked={selectedCheckboxes.includes("PR")}
                      onChange={handleCheckboxChange}
                    />
                    <FormControlLabel
                      value="PL"
                      control={<Checkbox />}
                      label={
                        <Typography>
                          Leave Request
                          <span
                            style={{
                              color: "#f59616",
                              padding: "0px 7px",
                              fontSize: "14px",
                            }}
                          >
                            ( {list.filter((e) => e.id.includes("PL")).length} )
                          </span>
                        </Typography>
                      }
                      checked={selectedCheckboxes.includes("PL")}
                      onChange={handleCheckboxChange}
                    />
                    <FormControlLabel
                      value="BT"
                      control={<Checkbox />}
                      label={
                        <Typography>
                          Business Trip
                          <span
                            style={{
                              color: "#f59616",
                              padding: "0px 7px",
                              fontSize: "14px",
                            }}
                          >
                            ( {list.filter((e) => e.id.includes("BT")).length} )
                          </span>
                        </Typography>
                      }
                      checked={selectedCheckboxes.includes("BT")}
                      onChange={handleCheckboxChange}
                    />
                  </Box>
                  <Typography
                    variant="subtitle2"
                    fontWeight={300}
                    color={"#5c6980"}
                  >
                    Priority
                  </Typography>

                  <Box display="flex" flexDirection={"column"}>
                    <FormControlLabel
                      value="Critical"
                      control={<Checkbox />}
                      label={"Critical"}
                      checked={selectedPriority.includes("Critical")}
                      onChange={handlePriorityChange}
                    />
                    <FormControlLabel
                      value="High"
                      control={<Checkbox />}
                      label={"High"}
                      checked={selectedPriority.includes("High")}
                      onChange={handlePriorityChange}
                    />
                    <FormControlLabel
                      value="Low"
                      control={<Checkbox />}
                      label={"Low"}
                      checked={selectedPriority.includes("Low")}
                      onChange={handlePriorityChange}
                    />
                  </Box>
                </Menu>
              </Box>

              <Card
                sx={{
                  border: "1px solid #00A885",
                  borderRadius: "12px",
                }}
              >
                <Drawer
                  sx={{
                    width: "100%",
                    flexShrink: 0,
                    [`& .MuiDrawer-paper`]: {
                      position: "relative",
                      borderRight: "none",
                    },
                  }}
                  variant="permanent"
                >
                  <SimpleBar style={{ height: "calc(100vh - 150px)" }}>
                    <Box p={1}>
                      {Object.entries(sortedGroupedCards).map(
                        ([date, cards]) => (
                          <>
                            <Typography
                              color="#5c6980"
                              variant="caption"
                              fontWeight={400}
                            >
                              {formatDate(date)}
                            </Typography>
                            {sortedGroupedCards[date].map((e, i) => {
                              return (
                                <>
                                  <Box
                                    display={"flex"}
                                    alignItems={"center"}
                                    sx={{
                                      px: 1,
                                      py: 2,
                                      cursor: "pointer",
                                      background:
                                        currentItem?.id === e.id
                                          ? "#00A885"
                                          : "",
                                      "&:hover": {
                                        background:
                                          currentItem?.id === e.id
                                            ? ""
                                            : "#f7f7f7",
                                      },
                                      borderRadius: "8px",
                                    }}
                                    onClick={() => setCurrentItem(e)}
                                  >
                                    <Box
                                      display="flex"
                                      alignItems={"center"}
                                      justifyContent={"space-between"}
                                      flexDirection={"column"}
                                    >
                                      <GoDotFill
                                        style={{
                                          color: "#f59616",
                                          margin: "0px 0px 0px 5px",
                                        }}
                                      />
                                      <IconButton
                                        size="small"
                                        sx={{
                                          height: "45px",
                                          width: "45px",
                                          p: 1.3,
                                          background:
                                            currentItem?.id === e.id
                                              ? "#fff"
                                              : "#00A885",
                                          color:
                                            currentItem?.id === e.id
                                              ? "#00A885"
                                              : "#fff",
                                          "&:hover": {
                                            background:
                                              currentItem?.id === e.id
                                                ? "#fff"
                                                : "#00A885",
                                            color:
                                              currentItem?.id === e.id
                                                ? "#00A885"
                                                : "#fff",
                                          },
                                        }}
                                      >
                                        {e.id.startsWith("PO") ? (
                                          <FiFileText size={30} />
                                        ) : e.id.startsWith("PR") ? (
                                          <BsClipboard size={30} />
                                        ) : e.id.startsWith("PL") ? (
                                          <BsCalendarX size={30} />
                                        ) : e.id.startsWith("BT") ? (
                                          <MdFlightTakeoff size={30} />
                                        ) : (
                                          ""
                                        )}
                                      </IconButton>
                                    </Box>

                                    <Box
                                      display="flex"
                                      flexDirection={"column"}
                                      sx={{ px: 2, width: "100%" }}
                                    >
                                      <Box
                                        display="flex"
                                        alignItems={"center"}
                                        justifyContent={"space-between"}
                                      >
                                        <Typography
                                          variant="subtitle2"
                                          fontWeight={300}
                                          color={
                                            currentItem?.id === e.id
                                              ? "#fff"
                                              : "#5c6980"
                                          }
                                        >
                                          {e.id}
                                        </Typography>
                                        <Box
                                          display="flex"
                                          alignItems={"center"}
                                        >
                                          <Typography
                                            variant="caption"
                                            fontWeight={400}
                                            color={
                                              currentItem?.id === e.id
                                                ? "#fff"
                                                : "#5c6980"
                                            }
                                          >
                                            {e.priority}
                                          </Typography>
                                          <GoDotFill
                                            style={{
                                              color:
                                                e.priority === "High"
                                                  ? "red"
                                                  : e.priority === "Low"
                                                  ? "#FFB800"
                                                  : "#7000FF",
                                              margin: "0px 0px 0px 5px",
                                            }}
                                          />
                                        </Box>
                                      </Box>
                                      <Typography
                                        variant="h6"
                                        fontWeight={400}
                                        color={
                                          currentItem?.id === e.id
                                            ? "#fff"
                                            : "#5c6980"
                                        }
                                      >
                                        {e.name}
                                      </Typography>
                                      <Box
                                        display={"flex"}
                                        alignItems={"center"}
                                        justifyContent={"space-between"}
                                      >
                                        <Typography
                                          variant="h6"
                                          sx={{ width: "60%" }}
                                          fontWeight={500}
                                          color={
                                            currentItem?.id === e.id
                                              ? "#fff"
                                              : "#5c6980"
                                          }
                                        >
                                          {e.shortText}
                                        </Typography>
                                        <Typography
                                          variant="caption"
                                          fontWeight={400}
                                          color={
                                            currentItem?.id === e.id
                                              ? "#fff"
                                              : "#5c6980"
                                          }
                                        >
                                          {formatDate(e.Created_on)}
                                        </Typography>
                                      </Box>
                                    </Box>
                                  </Box>
                                  <Divider sx={{ my: 1 }} />
                                </>
                              );
                            })}
                          </>
                        )
                      )}
                    </Box>
                  </SimpleBar>
                </Drawer>
              </Card>
            </Box>
          ) : (
            <Drawer
              open={mobileSideOpen}
              onClose={() => SetMobileSideOpen(false)}
              variant="temporary"
              sx={{
                zIndex: 1,
                [`& .MuiDrawer-paper`]: {
                  paddingTop: "70px",
                  width: { xs: "310px", sm: "385px" },
                },
              }}
            >
              <SimpleBar style={{ height: "100%" }}>
                <Box
                  display="flex"
                  sx={{ px: 1.5, py: 1 }}
                  alignItems={"center"}
                  justifyContent={"space-between"}
                >
                  <Typography variant="h6" fontWeight={500} color="#5c6980">
                    My Workspace
                  </Typography>

                  <Button
                    size="small"
                    variant="outlined"
                    color="primary"
                    onClick={() => SetMobileSideOpen(false)}
                  >
                    Close
                  </Button>
                </Box>
                <Box p={1}>
                  {Object.entries(sortedGroupedCards).map(([date, cards]) => (
                    <>
                      <Typography
                        color="#5c6980"
                        variant="caption"
                        fontWeight={400}
                      >
                        {formatDate(date)}
                      </Typography>
                      {sortedGroupedCards[date].map((e, i) => {
                        return (
                          <>
                            <Box
                              display={"flex"}
                              alignItems={"center"}
                              sx={{
                                px: 1,
                                py: 2,
                                cursor: "pointer",
                                background:
                                  currentItem?.id === e.id ? "#00A885" : "",
                                "&:hover": {
                                  background:
                                    currentItem?.id === e.id ? "" : "#f7f7f7",
                                },
                                borderRadius: "8px",
                              }}
                              onClick={() => setCurrentItem(e)}
                            >
                              <Box
                                display="flex"
                                alignItems={"center"}
                                justifyContent={"space-between"}
                                flexDirection={"column"}
                              >
                                <GoDotFill
                                  style={{
                                    color: "#f59616",
                                    margin: "0px 0px 0px 5px",
                                  }}
                                />
                                <IconButton
                                  size="small"
                                  sx={{
                                    height: "45px",
                                    width: "45px",
                                    p: 1.3,
                                    background:
                                      currentItem?.id === e.id
                                        ? "#fff"
                                        : "#00A885",
                                    color:
                                      currentItem?.id === e.id
                                        ? "#00A885"
                                        : "#fff",
                                    "&:hover": {
                                      background:
                                        currentItem?.id === e.id
                                          ? "#fff"
                                          : "#00A885",
                                      color:
                                        currentItem?.id === e.id
                                          ? "#00A885"
                                          : "#fff",
                                    },
                                  }}
                                >
                                  {e.id.startsWith("PO") ? (
                                    <FiFileText size={30} />
                                  ) : e.id.startsWith("PR") ? (
                                    <BsClipboard size={30} />
                                  ) : e.id.startsWith("PL") ? (
                                    <BsCalendarX size={30} />
                                  ) : e.id.startsWith("BT") ? (
                                    <MdFlightTakeoff size={30} />
                                  ) : (
                                    ""
                                  )}
                                </IconButton>
                              </Box>

                              <Box
                                display="flex"
                                flexDirection={"column"}
                                sx={{ px: 2, width: "100%" }}
                              >
                                <Box
                                  display="flex"
                                  alignItems={"center"}
                                  justifyContent={"space-between"}
                                >
                                  <Typography
                                    variant="subtitle2"
                                    fontWeight={300}
                                    color={
                                      currentItem?.id === e.id
                                        ? "#fff"
                                        : "#5c6980"
                                    }
                                  >
                                    {e.id}
                                  </Typography>
                                  <Box display="flex" alignItems={"center"}>
                                    <Typography
                                      variant="caption"
                                      fontWeight={400}
                                      color={
                                        currentItem?.id === e.id
                                          ? "#fff"
                                          : "#5c6980"
                                      }
                                    >
                                      {e.priority}
                                    </Typography>
                                    <GoDotFill
                                      style={{
                                        color:
                                          e.priority === "High"
                                            ? "red"
                                            : e.priority === "Low"
                                            ? "#FFB800"
                                            : "#7000FF",
                                        margin: "0px 0px 0px 5px",
                                      }}
                                    />
                                  </Box>
                                </Box>
                                <Typography
                                  variant="h6"
                                  fontWeight={400}
                                  color={
                                    currentItem?.id === e.id
                                      ? "#fff"
                                      : "#5c6980"
                                  }
                                >
                                  {e.name}
                                </Typography>
                                <Box
                                  display={"flex"}
                                  alignItems={"center"}
                                  justifyContent={"space-between"}
                                >
                                  <Typography
                                    variant="h6"
                                    sx={{ width: "60%" }}
                                    fontWeight={500}
                                    color={
                                      currentItem?.id === e.id
                                        ? "#fff"
                                        : "#5c6980"
                                    }
                                  >
                                    {e.shortText}
                                  </Typography>
                                  <Typography
                                    variant="caption"
                                    fontWeight={400}
                                    color={
                                      currentItem?.id === e.id
                                        ? "#fff"
                                        : "#5c6980"
                                    }
                                  >
                                    {formatDate(e.Created_on)}
                                  </Typography>
                                </Box>
                              </Box>
                            </Box>
                            <Divider sx={{ my: 1 }} />
                          </>
                        );
                      })}
                    </>
                  ))}
                </Box>
              </SimpleBar>
            </Drawer>
          )}

          <Box
            sx={{
              mx: { xs: 0, sm: 2 },
              width: { xs: "100%", md: "60%", lg: "73%" },
              minHeight: {
                xs: "fit-content",
                md: "calc(100vh - 100px)",
              },
            }}
          >
            <Box
              display={"flex"}
              alignItems={"center"}
              sx={{
                m: "10px 0px",
                position: "relative",
                display: { xs: "none", md: "flex" },
              }}
              flexWrap={"wrap"}
            >
              {selectedCheckboxes.map((e) => {
                return (
                  <Box
                    variant="outlined"
                    display={"flex"}
                    alignItems={"center"}
                    justifyContent={"center"}
                    sx={{
                      height: "42px",
                      borderRadius: "12px",
                      color: "#44444f",
                      fontWeight: "300",
                      fontSize: "13px",
                      mx: 0.8,
                      px: 1,
                      border: "1px solid #00A885",
                      my: { md: 0.6, lg: 0 },
                      "&:first-child": {
                        marginLeft: 0, // Remove left margin for the first child
                      },
                      "&:last-child": {
                        marginRight: 0, // Remove right margin for the last child
                      },
                    }}
                  >
                    {e == "PO" ? (
                      <>
                        <Typography variant="caption1">
                          Purchase Order
                        </Typography>
                        {state.filter((e) => e.id.includes("PO")).length ===
                        0 ? (
                          <></>
                        ) : (
                          <span
                            style={{
                              color: "#f59616",
                              padding: "0px 4px",
                              fontSize: "14px",
                            }}
                          >
                            ( {state.filter((e) => e.id.includes("PO")).length}{" "}
                            )
                          </span>
                        )}
                      </>
                    ) : e == "PR" ? (
                      <>
                        <Typography variant="caption1">
                          Purchase Request
                        </Typography>
                        <span
                          style={{
                            color: "#f59616",
                            padding: "0px 4px",
                            fontSize: "14px",
                          }}
                        >
                          ( {state.filter((e) => e.id.includes("PR")).length} )
                        </span>
                      </>
                    ) : e == "PL" ? (
                      <>
                        <Typography variant="caption1">
                          Leave Request
                        </Typography>
                        <span
                          style={{
                            color: "#f59616",
                            padding: "0px 7px",
                            fontSize: "14px",
                          }}
                        >
                          ( {state.filter((e) => e.id.includes("PL")).length} )
                        </span>
                      </>
                    ) : (
                      <>
                        <Typography variant="caption1">
                          Business Trip
                        </Typography>
                        <span
                          style={{
                            color: "#f59616",
                            padding: "0px 7px",
                            fontSize: "14px",
                          }}
                        >
                          ( {state.filter((e) => e.id.includes("BT")).length} )
                        </span>
                      </>
                    )}
                    <IconButton
                      size="small"
                      sx={{
                        color: "#fff",
                        background: "#00A885",
                        "&:hover": {
                          color: "#fff",
                          background: "#00A885",
                        },
                        borderRadius: "50%",
                        p: 0.5,
                      }}
                      onClick={() => handleCancelChip(e)}
                    >
                      <FiX size={10} />
                    </IconButton>
                  </Box>
                );
              })}
            </Box>
            <Box>
              {currentItem && Object.keys(currentItem).length !== 0 ? (
                <Card
                  sx={{
                    border: "1px solid #00A885",
                    borderRadius: "12px",
                    overflow: "hidden",
                  }}
                >
                  <Box
                    sx={{
                      height: {
                        xs: "auto",
                        lg: "54px",
                      },
                      background: "#D4EDE8",
                      width: "100%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      flexWrap: "wrap",
                      borderBottom: "1px solid #00A885",
                      px: { xs: 2, lg: 0 },
                      position: "relative",
                    }}
                  >
                    <Box
                      display="flex"
                      sx={{
                        alignItems: { xs: "flex-start", md: "center" },
                        flexDirection: { xs: "column", md: "row" },
                      }}
                    >
                      <Button
                        size="small"
                        variant="outlined"
                        color="primary"
                        onClick={() => SetMobileSideOpen(true)}
                        startIcon={<IoIosArrowDropleft />}
                        sx={{
                          my: 1,
                          mr: 1,
                          display: { xs: "flex", md: "none" },
                        }}
                      >
                        My Workspace
                      </Button>
                      <Box
                        height={"54px"}
                        width={"219px"}
                        sx={{
                          background: "#009A74",
                          color: "#fff",
                          display: { xs: "none", lg: "flex" },
                          alignItems: "center",
                          justifyContent: "center",
                          fontWeight: 600,
                        }}
                      >
                        {currentItem?.id?.startsWith("PO")
                          ? "Purchase Order"
                          : currentItem?.id?.startsWith("PR")
                          ? "Purchase Request"
                          : currentItem?.id?.startsWith("PL")
                          ? "Leave Request"
                          : currentItem?.id?.startsWith("BT")
                          ? "Business Trip"
                          : ""}
                      </Box>
                      <Typography
                        variant="h5"
                        fontWeight={600}
                        color="#45546e"
                        sx={{ px: { lg: 1 } }}
                      >
                        {currentItem?.shortText} #{currentItem?.id}
                      </Typography>
                    </Box>
                    <Box
                      display="flex"
                      sx={{
                        flexDirection: { xs: "column", sm: "row" },
                        alignItems: { xs: "flex-start", sm: "center" },
                      }}
                    >
                      <Box display={"flex"} flexDirection={"column"}>
                        <Typography
                          variant="caption"
                          fontWeight={300}
                          color="#45546e"
                        >
                          Created On
                        </Typography>
                        <Typography
                          variant="caption"
                          fontWeight={500}
                          color="#45546e"
                        >
                          {currentItem?.Created_on}
                        </Typography>
                      </Box>
                      <Box
                        sx={{
                          width: "0.6px",
                          backgroundColor: "#000",
                          height: "25px",
                          mx: 1.5,
                          display: { xs: "none", sm: "flex" },
                        }}
                      />

                      <Box display={"flex"} flexDirection={"column"}>
                        <Typography
                          variant="caption"
                          fontWeight={300}
                          color="#45546e"
                        >
                          Status
                        </Typography>
                        <Typography
                          variant="caption"
                          fontWeight={500}
                          color="#45546e"
                        >
                          {currentItem?.overall_status}
                        </Typography>
                      </Box>
                      <Box
                        sx={{
                          width: "0.6px",
                          backgroundColor: "#000",
                          height: "25px",
                          mx: 1.5,
                          display: { xs: "none", sm: "flex" },
                        }}
                      />

                      <Box
                        display={"flex"}
                        alignItems={"center"}
                        sx={{ pr: 1 }}
                      >
                        <Typography
                          variant="caption"
                          fontWeight={500}
                          color="#45546e"
                        >
                          {currentItem?.priority}
                        </Typography>
                        <GoDotFill
                          style={{
                            color:
                              currentItem?.priority === "High"
                                ? "red"
                                : currentItem?.priority === "Low"
                                ? "#FFB800"
                                : "#7000FF",
                            margin: "0px 0px 0px 5px",
                          }}
                        />
                      </Box>
                    </Box>
                  </Box>
                  <Box px={2}>
                    <Grid
                      container
                      spacing={0}
                      sx={{
                        position: "sticky",
                        top: "54px",
                        py: 2,
                        borderBottom: "4px solid #00A885",
                      }}
                    >
                      {currentItem?.levels?.map((e, i) => {
                        return (
                          <Grid
                            item
                            xs={12}
                            sm={6}
                            md={6}
                            lg={3}
                            sx={{
                              borderRight:
                                currentItem?.levels.length - 1 === i &&
                                "1px solid #d4d6d8",
                            }}
                          >
                            <Typography
                              variant="caption"
                              fontWeight={300}
                              color="#5c6980"
                            >
                              {e.dept}
                            </Typography>
                            <Typography
                              variant="h6"
                              fontWeight={500}
                              color="#5c6980"
                            >
                              {e.name}
                            </Typography>
                            {e.status === "Approved" ? (
                              <Chip
                                size="small"
                                label="Approved"
                                sx={{
                                  height: "20px",
                                  fontSize: "10px",
                                  px: 1,
                                  background: "#17c964",
                                  color: "#fff",
                                }}
                              />
                            ) : e.status === "In Approval" ? (
                              <Chip
                                size="small"
                                label="In Approval"
                                sx={{
                                  height: "20px",
                                  fontSize: "10px",
                                  px: 1,
                                  background: "#ffb800",
                                  color: "#fff",
                                }}
                              />
                            ) : (
                              <>
                                <Chip
                                  size="small"
                                  label="Rejected"
                                  sx={{
                                    height: "20px",
                                    fontSize: "10px",
                                    px: 1,
                                    background: "#f90c0c",
                                    color: "#fff",
                                  }}
                                />
                                <IconButton
                                  size="small"
                                  sx={{ pl: 1, m: 0 }}
                                  onClick={handleClick}
                                >
                                  <FiFile />
                                </IconButton>

                                <Popper
                                  id={id}
                                  open={open}
                                  anchorEl={anchorEl}
                                  transition
                                >
                                  {({ TransitionProps }) => (
                                    <Fade {...TransitionProps} timeout={350}>
                                      <Box
                                        sx={{
                                          p: 1.5,
                                          bgcolor: "background.paper",
                                          boxShadow:
                                            "0px 7px 30px 0px rgba(90, 114, 123, 0.21)",

                                          borderRadius: "10px",
                                          width: "300px",
                                        }}
                                      >
                                        <Typography variant="caption">
                                          Lorem Ipsum is simply dummy text of
                                          the printing and typesetting industry.
                                          Lorem Ipsum has been the industry's
                                          standard dummy text ever since the
                                          1500s
                                        </Typography>
                                      </Box>
                                    </Fade>
                                  )}
                                </Popper>
                              </>
                            )}
                          </Grid>
                        );
                      })}

                      <Grid
                        item
                        xs={12}
                        sm={6}
                        md={6}
                        lg={3}
                        display={"flex"}
                        alignItems={"center"}
                        justifyContent={"space-evenly"}
                        sx={{ py: { xs: 1, md: 0 } }}
                      >
                        <Button
                          sx={{
                            borderRadius: "20px",
                            background: "#f90c0c",
                            px: 2,
                            color: "#fff",
                            boxShadow: "none",
                            "&:hover": {
                              background: "#f90c0c",
                              boxShadow: "none",
                            },
                          }}
                          onClick={() =>
                            setAlertDialog({ open: true, type: "Reject" })
                          }
                        >
                          Decline
                        </Button>
                        <Button
                          sx={{
                            borderRadius: "20px",
                            background: "#17c964",
                            px: 2,
                            color: "#fff",
                            boxShadow: "none",
                            "&:hover": {
                              background: "#17c964",
                              boxShadow: "none",
                            },
                          }}
                          onClick={() =>
                            setAlertDialog({ open: true, type: "Approve" })
                          }
                        >
                          Approve
                        </Button>
                      </Grid>
                    </Grid>
                  </Box>

                  <SimpleBar style={{ height: "calc(100vh - 322px)" }}>
                    <Grid container spacing={0} sx={{ p: 2 }}>
                      {currentItem &&
                        Object.entries(currentItem?.details).map(
                          ([key, val]) => {
                            return (
                              <Grid
                                item
                                xs={12}
                                sm={6}
                                md={6}
                                lg={3}
                                sx={{ py: 1.5 }}
                              >
                                <CustomText
                                  primary={toPascalCase(key)}
                                  secondary={val}
                                />
                              </Grid>
                            );
                          }
                        )}

                      {/* <Grid item xs={12} py={1}>
                  <Typography
                    variant="caption"
                    fontWeight={400}
                    color="#5c6980"
                  >
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry. Lorem Ipsum has been the industry's
                    standard dummy text ever since the 1500s, when an unknown
                    printer took a galley of type and scrambled it to make a
                    type specimen book. It has survived not only five centuries,
                    but also the leap into electronic typesetting, remaining
                    essentially unchanged.
                  </Typography>
                </Grid>
                {[1, 2, 3, 4].map((e) => {
                  return (
                    <Grid item xs={12} sm={6} md={6} lg={3} sx={{ py: 1.5 }}>
                      <Box
                        display={"flex"}
                        alignItems={"center"}
                        sx={{
                          bgcolor: "#f7f7f7",
                          p: 0.7,
                          borderRadius: "8px",
                          width: "fit-content",
                          cursor: "pointer",
                        }}
                        onClick={() => setOpenDialog(true)}
                      >
                        <Image src={PDF} height={30} width={30} />
                        <Box
                          display={"flex"}
                          flexDirection={"column"}
                          sx={{ px: 2, borderRight: "2px solid #d0d3d9" }}
                        >
                          <Typography
                            variant="h6"
                            fontWeight={500}
                            color="#5c6980"
                          >
                            Attachment 01
                          </Typography>
                          <Typography
                            variant="caption"
                            fontWeight={300}
                            color="#5c6980"
                          >
                            146.5 KB
                          </Typography>
                        </Box>
                        <IconButton color="primary" size="small" sx={{ px: 2 }}>
                          <FiDownload />
                        </IconButton>
                      </Box>
                    </Grid>
                  );
                })} */}
                      {currentItem?.hasOwnProperty("item_details") && (
                        <Box
                          display="flex"
                          flexDirection={"column"}
                          py={1}
                          sx={{ width: "100%" }}
                        >
                          <CustomTable
                            name="Item Details"
                            columns={
                              currentItem?.id.includes("PR")
                                ? [
                                    "Item no",
                                    "Short Text",
                                    "Quantity",
                                    "UOM",
                                    "Total Price",
                                    "Plant",
                                  ]
                                : currentItem?.id.includes("PO")
                                ? [
                                    "Item no",
                                    "Short Text",
                                    "Quantity",
                                    "UOM",
                                    "Total Price",
                                    "Plant",
                                    "PR",
                                    "PR Item",
                                  ]
                                : ""
                            }
                            rows={currentItem?.item_details}
                          />
                        </Box>
                      )}
                      {currentItem?.hasOwnProperty("service_line") && (
                        <Box
                          display="flex"
                          flexDirection={"column"}
                          py={1}
                          sx={{ width: "100%" }}
                        >
                          <CustomTable
                            name="Service Line Item Details"
                            columns={
                              currentItem?.id.includes("PR")
                                ? [
                                    "Item no",
                                    "Service Short Text",
                                    "UOM",
                                    "Total Price",
                                    "Unit Price",
                                    "Net Price",
                                  ]
                                : [
                                    "Item no",
                                    "Service Short Text",
                                    "UOM",
                                    "Total Price",
                                    "Unit Price",
                                    "Net Price",
                                  ]
                            }
                            rows={currentItem?.service_line}
                          />
                        </Box>
                      )}
                      {currentItem?.hasOwnProperty("account_assignment") && (
                        <Box
                          display="flex"
                          flexDirection={"column"}
                          py={1}
                          sx={{ width: "100%" }}
                        >
                          <CustomTable
                            name="Account Assignment Details"
                            columns={[
                              "Item no",
                              "GL Account",
                              "Cost Center",
                              "Fund Center",
                            ]}
                            rows={currentItem?.account_assignment}
                          />
                        </Box>
                      )}
                    </Grid>
                  </SimpleBar>
                </Card>
              ) : (
                <Box
                  display={"flex"}
                  alignItems={"center"}
                  justifyContent={"center"}
                  height={"calc(100vh - 163px)"}
                  sx={{
                    border: "1px solid #00A885",
                    borderRadius: "12px",
                  }}
                >
                  <StyledGridOverlay>
                    <svg
                      width="120"
                      height="100"
                      viewBox="0 0 184 152"
                      aria-hidden
                      focusable="false"
                    >
                      <g fill="none" fillRule="evenodd">
                        <g transform="translate(24 31.67)">
                          <ellipse
                            className="ant-empty-img-5"
                            cx="67.797"
                            cy="106.89"
                            rx="67.797"
                            ry="12.668"
                          />
                          <path
                            className="ant-empty-img-1"
                            d="M122.034 69.674L98.109 40.229c-1.148-1.386-2.826-2.225-4.593-2.225h-51.44c-1.766 0-3.444.839-4.592 2.225L13.56 69.674v15.383h108.475V69.674z"
                          />
                          <path
                            className="ant-empty-img-2"
                            d="M33.83 0h67.933a4 4 0 0 1 4 4v93.344a4 4 0 0 1-4 4H33.83a4 4 0 0 1-4-4V4a4 4 0 0 1 4-4z"
                          />
                          <path
                            className="ant-empty-img-3"
                            d="M42.678 9.953h50.237a2 2 0 0 1 2 2V36.91a2 2 0 0 1-2 2H42.678a2 2 0 0 1-2-2V11.953a2 2 0 0 1 2-2zM42.94 49.767h49.713a2.262 2.262 0 1 1 0 4.524H42.94a2.262 2.262 0 0 1 0-4.524zM42.94 61.53h49.713a2.262 2.262 0 1 1 0 4.525H42.94a2.262 2.262 0 0 1 0-4.525zM121.813 105.032c-.775 3.071-3.497 5.36-6.735 5.36H20.515c-3.238 0-5.96-2.29-6.734-5.36a7.309 7.309 0 0 1-.222-1.79V69.675h26.318c2.907 0 5.25 2.448 5.25 5.42v.04c0 2.971 2.37 5.37 5.277 5.37h34.785c2.907 0 5.277-2.421 5.277-5.393V75.1c0-2.972 2.343-5.426 5.25-5.426h26.318v33.569c0 .617-.077 1.216-.221 1.789z"
                          />
                        </g>
                        <path
                          className="ant-empty-img-3"
                          d="M149.121 33.292l-6.83 2.65a1 1 0 0 1-1.317-1.23l1.937-6.207c-2.589-2.944-4.109-6.534-4.109-10.408C138.802 8.102 148.92 0 161.402 0 173.881 0 184 8.102 184 18.097c0 9.995-10.118 18.097-22.599 18.097-4.528 0-8.744-1.066-12.28-2.902z"
                        />
                        <g
                          className="ant-empty-img-4"
                          transform="translate(149.65 15.383)"
                        >
                          <ellipse
                            cx="20.654"
                            cy="3.167"
                            rx="2.849"
                            ry="2.815"
                          />
                          <path d="M5.698 5.63H0L2.898.704zM9.259.704h4.985V5.63H9.259z" />
                        </g>
                      </g>
                    </svg>
                    <Box sx={{ mt: 1 }}>Select a item to make action</Box>
                    <Box>Nothing is selected</Box>
                  </StyledGridOverlay>
                </Box>
                // <Box
                //   sx={{
                //     // mx: { xs: 0, sm: 2 },
                //     width: { xs: "100%", md: "60%", lg: "73%" },
                //     minHeight: {
                //       xs: "fit-content",
                //       md: "calc(100vh - 100px)",
                //     },
                //   }}
                // >
                //   <Card
                //     sx={{
                //       border: "1px solid #00A885",
                //       borderRadius: "12px",
                //       overflow: "hidden",
                //       display: "flex",
                //       alignItems: "center",
                //       justifyContent: "center",
                //       height: "calc(100vh - 163px)",
                //     }}
                //   ></Card>
                // </Box>
              )}
            </Box>
          </Box>
        </Box>
      </div>
      {openDialog && (
        <Dialog
          open={openDialog}
          PaperProps={{
            style: {
              borderRadius: fullscreen ? "0px" : "20px",
              height: "100%",
            },
          }}
          maxWidth={!fullscreen ? "md" : "lg"}
          fullWidth={!fullscreen ? "md" : "lg"}
          fullScreen={fullscreen}
          onClose={() => setOpenDialog(false)}
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogTitle
            sx={{ background: "#00aa87", color: "#fff", height: "54px" }}
          >
            <Box
              display="flex"
              alignItems="center"
              justifyContent={"space-between"}
            >
              <Typography variant="h5" sx={{ color: "#fff" }}>
                {"Document Name.pdf"}
              </Typography>
              <Box display="flex" alignItems={"center"}>
                <IconButton sx={{ color: "#fff" }} size="small">
                  <FiDownload />
                </IconButton>
                {!fullscreen ? (
                  <IconButton
                    sx={{ color: "#fff" }}
                    size="small"
                    onClick={() => setFullScreen(!fullscreen)}
                  >
                    <RxEnterFullScreen />
                  </IconButton>
                ) : (
                  <IconButton
                    sx={{ color: "#fff" }}
                    size="small"
                    onClick={() => setFullScreen(!fullscreen)}
                  >
                    <MdFullscreenExit />
                  </IconButton>
                )}
                <IconButton
                  sx={{ color: "#fff" }}
                  size="small"
                  onClick={() => setOpenDialog(false)}
                >
                  <FiX />
                </IconButton>
              </Box>
            </Box>
          </DialogTitle>
          <iframe
            src="https://www.africau.edu/images/default/sample.pdf"
            height="100%"
            width="100%"
          />
        </Dialog>
      )}

      {alertDialog.open && (
        <Dialog
          open={alertDialog.open}
          PaperProps={{
            style: {
              borderRadius: "20px",
              width: "405px",
            },
          }}
          maxWidth={"sm"}
          fullWidth={"sm"}
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogTitle
            sx={{
              background: alertDialog.type == "Approve" ? "#009A74" : "#F90C0C",
              color: "#fff",
              height: "54px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Box display={"flex"} alignItems={"center"}>
              {alertDialog.type == "Approve" ? (
                <IconButton sx={{ color: "#fff" }}>
                  <FiCheckCircle />
                </IconButton>
              ) : (
                <IconButton sx={{ color: "#fff" }}>
                  <FiInfo />
                </IconButton>
              )}

              <Typography variant="h5" sx={{ color: "#fff" }}>
                {alertDialog.type == "Approve"
                  ? "Confirm Approval"
                  : "Confirm Decline"}
              </Typography>
            </Box>
            <Box display="flex" alignItems={"center"}>
              <IconButton
                sx={{ color: "#fff" }}
                size="small"
                onClick={() => setAlertDialog({ ...alertDialog, open: false })}
              >
                <FiX />
              </IconButton>
            </Box>
          </DialogTitle>
          <DialogContent
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "column",
            }}
          >
            {alertDialog.type == "Approve" ? (
              <>
                <Typography
                  variant="h5"
                  color={"#45546E"}
                  sx={{ width: "180px", my: 3 }}
                >
                  Are you sure want to Approve this Request
                </Typography>
                <Button
                  sx={{
                    borderRadius: "20px",
                    background: "#17c964",
                    letterSpacing: 1.2,
                    px: 2,
                    my: 1,
                    color: "#fff",
                    boxShadow: "none",
                    "&:hover": {
                      background: "#17c964",
                      boxShadow: "none",
                    },
                  }}
                  onClick={async () => {
                    setAlertDialog({ ...alertDialog, open: false });
                    await handleRequest(currentItem?.id, "Approved", "");
                    setCurrentItem({});
                    setCustomDialog({ type: "Approve", open: true });
                  }}
                >
                  Approve
                </Button>
              </>
            ) : (
              <>
                <Typography variant="h5" color={"#45546E"} sx={{ my: 2 }}>
                  Are you sure want to Decline this Request
                </Typography>
                <TextareaAutosize
                  onChange={(e) => setCommentVal(e.target.value)}
                  minRows={3}
                  style={{
                    width: "100%",
                    borderRadius: "10px",
                    padding: "10px",
                    border: "1px solid #D0D3D9",
                  }}
                  placeholder="Comments"
                />
                <Button
                  sx={{
                    borderRadius: "20px",
                    background: "#f90c0c",
                    letterSpacing: 1.2,
                    px: 2,
                    my: 2,
                    color: "#fff",
                    boxShadow: "none",
                    "&:hover": {
                      background: "#f90c0c",
                      boxShadow: "none",
                    },
                  }}
                  onClick={async () => {
                    if (commentVal.length > 0) {
                      setAlertDialog({ ...alertDialog, open: false });
                      await handleRequest(
                        currentItem?.id,
                        "Rejected",
                        commentVal
                      );
                      await setCommentVal("");
                      await setCurrentItem({});
                      setCustomDialog({ type: "Decline", open: true });
                    }
                  }}
                >
                  Decline
                </Button>
              </>
            )}
          </DialogContent>
        </Dialog>
      )}

      {customDialog.open && (
        <Dialog
          open={customDialog.open}
          PaperProps={{
            style: {
              borderRadius: "20px",
              width: "405px",
            },
          }}
          onClose={() => setCustomDialog({ ...customDialog, open: false })}
          maxWidth={"sm"}
          fullWidth={"sm"}
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogContent
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "column",
            }}
          >
            {alertDialog.type == "Approve" ? (
              <>
                <Box
                  display={"flex"}
                  alignItems={"center"}
                  justifyContent={"center"}
                  height={"80px"}
                  width={"80px"}
                  sx={{ borderRadius: "50%", background: "#3DBF1C" }}
                >
                  <FiCheck style={{ color: "#fff", fontSize: "20px" }} />
                </Box>
                <Typography
                  variant="h5"
                  color={"#45546E"}
                  sx={{ my: 3, textAlign: "justify" }}
                >
                  Approved Successfully!
                </Typography>
              </>
            ) : (
              <>
                <Box
                  display={"flex"}
                  alignItems={"center"}
                  justifyContent={"center"}
                  height={"80px"}
                  width={"80px"}
                  sx={{ borderRadius: "50%", background: "#f90c0c" }}
                >
                  <FiX style={{ color: "#fff", fontSize: "20px" }} />
                </Box>
                <Typography
                  variant="h5"
                  color={"#45546E"}
                  sx={{ my: 3, textAlign: "justify" }}
                >
                  Request Declined
                </Typography>
              </>
            )}
          </DialogContent>
        </Dialog>
      )}
    </>
  );
};

export default Home;
