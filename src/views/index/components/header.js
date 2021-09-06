import React, { Component } from "react";
import { MenuFoldOutlined } from "@ant-design/icons";
// css
import "./aside.scss";
class LayoutHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      collapsed: props.collapsed,
    };
  }
  // 生命周期，监听父级prpos的值的变化
  componentWillReceiveProps({ collapsed }) {
    this.setState({
      collapsed,
    });
  }

  // 收缩菜单
  toggleMenu = () => {
    this.props.toggle();
  };

  render() {
    const { collapsed } = this.state;
    return (
      <div className={collapsed ? "collapsed-close" : ""}>
        <h1 className="logo">
          <span>LOGO</span>
        </h1>
        <div className="header-wrap">
          <span className="collapsed-icon" onClick={this.toggleMenu}>
            <MenuFoldOutlined />
          </span>
        </div>
      </div>
    );
  }
}

export default LayoutHeader;
