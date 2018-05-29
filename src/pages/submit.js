import React from 'react'
import {
  Form,
  Input,
  DatePicker,
  Col,
  TimePicker,
  Select,
  Cascader,
  InputNumber,
} from 'antd'

const FormItem = Form.Item
const Option = Select.Option
const { TextArea } = Input

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 5 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 12 },
  },
}

const Submit = () => (
  <div>
    <h1>Submit a Contract</h1>
    <p style={{ width: '380px', marginBottom: '5em' }}>
      Anyone is able to contribute. Fill out all of the required fields, then
      submit to store your data on the blockchain.
    </p>

    <Form>
      <FormItem
        {...formItemLayout}
        label="Contract Name"
        validateStatus=""
        help="Should be a combination of alphanumeric characters"
      >
        <Input placeholder="User data storage" id="name" />
      </FormItem>

      <FormItem
        {...formItemLayout}
        label="Author Address"
        validateStatus=""
        help="Your Nebulas address"
      >
        <Input
          placeholder="n1HY4ob2kBRacVHoJKGqmwsvhE6BN5pvEy2"
          id="author_address"
        />
      </FormItem>

      <FormItem
        {...formItemLayout}
        label="Contract"
        validateStatus=""
        help="The contract source code"
      >
        <TextArea
          placeholder="class HelloWorld {}"
          autosize={{ minRows: 6, maxRows: 24 }}
          id="contract"
        />
      </FormItem>
      <FormItem
        {...formItemLayout}
        label="Example"
        validateStatus=""
        help="Optional. Link to a DApp using the contract"
      >
        <Input
          placeholder="n1HY4ob2kBRacVHoJKGqmwsvhE6BN5pvEy2"
          id="author_address"
        />
      </FormItem>
    </Form>
  </div>
)

export default Submit
