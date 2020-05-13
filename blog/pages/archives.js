// 归档页面
import React from 'react'
import Head from 'next/head'
import Header from '../components/Header.js'
import Footer from '../components/Footer.js'
import {Row,Col} from 'antd'
const Archives = () => (
  <div>
    <Head>
      <title>Archives</title>
    </Head>
    <Header />
    <Row className="comm-main" type="flex" justify="center">
      <Col className="comm-left" xs={24} sm={24} md={18} lg={16} xl={16}  >
        左侧
      </Col>
    </Row>
    {/* 底部 */}
    <Footer />
  </div>
)
export default Archives