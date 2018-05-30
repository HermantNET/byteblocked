import React from 'react'
import { Button, Form, Input, Col, Checkbox } from 'antd'
import { error } from 'util'

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
  constructor(props) {
    super(props)

    this.state = {
      confirm: false,
      errors: {
        name: false,
        author: false,
        description: false,
        contract: false,
        contractAddress: false,
        example: false,
      },
    }
  }

  confirm = e => {
    this.setState({
      confirm: e.target.checked,
    })
  }

  submit = e => {
    e.preventDefault()
    let errors = {
      name: false,
      author: false,
      description: false,
      contract: false,
      contractAddress: false,
      example: false,
    }

    if (e.target.name.value.length < 1 || e.target.name.value.length > 50) {
      errors.name = true
    }

    if (
      e.target.author_address.value.length != 0 &&
      e.target.author_address.value.length != 35
    ) {
      errors.author = true
    }

    if (e.target.description.value.length < 20) {
      errors.description = true
    }

    if (e.target.contract.value.length < 20) {
      errors.contract = true
    }

    if (
      e.target.contract_address.value.length != 0 &&
      e.target.contract_address.value.length != 35
    ) {
      errors.contractAddress = true
    }

    if (
      e.target.example.value.length != 0 &&
      e.target.example.value.length < 9
    ) {
      errors.example = true
    }

    this.setState({
      errors,
    })

    if (!Object.keys(errors).some(e => errors[e])) {
    }
  }

  render() {
    return (
      <div>
        <h1>Submit a Contract</h1>
        <p style={{ width: '380px', marginBottom: '3em' }}>
          Anyone is able to contribute. Fill out all of the required fields,
          then submit to store your data on the blockchain.
        </p>

        <h5>Guidelines</h5>
        <p style={{ width: '380px', marginBottom: '3em' }}>
          Byteblocked is meant for modular contracts, meaning contracts that can
          be used with other contracts. Monolithic contracts with little
          interopability shouldn't be submitted here.
        </p>

        <Checkbox
          style={{ marginBottom: '4em' }}
          onChange={this.confirm}
          checked={this.state.confirm}
        >
          My contract fits the guidelines.
        </Checkbox>

        {this.state.confirm && (
          <Form onSubmit={this.submit}>
            <FormItem
              {...formItemLayout}
              label="Contract Name"
              validateStatus={this.state.errors.name && 'error'}
              help="Should be a combination of alphanumeric characters (max-length: 50)"
            >
              <Input placeholder="User data storage" id="name" />
            </FormItem>

            <FormItem
              {...formItemLayout}
              label="Author Address"
              validateStatus={this.state.errors.author && 'error'}
              help="Optional, your Nebulas address"
            >
              <Input
                placeholder="n1HY4ob2kBRacVHoJKGqmwsvhE6BN5pvEy2"
                id="author_address"
              />
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="Description"
              validateStatus={this.state.errors.description && 'error'}
              help="Description of the contract and how to use it (min-length: 20)"
            >
              <TextArea
                placeholder="This contract parses... To use the contract..."
                autosize={{ minRows: 3, maxRows: 12 }}
                id="description"
              />
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="Contract"
              validateStatus={this.state.errors.contract && 'error'}
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
              validateStatus={this.state.errors.contractAddress && 'error'}
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
              validateStatus={this.state.errors.example && 'error'}
              help="Optional, link to a DApp using the contract"
            >
              <Input
                placeholder="https://nebulearn.com/apps/neby"
                id="example"
              />
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
        )}
      </div>
    )
  }
}

export default Submit
