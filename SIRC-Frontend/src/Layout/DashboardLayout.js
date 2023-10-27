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
  Chip,
  Button,
} from "@mui/material";
import { useSelector } from "react-redux";
import HeaderNavbar from "./HeaderNavbar/HeaderNavbar";
import SideNavbar from "./SideNavbar/SideNavbar";
import React, { useEffect, useRef, useState } from "react";
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

  // Chat
  const [chat, setChat] = useState([]);
  const [inputMessage, setInputMessage] = useState("");
  const [botTyping, setBotTyping] = useState(false);
  const [userTyping, setUserTyping] = useState(false);
  const [chatIDCounter, setChatIDCounter] = useState(1);
  const [darkMode] = useState(false);
  const [chatBotOpen, setChatBotOpen] = useState(false);
  const [viewMoreState, setViewMoreState] = useState({
    id: 0,
    count: 10,
  });

  const chatScreenContent = useRef();

  useEffect(() => {
    // Function to scroll to the bottom
    const scrollToBottom = () => {
      chatScreenContent.current.scrollTop =
        chatScreenContent.current.scrollHeight;
    };

    // Call scrollToBottom whenever messages change or component mounts
    scrollToBottom();
  }, [chat]);

  var floor = Math.floor,
    abs = Math.abs,
    log = Math.log,
    round = Math.round,
    min = Math.min;
  var abbrev = ["K", "M", "B"];

  function rnd(n, precision) {
    var prec = 10 ** precision;
    return round(n * prec) / prec;
  }

  function NumberFormat(n) {
    var base = floor(log(abs(n)) / log(1000));
    var suffix = abbrev[min(abbrev.length - 1, base - 1)];
    base = abbrev.indexOf(suffix) + 1;
    return suffix ? rnd(n / 1000 ** base, 2) + suffix : "" + n;
  }

  useEffect(() => {
    if (inputMessage !== "") setUserTyping(true);
    else setUserTyping(false);
  }, [inputMessage]);

  const handleSubmit = (evt) => {
    evt.preventDefault();
    if (inputMessage === "") return;

    const name = "shreyas";
    const request_temp = {
      sender: "user",
      sender_id: name,
      msg: inputMessage,
      chat_id: chatIDCounter,
      actions: [],
      links: [],
      details: { showButtons: false, data: {} },
    };

    setChat((chat) => [...chat, request_temp]);
    setChatIDCounter(chatIDCounter + 1);
    setBotTyping(true);
    setInputMessage("");
    rasaAPI(name, inputMessage);
  };
  const handleButtonRequest = (actionValue) => {
    setUserTyping(false);

    const name = "shreyas";
    const request_temp = {
      sender: "user",
      sender_id: name,
      chat_id: chatIDCounter,
      msg: actionValue,
      actions: [],
      links: [],
      details: { showButtons: false, data: {} },
    };

    setChat((chat) => [...chat, request_temp]);
    setChatIDCounter(chatIDCounter + 1);
    setBotTyping(true);
    rasaAPI(name, actionValue, openDialog.comment);
  };
  const rasaAPI = async function handleClick(name, msg, comment = "") {
    await fetch("http://localhost:5005/webhooks/rest/webhook", {
      method: "POST",
      body: JSON.stringify({
        sender: name,
        message: msg,
        // metadata: { ...form, comment: comment },
      }),
    })
      .then((response) => response.json())
      .then((response) => {
        if (response) {
          console.log(response[0]);
          const temp = response[0];
          const recipient_id = "";
          let recipient_msg;
          let response_temp;
          try {
            recipient_msg = JSON.parse(temp["text"]);
            response_temp = {
              sender: "bot",
              recipient_id: recipient_id,
            };
            if (recipient_msg["msg"])
              response_temp["msg"] = recipient_msg["msg"];
            if (recipient_msg["requests"])
              response_temp["actions"] = recipient_msg["requests"];
            if (recipient_msg["links"])
              response_temp["links"] = recipient_msg["links"];
            if (recipient_msg["details"]) {
              if (recipient_msg["details"]["flag"]) {
                console.log(recipient_msg);
                response_temp["details"] = {
                  showButtons: recipient_msg["details"]["flag"] ? true : false,
                  data: recipient_msg["details"]["data"],
                  type: recipient_msg["details"]["type"],
                };
              } else
                response_temp["details"] = {
                  // showButtons: recipient_msg["details"]["flag"] ? true : false,
                  data: recipient_msg["details"]["data"],
                  // type: recipient_msg["details"]["type"],
                };
            }
            if (recipient_msg["donut"])
              response_temp["donutChart"] = recipient_msg["donut"];
            if (recipient_msg["pie"])
              response_temp["pieChart"] = recipient_msg["pie"];
            if (recipient_msg["line"])
              response_temp["lineChart"] = recipient_msg["line"];
            if (recipient_msg["cards"])
              response_temp["cards"] = recipient_msg["cards"];
          } catch {
            recipient_msg = temp["text"];
            response_temp = {
              sender: "bot",
              recipient_id: recipient_id,
              msg: recipient_msg,
              chat_id: chatIDCounter,
              actions: [],
              links: [],
              details: { showButtons: false, data: {} },
            };
          }
          console.log(response_temp);
          setBotTyping(false);
          setUserTyping(false);
          console.log(chat);
          setChat((chat) => [...chat, response_temp]);
          setChatIDCounter(chatIDCounter + 1);
          // scrollBottom();
        }
      });
  };
  // Line Charts
  function displayDonut(values) {
    const labels = [];
    const series = [];

    for (const [key, value] of Object.entries(values)) {
      labels.push(key);
      series.push(value);
    }

    const ChartData = {
      series,
      options: {
        chart: {
          type: "donut",
          height: "300px",
          width: "auto",
          background: "transparent",
          horizontalAlign: "left",
        },
        plotOptions: {
          pie: {
            customScale: 1,
            expandOnClick: true,
            donut: {
              size: "62%",
              background: "transparent",
              labels: {
                show: true,
                name: {
                  show: true,
                  formatter: function (val) {
                    return val.split(" ")[0];
                  },
                },
                value: {
                  show: true,
                  fontSize: "15px",
                  fontFamily: "Helvetica, Arial, sans-serif",
                  fontWeight: "bold",
                  color: darkMode ? "lightcyan" : "rgb(44, 56, 128)",
                  offsetY: 10,
                  formatter: function (val) {
                    return NumberFormat(val);
                  },
                },
                total: {
                  show: true,
                  showAlways: false,
                  label: "Total",
                  fontSize: "16px",
                  fontFamily: "Helvetica, Arial, sans-serif",
                  fontWeight: 600,
                  color: darkMode ? "white" : "black",
                  formatter: function (w) {
                    return NumberFormat(
                      w.globals.seriesTotals.reduce((a, b) => {
                        return a + b;
                      }, 0)
                    );
                  },
                },
              },
            },
          },
        },
        labels,
        legend: {
          show: true,
          fontSize: "13px",
          fontWeight: "500",
          position: "bottom",
          letterSpacing: "10px",
          horizontalAlign: "center",
          labels: {
            colors: darkMode ? "#fff" : "#000",
          },
        },
        theme: { mode: "dark", palette: darkMode ? "palette1" : "palette7" },
        dataLabels: {
          enabled: true,
          offsetY: -20,
          formatter: (val, opts) => {
            return NumberFormat(
              opts["w"]["config"]["series"][opts["seriesIndex"]]
            );
          },
          style: {
            fontSize: "10px",
            fontWeight: "bolder",
            fontFamily: "Helvetica, Arial",
            colors: ["white"],
          },
        },
        stroke: {
          show: true,
          curve: "smooth",
          lineCap: "round",
          width: 1,
          colors: darkMode ? ["#31314f"] : ["white"],
        },
        total: {
          show: true,
          showAlways: true,
          label: "Total",
          fontSize: "22px",
          fontFamily: "Helvetica, Arial, sans-serif",
          fontWeight: 600,
          color: "#373d3f",
          formatter: function (w) {
            return NumberFormat(
              w.globals.seriesTotals.reduce((a, b) => {
                return a + b;
              }, 0)
            );
          },
        },
      },
    };
    return (
      <div
        style={{
          width: "100%",
          margin: "5px 0px",
          padding: "5px 0px",
          borderRadius: "6px",
          // background: "rgb(90 89 94 / 18%)",
        }}
      >
        <Chart
          options={ChartData.options}
          series={ChartData.series}
          type="donut"
          height="500px"
          width="100%"
        />
      </div>
    );
  }
  function displayPie(values) {
    const labels = [];
    const series = [];

    for (const [key, value] of Object.entries(values)) {
      labels.push(key);
      series.push(value);
    }

    const ChartData = {
      series,
      options: {
        chart: {
          type: "pie",
          height: "300px",
          width: "auto",
          background: "transparent",
          horizontalAlign: "left",
        },
        plotOptions: {
          pie: {
            customScale: 1,
            expandOnClick: true,
          },
        },
        labels,
        legend: {
          show: true,
          fontSize: "13px",
          fontWeight: "500",
          position: "bottom",
          letterSpacing: "10px",
          horizontalAlign: "center",
          labels: {
            colors: darkMode ? "#fff" : "#000",
          },
        },
        theme: { mode: "dark", palette: darkMode ? "palette1" : "palette7" },
        dataLabels: {
          enabled: true,
          offsetY: 20,
          formatter: (val, opts) => {
            return NumberFormat(
              opts["w"]["config"]["series"][opts["seriesIndex"]]
            );
          },
          style: {
            fontSize: "10px",
            fontWeight: "bolder",
            fontFamily: "Helvetica, Arial",
            colors: ["white"],
          },
        },
        stroke: {
          show: true,
          curve: "smooth",
          lineCap: "round",
          width: 1,
          colors: darkMode ? ["#31314f"] : ["white"],
        },
      },
    };
    return (
      <div
        style={{
          width: "100%",
          margin: "5px 0px",
          padding: "5px 0px",
          borderRadius: "6px",
          // background: "rgb(90 89 94 / 18%)",
        }}
      >
        <Chart
          options={ChartData.options}
          series={ChartData.series}
          type="pie"
          height="500px"
          width="100%"
        />
      </div>
    );
    // return <>Hello</>;
  }
  function displayLine(values) {
    const labels = [];
    const data = [];
    for (const [key, value] of Object.entries(values["data"])) {
      labels.push(key);
      data.push(value);
    }

    const ChartData = {
      series: [
        {
          name: values["name"],
          data,
        },
      ],
      options: {
        chart: {
          height: 350,
          type: "line",
          zoom: {
            enabled: false,
          },
        },
        // legend: {
        //   show: true,
        //   showForSingleSeries: true,
        //   showForNullSeries: true,
        //   showForZeroSeries: true,
        //   offsetY: 10,
        //   fontSize: "13px",
        //   fontWeight: "500",
        //   position: "bottom",
        //   letterSpacing: "10px",
        //   horizontalAlign: "left",
        //   labels: {
        //     colors: darkMode ? "#fff" : "#000",
        //   },
        // },
        theme: {
          monochrome: {
            enabled: true,
            color: "#EA3546",
          },
        },
        dataLabels: {
          enabled: true,
          formatter: function (val, opts) {
            return NumberFormat(val);
          },
          offsetX: 2,
          offsetY: -5.5,
          textAnchor: "middle",
          style: {
            fontSize: "9px",
            colors: ["white"],
          },
          background: {
            enabled: true,
            foreColor: "red",
            padding: 4,
            borderRadius: 2,
            borderWidth: 1,
            borderColor: "#fff",
          },
        },
        title: {
          text: values["title"],
          align: "left",
          style: {
            color: darkMode ? "#fff" : "#000",
            fontSize: "14px",
            fontFamily: "Helvetica, Arial, sans-serif",
            fontWeight: 600,
            cssClass: "apexcharts-yaxis-title",
          },
        },
        stroke: {
          curve: "straight",
        },
        markers: {
          size: 4,
          colors: undefined,
          strokeColors: darkMode ? "#fff" : "wheat",
          strokeWidth: 3,
          strokeOpacity: 0.9,
          strokeDashArray: 0,
          fillOpacity: 1,
          discrete: [],
          shape: "circle",
          radius: 2,
          offsetX: 0,
          offsetY: 0,
          onClick: undefined,
          onDblClick: undefined,
          showNullDataPoints: true,
          hover: {
            size: undefined,
            sizeOffset: 3,
          },
        },
        // responsive: [
        //   {
        //     breakpoint: 900,
        //     options: {
        //       chart: {
        //         width: "100%",
        //       },
        //     },
        //   },
        // ],
        grid: {
          xaxis: {
            lines: {
              show: false, //or just here to disable only x axis grids
            },
          },
          yaxis: {
            lines: {
              show: false, //or just here to disable only y axis
            },
          },
        },
        xaxis: {
          categories: labels,
          labels: {
            show: true,
            align: "center",
            hideOverlappingLabels: true,
            style: {
              colors: darkMode
                ? Array(labels.length).fill("#fff")
                : Array(labels.length).fill("#000"),
            },
          },
          // title: {
          //   text: values["xlabel"],
          //   rotate: 0,
          //   offsetX: 0,
          //   offsetY: 0,
          //   style: {
          //     color: darkMode ? "#fff" : "#000",
          //     fontSize: "12px",
          //     fontFamily: "Helvetica, Arial, sans-serif",
          //     fontWeight: 600,
          //     cssClass: "apexcharts-yaxis-title",
          //   },
          // },
        },
        yaxis: {
          show: true,
          labels: {
            show: true,
            align: "left",
            hideOverlappingLabels: true,
            offsetY: -5,
            style: {
              colors: darkMode ? ["#fff"] : ["#000"],
            },
            formatter: (value) => {
              console.log(value);
              return NumberFormat(value);
            },
          },
          floating: true,
          // title: {
          //   text: values["name"],
          //   rotate: 270,
          //   offsetX: 75,
          //   offsetY: 0,
          //   style: {
          //     color: darkMode ? "#fff" : "#000",
          //     fontSize: "12px",
          //     fontFamily: "Helvetica, Arial, sans-serif",
          //     fontWeight: 600,
          //     cssClass: "apexcharts-yaxis-title",
          //   },
          // },
        },
      },
    };
    return (
      <div
        className="chatscreen-lineChart"
        style={{
          padding: "5px 5px 0px 10px",
          borderRadius: "6px",
          // background: "rgb(90 89 94 / 18%)",
        }}
      >
        <Chart
          options={ChartData.options}
          series={ChartData.series}
          type="line"
          height="350px"
          width="100%"
        />
      </div>
    );
  }
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
              style={{
                height: { xs: "300px", md: "381px" },
                background: "#fff",
              }}
            >
              <SimpleBar style={{ height: "381px" }}>
                <Box
                  ref={chatScreenContent}
                  sx={{
                    maxHeight: "381px",
                    overflowY: "auto",
                  }}
                >
                  {chat.map((chatContent, index) => {
                    return (
                      <div key={index}>
                        <div>
                          {chatContent.msg ? (
                            <>
                              {chatContent.sender === "bot" ? (
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
                                    <Typography
                                      variant="caption"
                                      color="grey"
                                      fontSize={"10px"}
                                    >
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
                                      <Typography
                                        variant="h6"
                                        sx={{ color: "#666666", p: 1 }}
                                      >
                                        {chatContent.msg}
                                      </Typography>
                                    </Box>
                                  </Box>
                                </Box>
                              ) : (
                                <Box
                                  display="flex"
                                  alignItems={"center"}
                                  flexDirection={"row-reverse"}
                                  sx={{ px: 2, py: 1, width: "100%" }}
                                >
                                  <Box
                                    display={"flex"}
                                    alignItems={"center"}
                                    sx={{
                                      minHeight: "32px",
                                      width: "fit-content",
                                      background: "#e6f7f3",
                                      border: "1px solid #00A886",
                                      borderRadius: "18px 18px 0px 18px",
                                    }}
                                  >
                                    <Typography
                                      variant="h6"
                                      sx={{ color: "#666666", p: 1 }}
                                    >
                                      {chatContent.msg}
                                    </Typography>
                                  </Box>
                                </Box>
                              )}
                            </>
                          ) : (
                            <></>
                          )}

                          {chatContent.links ? (
                            <Box display="flex" flexWrap={"wrap"} px={2}>
                              {chatContent.links.map((link, linkIndex) => (
                                <Chip
                                  sx={{
                                    background: "#7473C0",
                                    color: "#fff",
                                    width: "fit-content",
                                    px: 1.5,
                                    m: 0.5,
                                  }}
                                  label={
                                    <a
                                      style={{ color: "#fff" }}
                                      href={link.link}
                                      target="_blank"
                                      rel="noreferrer"
                                    >
                                      {link.tag}
                                    </a>
                                  }
                                  target="_blank"
                                ></Chip>
                              ))}
                            </Box>
                          ) : (
                            <></>
                          )}

                          {chatContent.actions ? (
                            <div
                              className="chatscreen-content-actions"
                              style={{
                                justifyContent:
                                  chatContent.sender === "bot"
                                    ? "flex-start"
                                    : "flex-end",
                              }}
                            >
                              {chatContent.actions
                                .slice(
                                  0,
                                  chatContent.chat_id === viewMoreState.id
                                    ? viewMoreState.count
                                    : 10
                                )
                                .map((action, actionIndex) => (
                                  <Button
                                    variant={"contained"}
                                    key={actionIndex}
                                    size="small"
                                    sx={{
                                      borderColor: darkMode
                                        ? "transparent"
                                        : "",
                                      backgroundColor: darkMode
                                        ? "#15357e"
                                        : "",
                                    }}
                                    style={{
                                      margin: "5px 10px 5px 0px",
                                      textTransform: "capitalize",
                                      letterSpacing: "0.4px",
                                      fontSize: "10px",
                                      fontWeight: "550",
                                    }}
                                    color="error"
                                    onClick={(e) => {
                                      handleButtonRequest(action);
                                    }}
                                  >
                                    {action}
                                  </Button>
                                ))}
                              {chatContent.actions.length > 0 ? (
                                <Button
                                  variant={"contained"}
                                  size="small"
                                  style={{
                                    margin: "5px 10px 5px 0px",
                                    textTransform: "capitalize",
                                    letterSpacing: "0.4px",
                                    fontSize: "10px",
                                    fontWeight: "550",
                                  }}
                                  sx={{
                                    borderColor: darkMode ? "transparent" : "",
                                    backgroundColor: darkMode ? "#15357e" : "",
                                  }}
                                  color="error"
                                  onClick={(e) => {
                                    chatContent.chat_id === viewMoreState.id
                                      ? setViewMoreState({
                                          ...viewMoreState,
                                          count: viewMoreState.count + 10,
                                        })
                                      : setViewMoreState({
                                          id: chatContent.chat_id,
                                          count: 20,
                                        });
                                  }}
                                >
                                  View More
                                </Button>
                              ) : (
                                <></>
                              )}
                            </div>
                          ) : (
                            <></>
                          )}
                          {chatContent.details &&
                          chatContent.details.data &&
                          Object.keys(chatContent.details.data).length > 0 ? (
                            <div
                              className="chatscreen-content-details"
                              style={{
                                background: "rgb(90 89 94 / 18%)",
                              }}
                            >
                              {Object.keys(chatContent.details.data).map(
                                (key, detailsIndex) => (
                                  <div>
                                    <span
                                      style={{
                                        color: "#820000",
                                      }}
                                    >
                                      {key?.replace(/_/g, " ")}
                                    </span>
                                    <span
                                      style={{
                                        margin: "0px 4px",
                                        color: darkMode ? "lightskyblue" : "",
                                      }}
                                    >
                                      :
                                    </span>
                                    <span
                                      style={{
                                        color: darkMode ? "#e5ebff" : "",
                                      }}
                                    >
                                      {chatContent.details.data[key]}
                                    </span>
                                  </div>
                                )
                              )}
                              {chatContent.details.showButtons ? (
                                <div
                                  className="chatscreen-content-details-buttons"
                                  style={{
                                    display: "flex",
                                    width: "100%",
                                    padding: "5px 0px",
                                    alignItems: "center",
                                    justifyContent: "space-evenly",
                                  }}
                                >
                                  <Button
                                    variant={"contained"}
                                    size="medium"
                                    sx={{
                                      backgroundColor: "#1b5e20",
                                      fontWeight: "bold",
                                    }}
                                    style={{
                                      margin: "5px 0px",
                                      textTransform: "capitalize",
                                      letterSpacing: "1px",
                                      fontSize: "11px",
                                      fontWeight: "550",
                                      width: "30%",
                                    }}
                                    color="success"
                                    onClick={() =>
                                      setOpenDialog({
                                        ...openDialog,
                                        open: true,
                                        type: chatContent.details.type,
                                        buttonType: "approve",
                                        value:
                                          chatContent.details.type === "PR"
                                            ? chatContent.details.data[
                                                "Purchase Requisition Number"
                                              ]
                                            : chatContent.details.type === "PL"
                                            ? chatContent.details.data[
                                                "Leave Id"
                                              ]
                                            : chatContent.details.type === "PO"
                                            ? chatContent.details.data[
                                                "Purchase_Order_Number"
                                              ]
                                            : chatContent.details.type === "IN"
                                            ? chatContent.details.data[
                                                "Invocie_no"
                                              ]
                                            : "",
                                      })
                                    }
                                    // onClick={(e) => {
                                    //   console.log(chatContent.details.type);
                                    //   if (chatContent.details.type === "PR")
                                    //     handleButtonRequest(
                                    //       `Approve PR ${chatContent.details.data["Purchase Requisition Number"]}`
                                    //     );
                                    //   else if (chatContent.details.type === "PL")
                                    //     handleButtonRequest(
                                    //       `Approve PL ${chatContent.details.data["Leave Id"]}`
                                    //     );
                                    // }}
                                  >
                                    Approve
                                  </Button>
                                  <Button
                                    variant={"contained"}
                                    size="medium"
                                    sx={{
                                      backgroundColor: "#c62828",
                                    }}
                                    style={{
                                      margin: "5px 0px",
                                      textTransform: "capitalize",
                                      letterSpacing: "1px",
                                      fontSize: "11px",
                                      fontWeight: "550",
                                      width: "30%",
                                    }}
                                    color="error"
                                    onClick={() => {
                                      setOpenDialog({
                                        ...openDialog,
                                        open: true,
                                        type: chatContent.details.type,
                                        buttonType: "reject",
                                        value:
                                          chatContent.details.type === "PR"
                                            ? chatContent.details.data[
                                                "Purchase Requisition Number"
                                              ]
                                            : chatContent.details.type === "PL"
                                            ? chatContent.details.data[
                                                "Leave Id"
                                              ]
                                            : chatContent.details.type === "PO"
                                            ? chatContent.details.data[
                                                "Purchase_Order_Number"
                                              ]
                                            : chatContent.details.type === "IN"
                                            ? chatContent.details.data[
                                                "Invocie_no"
                                              ]
                                            : "",
                                      });
                                    }}
                                    // onClick={(e) => {
                                    //   console.log(chatContent.details.type);
                                    // if (chatContent.details.type === "PR")
                                    //   handleButtonRequest(
                                    //     `Reject PR ${chatContent.details.data["Purchase Requisition Number"]}`
                                    //   );
                                    // else if (chatContent.details.type === "PL")
                                    //   handleButtonRequest(
                                    //     `Reject PL ${chatContent.details.data["Leave Id"]}`
                                    //   );
                                    // }}
                                  >
                                    Reject
                                  </Button>
                                </div>
                              ) : (
                                <></>
                              )}
                            </div>
                          ) : (
                            <></>
                          )}
                          {chatContent.donutChart ? (
                            displayDonut(chatContent.donutChart)
                          ) : (
                            <></>
                          )}
                          {chatContent.pieChart ? (
                            displayPie(chatContent.pieChart)
                          ) : (
                            <></>
                          )}
                          {chatContent.lineChart ? (
                            displayLine(chatContent.lineChart)
                          ) : (
                            <></>
                          )}
                          {chatContent.cards ? (
                            <div className="chatscreen-content-cards-container">
                              {chatContent.cards.map((card, index) => {
                                return (
                                  <div
                                    class="basic-column"
                                    style={{
                                      width: "100%",
                                      marginBottom: "10px",
                                      marginTop: "10px",
                                    }}
                                  >
                                    <div class="tag-wrapper">
                                      <div
                                        class="number-card number-card-content2"
                                        style={{
                                          backgroundImage: darkMode
                                            ? "-webkit-linear-gradient(270deg, #7042bf, #3023ae)"
                                            : "rgb(0,27,74)",
                                        }}
                                      >
                                        <div class="number-card-title">
                                          {card.title}
                                        </div>
                                        <div class="number-card-divider"></div>
                                        <h1 class="number-card-number">
                                          {NumberFormat(card.value)}
                                        </h1>
                                        <div class="number-card-progress-wrapper">
                                          <div class="tagline number-card-currency">
                                            {card.year}
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                );
                              })}
                            </div>
                          ) : (
                            <></>
                          )}
                        </div>
                        {/* -------------------- */}
                        {chatContent.sender === "user" ? (
                          <></>
                        ) : (
                          // <span className="chatscreen-content-icon">
                          //   <img alt="" src={darkMode ? UserIconDark : UserIcon} />
                          // </span>
                          <></>
                        )}
                      </div>
                    );
                  })}
                </Box>
              </SimpleBar>
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
                  disabled={botTyping}
                  value={inputMessage}
                  onChange={(e) => {
                    setInputMessage(e.target.value);
                  }}
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
                  onClick={handleSubmit}
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
