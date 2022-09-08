import { message } from "antd";
import axios from "axios";
import React, { createContext, useEffect, useState } from "react";
import { apiUrl } from "../constants";
import { User, UserDto } from "../types/DataModelTypes";

type Props = {};

type State = {
  users: User[];
  loading: boolean;
  createUser: (userDto: UserDto) => void;
  updateUser: (user: User) => void;
  deleteUser: (id: number) => void;
};
export const Store = createContext<State>({
  users: [],
  loading: false,
  createUser: (userDto: UserDto) => {},
  updateUser: (user: User) => {},
  deleteUser: (id: number) => {},
});

export const StoreProvider: React.FC<React.PropsWithChildren<Props>> = ({
  children,
}) => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);

  async function getData() {
    setLoading(true);
    const res = await axios.get<User[]>("api/users");

    setUsers(res.data);
    setLoading(false);
  }
  function errorHandle(error: any) {
    if (axios.isAxiosError(error)) {
      message.error(error.response?.statusText);
      console.log(error);
    }
  }
  async function deleteUser(id: number) {
    try {
      await axios.delete(`${apiUrl}/${id}`);
      setUsers((_users) => {
        return _users.filter((u) => {
          return u.id !== id;
        });
      });
      message.success(`User with id ${id} Deleted Succesfully`);
    } catch (error) {
      errorHandle(error);
    }
  }

  async function updateUser(user: User) {
    try {
      await axios.put(apiUrl, user);
      setUsers((_users) => {
        return _users.map((u) => {
          if (u.id !== user.id) return u;
          else {
            return user;
          }
        });
      });
      message.success(`User with id ${user.id} Updated Succesfully`);
    } catch (error) {
      errorHandle(error);
    }
  }

  async function createUser(userDto: UserDto) {
    try {
      const res = await axios.post(apiUrl, userDto);
      setUsers((_users) => {
        _users.push(res.data);
        return _users;
      });
      message.success("Create Success");
    } catch (error) {
      errorHandle(error);
    }
  }

  useEffect(() => {
    getData();
  }, []);
  return (
    <Store.Provider
      value={{ loading, users, createUser, updateUser, deleteUser }}
    >
      {children}
    </Store.Provider>
  );
};
