import { Route, Routes } from "react-router-dom";
import "./App.css";
import Dashboardnav from "./DashboardLayout/Dashboardnav.jsx";

import { Destinations } from "./DashboardPages/Destinations.jsx";
import { Login } from "./authPages/Login.jsx";
import { Plans } from "./DashboardPages/Plans.jsx";
import { Customers } from "./DashboardPages/Customers.jsx";
import { SupportandHelp } from "./DashboardPages/SupportandHelp.jsx";
import { UserDetail } from "./DashboardPages/UserDetail.jsx";
import Dashboard from "./DashboardPages/Dashboard";
import { RolesAndPermissions } from "./DashboardPages/RolesAndPermissions.jsx";
import { GeneralSetting } from "./DashboardPages/GeneralSetting.jsx";
import { LogoFavicon } from "./DashboardPages/LogoFavicon.jsx";
import EsimProfile from "./DashboardPages/EsimProfile.jsx";
import Transaction from "./DashboardPages/Transaction.jsx";
import ComplaintsDetail from "./DashboardPages/ComplaintsDetail.jsx";
import Chat from "./DashboardPages/chat.jsx";

import { Subscribers } from "./DashboardPages/Providers/Subcribers/Subscribers.jsx";
import PackageTemplates from "./DashboardPages/Providers/PackageTemplates/PackageTemplates.jsx";
import PackageTemplateDetail from "./DashboardPages/Providers/PackageTemplates/PackageTemplateDetail.jsx";
import LocationZone from "./DashboardPages/Providers/PackageTemplates/LocationZone.jsx";
import SubscriberDetail from "./DashboardPages/Providers/Subcribers/SubscriberDeatils.jsx";
import CreatePackageTemplate from "./DashboardPages/Providers/PackageTemplates/CreatePackageTemplate.jsx";
import AppBanner from "./DashboardPages/AppController/AppBanner.jsx";
import PrivacyPolicy from "./DashboardPages/AppController/PrivacyPolicy.jsx";
import TermAndConditions from "./DashboardPages/AppController/TermAndConditions.jsx";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin" element={<Dashboardnav />}>
          <Route path="panel-dashboard" element={<Dashboard />} />
          <Route path="destinations" element={<Destinations />} />
          <Route path="plans" element={<Plans />} />
          <Route path="customers" element={<Customers />} />
          <Route path="support-and-help" element={<SupportandHelp />} />
          <Route path="esim" element={<EsimProfile />} />
          <Route path="transaction" element={<Transaction />} />
          <Route path="customers-detail" element={<UserDetail />} />
          <Route
            path="systems-settings/roles-permissions"
            element={<RolesAndPermissions />}
          />
          <Route
            path="systems-settings/general-setting"
            element={<GeneralSetting />}
          />
          <Route
            path="systems-settings/logo-favicon"
            element={<LogoFavicon />}
          />
          <Route path="support-and-help/ComplaintsDetail" element={<Chat />} />
          {/* PROVIDERS */}
          <Route
            path="providers/package-templates"
            element={<PackageTemplates />}
          />
          <Route
            path="providers/package-templates/:id"
            element={<PackageTemplateDetail />}
          />
          <Route
            path="providers/package-templates/create"
            element={<CreatePackageTemplate />}
          />
          <Route
            path="providers/package-templates/edit"
            element={<CreatePackageTemplate mode="edit" />}
          />

          <Route path="providers/location-zones" element={<LocationZone />} />
          <Route path="providers/subscribers" element={<Subscribers />} />
          <Route
            path="providers/subscribers/:imsi"
            element={<SubscriberDetail />}
          />

          {/* APP CONTROLLER */}
            <Route
            path="appcontroller/app-banner"
            element={<AppBanner/>}
          />
            <Route
            path="appcontroller/privacy-policy"
            element={<PrivacyPolicy/>}
          />
            <Route
            path="appcontroller/terms-and-conditions"
            element={<TermAndConditions/>}
          />
        </Route>
      </Routes>
    </>
  );
}

export default App;