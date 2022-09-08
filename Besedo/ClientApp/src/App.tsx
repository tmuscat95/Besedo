import React from "react";
import { Route, Routes } from "react-router-dom";
import Layout from "./components/LayoutComponent";
import Home from "./components/Home";
import "antd/dist/antd.css";
import "./custom.css";
import ModalComponent from "./components/ModalComponent";
import { ModalTypes } from "./types/ViewTypes";
import { StoreProvider } from "./context/TableDataContext";

const appName = "Besedo Test";
const App = () => {
  return (
    <Layout title={appName}>
      <StoreProvider>
        <Routes>
          <Route path="/" element={<Home />}>
            <Route
              path="new"
              element={<ModalComponent mode={ModalTypes.Add} />}
            />
            <Route
              path="edit/*"
              element={<ModalComponent mode={ModalTypes.Modify} />}
            />
            <Route path="/*" element={<></>} />
          </Route>
        </Routes>
      </StoreProvider>
    </Layout>
  );
};

export default App;
