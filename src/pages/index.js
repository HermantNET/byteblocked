import React from 'react'
import Link from 'gatsby-link'
import { Row } from 'antd'

import ContractCard from '../components/contract-card'

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
            {this.state.contracts.slice(0, 3).map((c, i) => {
              return (
                <ContractCard id={this.state.contracts.length - i} {...c} />
              )
            })}
          </Row>
          <p>
            <Link to="browse">View more</Link>
          </p>
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
