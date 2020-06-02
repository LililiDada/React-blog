// 归档页面
import React,{useState} from 'react'
import Head from 'next/head'
import Link from 'next/link'
import Header from '../components/Header.js'
import Footer from '../components/Footer.js'
import "../public/style/pages/archives.css"
import {Row,Col,List,BackTop} from 'antd'
import axios from 'axios'
import  servicePath  from '../config/apiUrl'
const Archives = (list) => {
  const [postList,setPostList] = useState(list.data)

  // const postList =[
  //   {
  //     cateTitle:'Jan 2019',
  //     postList:[
  //       {
  //         title: '使用木木木有',
  //         date:'Jan 20,2019',
  //       },
  //       {
  //         title: 'Title 2',
  //         date:'Jan 20,2019',
  //       },
  //       {
  //         title: 'Title 3',
  //         date:'Jan 20,2019',
  //       },
  //       {
  //         title: 'Title 4',
  //         date:'Jan 20,2019',
  //       },
  //     ]
  //   },
  //   {
  //     cateTitle:'Jan 2019',
  //     postList:[
  //       {
  //         title: '使用木木木有',
  //         date:'Jan 20,2019',
  //       },
  //       {
  //         title: 'Title 2',
  //         date:'Jan 20,2019',
  //       },
  //       {
  //         title: 'Title 3',
  //         date:'Jan 20,2019',
  //       }
  //     ]
  //   }
  // ]
  return (
    <div className='blog-page'>
      <Head>
        <title>Archives</title>
        <link rel='stylesheet' href='/_next/public/style/pages/archives.css' />
      </Head>
      <Header />
      <Row className="comm-main archives-mian" type="flex" justify="center">
        <Col className="comm-left" xs={18} sm={18} md={16} lg={20} xl={14}  >
          <div className="categorys">
            {
              postList.map((item,index)=>{
                return(
                  <div key={index}>
                    <div className="categorys-title">{item.cateTitle}</div>
                    <List
                    grid={{ gutter: 35, column: 3 ,xs:1,sm:2, md:2,lg:3,xl:3}}
                    dataSource={item.postList}
                    renderItem={item => (
                      <List.Item className="post-list">
                        <div className="post-title">
                          <Link href={{pathname:'/detailed',query:{id:item.id}}}>
                            <a>
                              {item.title}
                            </a>
                          </Link>
                        </div>
                        <div className="post-date">
                          {item.date}
                        </div>
                      </List.Item>
                    )}
                    />
                  </div>
                )
              })
            }
            
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
Archives.getInitialProps = async()=>{
  const promise = new Promise((resolve)=>{
    axios(servicePath.getArchiveList).then(res=>{
      console.log(res.data)
      resolve(res.data)
    })
  })
  return await promise 
}
export default Archives