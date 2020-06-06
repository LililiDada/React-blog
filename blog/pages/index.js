import React,{useState} from 'react'
import Head from 'next/head'
import Link from 'next/link'
import axios from 'axios'
import Header from '../components/Header.js'
import Footer from '../components/Footer.js'
import '../public/style/pages/index.css'
import  servicePath  from '../config/apiUrl'
import {Row,Col,List,BackTop,Pagination} from 'antd'
const Home = (list) => {
  const [mylist,setMylist] = useState(list.data)
  const [myCount,setmyCount] = useState(list.count)
  const [backImg,setBackImg] = useState(()=>{
    return '../../assets/1869457043.jpg';
  })

  // 分页
  const onChange = async(page) => {
    await new Promise((resolve)=>{
      let offset =  servicePath.ArticleListNum * (page-1)//偏移量
      axios(servicePath.getArticleList + offset).then((res)=>{
        // res.data.data.forEach((item)=>{
        //   let num =  parseInt(Math.random()*10)
        //   item.num = num
        // })
        // console.log(res.data.data)
        setMylist(res.data.data)
      })
    })
  };
  return(
    <div className='blog-page'>
      <Head>
        <title>首页 | 大山歪-冲就完事了</title>
        <meta name="description" content="首页 | 大山歪-冲就完事了"></meta>
      </Head>
      <Header />
      <Row className="comm-main" type="flex" justify="center">
        <Col className="comm-left" xs={18} sm={18} md={16} lg={20} xl={15}  >
        <List
          grid={{ gutter: 35, column: 3 ,xs:1,sm:2, md:2,lg:3,xl:3}}
          dataSource={mylist}
          renderItem={item => (
            <List.Item className='comm-list'>
              <Link  href={{pathname:'/detailed',query:{id:item.id}}} >
                <a>
                  <div className="list-top" style={{backgroundImage: `url(/assets/9l8e0e9s1h9a${item.id%20<10?'0'+item.id%20:item.id%20}.jpg)`}}>
                    <div className="list-mask">
                          { item.intorduce.substr(0,[80]) }
                          { item.intorduce.length>80 ? <span>...</span> : null }
                    </div>
                    <div className="list-desco"></div>
                  </div>
                </a>
              </Link>
              
              <div className="list-title">
              <Link  href={{pathname:'/detailed',query:{id:item.id}}} ><a>{item.title}</a></Link>
              </div>
              <div className="list-footer">
                  <div className="list-time">{item.addTime}</div>
                  <div className="list-footer-tag">
                    <div className="list-label"><a>{item.typeName}</a></div>
                    <div className="list-tag">
                      <img src={`/assets/icon/202005150${item.id%10}.png`} className="list-tag-img" />
                    </div>
                  </div>
                  
              </div>
            </List.Item>
          )}
        />
        </Col>
      </Row>
      {/* 分页器  */}
      <Pagination total={myCount} defaultPageSize={servicePath.ArticleListNum} showSizeChanger={false} onChange={onChange} hideOnSinglePage={true}/>
     
      {/* 底部 */}
      <Footer />
      {/* 返回顶部按钮 */}
      <BackTop>
        <div className="back-top">UP</div>
      </BackTop>
    </div>
  )
}
Home.getInitialProps = async () =>{
  const promise = new Promise((resolve)=>{
    axios(servicePath.getArticleList + 0).then((res)=>{
      // res.data.data.forEach((item)=>{
      //   let num =  parseInt(Math.random()*10)
      //   item.num = num
      // })
      resolve(res.data)
    })
  })
  return await promise
}
export default Home