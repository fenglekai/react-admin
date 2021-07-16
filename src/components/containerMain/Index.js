import React from "react";
import { Switch } from "react-router-dom";
// 组件
import User from "../../views/user/Index";
import UserAdd from "../../views/user/Add";
// 私有路由组件
import PrivateRouter from "../privateRouter/Index";
class containerMain extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <Switch>
        <PrivateRouter path="/index/user/list" component={User} />
        <PrivateRouter path="/index/user/add" component={UserAdd} />
      </Switch>
    );
  }
}

export default containerMain;
