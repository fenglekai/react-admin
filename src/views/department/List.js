import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
// antd
import { Form, Input, Button, Table, Switch, message, Modal } from "antd";
// api
import { GetList, Delete, Status } from "@/api/department";
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
      columns: [
        { title: "部门名称", dataIndex: "name", key: "name" },
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
                <Button onClick={() => this.onHandlerDelete(rowData.id)}>
                  删除
                </Button>
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
    const requestData = {
      pageNumber,
      pageSize,
    };
    if (keyWork) {
      requestData.name = keyWork;
    }
    this.setState({
      loadingTable: true,
    });
    GetList(requestData)
      .then((response) => {
        const responseData = response.data.data;
        if (responseData) {
          // 判断返回内容不为null
          this.setState({
            data: responseData.data,
          });
        }
        this.setState({
          loadingTable: false,
        });
      })
      .catch((error) => {
        this.setState({
          loadingTable: false,
        });
      });
  };

  /* 搜索 */
  onSearch = (value) => {
    if (this.state.loadingTable) return;
    this.setState({
      keyWork: value.name,
      pageNumber: 1,
      pageSize: 10,
    });
    // 请求数据
    this.loadData();
  };

  /* 删除 */
  onHandlerDelete(id) {
    if (!id) {
      if (this.state.selectedRowKeys.length === 0) return;
      id = this.state.selectedRowKeys.join();
    }
    this.setState({
      visible: true,
      id,
    });
  }

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

  /* 复选框 */
  onCheckebox = (selectedRowKeys) => {
    this.setState({
      selectedRowKeys,
    });
  };

  /* 弹窗 */
  modalThen = () => {
    this.setState({
      confirmLoading: true,
    });
    Delete({ id: this.state.id }).then((response) => {
      message.info(response.data.message);
      this.setState({
        visible: false,
        id: "",
        confirmLoading: false,
        selectedRowKeys: [],
      });
      // 请求数据
      this.loadData();
    });
  };

  render() {
    const { columns, data, loadingTable } = this.state;
    const rowSelection = {
      onChange: this.onCheckebox,
    };
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
          <Button onClick={() => this.onHandlerDelete()}>批量删除</Button>
        </Form>
        <div className="table-wrap">
          <Table
            loading={loadingTable}
            rowSelection={rowSelection}
            rowKey="id"
            columns={columns}
            dataSource={data}
            bordered
          ></Table>
        </div>
        <Modal
          title="提示"
          visible={this.state.visible}
          onOk={this.modalThen}
          onCancel={() => {
            this.setState({ visible: false });
          }}
          okText="确认"
          cancelText="取消"
          confirmLoading={this.state.confirmLoading}
        >
          <p className="text-center">
            确认删除此信息？
            <strong className="color-red">删除后将无法恢复</strong>
          </p>
        </Modal>
      </Fragment>
    );
  }
}
export default DepartmentList;
