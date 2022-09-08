import React from "react";
import { Layout, Typography } from "antd";
import { Content, Footer, Header } from "antd/lib/layout/layout";

type Props = {
  title: string;
};
const titleStyle = { color: "whitesmoke", marginTop: "5px" };
const LayoutComponent: React.FC<React.PropsWithChildren<Props>> = ({
  title,
  children,
}) => {
  const { Title } = Typography;
  return (
    <Layout className="layout">
      <Header>
        <Title className="appheader-name" style={titleStyle}>
          {title}
        </Title>
      </Header>
      <Content style={{ padding: "1% 2%" }}>
        <div>{children}</div>
      </Content>
      <Footer style={{ textAlign: "center" }}>
        {`${title} Timothy Muscat 2022`}
      </Footer>
    </Layout>
  );
};

export default LayoutComponent;
