import React, { Component } from "react";
// antd
import { Form, Input, InputNumber, Button, Select, Radio, message } from "antd";
// API
import { requestData } from "@/api/common";
// url
import requestUrl from "../../api/requestUrl";
const { Option } = Select;
class FormCom extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mesPreix: {
        Input: "请输入",
        Radio: "请选择",
        Select: "请选择",
      },
      loading: false,
    };
  }

  rules = (item) => {
    // state
    const { mesPreix } = this.state;
    let rules = [];
    // 是否覆盖
    if (item.required) {
      let message = item.message || `${mesPreix[item.type]}${item.label}`;
      rules.push({ required: true, message });
    }
    if (item.rules && item.rules.length > 0) {
      rules = rules.concat(item.rules);
    }
    return rules;
  };

  // input
  inputElem = (item) => {
    const rules = this.rules(item);
    return (
      <Form.Item
        label={item.label}
        name={item.name}
        key={item.name}
        rules={rules}
      >
        <Input style={item.style} placeholder={item.placeholder} />
      </Form.Item>
    );
  };

  // inputNumber
  inputNumberElem = (item) => {
    const rules = this.rules(item);
    return (
      <Form.Item
        label={item.label}
        name={item.name}
        key={item.name}
        rules={rules}
      >
        <InputNumber min={item.min} max={item.max} />
      </Form.Item>
    );
  };

  // radio
  radioElem = (item) => {
    const rules = this.rules(item);
    return (
      <Form.Item
        label={item.label}
        name={item.name}
        key={item.name}
        rules={rules}
      >
        <Radio.Group>
          {item.option &&
            item.option.map((elem) => {
              return (
                <Radio value={elem.value} key={elem.value}>
                  {elem.label}
                </Radio>
              );
            })}
        </Radio.Group>
      </Form.Item>
    );
  };

  // select
  selectElem = (item) => {
    const rules = this.rules(item);
    return (
      <Form.Item
        label={item.label}
        name={item.name}
        key={item.name}
        rules={rules}
      >
        <Select style={item.style} placeholder={item.placeholder}>
          {item.option &&
            item.option.map((elem) => {
              return (
                <Option value={elem.value} key={elem.value}>
                  {elem.label}
                </Option>
              );
            })}
        </Select>
      </Form.Item>
    );
  };

  // 初始化
  initFormItem = () => {
    const { formItem } = this.props;
    //检测是否存在 formItem
    if (!formItem || (formItem && formItem.length === 0)) return false;
    // 循环处理
    const formList = [];
    formItem.map((item) => {
      if (item.type === "Input") {
        formList.push(this.inputElem(item));
      }
      if (item.type === "InputNumber") {
        formList.push(this.inputNumberElem(item));
      }
      if (item.type === "Select") {
        formList.push(this.selectElem(item));
      }
      if (item.type === "Radio") {
        formList.push(this.radioElem(item));
      }
      return item;
    });

    return formList;
  };

  onSubmit = (value) => {
    const data = {
      url: requestUrl[this.props.formConfig.url],
      data: value,
    };
    this.setState({ loading: true });
    requestData(data)
      .then((response) => {
        const responseData = response.data;
        // 提示
        message.info(responseData.message);
        // 取消按钮加载
        this.setState({ loading: false });
        console.log(response);
      })
      .catch((error) => {
        // 取消按钮加载
        this.setState({ loading: false });
      });
  };

  render() {
    return (
      <Form
        ref="form"
        onFinish={this.onSubmit}
        initialValues={{ number: 0, status: true }}
        {...this.props.formLayout}
      >
        {this.initFormItem()}
        <Button loading={this.state.loading} type="primary" htmlType="submit">
          确定
        </Button>
      </Form>
    );
  }
}

export default FormCom;
