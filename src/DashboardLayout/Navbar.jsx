import {
  AppBar,
  Avatar,
  IconButton,
  Toolbar,
  Typography,
  Menu,
  MenuItem,
  Divider,
  ListItemIcon,
  ListItemText,
  Box as MuiBox,
} from "@mui/material";
import { useEffect, useState, useContext } from "react";
import Box from "@mui/material/Box";
import CloseIcon from '@mui/icons-material/Close';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';
import MenuIcon from "@mui/icons-material/Menu";
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { ThemeContext } from "../contexts/ThemeContext.jsx";
// import { IoNotificationsOutline } from "react-icons/io5";
import { useLocation, useNavigate } from "react-router-dom";
import { IoNotificationsOutline } from "react-icons/io5";
import LocalPostOfficeOutlinedIcon from '@mui/icons-material/LocalPostOfficeOutlined';
import { Search } from "lucide-react";
import { useSelector } from "react-redux";

function Navbar({ handleDrawerToggle }) {
  const {user}=useSelector(state=>state.auth)
  const [showNotificaions, setShowNotifications] = useState(false);
  const [isSmall, setIsSmall] = useState(window.innerWidth >= 900);
  const role = localStorage.getItem("role");
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const avatarMenuOpen = Boolean(anchorEl);

  const handleAvatarOpen = (e) => setAnchorEl(e.currentTarget);
  const handleAvatarClose = () => setAnchorEl(null);
  // const {user} = useSelector(state => state.auth)

  useEffect(() => {
    const handleResize = () => {
      setIsSmall(window.innerWidth >= 900);
    };

    window.addEventListener("resize", handleResize);

    // Cleanup event listener on unmount
    return () => window.removeEventListener("resize", handleResize);
  }, []);

 

  return (
    <Box className="">
      <AppBar
        position="fixed"
        sx={{ boxShadow: "0", backgroundColor: 'var(--bg)',height: '84px', display: 'flex', justifyContent: 'center' }}
        className=""
      >
        <Toolbar
          className=" ps-0 pe-0"
          style={{ display: "flex", justifyContent: "space-between" }}
        >
          <Box
            className="flex w-full items-center justify-between flex-grow-1 py-2 pe-2 rounded-md nav-style nav-style bg_theme"
            sx={{
              marginLeft: isSmall ? "259px" : "0px",
              justifyContent: "space-between",
            }}
          >
            {/* <Box className="d-flex align-items-center">
              <Box sx={{ display: { xs: "block", sm: "none" } }}>
                <Typography
                  variant="h6"
                  component="div"
                  sx={{ cursor: "pointer", fontWeight: "bold", color: "var(--text)", pl: "15px" }}
                  onClick={() => navigate("/")}
                >
                  LOGO
                </Typography>
              </Box>


            </Box> */}
               {/* <Box className="rounded-full p-1 flex  justify-center h-10 w-10 items-center bg-gray-200 cursor-pointer"> */}
                {/* Theme toggle */}
                
                <Box sx={{ display: { xs: "block", md: "none" } }}>
                  <IconButton onClick={handleDrawerToggle}>
                    <MenuIcon />
                  </IconButton>
                </Box>
              {/* </Box> */}
            <div className="lg:flex hidden  items-center gap-3 px-4 py-2 bg-gray-100 rounded-lg border border-gray-200">
      <Search className="w-5 h-5 text-gray-400" />
    
      <input
        type="text"
        placeholder="Search"
        className="flex-1 bg-transparent border-none outline-none text-gray-700 placeholder-gray-400"
      />
    </div>
            <div className="flex align-items-center text-dark gap-sm-3 gap-1">
               <Box className="rounded-full p-1 flex  justify-center h-10 w-10 items-center bg-gray-200 cursor-pointer">
                {/* Theme toggle */}
              
                <ThemeToggle />
              </Box>
              <span
                className="rounded-full p-1 flex justify-center h-10 w-10 items-center bg-gray-200 cursor-pointer"
                onClick={() => setShowNotifications(true)}
              >
                <IoNotificationsOutline
                  className="text-black"
                  fontSize={"20px"}
                />
              </span>
              <span
                className="rounded-full p-1 flex justify-center h-10 w-10 items-center bg-gray-200 cursor-pointer"
                onClick={() => setShowNotifications(true)}
              >
                <LocalPostOfficeOutlinedIcon  
                  className="text-black"
                  fontSize={"25px"}
                />
              </span>
              <Box sx={{ display:"flex" }}>
                <div
                  className="d-flex align-items-center gap-sm-2 gap-1 cursor_pointer"
                 
                  style={{ display:"flex"  }}
                >
                  <span className="">
                    <IconButton onClick={handleAvatarOpen} size="small" aria-controls={avatarMenuOpen ? 'avatar-menu' : undefined} aria-haspopup="true" aria-expanded={avatarMenuOpen ? 'true' : undefined}>
                      <Avatar
                        alt="Remy Sharp"
                        // src={"./logo.png"}
                        sx={{ width: "34px", height: "34px", backgroundColor: "#D1D5DB" }}
                      />
                    </IconButton>
                    <Menu
                      id="avatar-menu"
                      anchorEl={anchorEl}
                      open={avatarMenuOpen}
                      onClose={handleAvatarClose}
                      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                      PaperProps={{ sx: { borderRadius: 3, minWidth: 240, overflow: 'hidden', boxShadow: '0 8px 28px rgba(15,23,42,0.15)' } }}
                    >
                      <MuiBox className="rounded-2xl mx-2" sx={{ backgroundColor: 'var(--primary, #0023D0)', color: 'white', px: 3, py: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <div>
                          <Typography sx={{ fontWeight: 700 }}>{user?.name}</Typography>
                          <Typography sx={{ fontSize: 12, opacity: 0.9 }}>{user?.role?.name}</Typography>
                        </div>
                        <IconButton size="small" onClick={handleAvatarClose} sx={{ color: 'rgba(255,255,255,0.9)' }}>
                          <CloseIcon fontSize="small" />
                        </IconButton>
                      </MuiBox>
                      <MenuItem sx={{ py: 1.5 }} onClick={() => { handleAvatarClose(); navigate('profile'); }}>
                        <ListItemIcon>
                          <PersonOutlineIcon fontSize="small" />
                        </ListItemIcon>
                        <ListItemText>My Profile</ListItemText>
                      </MenuItem>
                      <MenuItem sx={{ py: 1.5 }} onClick={() => { handleAvatarClose(); navigate('/settings'); }}>
                        <ListItemIcon>
                          <SettingsIcon fontSize="small" />
                        </ListItemIcon>
                        <ListItemText>Setting</ListItemText>
                      </MenuItem>
                      {/* <Divider /> */}
                      <MenuItem sx={{ py: 1.5 }} onClick={() => { handleAvatarClose(); localStorage.clear(); navigate('/login'); }}>
                        <ListItemIcon>
                          <LogoutIcon fontSize="small" />
                        </ListItemIcon>
                        <ListItemText>Log Out</ListItemText>
                      </MenuItem>
                    </Menu>
                  </span>
                  
                </div>
              </Box>
             
            </div>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

function ThemeToggle() {
  const { theme, toggleTheme } = useContext(ThemeContext);
  return (
    <IconButton
      onClick={toggleTheme}
      size="small"
      sx={{ color: 'var(--text)', }}
      aria-label="toggle theme"
    >
      {theme === 'dark' ? <Brightness7Icon sx={{color:"black"}} /> : <Brightness4Icon sx={{color:"black"}}/>}
    </IconButton>
  );
}

export default Navbar;
