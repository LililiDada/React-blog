// 详情页面
import React,{useState} from 'react'
import Head from 'next/head'
import Header from '../components/Header.js'
import Footer from '../components/Footer.js'
import servicePath from '../config/apiUrl.js'
import axios from 'axios'
import "../public/style/pages/detailed.css"
import {Row,Col,Affix} from 'antd'

import marked from 'marked'
import hljs from "highlight.js";
import 'highlight.js/styles/monokai-sublime.css';
import Tocify from '../components/tocify.tsx'


const Detailed = (props) => {
  const [tocify,setTocify] = useState(new Tocify())

  const renderer = new marked.Renderer();

  renderer.heading = function(text,level,raw){
    const anchor = tocify.add(text,level)
    return `<a id="${anchor}" href="#${anchor}" class="anchor-fix"><h${level}>${text}</h${level}></a>\n`;
  };

  marked.setOptions({
    renderer:renderer,
    gfm:true,
    pedantic:false,
    sanitize:false,
    breaks:false,
    smartLists:true,
    highlight:function(code){
      return hljs.highlightAuto(code).value;
    }
  });

  let html = marked(props.article_cointent)
  return (
    <div className="blog-page">
      <Head>
        <title>博客详情</title>
      </Head>
      <Header />
      <Row className="comm-main" type="flex" justify="center">
        <Col className="comm-left" xs={20} sm={18} md={16} lg={14} xl={10}>
          <div className="detailed-title">
            {props.title}
          </div>
  
          <div className="list-icon center">
            Published on {props.addTime} in {props.typeName}
          </div>
  
          <div className="detailed-content" dangerouslySetInnerHTML = {{__html:html}}>
          </div>
        </Col>
        <Col xs={0} sm={0} md={0} lg={4} xl={3}>
          <Affix offsetTop={9} className="article-menu">
              {tocify && tocify.render()}
          </Affix>
        </Col>
      </Row>
      {/* 底部 */}
      <Footer />
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