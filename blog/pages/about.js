// 归档页面
import React,{useState} from 'react'
import Head from 'next/head'
import Header from '../components/Header.js'
import Footer from '../components/Footer.js'
import "../public/style/pages/about.css"
import {Row,Col,message,BackTop} from 'antd'
import axios from 'axios'
import  servicePath  from '../config/apiUrl'
const Archives = (list) => {
  const [describe,setDescribe] = useState(list.describe);
  const [completeRecord,setCompleteRecord] = useState(list.record);
  const [record,setRecord] = useState(list.record.slice(0,5));
  const [currentPage,setCurrentPage] = useState(1)

  const loadMore = ()=>{
    const pageSize = servicePath.pageSize
    let skipNum = currentPage * pageSize;
      let newArr = (skipNum + pageSize >= completeRecord.length) ? completeRecord.slice(skipNum, completeRecord.length) : completeRecord.slice(skipNum, skipNum + pageSize);
      if(newArr.length===0){
        message.success('数据已加载完毕');
        return;
      }
      setRecord([...record,...newArr]);
      setCurrentPage(currentPage+1);
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
    {/* 返回顶部按钮 */}
    <BackTop>
        <div className="back-top">UP</div>
      </BackTop>
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