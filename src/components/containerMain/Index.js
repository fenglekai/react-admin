import React from "react";
import { Switch } from "react-router-dom";
// 私有路由组件
import PrivateRouter from "../privateRouter";
/** 自动化工程 */
import Components from "./Components";

class containerMain extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <Switch>
        {Components.map((item) => {
          return (
            <PrivateRouter
              exact
              key={item.path}
              path={item.path}
              component={item.component}
            />
          );
        })}
      </Switch>
    );
  }
}

export default containerMain;
