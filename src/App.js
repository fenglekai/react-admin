import React from "react";
import { Route, BrowserRouter, Switch } from "react-router-dom";
//引用组件
import Login from "./views/login";
import Index from "./views/index";
// 私有组件方法
import PrivateRouter from "./components/privateRouter";
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact component={Login} path="/" />
          <PrivateRouter component={Index} path="/index" />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
