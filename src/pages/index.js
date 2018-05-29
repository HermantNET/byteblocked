import React from 'react'
import { Card, Col, Row } from 'antd'

const IndexPage = ({ data }) => (
  <div>
    <h1 style={{ marginTop: '3em' }}>
      Welcome to {data.site.siteMetadata.title}.
    </h1>
    <p style={{ maxWidth: '560px' }}>{data.site.siteMetadata.description}</p>
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
        <Col span={8}>
          <Card title="Card title">Card content</Card>
        </Col>
        <Col span={8}>
          <Card title="Card title">Card content</Card>
        </Col>
        <Col span={8}>
          <Card title="Card title">Card content</Card>
        </Col>
      </Row>
    </div>
  </div>
)

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
