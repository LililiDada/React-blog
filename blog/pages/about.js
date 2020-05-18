// 归档页面
import React from 'react'
import Head from 'next/head'
import Header from '../components/Header.js'
import Footer from '../components/Footer.js'
import "../public/style/pages/about.css"
import {Row,Col} from 'antd'
const Archives = () => (
  <div className='blog-page'>
    <Head>
      <title>Archives</title>
    </Head>
    <Header />
    <Row className="comm-main about-page" type="flex" justify="center">
      <Col className="comm-left" xs={18} sm={16} md={14} lg={18} xl={12}  >
        <div className="about-main">
          <h1 className='about-title'>关于我</h1>
          <div className="about-intro">
            <p>欢迎来到李大山博客空间！！</p>
            <p>2018年暑假开始接触前端，目前已学两年；</p>
            <p>并有幸通过环创工作室的考核，成为环创的一员，和大家一起学习、讨论技术；</p>
            <p>也因为大家的帮助，我成了现在的我！</p>
            <p>在这个页面，我将分享一些生活中有意义的事情和学习心得；</p>
            <p>一起加油吧！！</p>
          </div>
          <h1 className='about-title'>时间轴</h1>
          <div className="about-intro">
            {/* <p><span className="about-date">May 18,2020</span> 爷爷75大寿，时间过得慢一点吧，这样您就可以陪我们久一点了</p> */}
            <ul className="about-timeline">
              <li className="about-timeline-event"> 
                <label className="about-timeline-event-icon"></label>
                <div className="about-timeline-event-des">
                 并有幸通过环创工作室的考核，成为环创的一员，和大家一起学习、讨论技术；并有幸通过环创工作室的考核，成为环创的一员，和大家一起学习、讨论技术；
                </div>
              </li>
              <li className="about-timeline-event"> 
                <label className="about-timeline-event-icon"></label>
                <div className="about-timeline-event-des">
                  欢迎来到李大山博客空间！！
                </div>
              </li>
              <li className="about-timeline-event"> 
                <label className="about-timeline-event-icon"></label>
                <div className="about-timeline-event-des">
                  欢迎来到李大山博客空间！！
                </div>
              </li>
              <li className="about-timeline-event"> 
                <label className="about-timeline-event-icon"></label>
                <div className="about-timeline-event-des">
                 并有幸通过环创工作室的考核，成为环创的一员，和大家一起学习、讨论技术；并有幸通过环创工作室的考核，成为环创的一员，和大家一起学习、讨论技术；
                </div>
              </li>
            </ul>
          </div>
        </div>
      </Col>
    </Row>
    {/* 底部 */}
    <Footer />
  </div>
)
export default Archives