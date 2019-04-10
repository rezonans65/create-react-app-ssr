import React from "react";
import Loadable from "react-loadable";

export const HomePage = Loadable({
  loader: () => import(/* webpackChunkName: "homePage" */ "./layouts/home"),
  loading: () => <div>Loading...</div>,
  modules: ["homePage"]
});

export const AboutPage = Loadable({
  loader: () => import(/* webpackChunkName: "anoutPage" */ "./layouts/about"),
  loading: () => <div>Loading...</div>,
  modules: ["aboutPage"]
});
