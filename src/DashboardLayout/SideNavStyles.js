const listItemStyle = {
  color: "var(--text)",
  "&.active": {
    backgroundColor: "var(--accent)",
    "& .myIconClass, & .MuiTypography-root": {
      color: "var(--primary-contrast)",
    },
  },
  "&.active:hover": {
    backgroundColor: "var(--accent)",
    "& .myIconClass, & .MuiTypography-root": {
      color: "var(--primary-contrast)",
    },
  },
};

const buttonStyle = {
  color: "var(--text)",
  "&:hover": {
    color: "var(--text)",
    "& .myIconClass & .MuiTypography-root": {
      color: "var(--text)",
    },
  },
};

export { listItemStyle, buttonStyle };