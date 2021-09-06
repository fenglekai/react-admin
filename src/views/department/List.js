import React, { Component, Fragment } from "react";
// antd
import { Form, Input, Button, Table, Switch } from "antd";
// api
import { GetList } from "../../api/department";
class DepartmentList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // 请求参数
      pageNumber: 1,
      pageSize: 10,
      keyWork: "",
      // 表头
      columns: [
        { title: "部门名称", dataIndex: "name", key: "name" },
        {
          title: "禁启用",
          dataIndex: "status",
          key: "status",
          render: (text, rowData) => {
            return (
              <Switch
                checkedChildren="开启"
                unCheckedChildren="关闭"
                defaultChecked={rowData}
              />
            );
          },
        },
        { title: "人员数量", dataIndex: "number", key: "number" },
        {
          title: "操作",
          dataIndex: "operation",
          key: "operation",
          width: 215,
          render: () => {
            return (
              <div class="inline-button">
                <Button type="primary">编辑</Button>
                <Button>删除</Button>
              </div>
            );
          },
        },
      ],
      // 表的数据
      data: [],
    };
  }

  /* 生命周期挂载完成 */
  componentDidMount() {
    this.loadData();
  }

  /* 获取列表数据 */
  loadData = () => {
    const { pageNumber, pageSize, keyWork } = this.state;
    const resquestData = {
      pageNumber,
      pageSize,
    };
    if (keyWork) {
      resquestData.name = keyWork;
    }
    GetList(resquestData).then((response) => {
      const responseData = response.data.data;
      if (responseData) {
        // 判断返回内容不为null
        this.setState({
          data: responseData.data,
        });
      }
    });
  };

  /* 搜索 */
  onSearch = (value) => {
    this.setState({
      keyWork: value.name,
      pageNumber: 1,
      pageSize: 10,
    });
    // 请求数据
    this.loadData();
  };

  render() {
    const { columns, data } = this.state;
    return (
      <Fragment>
        <Form layout="inline" onFinish={this.onSearch}>
          <Form.Item label="部门名称" name="name">
            <Input placeholder="请输入部门名称" />
          </Form.Item>
          <Form.Item shouldUpdate={true}>
            <Button type="primary" htmlType="submit">
              搜索
            </Button>
          </Form.Item>
        </Form>
        <Table rowKey="id" columns={columns} dataSource={data} bordered></Table>
      </Fragment>
    );
  }
}
export default DepartmentList;
