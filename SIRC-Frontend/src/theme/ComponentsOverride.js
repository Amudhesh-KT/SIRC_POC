export const components = {
  MuiCssBaseline: {
    styleOverrides: {
      "*": {
        boxSizing: "border-box",
        fontFamily: "'Poppins', sans-serif !important",
      },
      html: {
        height: "100%",
        width: "100%",
      },
      body: {
        height: "100%",
        margin: 0,
        padding: 0,
        fontFamily: "'Poppins', sans-serif !important",
      },
      "#root": {
        height: "100%",
      },
      ".MuiCardHeader-action": {
        alignSelf: "center !important",
      },
      ".scrollbar-container": {
        borderRight: "0 !important",
      },
    },
  },

  // Extra Add-On of Components
  MuiContainer: {
    styleOverrides: {
      root: {
        paddingLeft: "15px !important",
        paddingRight: "15px !important",
        maxWidth: "1600px",
      },
    },
  },
  MuiButton: {
    styleOverrides: {
      root: {
        textTransform: "none",
        boxShadow: "none",
        "&:hover": {
          boxShadow: "none",
        },
      },
    },
  },
  MuiListItem: {
    styleOverrides: {
      root: {
        borderRadius: "9px",
      },
    },
  },
  MuiCard: {
    styleOverrides: {
      root: {
        borderRadius: "5px",
        // padding: "14px",
        // margin: "15px",
        boxShadow: "0px 7px 30px 0px rgba(90, 114, 123, 0.11)",
      },
    },
  },
  MuiListItemIcon: {
    styleOverrides: {
      root: {
        minWidth: "40px",
      },
    },
  },
  MuiGridItem: {
    styleOverrides: {
      root: {
        paddingTop: "30px",
        paddingLeft: "30px !important",
      },
    },
  },
  MuiLinearProgress: {
    styleOverrides: {
      root: {
        backgroundColor: "#ecf0f2",
        borderRadius: "6px",
      },
    },
  },
  MuiMenuItem: {
    styleOverrides: {
      root: {
        borderRadius: "0",
      },
    },
  },
  MuiChip: {
    styleOverrides: {
      root: {
        fontWeight: "500",
        fontSize: "0.75rem",
      },
    },
  },
};

export const typography = {
  fontFamily: "'DM Sans', sans-serif",
  body1: {
    fontWeight: 400,
  },
  h1: {
    fontWeight: 500,
    fontSize: "1.875rem",
    lineHeight: "1.5",
  },
  h2: {
    fontWeight: 500,
    fontSize: "1.5rem",
    lineHeight: "1.5",
  },
  h3: {
    fontWeight: 500,
    fontSize: "1.3125rem",
    lineHeight: "1.5",
  },
  h4: {
    fontWeight: 500,
    fontSize: "1.125rem",
    lineHeight: "1.5",
  },
  h5: {
    fontWeight: 500,
    fontSize: "1rem",
    lineHeight: "1.5",
  },
  h6: {
    fontWeight: 500,
    fontSize: "0.875rem",
    lineHeight: "1.5",
  },
  button: {
    textTransform: "none",
    fontWeight: "400",
  },
  subtitle1: {
    fontSize: "1rem",
    fontWeight: "400",
  },
  subtitle2: {
    fontSize: "0.875rem",
    fontWeight: "400",
  },
};
