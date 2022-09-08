import { Button, Form, Input, Modal, Space } from "antd";
import React, { useContext, useEffect, useState } from "react";
import { ModalTypes } from "../types/ViewTypes";
import { useLocation, useNavigate } from "react-router-dom";
import { UserDto, User } from "../types/DataModelTypes";
import { Store } from "../context/TableDataContext";

type Props = {
  mode: ModalTypes;
};

const ModalComponent = ({ mode }: Props) => {
  const title = mode === ModalTypes.Add ? "Add New User" : "Edit User";
  const navigate = useNavigate();
  const { createUser, updateUser, deleteUser } = useContext(Store);
  const [form] = Form.useForm();
  const location = useLocation();
  const [user, setUser] = useState<User>();
  type LocationState = {
    record: User;
  };
  console.log(location.state);

  useEffect(() => {
    if (!!location.state) {
      const { record } = location.state as LocationState;
      setUser(record);
    }
  }, [location.state]);
  function onModalCancel() {
    navigate("/");
  }

  async function onFormFinish(id: number, values: UserDto) {
    console.log(values);
    switch (mode) {
      case ModalTypes.Add:
        await createUser(values);
        navigate("/");
        break;
      case ModalTypes.Modify:
        const user: User = { id: id, ...values };
        await updateUser(user);
        navigate("/");
        break;
    }
  }

  async function onDeleteButtonClicked(id: number) {
    const confirmed = window.confirm("Permanently delete this row ?");
    if (confirmed) {
      await deleteUser(id);
      navigate("/");
    }
  }
  const validationRules = [{ required: true }];
  const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  const ipRegex =
    /^(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])$/gi;
  const id = !!user ? user.id : NaN;

  useEffect(() => {
    form.setFieldsValue(user);
  }, [user,form]);

  return (
    <Modal title={title} open={true} onCancel={onModalCancel} footer={null}>
      <Form form={form} onFinish={onFormFinish.bind(this, id)}>
        <Form.Item label="Name" name="name" rules={validationRules}>
          <Input placeholder="John" />
        </Form.Item>
        <Form.Item label="Surname" name="surname" rules={validationRules}>
          <Input placeholder="Smith" />
        </Form.Item>
        <Form.Item
          label="Email Address"
          name="email"
          rules={[
            ...validationRules,
            { pattern: emailRegex, message: "Invalid Email Address" },
          ]}
        >
          <Input placeholder="user@example.com" />
        </Form.Item>
        <Form.Item
          label="IP Address"
          name="ip"
          rules={[
            ...validationRules,
            { pattern: ipRegex, message: "Invalid IP Address" },
          ]}
        >
          <Input placeholder="192.168.1.1" />
        </Form.Item>
        <Space
          direction="horizontal"
          align="start"
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "end",
          }}
        >
          <Form.Item>
            <Button id="submit" type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
          {mode === ModalTypes.Modify ? (
            <Form.Item>
              <Button
                id="delete"
                type="primary"
                danger
                onClick={onDeleteButtonClicked.bind(this, id)}
              >
                Delete
              </Button>
            </Form.Item>
          ) : (
            <></>
          )}
        </Space>
      </Form>
    </Modal>
  );
};

export default ModalComponent;
