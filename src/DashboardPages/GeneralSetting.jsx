import React from "react";
import CustomTabs from "../components/CustomTabs";
import AppBannerTab from "./AppBannerTab";
import PagesTab from "./PagesTab";

export const GeneralSetting = () => {
  const tabs = ["App Banner", "Pages"];
  const panels = [
    <AppBannerTab key="banner" />,
    <PagesTab key="pages" />,
  ];
  return (
    <div className="mx-5">
      <p className="text-2xl ">General Setting</p>
      <CustomTabs tabs={tabs} panels={panels} />
    </div>
  );
};
