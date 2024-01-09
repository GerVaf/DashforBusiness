import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "../Layout";
import Dashboard from "../pages/Dashboard";
import CreateBlog from "../pages/CreateBlog";
import Login from "../pages/Login";
import CreateWithEditor from "../components/CreateBlog/CreateWithEditor.jsx/CreateWithEditor";
import CreateWithDrapAndDrop from "../components/CreateBlog/CreateWithDrapAndDrop/CreateWithDrapAndDrop";
import List from "../pages/List";
import Ads from "../pages/Ads";
import SignUp from "../pages/SignUp";
import RouteGuard from "../routes/RouteGuard";
import Info from "../components/Home/Info";
import Pending from "../components/List/Pending";
import Draft from "../components/List/Draft";
import Gallery from "../components/Home/Gallery";
import EditWithEditor from "../components/CreateBlog/CreateWithEditor.jsx/EditWithEditor";
const Path = () => {
  const routes = [
    {
      path: "/",
      element: <Dashboard />,
    },
    {
      path: "ads",
      element: <Ads />,
    },
    {
      path: "create",
      element: <CreateBlog />,
    },
    {
      path: "create/editor",
      element: <CreateWithEditor />,
    },
    {
      path: "/edit/editor",
      element: <EditWithEditor />,
    },
    {
      path: "create/drop",
      element: <CreateWithDrapAndDrop />,
    },
    {
      path: "info",
      element: <Info />,
    },
    {
      path: "gallery",
      element: <Gallery />,
    },
    {
      path: "list",
      element: <List />,
    },
    {
      path: "list/pending",
      element: <Pending />,
    },
    {
      path: "list/draft",
      element: <Draft />,
    },
  ];
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/" element={<Layout />}>
          <Route
            index
            element={
              <RouteGuard>
                <Dashboard />
              </RouteGuard>
            }
          />
          {routes.map((route) => {
            return (
              <Route
                key={route.path}
                path={route.path}
                element={<RouteGuard>{route.element}</RouteGuard>}
              />
            );
          })}
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Path;
