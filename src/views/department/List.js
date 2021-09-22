import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
// antd
import { Button, Switch, message } from "antd";
// api
import { Status } from "@/api/department";
// table 组件
import TableComponent from "@/components/tableData/Index";
class DepartmentList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // id
      id: "",
      // 禁启用加载
      flag: false,
      // 表格加载
      loadingTable: false,
      // 请求参数
      pageNumber: 1,
      pageSize: 10,
      keyWork: "",
      // 复选框数据
      selectedRowKeys: [],
      // 警告弹窗
      visible: false,
      // 弹窗确定按钮 loading
      confirmLoading: false,
      // 表头
      tableConfig: {
        url: "department",
        checkbox: true,
        rowKey: "id",
        thead: [
          {
            title: "部门名称",
            dataIndex: "name",
            key: "name",
            render: (text, rowData) => {
              return <a href={rowData.id}>{text}</a>;
            },
          },
          {
            title: "禁启用",
            dataIndex: "status",
            key: "status",
            render: (text, rowData) => {
              return (
                <Switch
                  loading={this.state.flag}
                  onChange={() => this.onHandlerSwitch(rowData)}
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
            render: (text, rowData) => {
              return (
                <div className="inline-button">
                  <Button type="primary">
                    <Link
                      to={{
                        pathname: "/index/department/add",
                        state: { id: rowData.id },
                      }}
                    >
                      编辑
                    </Link>
                  </Button>
                  <Button
                    onClick={() => this.$Child.onHandlerDelete(rowData.id)}
                  >
                    删除
                  </Button>
                </div>
              );
            },
          },
        ],
      },
      // 表的数据
      data: [],
    };
  }

  /* 生命周期挂载完成 */
  componentDidMount() {}

  /* 搜索 */
  onSearch = (value) => {
    if (this.state.loadingTable) return;
    this.setState({
      keyWork: value.name,
      pageNumber: 1,
      pageSize: 10,
    });
    // 请求数据
    this.$Child.loadData();
  };

  /* 禁启用 */
  onHandlerSwitch(data) {
    if (!data.status) return;
    const requestData = {
      id: data.id,
      status: !data.status,
    };
    this.setState({
      flag: true,
    });
    Status(requestData)
      .then((response) => {
        message.info(response.data.message);
        this.setState({
          flag: false,
        });
      })
      .catch((error) => {
        this.setState({
          flag: false,
        });
      });
  }

  render() {
    return (
      <Fragment>
        <TableComponent
          batchButton={true}
          config={this.state.tableConfig}
          onRef={(ref) => (this.$Child = ref)}
        />
      </Fragment>
    );
  }
}
export default DepartmentList;
