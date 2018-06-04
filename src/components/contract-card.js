import React from 'react'
import Link from 'gatsby-link'
import { Card, Col, Rate, Icon, Badge, message } from 'antd'
import SyntaxHighlighter from 'react-syntax-highlighter'
import { docco } from 'react-syntax-highlighter/styles/hljs'
import prettier from 'prettier/standalone'
import plugins from 'prettier/parser-typescript'

const windowCheck = () => typeof window !== 'undefined'

windowCheck() &&
  window.addEventListener('message', function(e) {
    if (typeof webExtensionWallet === 'undefined') {
      message.error(
        'Please install the Nubulas Web Extension Wallet, https://github.com/nebulasio/WebExtensionWallet'
      )
    }
    try {
      console.log('message received, msg.data: ' + JSON.stringify(e.data))
      if (!!e.data.data.txhash) {
        message.success(
          'Transaction hash:\n' + JSON.stringify(e.data.data.txhash, null, '\t')
        )
      }
    } catch (e) {
      this.console.error(e)
    }
  })

const parse = contract => {
  try {
    let string = prettier
      .format(contract, {
        parser: 'typescript',
        plugins: [plugins],
      })
      .substring(0, 250)

    if (string.length === 250) {
      string += '...'
    }

    return string
  } catch (e) {
    return contract.substring(0, 100)
  }
}

const like = id => {
  window.postMessage(
    {
      target: 'contentscript',
      data: {
        to: 'n1si16M3TEaFEZNAj7MihY3cftniFsX6VF9',
        value: '0',
        contract: {
          //"contract" is a parameter used to deploy a contract or call a smart contract function
          function: 'like',
          args: `[${id}]`,
        },
      },
      method: 'neb_sendTransaction',
    },
    '*'
  )
}

const flag = id => {
  window.postMessage(
    {
      target: 'contentscript',
      data: {
        to: 'n1si16M3TEaFEZNAj7MihY3cftniFsX6VF9',
        value: '0',
        contract: {
          //"contract" is a parameter used to deploy a contract or call a smart contract function
          function: 'flag',
          args: `[${id}]`,
        },
      },
      method: 'neb_sendTransaction',
    },
    '*'
  )
}

const ContractCard = ({ id, name, contract, description }) => {
  const interactions = JSON.parse(localStorage.getItem('interactions'))
  return (
    <Col md={12} lg={8}>
      <Card
        title={<Link to={'/contract?=' + id}>{name}</Link>}
        style={{ margin: '0.3em' }}
      >
        <SyntaxHighlighter language="javascript" style={docco}>
          {parse(contract)}
        </SyntaxHighlighter>
        <p>
          {description.length > 140
            ? description.substring(0, 140) + '...'
            : description}
        </p>
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <div style={{ marginRight: '1em' }}>
            <Badge
              count={interactions[id - 1].likes}
              style={{ backgroundColor: '#ffc92d' }}
            >
              <Rate
                count={1}
                onChange={like.bind(null, id)}
                style={{ color: '#ffc92d' }}
              />
            </Badge>
          </div>
          <Badge
            count={interactions[id - 1].flagged}
            style={{ backgroundColor: '#ff7474' }}
          >
            <Rate
              count={1}
              character={<Icon type="flag" />}
              style={{ color: '#ff7474' }}
              onChange={flag.bind(null, id)}
            />
          </Badge>
        </div>
      </Card>
    </Col>
  )
}

export default ContractCard
