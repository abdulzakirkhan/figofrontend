import React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import { useLocation } from "react-router-dom";

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 0 }}>{children}</Box>}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const CustomTabs = ({ tabs, panels, setcurrentTab, setStatus, tabBgColor = "#f8f9fa" }) => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const dataParam = queryParams.get("activeTab");
  const [value, setValue] = React.useState(Number(dataParam) || 0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
    if (setcurrentTab) setcurrentTab(newValue);
  };

  return (
    <Box sx={{ width: "100%",position:"relative" ,height:"100%"}}>
      {/* Tab Header Background */}

      {/* Tab Panels */}
      {panels.map((panel, index) => (
        <CustomTabPanel key={index} value={value} index={index}>
          {panel}
        </CustomTabPanel>
      ))}
      <Box
        sx={{
          position:"absolute",
          top:'4px',
          right:"15%",
          backgroundColor: tabBgColor,
          padding: "2px",
          borderRadius: "12px",
          display: "inline-flex",
        }}
      >
        <Tabs
          value={value}
          onChange={handleChange}
          variant="scrollable"
          scrollButtons="auto"
          aria-label="custom styled tabs"
          TabIndicatorProps={{ style: { display: "none" } }} // Hide default indicator
          sx={{alignItems:"center",paddingX:"4px"}}
        >
          {tabs.map((tab, index) => (
            <Tab
              key={index}
              label={tab}
              onClick={() => setStatus && setStatus(tab)}
              {...a11yProps(index)}
              sx={{
                textTransform: "capitalize",
                fontSize: "14px",
                fontWeight: 500,
                minHeight: "40px",
                padding: "0 24px",
                borderRadius: "8px",
                position: "relative",
                zIndex: 1,
                transition: "all 0.2s ease",

                // Inactive state
                color: "#6b7280",
                backgroundColor: "transparent",

                // Active state – full blue pill background
                ...(value === index && {
                  color: "#fff",
                  backgroundColor: "#0A0EB3",
                  fontWeight: 600,
                }),

                // Ensure selected text is white
                "&.Mui-selected": {
                  color: "#fff",
                },
              }}
            />
          ))}
        </Tabs>
      </Box>
    </Box>
  );
};

CustomTabs.propTypes = {
  tabs: PropTypes.arrayOf(PropTypes.string).isRequired,
  panels: PropTypes.arrayOf(PropTypes.node).isRequired,
  setcurrentTab: PropTypes.func,
  setStatus: PropTypes.func,
  tabBgColor: PropTypes.string,
};

CustomTabs.defaultProps = {
  tabBgColor: "#f8f9fa",
};

export default CustomTabs;