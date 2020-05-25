import React,{useState} from "react";
import marked from "marked";
import hljs from "highlight.js";
import "../static/AddArticle.css";
import {Row,Col,Input,Select,Button,DatePicker} from 'antd';
const {Option} = Select;
const {TextArea} = Input;

function AddArticle(){
    const handleChange = (value)=>{
        console.log(value)
    }

    const [articleId,setArticleId] = useState(0)  //文章的ID，如果是0说明是新增加，如果不时0，说明是修改
    const [articleTitle, setArticleTitle] = useState('') //文章标题
    const [articleContent, setArticleContent] = useState('')  //markdown的编辑内容
    const [markdownContent, setMarkdownContent] = useState('预览内容') //html内容
    const [introducemd, setIntroducemd] = useState() //简介的markdown内容
    const [introducehtml, setIntroducehtml] = useState('等待编辑')  // 简介的HTML内容
    const [showDate, setShowDate] = useState() //发布日期
    const [updateDate, setUpdateDate] = useState() //修改日期
    const [typeInfo, setTypeInfo] = useState([]) //文章类别信息
    const [selectedType, setSelectedType] = useState(1) //选择的文章类别

    const renderer = new marked.Renderer();
    marked.setOptions({
 
        renderer: renderer,
        gfm: true,
        pedantic: false,
        sanitize: false,
        tables: true,
        breaks: false,
        smartLists: true,
        smartypants: false,
        highlight: function (code) {
            return hljs.highlightAuto(code).value;
        }
      
      }); 

    // 文章内容
    const changeContent = (e) =>{
        setArticleContent(e.target.value);
        let html = marked(e.target.value);
        console.log(html)
        setMarkdownContent(html)
    }

    // 文章简介
    const changeIntroduce = (e) =>{
        setIntroducemd(e.target.value);
        let html = marked(e.target.value);
        setIntroducehtml(html)
    }

    return(
        <div>
            <Row gutter={5}>
                <Col span={18}>
                    <Row gutter={10}>
                        <Col span={20}>
                            <Input size="large" placeholder="博客标题"/>
                        </Col>
                        <Col span={4}>
                            <Select defaultValue="lucy" size="large" onChange={handleChange}>
                                <Option value="jack">Jack</Option>
                                <Option value="lucy">Lucy</Option>
                                <Option value="Yiminghe">yiminghe</Option>
                            </Select>
                        </Col>
                    </Row>
                    <br />
                    <Row gutter={10}>
                        <Col span={12}>
                            <TextArea
                            value={articleContent} 
                            className="markdown-content" rows={35}
                            onChange={changeContent}
                            onPressEnter={changeContent}
                            placeholder="文章内容"
                            />
                        </Col>
                        <Col span={12}>
                            <div className="show-html" dangerouslySetInnerHTML = {{__html:markdownContent}}>
                                
                            </div>
                        </Col>
                    </Row>
                    
                </Col>
                <Col span={6}>
                    <Row>
                        <Col span={24}>
                            <Button size="large">暂存文章</Button>
                            <Button size="large" type="primary">发布文章</Button>
                            <br />
                        </Col>
                        <Col span={24}>
                            <br />
                            <TextArea rows={4} placeholder="文章简介"
                            onChange={changeIntroduce}
                            onPressEnter={changeIntroduce}
                            placeholder="文章简介"
                            ></TextArea>
                            <br /><br />
                            <div className="introduce-html" dangerouslySetInnerHTML={{__html:introducehtml}}></div>
                        </Col>
                        <Col span={24}>
                            <br />
                            <div>
                                <DatePicker placeholder="发布日期" size="large" />
                            </div>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </div>
    )
}

export default AddArticle