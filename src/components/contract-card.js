import React from 'react'
import Link from 'gatsby-link'
import { Card, Col } from 'antd'
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

const ContractCard = ({ id, name, contract, description }) => (
  <Col span={8}>
    <Link to={'/contract?=' + id}>
      <Card title={name} style={{ margin: '0.3em' }}>
        <SyntaxHighlighter language="javascript" style={docco}>
          {parse(contract)}
        </SyntaxHighlighter>
        <p>
          {description.length > 140
            ? description.substring(0, 140) + '...'
            : description}
        </p>
      </Card>
    </Link>
  </Col>
)

export default ContractCard
