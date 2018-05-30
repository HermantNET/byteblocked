import React from 'react'
import { Card, Col, Row } from 'antd'
import { Pagination } from 'antd'
import SyntaxHighlighter from 'react-syntax-highlighter'
import { docco } from 'react-syntax-highlighter/styles/hljs'

class Search extends React.Component {
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
        contracts: JSON.parse(localStorage.getItem('contracts')).filter(c =>
          c.name
            .toLowerCase()
            .includes(`${window.location.search.substring(2).toLowerCase()}`)
        ),
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
        <h1>Results for {window.location.search.substring(2)}</h1>
        <p>View all available contracts, sorted by newest to oldest.</p>

        <div style={{ margin: '2em 0.3em' }}>
          <Row gutter={16}>
            {contracts.slice(offset - 1, offset + 8).map(c => {
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

export default Search
