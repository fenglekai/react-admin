import React, { Component } from "react";
// antd
import { message } from "antd";
// API
import { Detailed, Edit } from "../../api/department";
// 组件
import FormCom from "@/components/form/Index";
class DepartmentAdd extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      id: "",
      formConfig: {
        url: "departmentAdd",
      },
      formLayout: {
        labelCol: { span: 2 },
        wrapperCol: { span: 22 },
      },
      formItem: [
        {
          type: "Input",
          label: "部门名称",
          name: "name",
          required: true,
          style: { width: "200px" },
          placeholder: "请输入部门名称",
        },
        {
          type: "InputNumber",
          label: "人员数量",
          name: "number",
          required: true,
          min: 0,
          max: 100,
          style: { width: "200px" },
          placeholder: "请输入人员数量",
        },
        {
          type: "Radio",
          label: "禁启用",
          name: "status",
          required: true,
          option: [
            { label: "禁用", value: false },
            { label: "启用", value: true },
          ],
        },
      ],
    };
  }

  componentWillMount() {
    if (this.props.location.state) {
      this.setState({
        id: this.props.location.state.id,
      });
    }
  }

  componentDidMount() {
    this.getDetailed();
  }

  getDetailed = () => {
    if (!this.props.location.state) return;
    Detailed({ id: this.state.id }).then((response) => {
      this.refs.form.setFieldsValue(response.data.data);
    });
  };

  /* 编辑 */
  onHandlerEdit = (value) => {
    const requestData = value;
    requestData.id = this.state.id;
    Edit(requestData)
      .then((response) => {
        const data = response.data;
        message.info(data.message);
        this.setState({
          loading: false,
        });
      })
      .catch((error) => {
        this.setState({
          loading: false,
        });
      });
  };

  render() {
    return (
      <>
        <FormCom
          formItem={this.state.formItem}
          formLayout={this.state.formLayout}
          formConfig={this.state.formConfig}
        />
      </>
    );
  }
}
export default DepartmentAdd;
