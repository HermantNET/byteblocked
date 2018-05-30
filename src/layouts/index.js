import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import 'antd/dist/antd.css'

import Header from '../components/header'
import './index.css'
import './colors.css'

import Nebulas from 'nebulas'
const neb = new Nebulas.Neb()
neb.setRequest(new Nebulas.HttpRequest('https://mainnet.nebulas.io'))

const windowCheck = () => typeof window !== 'undefined'

class Layout extends React.Component {
  componentDidMount() {
    neb.api
      .call({
        chainID: 1001,
        from: 'n1mnQ53itSzraLQHt8VnUA5zZCe4UyURuty',
        to: 'n1mnQ53itSzraLQHt8VnUA5zZCe4UyURuty',
        value: 0,
        nonce: 1000,
        gasPrice: 1000000,
        gasLimit: 2000000,
        contract: {
          function: 'getCount',
          args: '[]',
        },
      })
      .then(function(tx) {
        var res = JSON.parse(tx.result)
        windowCheck() && window.localStorage.setItem('count', res)

        neb.api
          .call({
            chainID: 1001,
            from: 'n1mnQ53itSzraLQHt8VnUA5zZCe4UyURuty',
            to: 'n1mnQ53itSzraLQHt8VnUA5zZCe4UyURuty',
            value: 0,
            nonce: 1000,
            gasPrice: 1000000,
            gasLimit: 2000000,
            contract: {
              function: 'getContracts',
              args: `[${res},0]`,
            },
          })
          .then(function(tx) {
            windowCheck() && window.localStorage.setItem('contracts', tx.result)
          })
      })
  }

  render() {
    const { children, data } = this.props
    return (
      <div>
        <Helmet
          title={data.site.siteMetadata.title}
          meta={[
            {
              name: 'description',
              content: data.site.siteMetadata.description,
            },
            { name: 'keywords', content: data.site.siteMetadata.keywords },
          ]}
        />
        <Header siteTitle={data.site.siteMetadata.title} />
        <div
          style={{
            margin: '0 auto',
            maxWidth: 1080,
            padding: '0px 1.0875rem 1.45rem',
            paddingTop: 0,
          }}
        >
          {children()}
        </div>
      </div>
    )
  }
}

Layout.propTypes = {
  children: PropTypes.func,
}

export default Layout

export const query = graphql`
  query SiteTitleQuery {
    site {
      siteMetadata {
        title
        description
        keywords
      }
    }
  }
`
