import React, { Component } from "react";
// layout组件
import LayoutAside from "./components/aside";
import LayoutHeader from "./components/header";
import ContainerMain from "../../components/containerMain/Index";
// css
import "./layout.scss";
// antd
import { Layout } from "antd";
const { Sider, Header, Content } = Layout;
class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      collapsed: false,
    };
  }

  componentDidMount() {
    const collapsed = JSON.parse(sessionStorage.getItem("collapsed"));
    this.setState({ collapsed });
  }

  // 收缩菜单事件
  toggleCollapsed = () => {
    const collapsed = !this.state.collapsed;
    this.setState({ collapsed });
    sessionStorage.setItem("collapsed", collapsed);
  };

  render() {
    return (
      <Layout className="layout-wrap">
        <Header className="layout-header">
          <LayoutHeader
            collapsed={this.state.collapsed}
            toggle={this.toggleCollapsed}
          />
        </Header>
        <Layout>
          <Sider width="250px" collapsed={this.state.collapsed}>
            <LayoutAside />
          </Sider>
          <Content className="layout-main">
            <ContainerMain />
          </Content>
        </Layout>
      </Layout>
    );
  }
}

export default Index;
