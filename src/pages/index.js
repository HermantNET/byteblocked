import React from 'react'
import { Card, Col, Row } from 'antd'
import SyntaxHighlighter from 'react-syntax-highlighter'
import { docco } from 'react-syntax-highlighter/styles/hljs'

class IndexPage extends React.Component {
  state = {
    contracts: [],
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
        contracts: JSON.parse(localStorage.getItem('contracts')),
      })
    }
  }

  render() {
    const { data } = this.props
    return (
      <div>
        <h1 style={{ marginTop: '3em' }}>
          Welcome to {data.site.siteMetadata.title}.
        </h1>
        <p style={{ maxWidth: '560px' }}>
          {data.site.siteMetadata.description}
        </p>
        <p>
          <a href="https://nebulas.io">Learn more about Nebulas</a>
        </p>
        <div style={{ marginTop: '10em' }}>
          <h3
            className="bg-black text-white"
            style={{ padding: '0.1em', maxWidth: '300px' }}
          >
            Recent submissions
          </h3>
          <Row gutter={16}>
            {this.state.contracts.slice(0, 3).map(c => {
              return (
                <Col span={8}>
                  <Card title={c.name}>
                    <SyntaxHighlighter language="javascript" style={docco}>
                      {c.contract.substring(0, 50) + '...'}
                    </SyntaxHighlighter>
                    <p>{c.description.substring(0, 50) + '...'}</p>
                  </Card>
                </Col>
              )
            })}
          </Row>
        </div>
      </div>
    )
  }
}

export default IndexPage

export const query = graphql`
  query SiteTitleAndDescriptionQuery {
    site {
      siteMetadata {
        title
        description
      }
    }
  }
`
