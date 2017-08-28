import React, { Component } from "react";
import Home from "./Home.js";
// import EthTwitterScreen from "../EthTwitterScreen/index.js";
import SideBar from "../Sidebar/index.js";
import { DrawerNavigator } from "react-navigation";

const HomeScreenRouter = DrawerNavigator(
  {
    Home: { screen: Home }
  },
  {
    contentComponent: props => <SideBar {...props} />
  }
);
export default HomeScreenRouter;
