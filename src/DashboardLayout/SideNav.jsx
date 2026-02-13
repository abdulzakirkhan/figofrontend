import { ListItemIcon } from "@mui/material";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import PropTypes from "prop-types";

import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { buttonStyle, listItemStyle } from "./SideNavStyles";
import { useMemo, useState } from "react";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";

import { navMap } from "../constants/navMap"; // adjust path
import { useGetMeQuery, useGetModulesTreeQuery } from "../redux/auth/authApi"; // adjust path
import { SIDEBAR_ORDER } from "../constants/sidebarOrder";

const drawerWidth = 270;

function SideNav(props) {
  const { window } = props;

  const { data: meData, isLoading: meLoading } = useGetMeQuery();
  const { data: modulesData, isLoading: modulesLoading } = useGetModulesTreeQuery();

  const permissions = meData?.permissions || [];
  const modulesTree = modulesData?.data || []; // {data: tree}

  const canView = (moduleKey) => {
    const p = permissions.find((x) => x.moduleKey === moduleKey);
    return p?.actions?.includes("view");
  };

  // const listItemData = useMemo(() => {
  //   const build = (nodes) => {
  //     const out = [];

  //     for (const node of nodes) {
  //       const mapping = navMap[node.key];
  //       if (!mapping) continue;                 // no route/icon mapping
  //       if (!canView(node.key)) continue;       // RBAC: must have view

  //       const children = node.children?.length ? build(node.children) : [];

  //       out.push({
  //         label: mapping.label || node.name,
  //         link: mapping.link,
  //         icon: mapping.icon,
  //         hasChildren: children.length > 0,
  //         children: children.map((c) => ({
  //           label: c.label,
  //           link: c.link,
  //         })),
  //       });
  //     }

  //     return out;
  //   };

  //   return build(modulesTree);
  // }, [modulesTree, permissions]);




  const listItemData = useMemo(() => {
  const moduleMap = new Map();

  // map backend modules by key
  const flatten = (nodes) => {
    for (const n of nodes) {
      moduleMap.set(n.key, n);
      if (n.children?.length) flatten(n.children);
    }
  };

  flatten(modulesTree);

  const buildChildren = (node) => {
    if (!node.children?.length) return [];

    return node.children
      .filter((c) => navMap[c.key] && canView(c.key))
      .map((c) => ({
        label: navMap[c.key].label || c.name,
        link: navMap[c.key].link,
      }));
  };

  return SIDEBAR_ORDER
    .map((key) => {
      const node = moduleMap.get(key);
      const mapping = navMap[key];

      if (!node || !mapping) return null;
      if (!canView(key)) return null;

      const children = buildChildren(node);

      return {
        label: mapping.label || node.name,
        link: mapping.link,
        icon: mapping.icon,
        hasChildren: children.length > 0,
        children,
      };
    })
    .filter(Boolean);
}, [modulesTree, permissions]);
  const loading = meLoading || modulesLoading;

  const drawer = (
    <div className="side-nav-outer-rounded bg-primary h-screen overflow-hidden">
      <div className="h-[83px] w-full flex items-center bg-app justify-center">
        <img src="/logo.png" className="w-[190px]" alt="Logo" />
      </div>

      <div style={{ height: "calc(100vh - 150px)" }}>
        <div className="flex flex-col justify-between" style={{ height: "100%" }}>
          <div
            className="vertical-scrollable-box px-2"
            style={{ overflowY: "auto", flexGrow: 1 }}
          >
            <List>
              {loading ? (
                <Typography sx={{ color: "white", p: 2, fontSize: 14 }}>
                  Loading...
                </Typography>
              ) : (
                listItemData.map((value, i) => (
                  <div key={i} className="text-white rounded-lg my-2">
                    <RenderItem value={value} i={i} />
                  </div>
                ))
              )}
            </List>
          </div>
        </div>
      </div>
    </div>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <Box
      component="nav"
      sx={{ width: { md: drawerWidth }, flexShrink: { md: 0 }, bgcolor: "var(--bg)" }}
      aria-label="mailbox folders"
    >
      <Drawer
        container={container}
        variant="temporary"
        open={props.mobileOpen}
        onClose={props.handleDrawerToggle}
        ModalProps={{ keepMounted: true }}
        sx={{
          display: { xs: "block", md: "none" },
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: drawerWidth,
            bgcolor: "var(--bg)",
            color: "var(--text)",
            zIndex: { md: 1000, xs: 1200 },
          },
        }}
      >
        {drawer}
      </Drawer>

      <Drawer
        variant="permanent"
        sx={{
          display: { xs: "none", md: "block" },
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            bgcolor: "var(--bg)",
            border: 0,
            color: "var(--text)",
            width: drawerWidth,
            zIndex: { md: 1100, xs: 1200 },
          },
        }}
        open
      >
        {drawer}
      </Drawer>
    </Box>
  );
}

SideNav.propTypes = {
  window: PropTypes.func,
};

export default SideNav;

const RenderItem = ({ value, i }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isExpanded, setIsExpanded] = useState(false);

  const isActive = value.children?.length
    ? value.children.some((child) => location.pathname.includes(child.link))
    : location.pathname.includes(value.link);

  const handleClick = (e) => {
    if (value.hasChildren) {
      e.preventDefault();
      setIsExpanded((prev) => !prev);
    } else {
      navigate(value.link);
    }
  };

  return (
    <>
      <ListItem
        key={i}
        disablePadding
        sx={listItemStyle}
        className={isActive ? "bg-white rounded-2xl" : ""}
      >
        <ListItemButton
          onClick={handleClick}
          className="list-item list_text p-1 px-2"
          sx={{ ...buttonStyle }}
        >
          <ListItemIcon
            className="myIconClass p-2 rounded-2"
            sx={{ color: isActive ? "black" : "white" }}
          >
            {value.icon}
          </ListItemIcon>

          <ListItemText
            primary={
              <Typography
                variant="body2"
                style={{ fontSize: 14, color: isActive ? "black" : "white" }}
                title={value.label}
              >
                {value.label}
              </Typography>
            }
          />

          {value.hasChildren &&
            (isExpanded ? (
              <IoIosArrowUp style={{ fontSize: 16, color: "white" }} />
            ) : (
              <IoIosArrowDown style={{ fontSize: 16, color: "white" }} />
            ))}
        </ListItemButton>
      </ListItem>

      {value.hasChildren && isExpanded && (
        <List
          style={{
            paddingLeft: 0,
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 8,
          }}
        >
          {value.children.map((child, index) => (
            <div key={index}>
              <ListItem
                component={NavLink}
                to={child.link}
                disablePadding
                style={({ isActive }) => ({
                  backgroundColor: isActive ? "white" : "",
                  borderRadius: 12,
                  marginLeft: 12,
                  marginRight: 12,
                })}
              >
                <ListItemButton
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    padding: "12px 16px",
                    borderRadius: 12,
                  }}
                >
                  <Typography
                    variant="body2"
                    sx={{
                      fontSize: 14,
                    color: location.pathname.startsWith(child.link) ? "black" : "white",
                  fontWeight: location.pathname.startsWith(child.link) ? "500" : "400"

                    }}
                  >
                    {child.label}
                  </Typography>
                </ListItemButton>
              </ListItem>
            </div>
          ))}
        </List>
      )}
    </>
  );
};
