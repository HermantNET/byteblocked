import React from 'react'
import { Card, Col, Row } from 'antd'
import { Pagination } from 'antd'
import SyntaxHighlighter from 'react-syntax-highlighter'
import { docco } from 'react-syntax-highlighter/styles/hljs'
import prettier from 'prettier/standalone'
import plugins from 'prettier/parser-typescript'

const parse = contract => {
  try {
    return prettier.format(
      contract.length > 100 ? contract.substring(0, 100) + '...' : contract,
      {
        parser: 'typescript',
        plugins: [plugins],
      }
    )
  } catch (e) {
    return contract.substring(0, 100)
  }
}

class Contract extends React.Component {
  state = {
    contract: null,
  }

  componentDidMount() {
    this.getContracts()
  }

  getContracts = () => {
    const contracts = localStorage.getItem('contracts')
    if (!contracts || contracts == '[]') {
      setTimeout(this.getContracts, 2000)
    } else {
      this.setState({
        contract: JSON.parse(localStorage.getItem('contracts')).reverse()[
          (window && +window.location.search.substring(2)) - 1
        ],
      })
    }
  }

  render() {
    const { contract } = this.state
    if (!contract) return <div />
    return (
      <div style={{ margin: '2em 0.3em' }}>
        <h2>{contract.name}</h2>
        <h5>Author: {contract.author || 'unknown'}</h5>
        <p>{contract.description}</p>
        <p>Contract Address: {contract.contractAddress || 'none'}</p>
        <p>Example: {contract.example || 'none'}</p>
        <SyntaxHighlighter language="javascript" style={docco}>
          {parse(contract.contract)}
        </SyntaxHighlighter>
      </div>
    )
  }
}

export default Contract
