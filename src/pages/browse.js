import React from 'react'
import Link from 'gatsby-link'
import { Card, Col, Row } from 'antd'
import { Pagination } from 'antd'
import SyntaxHighlighter from 'react-syntax-highlighter'
import { docco } from 'react-syntax-highlighter/styles/hljs'

class Browse extends React.Component {
  state = {
    contracts: [],
    count: 0,
    offset: 1,
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
        count: +localStorage.getItem('count'),
      })
    }
  }

  onChange = page => {
    this.setState({
      offset: page * 8 - 8,
    })
  }

  render() {
    const { offset, count, contracts } = this.state
    return (
      <div>
        <h1>Recent Submissions</h1>
        <p>View all available contracts in reverse chronological order.</p>

        <div style={{ margin: '2em 0.3em' }}>
          <Row gutter={16}>
            {contracts.slice(offset - 1, offset + 7).map((c, i) => {
              return (
                <Col span={8}>
                  <Link to={'/contract?=' + (i + offset - 1)}>
                    <Card title={c.name}>
                      <SyntaxHighlighter language="javascript" style={docco}>
                        {c.contract.substring(0, 50) + '...'}
                      </SyntaxHighlighter>
                      <p>{c.description.substring(0, 50) + '...'}</p>
                    </Card>
                  </Link>
                </Col>
              )
            })}
          </Row>
        </div>

        <Pagination
          defaultCurrent={1}
          total={count}
          pageSize={8}
          style={{ textAlign: 'center' }}
          onChange={this.onChange}
        />
      </div>
    )
  }
}

export default Browse
