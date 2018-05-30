import React from 'react'
import Link from 'gatsby-link'
import { Input } from 'antd'

import logo from '../images/byteblock.svg'
const Search = Input.Search

const Header = ({ siteTitle }) => (
  <div
    style={{
      marginBottom: '1.45rem',
      background: 'linear-gradient(to right, white 50%, black 50%)',
      boxShadow: '0 0 3px rgba(0,0,0,0.6)',
    }}
  >
    <div
      style={{
        margin: '0 auto',
        maxWidth: 1080,
        padding: '1.45rem 1.0875rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        background: 'linear-gradient(to right, white 130px, black 130px)',
      }}
    >
      <Link to="/">
        <img
          src={logo}
          style={{
            margin: '0 1em 0 0',
          }}
          width="50"
        />
      </Link>

      <div>
        <Link to="browse" style={{ color: 'white', marginRight: '0.7em' }}>
          Browse
        </Link>
        <Link to="submit" style={{ color: 'white', marginRight: '1em' }}>
          Submit
        </Link>
        <Search
          placeholder="search"
          onSearch={value =>
            window &&
            window.location.replace(
              `${window.location.origin}/search?=${value}`
            )
          }
          style={{ width: 200 }}
        />
      </div>
    </div>
  </div>
)

export default Header
