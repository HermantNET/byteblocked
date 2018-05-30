import React from 'react'
import { Button, Form, Input, Col } from 'antd'

const FormItem = Form.Item
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

const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
}

class Submit extends React.Component {
  submit = e => {
    e.preventDefault()
    alert('wow')
  }

  render() {
    return (
      <div>
        <h1>Submit a Contract</h1>
        <p style={{ width: '380px', marginBottom: '3em' }}>
          Anyone is able to contribute. Fill out all of the required fields,
          then submit to store your data on the blockchain.
        </p>

        <Form onSubmit={this.submit}>
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
            label="Description"
            validateStatus=""
            help="Description of the contract and how to use it"
          >
            <TextArea
              placeholder="This contract parses... To use the contract..."
              autosize={{ minRows: 3, maxRows: 12 }}
              id="contract"
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
            label="Contract Address"
            validateStatus=""
            help="Optional, the mainnet address of the contract"
          >
            <Input
              placeholder="n1HY4ob2kBRacVHoJKGqmwsvhE6BN5pvEy2"
              id="contract_address"
            />
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="Example"
            validateStatus=""
            help="Optional, link to a DApp using the contract"
          >
            <Input placeholder="https://nebulearn.com/apps/neby" id="example" />
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="Password"
            validateStatus=""
            help="Optional, password to edit the contract after submission"
          >
            <Input placeholder="password" id="password" />
          </FormItem>
          <FormItem {...tailFormItemLayout}>
            <Button
              style={{ marginTop: '1.5em' }}
              type="primary"
              htmlType="submit"
            >
              Submit
            </Button>
          </FormItem>
        </Form>
      </div>
    )
  }
}

export default Submit
