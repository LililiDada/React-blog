import React,{useState} from 'react'
import Head from 'next/head'
import Header from '../components/Header.js'
import Footer from '../components/Footer.js'
import '../public/style/pages/index.css'
import {Row,Col,List,BackTop,Pagination} from 'antd'
const Home = () => {
  const [mylist,setMylist] = useState(
    [
      {title:'我是李大山啊啊啊哈哈哈哈哈哈哈哈哈哈哈哈',description:'只要坚持不懈，总会有成果！一直在模仿，从未被超越！只要坚持不懈，总会有成果！一直在模仿，从未被超越！只要你想，你就可以！！一直...'},
      {title:'我是李李李大山啊',description:'只要坚持不懈，总会有成果！一直在模仿，从未被超越！只要坚持不懈，总会有成果！一直在模仿，从未被超越！！只要你想，你就可以！一直...'},
      {title:'我是李大大大山啊啊啊',description:'只要坚持不懈，总会有成果！一直在模仿，从未被超越！只要坚持不懈，总会有成果！！一直在模仿，从未被超越！只要你想，你就可以！一直...'},
      {title:'我是李李大山啊啊',description:'只要坚持不懈，总会有成果！一直在模仿，从未被超越！只要坚持不懈，总会有成果！！一直在模仿，从未被超越！只要你想，你就可以！一直...'},
      {title:'我是李大山啊啊啊哈哈哈哈哈哈哈哈哈哈哈哈',description:'只要坚持不懈，总会有成果！一直在模仿，从未被超越！只要坚持不懈，总会有成果！一直在模仿，从未被超越！只要你想，你就可以！！一直...'},
      {title:'我是李李李大山啊',description:'只要坚持不懈，总会有成果！一直在模仿，从未被超越！只要坚持不懈，总会有成果！一直在模仿，从未被超越！！只要你想，你就可以！一直...'},
      {title:'我是李大大大山啊啊啊',description:'只要坚持不懈，总会有成果！一直在模仿，从未被超越！只要坚持不懈，总会有成果！！一直在模仿，从未被超越！只要你想，你就可以！一直...'},
      {title:'我是李李大山啊啊',description:'只要坚持不懈，总会有成果！一直在模仿，从未被超越！只要坚持不懈，总会有成果！！一直在模仿，从未被超越！只要你想，你就可以！一直...'}
    ]
  )
  const [backImg,setBackImg] = useState('../../assets/1869457043.jpg')
  return(
    <div>
      <Head>
        <title>Home</title>
      </Head>
      <Header />
      <Row className="comm-main" type="flex" justify="center">
        <Col className="comm-left" xs={18} sm={18} md={16} lg={20} xl={14}  >
        <List
          grid={{ gutter: 35, column: 3 ,xs:1,sm:2, md:2,lg:3,xl:3}}
          dataSource={mylist}
          renderItem={item => (
            <List.Item className='comm-list'>
              <div className="list-top" style={{backgroundImage: `url(${backImg})`}}>
                <div className="list-mask">{item.description}</div>
                <div className="list-desco"></div>
              </div>
              <div className="list-title">
                <a>{item.title}</a>
              </div>
              <div className="list-footer">
                  <div className="list-time">Jan 17, 2019</div>
                  <div className="list-footer-tag">
                    <div className="list-label"><a>啊哈哈</a></div>
                    <div className="list-tag">
                      
                    </div>
                  </div>
                  
              </div>
            </List.Item>
          )}
        />
        </Col>
      </Row>
      {/* 分页器 */}
      <Pagination total={100}  defaultPageSize={12} showSizeChanger={false}/>
      {/* 底部 */}
      <Footer />
      {/* 返回顶部按钮 */}
      <BackTop>
        <div className="back-top">UP</div>
      </BackTop>
    </div>
  )
}
export default Home