import { RxDashboard } from "react-icons/rx";
import { TbMedicineSyrup } from "react-icons/tb";
import { HiOutlineUsers } from "react-icons/hi2";
import { LuUserRoundCog } from "react-icons/lu";
import { IoPricetagsOutline } from "react-icons/io5";
import { FaUsers } from "react-icons/fa";
import { FiCreditCard } from "react-icons/fi";
import { MdSimCard } from "react-icons/md";
import { FiServer } from "react-icons/fi";
import { FiSettings } from "react-icons/fi";
export const navMap = {
  dashboard: {
    label: "Dashboards",
    link: "/admin/panel-dashboard",
    icon: <RxDashboard style={{ fontSize: "20px" }} />,
  },
  destination: {
    label: "Destinations",
    link: "/admin/destinations",
    icon: <TbMedicineSyrup style={{ fontSize: "20px" }} />,
  },
  plans: {
    label: "Plans",
    link: "/admin/plans",
    icon: <HiOutlineUsers style={{ fontSize: "20px" }} />,
  },
  customers: {
    label: "Users",
    link: "/admin/customers",
    icon: <FaUsers style={{ fontSize: "20px" }} />,
  },
  support_help: {
    label: "Support & Help",
    link: "/admin/support-and-help",
    icon: <LuUserRoundCog style={{ fontSize: "20px" }} />,
  },
  esim: {
    label: "Subscribers",
    link: "/admin/esim",
    icon: <MdSimCard style={{ fontSize: "20px" }} />,
  },
transctions: {
  label: "Purchases",
  link: "/admin/transaction",
  icon: <FiCreditCard />
},

  system_settings: {
    label: "Systems settings",
    link: "/admin/systems-settings",
    icon: <LuUserRoundCog style={{ fontSize: "20px" }} />,
  },

  roles_permission: {
    label: "Roles & Permissions",
    link: "/admin/systems-settings/roles-permissions",
  },
  general_setting: {
    label: "General Setting",
    link: "/admin/systems-settings/general-setting",
  },
  logo_favicon: {
    label: "Logo & Favicon",
    link: "/admin/systems-settings/logo-favicon",
  },

  provider: {
    label: "Provider",
    link: "/admin/providers",
    icon: <FiServer style={{ fontSize: "20px" }} />,
  },

 location_zone: {
    label: "Location Zones",
    link: "/admin/providers/location-zones",
    icon: <LuUserRoundCog style={{ fontSize: "20px" }} />,
  },

  package_templates: {
    label: "PrePaid Package Templates",
    link: "/admin/providers/package-templates",
    icon: <LuUserRoundCog style={{ fontSize: "20px" }} />,
  },

   subscribers: {
    label: "Subscribers",
    link: "/admin/providers/subscribers",
    icon: <LuUserRoundCog style={{ fontSize: "20px" }} />,
  },

  app_control:{
    label: "App Control",
    link: "/admin/appcontroller",
    icon: <FiSettings style={{ fontSize: "20px" }} />,
  },
  app_hero_banner:{
    label: "App Banner",
    link: "/admin/appcontroller/app-banner",
  },
  privacy_policy:{
    label: "Legal Content",
    link: "/admin/appcontroller/privacy-policy",
  },
  terms_conditions:{
    label: "Terms & Conditions",
    link: "/admin/appcontroller/terms-and-conditions",
  },
};


// export const navMap = {
//   dashboard: {
//     label: "Dashboard",
//     link: "/admin/panel-dashboard",
//     icon: <RxDashboard style={{ fontSize: "20px" }} />,
//   },

//   destination: {
//     label: "Destinations",
//     link: "/admin/destinations",
//     icon: <TbMedicineSyrup style={{ fontSize: "20px" }} />,
//   },

//   plans: {
//     label: "Plans",
//     link: "/admin/plans",
//     icon: <HiOutlineUsers style={{ fontSize: "20px" }} />,
//   },

//   customers: {
//     label: "Customers",
//     link: "/admin/customers",
//     icon: <TbMedicineSyrup style={{ fontSize: "20px" }} />,
//   },

//   esim: { // ✅ FIXED KEY
//     label: "eSIM",
//     link: "/admin/esim",
//     icon: <TbMedicineSyrup style={{ fontSize: "20px" }} />,
//   },

//   test_side_bar: { // ✅ ADD THIS
//     label: "Test Side Bar",
//     link: "/admin/test-sidebar",
//     icon: <LuUserRoundCog style={{ fontSize: "20px" }} />,
//   },

//   system_settings: {
//     label: "System Settings",
//     link: "/admin/systems-settings",
//     icon: <LuUserRoundCog style={{ fontSize: "20px" }} />,
//   },

//   roles_permission: {
//     label: "Roles & Permissions",
//     link: "/admin/systems-settings/roles-permissions",
//   },

//   general_setting: {
//     label: "General Setting",
//     link: "/admin/systems-settings/general-setting",
//   },

//   logo_favicon: {
//     label: "Logo & Favicon",
//     link: "/admin/systems-settings/logo-favicon",
//   },
// };

