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
import { UserProfile } from "./DashboardPages/UserProfile.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/2fa/setup" element={<UserProfile />} />
        <Route path="/admin" element={<Dashboardnav />}>
          <Route path="panel-dashboard" element={ <ProtectedRoute>
            <Dashboard />
            </ProtectedRoute>
            } />
          <Route path="destinations" element={<ProtectedRoute><Destinations /> </ProtectedRoute>} />
          <Route path="plans" element={<ProtectedRoute> <Plans /> </ProtectedRoute>} />
          <Route path="customers" element={<ProtectedRoute> <Customers /> </ProtectedRoute>} />
          <Route path="support-and-help" element={<ProtectedRoute> <SupportandHelp /> </ProtectedRoute>} />
          <Route path="esim" element={<ProtectedRoute> <EsimProfile /> </ProtectedRoute>} />
          <Route path="transaction" element={<ProtectedRoute> <Transaction /> </ProtectedRoute>} />
          <Route path="customers-detail" element={<ProtectedRoute> <UserDetail /> </ProtectedRoute>} />
          <Route
            path="systems-settings/roles-permissions"
            element={<ProtectedRoute><RolesAndPermissions /> </ProtectedRoute>}
          />
          <Route
            path="systems-settings/general-setting"
            element={<ProtectedRoute><GeneralSetting /> </ProtectedRoute>}
          />
          <Route
            path="systems-settings/logo-favicon"
            element={<ProtectedRoute><LogoFavicon /> </ProtectedRoute>}
          />
          <Route path="support-and-help/ComplaintsDetail" element={<ProtectedRoute><Chat /> </ProtectedRoute>} />
          {/* PROVIDERS */}
          <Route
            path="providers/package-templates"
            element={<ProtectedRoute> <PackageTemplates /> </ProtectedRoute>}
          />
          <Route
            path="providers/package-templates/:id"
            element={<ProtectedRoute> <PackageTemplateDetail /> </ProtectedRoute>}
          />
          <Route
            path="providers/package-templates/create"
            element={<ProtectedRoute><CreatePackageTemplate /> </ProtectedRoute>}
          />
          <Route
            path="providers/package-templates/edit"
            element={<ProtectedRoute><CreatePackageTemplate mode="edit" /> </ProtectedRoute>}
          />

          <Route path="providers/location-zones" element={<ProtectedRoute><LocationZone /> </ProtectedRoute>} />
          <Route path="providers/subscribers" element={<ProtectedRoute><Subscribers /> </ProtectedRoute>} />
          <Route
            path="providers/subscribers/:imsi"
            element={<ProtectedRoute><SubscriberDetail /> </ProtectedRoute>}
          />

          {/* APP CONTROLLER */}
            <Route
            path="appcontroller/app-banner"
            element={<ProtectedRoute><AppBanner/> </ProtectedRoute>}
          />
            <Route
            path="appcontroller/privacy-policy"
            element={<ProtectedRoute><PrivacyPolicy/></ProtectedRoute>}
          />
            <Route
            path="appcontroller/terms-and-conditions"
            element={<ProtectedRoute><TermAndConditions/> </ProtectedRoute>}
          />
        </Route>
      </Routes>
    </>
  );
}

export default App;