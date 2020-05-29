// 归档页面
import React,{useState} from 'react'
import Head from 'next/head'
import Header from '../components/Header.js'
import Footer from '../components/Footer.js'
import "../public/style/pages/about.css"
import {Row,Col} from 'antd'
import axios from 'axios'
import  servicePath  from '../config/apiUrl'
const Archives = (list) => {
  const [describe,setDescribe] = useState(list.describe);
  const [record,setRecord] = useState(list.record);
  const [offset,setOffset] = useState(servicePath.timelineOffset)

  const loadMore = async()=>{
    const lists = [
      {
        id: 1,
        content: '爷爷75大寿，距离爷爷生病已过去70天，时间慢一点走吧，让爷爷多陪我们一点',
        createTime: 'May  18, 2020',
      },
      {
        id: 1,
        content: '并有幸通过环创工作室的考核，成为环创的一员，和大家一起学习、讨论技术；并有幸通过环创工作室的考核，成为环创的一员，和大家一起学习、讨论技术；',
        createTime: 'May  18, 2020'
      },
      {
        id: 1,
        content: '并有幸通过环创工作室的考核，成为环创的一员，和大家一起学习、讨论技术；并有幸通过环创工作室的考核，成为环创的一员，和大家一起学习、讨论技术；',
        createTime: 'May  18, 2020'
      }
    ]
    axios(servicePath.getMoreTimeline+offset).then((res)=>{
      console.log(res)
    })
    setRecord([...record,...lists])
  }
  
  return (
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
          <ul className="about-timeline">
            {
              describe.map((item,index)=>{
                return (
                    <li className="about-timeline-event"  key={index}> 
                      <label className="about-timeline-event-icon"></label>
                      <div className="about-timeline-event-des">
                        {item.content}
                      </div>
                    </li>
                )
              })
            }
            </ul>
          </div>
          <h1 className='about-title'>时间轴</h1>
          <div className="about-intro">
            <ul className="about-timeline">
              {
                record.map((item,index)=>{
                  return(
                    <li className="about-timeline-event" key={index}> 
                      <label className="about-timeline-event-icon"></label>
                      <div className="about-timeline-event-des">
                        <span className="about-time-date">{item.createTime}</span>
                        {item.content}
                      </div>
                    </li>
                  )
                })
              }
            </ul>
          </div>
          <div className="about-load-box">
            <div className="about-load-more" onClick={loadMore}>loading more</div>
          </div>
          
        </div>
      </Col>
    </Row>
    {/* 底部 */}
    <Footer />
  </div>
  )
}

Archives.getInitialProps = async() =>{
  const promise = new Promise((resolve)=>{
    axios(servicePath.getAboutList).then((res)=>{
      console.log(res.data)
      resolve(res.data)
    })
  })
  return await promise
}
export default Archives