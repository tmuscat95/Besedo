import React, { useCallback } from "react";
import { Table } from "antd";
import { User } from "../types/DataModelTypes";
import { ColumnsType } from "antd/lib/table";
import { useNavigate } from "react-router-dom";
type Props = {
  users: User[];
};

const columns: ColumnsType<User> = [
  {
    title: "ID",
    dataIndex: "id",
    key: "id",
    render: (text) => <strong>{text}</strong>,
  },
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
    responsive: ["xxl", "xl", "lg", "md", "sm"],
  },
  {
    title: "Surname",
    dataIndex: "surname",
    key: "surname",
    responsive: ["xxl", "xl", "lg", "md", "sm"],
  },
  {
    title: "Email",
    dataIndex: "email",
    key: "email",
    responsive: ["xxl", "xl", "lg", "md", "sm"],
  },
  {
    title: "IP Address",
    dataIndex: "ip",
    key: "ip",
    responsive: ["xxl", "xl", "lg", "md", "sm"],
  },
  {
    title: "User",
    key: "user",
    render: (record: User) => <span>{`${record.name} ${record.surname}`}</span>,
    responsive: ["xs"],
  },
  {
    title: "Email/IP",
    key: "email_ip",
    render: (record: User) => (
      <span>
        {record.email}
        <br />
        {record.ip}
      </span>
    ),
    responsive: ["xs"],
  },
];

const UsersTable = ({ users }: Props) => {
  const navigate = useNavigate();
  const onRow = useCallback(
    (record: User, rowIndex: any) => {
      return {
        onDoubleClick: () =>
          navigate(`edit/${record.id}`, { state: { record } }),
      };
    },
    [navigate]
  );
  return (
    <Table
      columns={columns}
      dataSource={users.map((u) => {
        return { key: u.id, ...u };
      })}
      onRow={onRow}
    />
  );
};

export default UsersTable;
