import React from 'react'
import { Card, Col, Row } from 'antd'
import { Pagination } from 'antd'
import SyntaxHighlighter from 'react-syntax-highlighter'
import { docco } from 'react-syntax-highlighter/styles/hljs'

import ContractCard from '../components/contract-card'

const window = typeof window !== 'undefined' && window

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
        contracts: JSON.parse(localStorage.getItem('contracts'))
          .reverse()
          .map((c, i) => Object.assign(c, { id: i + 1 }))
          .filter(c =>
            c.name
              .toLowerCase()
              .includes(
                `${window && window.location.search.substring(2).toLowerCase()}`
              )
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
        <h2>Results for {window && window.location.search.substring(2)}</h2>
        <p>View all available contracts, sorted by newest to oldest.</p>

        <div style={{ margin: '2em 0.3em' }}>
          <Row gutter={16}>
            {contracts
              .slice(offset - 1, offset + 8)
              .reverse()
              .map(c => {
                return <ContractCard {...c} />
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
