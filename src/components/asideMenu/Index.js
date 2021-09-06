import React, { Component, Fragment } from "react";
import { Link, withRouter } from "react-router-dom";
// antd
import { Menu } from "antd";
// icon
import { UserOutlined } from "@ant-design/icons";
// 路由
import Router from "../../router/index";

const { SubMenu } = Menu;
class AsideMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedKeys: [],
      openKeys: [],
    };
  }

  // 初始化
  componentDidMount() {
    const pathName = this.props.location.pathname;
    const meunKey = pathName.split("/").slice(0, 3).join("/");
    this.setState({
      selectedKeys: [pathName],
      openKeys: [meunKey],
    });
  }

  // 菜单选择
  selectMenu = ({ item, key, keyPath, domEvent }) => {
    this.setState({
      selectedKeys: [key],
    });
  };

  // 展开菜单选择
  openSubMenu = (openKeys) => {
    this.setState({
      openKeys: [...openKeys],
    });
  };

  // 无子级菜单处理
  renderMenu = ({ title, key }) => {
    return (
      <Menu.Item key={key}>
        <Link to={key}>
          <span>{title}</span>
        </Link>
      </Menu.Item>
    );
  };

  // 子级菜单处理
  renderSubMenu = ({ title, key, child }) => {
    return (
      <SubMenu key={key} icon={<UserOutlined />} title={title}>
        {child &&
          child.map((item) => {
            return item.child && item.child.length > 0
              ? this.renderSubMenu(item)
              : this.renderMenu(item);
          })}
      </SubMenu>
    );
  };

  render() {
    const { selectedKeys, openKeys } = this.state;
    return (
      <Fragment>
        <Menu
          onClick={this.selectMenu}
          onOpenChange={this.openSubMenu}
          theme="dark"
          mode="inline"
          selectedKeys={selectedKeys}
          openKeys={openKeys}
          style={{ height: "100%", borderRight: 0 }}
        >
          {Router &&
            Router.map((firstItem) => {
              return firstItem.child && firstItem.child.length > 0
                ? this.renderSubMenu(firstItem)
                : this.renderMenu(firstItem);
            })}
        </Menu>
      </Fragment>
    );
  }
}

export default withRouter(AsideMenu);
