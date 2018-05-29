import React from 'react'
import { Card, Col, Row } from 'antd'
import { Pagination } from 'antd'

const Browse = () => (
  <div>
    <h1>Recent Submissions</h1>
    <p>View all available contracts, sorted by newest to oldest.</p>

    <div style={{ margin: '2em 0.3em' }}>
      <Row gutter={16}>
        <Col span={8} style={{ marginBottom: '1em' }}>
          <Card title="Card title">Card content</Card>
        </Col>
        <Col span={8} style={{ marginBottom: '1em' }}>
          <Card title="Card title">Card content</Card>
        </Col>
        <Col span={8} style={{ marginBottom: '1em' }}>
          <Card title="Card title">Card content</Card>
        </Col>
        <Col span={8} style={{ marginBottom: '1em' }}>
          <Card title="Card title">Card content</Card>
        </Col>
        <Col span={8} style={{ marginBottom: '1em' }}>
          <Card title="Card title">Card content</Card>
        </Col>
        <Col span={8} style={{ marginBottom: '1em' }}>
          <Card title="Card title">Card content</Card>
        </Col>
        <Col span={8} style={{ marginBottom: '1em' }}>
          <Card title="Card title">Card content</Card>
        </Col>
        <Col span={8} style={{ marginBottom: '1em' }}>
          <Card title="Card title">Card content</Card>
        </Col>
        <Col span={8} style={{ marginBottom: '1em' }}>
          <Card title="Card title">Card content</Card>
        </Col>
      </Row>
    </div>

    <Pagination
      defaultCurrent={1}
      total={100}
      pageSize={8}
      style={{ textAlign: 'center' }}
    />
  </div>
)

export default Browse
