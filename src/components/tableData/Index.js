import React, { Component } from "react";
// propTypes
import PropTypes from "prop-types";
// antd
import { message, Modal, Form, Input, Button } from "antd";
// api
import { TableList, Delete } from "@/api/common";
// url
import requestUrl from "../../api/requestUrl";
// Table basis component
import TableBasis from "./Table";

class TableComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // 请求参数
      pageNumber: 1,
      pageSize: 10,
      keyWork: "",
      // 数据
      data: [],
      // 加载提升
      loadingTable: false,
      // 数据量
      total: 0,
      // 复选框数据
      selectedRowKeys: [],
      // 警告弹窗
      modalVisible: false,
      // 弹窗确定按钮 loading
      modalConfirmLoading: false,
    };
  }

  /* 生命周期挂载完成 */
  componentDidMount() {
    this.loadData();
    // 返回子组件实例
    this.props.onRef(this); // 子组件调用父组件方法，并把子组件实例传给父组件
  }

  /* 获取列表数据 */
  loadData = () => {
    const { pageNumber, pageSize, keyWork } = this.state;
    this.setState({
      loadingTable: true,
    });
    const requestData = {
      url: requestUrl[`${this.props.config.url}List`],
      data: {
        pageNumber,
        pageSize,
      },
    };
    // 拼接搜索参数
    if (keyWork) {
      requestData.data.name = keyWork;
    }

    TableList(requestData)
      .then((response) => {
        const responseData = response.data.data;
        if (responseData) {
          // 判断返回内容不为null
          this.setState({
            data: responseData.data,
            total: responseData.total,
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

  /* 复选框 */
  onCheckebox = (selectedRowKeys) => {
    this.setState({
      selectedRowKeys,
    });
  };

  /* 当前页码 */
  onChangeCurrentPage = (value) => {
    this.setState(
      {
        pageNumber: value,
      },
      () => {
        this.loadData();
      }
    );
  };

  /* 下接页面 */
  onChangeSizePage = (value, page) => {
    this.setState(
      {
        pageNumber: 1,
        pageSize: page,
      },
      () => {
        this.loadData();
      }
    );
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
    this.setState({ modalVisible: true });
    if (id) {
      this.setState({ selectedRowKeys: [id] });
    }
  }

  /* 弹窗 */
  modalThen = () => {
    // 判断是否已选择删除的数据
    if (this.state.selectedRowKeys.length === 0) {
      return message.info("请选择需要删除的数据");
    }
    this.setState({
      modalConfirmLoading: true,
    });
    const id = this.state.selectedRowKeys.join();
    const requestData = {
      url: requestUrl[`${this.props.config.url}Delete`],
      data: {
        id,
      },
    };
    Delete(requestData)
      .then((response) => {
        message.info(response.data.message);
        this.setState({
          modalVisible: false,
          modalConfirmLoading: false,
          id: "",
          selectedRowKeys: [],
        });
        // 重新加载数据
        this.loadData();
      })
      .catch((error) => {
        this.setState({
          modalConfirmLoading: false,
        });
      });
  };

  render() {
    const { thead, checkbox, rowKey } = this.props.config;
    const rowSelection = {
      onChange: this.onCheckebox,
    };
    return (
      <>
        {/* 筛选 */}
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

        {/* Table UI 组件 */}
        <div className="table-wrap">
          <TableBasis
            columns={thead}
            dataSource={this.state.data}
            total={this.state.total}
            changePageCurrent={this.onChangeCurrentPage}
            changePageSize={this.onChangeSizePage}
            rowSelection={checkbox ? rowSelection : null}
            rowKey={rowKey}
            onHandlerDelete={() => this.onHandlerDelete()}
          />
        </div>

        {/* 确认弹窗 */}
        <Modal
          title="提示"
          visible={this.state.modalVisible}
          onOk={this.modalThen}
          onCancel={() => {
            this.setState({ modalVisible: false });
          }}
          okText="确认"
          cancelText="取消"
          confirmLoading={this.state.modalConfirmLoading}
        >
          <p className="text-center">
            确认删除此信息？
            <strong className="color-red">删除后将无法恢复</strong>
          </p>
        </Modal>
      </>
    );
  }
}
// 校验数据类型
TableComponent.propTypes = {
  config: PropTypes.object,
};
// 默认
TableComponent.defaultProps = {
  batchButton: false,
};

export default TableComponent;
