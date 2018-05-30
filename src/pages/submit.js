import React from 'react'
import { Button, Form, Input, Col, Checkbox, Row } from 'antd'
import { error } from 'util'
import prettier from 'prettier/standalone'
import plugins from 'prettier/parser-typescript'

const FormItem = Form.Item
const { TextArea } = Input

const windowCheck = () => typeof window !== 'undefined'

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 },
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

    let data = {
      author_address: e.target.author_address.value,
      name: e.target.name.value,
      contract: e.target.contract.value,
      contract_address: e.target.contract_address.value,
      example: e.target.example.value,
      description: e.target.description.value,
    }

    if (data.name.length < 1 || data.name.length > 50) {
      errors.name = true
    }

    if (data.author_address.length != 0 && data.author_address.length != 35) {
      errors.author = true
    }

    if (data.description.length < 20) {
      errors.description = true
    }

    if (data.contract.length < 20) {
      errors.contract = true
    }

    try {
      prettier.format(data.contract, {
        parser: 'typescript',
        plugins: [plugins],
      })
    } catch (e) {
      errors.contract = true
    }

    if (
      data.contract_address.length != 0 &&
      data.contract_address.length != 35
    ) {
      errors.contractAddress = true
    }

    if (data.example.length != 0 && data.example.length < 9) {
      errors.example = true
    }

    this.setState({
      errors,
    })

    if (!Object.keys(errors).some(e => errors[e])) {
      Object.keys(data).map(d => (data[d] = data[d].replace(/"/g, `\\\\\\"`)))
      data['contract'] = data['contract'].replace(/\n+/g, ';')

      fetch('https://mansuqq.com:2053/', {
        method: 'post',
        body: JSON.stringify(data),
        mode: 'no-cors',
      })
        .then(
          () =>
            windowCheck() &&
            window.location.replace(
              `https://${window.location.host}?=submitted`
            )
        )
        .catch(e => console.log(e))
    }
  }

  render() {
    return (
      <Row>
        <Col md={10}>
          <h1>Submit a Contract</h1>
          <p style={{ width: '380px', marginBottom: '3em' }}>
            Anyone is able to contribute. Fill out all of the required fields,
            then submit to store your data on the blockchain. Submission is{' '}
            <strong>free</strong>.
          </p>

          <h5>Guidelines</h5>
          <p style={{ width: '380px', marginBottom: '3em' }}>
            Byteblocked is meant for modular contracts, meaning contracts that
            can be used with other contracts. Monolithic contracts with little
            interopability shouldn't be submitted here.
          </p>

          <Checkbox
            style={{ marginBottom: '4em' }}
            onChange={this.confirm}
            checked={this.state.confirm}
          >
            My contract fits the guidelines.
          </Checkbox>
        </Col>

        <Col md={14}>
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
        </Col>
      </Row>
    )
  }
}

export default Submit
