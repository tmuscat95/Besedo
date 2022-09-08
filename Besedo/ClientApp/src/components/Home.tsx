import { useContext } from "react";
import UsersTable from "./UsersTable";
import React from "react";
import { Outlet } from "react-router";
import { Button, Space, Spin } from "antd";
import { PlusCircleFilled } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { Store } from "../context/TableDataContext";

const Home = () => {
  const navigate = useNavigate();

  const { loading, users } = useContext(Store);
  function onAddButtonClick() {
    navigate("new");
  }

  return (
    <Spin size="large" spinning={loading}>
      <Space direction="vertical">
        <Button
          type="primary"
          shape="circle"
          icon={<PlusCircleFilled />}
          size={"large"}
          onClick={onAddButtonClick}
        />
        <UsersTable users={users} />
      </Space>
      <Outlet />
    </Spin>
  );
};

export default Home;
