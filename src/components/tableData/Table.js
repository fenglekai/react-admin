import React, { Component } from "react";
// propTypes
import PropTypes from "prop-types";
// antd
import { Table, Row, Col, Button, Pagination } from "antd";
class TableBasis extends Component {
  render() {
    const {
      columns,
      dataSource,
      total,
      changePageCurrent,
      changePageSize,
      batchButton,
      rowSelection,
      rowKey,
      onHandlerDelete,
    } = this.props;
    return (
      <>
        <Table
          pagination={false}
          bordered
          columns={columns}
          dataSource={dataSource}
          rowSelection={rowSelection}
          rowKey={rowKey}
        />
        <div className="spacing-30"></div>
        <Row>
          <Col span={8}>
            {batchButton && <Button onClick={onHandlerDelete}>批量删除</Button>}
          </Col>
          <Col span={16}>
            <Pagination
              defaultCurrent={1}
              onChange={changePageCurrent}
              onShowSizeChange={changePageSize}
              className="pull-right"
              total={total}
              showSizeChanger
              showQuickJumper
              showTotal={(total) => `总数 ${total} 条`}
            />
          </Col>
        </Row>
      </>
    );
  }
}
// 校验数据类型
TableBasis.propTypes = {
  columns: PropTypes.array,
  dataSource: PropTypes.array,
  total: PropTypes.number,
  changePageCurrent: PropTypes.func,
  changePageSize: PropTypes.func,
  batchButton: PropTypes.bool,
  rowSelection: PropTypes.object,
  rowKey: PropTypes.string,
};
// 默认
TableBasis.defaultProps = {
  columns: [],
  dataSource: [],
  total: 0,
  batchButton: true,
  rowKey: "id",
};

export default TableBasis;
