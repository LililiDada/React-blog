// 详情页面
import React from 'react'
import Head from 'next/head'
import Header from '../components/Header.js'
import Footer from '../components/Footer.js'
import servicePath from '../config/apiUrl.js'
import MarkNav from 'markdown-navbar';
import axios from 'axios'
import 'markdown-navbar/dist/navbar.css';
import "../public/style/pages/detailed.css"
import ReactMarkdown from 'react-markdown'
import {Row,Col,Affix} from 'antd'
const Detailed = () => {
  let markdown='## P01:课程介绍和环境搭建\n' +
  '[ **M** ] arkdown + E [ **ditor** ] = **Mditor**  \n' +
  '> Mditor 是一个简洁、易于集成、方便扩展、期望舒服的编写 markdown 的编辑器，仅此而已... \n\n' +
   '**这是加粗的文字**\n\n' +
  '*这是倾斜的文字*`\n\n' +
  '***这是斜体加粗的文字***\n\n' +
  '~~这是加删除线的文字~~ \n\n'+
  '\`console.log(111)\` \n\n'+
  '## p02:来个Hello World 初始Vue3.0\n' +
  '> aaaaaaaaa\n' +
  '>> bbbbbbbbb\n' +
  '>>> cccccccccc\n'+
  '***\n\n\n' +
  '## p03:Vue3.0基础知识讲解\n' +
  '> aaaaaaaaa\n' +
  '>> bbbbbbbbb\n' +
  '>>> cccccccccc\n\n'+
  '## p04:Vue3.0基础知识讲解\n' +
  '> aaaaaaaaa\n' +
  '>> bbbbbbbbb\n' +
  '>>> cccccccccc\n\n'+
  '## p05:Vue3.0基础知识讲解\n' +
  '> aaaaaaaaa\n' +
  '>> bbbbbbbbb\n' +
  '>>> cccccccccc\n\n'+
  '## p06:Vue3.0基础知识讲解\n' +
  '> aaaaaaaaa\n' +
  '>> bbbbbbbbb\n' +
  '>>> cccccccccc\n\n'+
  '## p07:Vue3.0基础知识讲解\n' +
  '> aaaaaaaaa\n' +
  '>> bbbbbbbbb\n' +
  '>>> cccccccccc\n\n'+
  '``` var a=11; ```'
  return (
    <div>
      <Head>
        <title>博客详情</title>
      </Head>
      <Header />
      <Row className="comm-main" type="flex" justify="center">
        <Col className="comm-left" xs={20} sm={18} md={16} lg={14} xl={10}>
          <div className="detailed-title">
            React实战视频教程-技术胖Blog开发(更新08集)
          </div>
  
          <div className="list-icon center">
            Published on Apr 1, 2018 in Notes
          </div>
  
          <div className="detailed-content" >
            {/* 左侧任何时候都不要轻轻一爱德华读好书说下哈数学课插上了科学哈熟地黄拉丝机回到家了真实性数据库中那相差少女心控制层你收藏仅支持紫禁城内自行车你h在哪吃，在线陈 */}
            <ReactMarkdown 
              source={markdown} 
              escapeHtml={false}  
            />
          </div>
        </Col>
        <Col xs={0} sm={0} md={0} lg={5} xl={4}>
          <Affix offsetTop={9}>
              <MarkNav
                className="article-menu"
                source={markdown}
                ordered={false}
              />
          </Affix>
        </Col>
      </Row>
      {/* 底部 */}
      {/* <Footer /> */}
    </div>
  )
}

Detailed.getInitialProps = async(context)=>{
  let id = context.query.id;
  const promise = new Promise((resolve)=>{
    axios(servicePath.getArticleById+id).then((res)=>{
      console.log(res.data.data[0])
      resolve(res.data.data[0])
    })
  })
  return await promise
}
export default Detailed