import React,{useState,useEffect} from "react";
import marked from "marked";
import hljs from "highlight.js";
import "../static/AddArticle.css";
import {Row,Col,Input,Select,Button,DatePicker, message} from 'antd';
import servicePath from '../config/apiUrl'; 
import {request} from '../config/request';
const {Option} = Select;
const {TextArea} = Input;

function AddArticle(props){

    useEffect(() => {
        getTypeInfo();
        const tmpId = props.match.params.id;
        if(tmpId){
            setArticleId(tmpId);
            getArticleById(tmpId);
        }else{
            const data = JSON.parse(localStorage.getItem('data'))
            if(data){
                console.log(data)
                setData(data)
            }
        }
    }, [])

    const selectTypeHandler = (value)=>{
        setSelectedType(value)
        console.log(value)
    }
    const [articleId,setArticleId] = useState(0)  //文章的ID，如果是0说明是新增加，如果不时0，说明是修改
    const [articleTitle, setArticleTitle] = useState('') //文章标题
    const [articleContent, setArticleContent] = useState('')  //markdown的编辑内容
    const [markdownContent, setMarkdownContent] = useState('预览内容') //html内容
    const [introducemd, setIntroducemd] = useState() //简介的markdown内容
    const [introducehtml, setIntroducehtml] = useState('等待编辑')  // 简介的HTML内容
    const [showDate, setShowDate] = useState() //发布日期
    const [preDate, setPreDate] = useState("发布日期") //修改日期
    const [typeInfo, setTypeInfo] = useState([]) //文章类别信息
    const [selectedType, setSelectedType] = useState('请选择') //选择的文章类别

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

    const setData = (data)=>{
        setArticleTitle(data.title);
        setArticleContent(data.article_content);
        const html = marked(data.article_content)
        setMarkdownContent(html);
        setIntroducemd(data.introduce);
        const tmpInt = marked(data.introduce);
        setIntroducehtml(tmpInt);
        setShowDate(data.addTime);
        setPreDate(data.addTime)
        setSelectedType(data.typeId)
    }

    // 获取修改文章的数据
    const getArticleById = async (id)=>{
        const options = {
            method:'GET',
            url:servicePath.getArticleById+id
        }
        const res = await request(options);
        setData(res.data.data[0])
        // setArticleTitle(res.data.data[0].title);
        // setArticleContent(res.data.data[0].article_content);
        // const html = marked(res.data.data[0].article_content)
        // setMarkdownContent(html);
        // setIntroducemd(res.data.data[0].introduce);
        // const tmpInt = marked(res.data.data[0].introduce);
        // setIntroducehtml(tmpInt);
        // setShowDate(res.data.data[0].addTime);
        // setPreDate(res.data.data[0].addTime)
        // setSelectedType(res.data.data[0].typeId)
        // axios(servicePath.getArticleById+id,{
        //     headers:{
        //         'Access-Control-Allow-Origin':'*',
        //         'Authorization':localStorage.getItem('token')?`Bearer ${localStorage.getItem('token')}`:''
        //     }
        // }).then(res=>{
        //     console.log(res)
        //     setArticleTitle(res.data.data[0].title);
        //     setArticleContent(res.data.data[0].article_content);
        //     const html = marked(res.data.data[0].article_content)
        //     setMarkdownContent(html);
        //     setIntroducemd(res.data.data[0].introduce);
        //     const tmpInt = marked(res.data.data[0].introduce);
        //     setIntroducehtml(tmpInt);
        //     setShowDate(res.data.data[0].addTime);
        //     setSelectedType(res.data.data[0].typeId)
        // })
    }

    // 从中台得到文章类别信息
    const getTypeInfo = async ()=>{
        const options = {
            method:'GET',
            url:servicePath.getTypeInfo
        }
        const res = await request(options);
        if(res.data.data){
            setTypeInfo(res.data.data)
        }else{
            // 清除token
            localStorage.removeItem('token')
            props.history.push('/')
        }
        // axios({
        //     method:'GET',
        //     url:servicePath.getTypeInfo,
        //     headers:{
        //         'Access-Control-Allow-Origin':'*',
        //         'Authorization':localStorage.getItem('token')?`Bearer ${localStorage.getItem('token')}`:''
        //     }
        // }).then(res=>{
        //     if(res.data.data){
        //         setTypeInfo(res.data.data)
        //     }else{
        //         // 清除token
        //         localStorage.removeItem('token')
        //         props.history.push('/')
        //     }
        // })
    }

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

    const saveArticle = async()=>{
        if(selectedType === '请选择'){
            message.error('必须选择文章类别')
            return false
        }else if(!articleTitle){
            message.error('文章名称不能为空')
            return false
        }else if(!articleContent){
            message.error('文章内容不能为空')
            return false
        }else if(!introducemd){
            message.error('简介不能为空')
            return false
        }else if(!showDate || showDate === '发布日期'){
            message.error('发布日期不能为空')
            return false
        }
        message.success('检验通过')

        let dataProps={}
        dataProps.type_id = selectedType
        dataProps.title = articleTitle
        dataProps.article_content = articleContent
        dataProps.introduce = introducemd
        let datetext = showDate.replace('-','/');
        dataProps.addTime = (new Date(datetext).getTime())/1000  //把字符串转换成时间戳

        console.log(dataProps);

        //article=0时为发布文章
        if(articleId === 0){
            const options = {
                method:'POST',
                url:servicePath.addArticle,
                data:dataProps,
            }
            const res = await request(options);
            setArticleId(res.data.insertId)
            if(res.data.isSuccess){
                message.success('文章添加成功')
                localStorage.removeItem('data')
                let datas={
                    typeId : '请选择',
                    title :'',
                    article_content : '',
                    introduce : '',
                    addTime : '发布日期'
                }
                setData(datas);
            }else{
                message.error('文章添加失败')
            }
            // axios({
            //     method:'POST',
            //     url:servicePath.addArticle,
            //     headers:{
            //         'Access-Control-Allow-Origin':'*',
            //         'Authorization':localStorage.getItem('token')?`Bearer ${localStorage.getItem('token')}`:''
            //     },
            //     data:dataProps,
            // }).then(res=>{
            //     setArticleId(res.data.insertId)
            //     if(res.data.isSuccess){
            //         message.success('文章添加成功')
            //     }else{
            //         message.error('文章添加失败')
            //     }
            // })
        }else{
            dataProps.id = articleId;
            const options = {
                method:'POST',
                url:servicePath.updateArticle,
                data:dataProps,
            }
            const res = await request(options);
            if(res.data.isSuccess){
                message.success('文章修改成功')
                setTimeout(()=>{
                    props.history.go(-1)
                },2000)
            }else{
                message.error('文章修改失败！')
            }
            // axios({
            //     method:'POST',
            //     url:servicePath.updateArticle,
            //     headers:{
            //         'Access-Control-Allow-Origin':'*',
            //         'Authorization':localStorage.getItem('token')?`Bearer ${localStorage.getItem('token')}`:''
            //     },
            //     data:dataProps
            // }).then(res=>{
            //     if(res.data.isSuccess){
            //         message.success('文章修改成功')
            //     }else{
            //         message.error('文章修改失败！')
            //     }
            // })
        }
    }
    // 暂存文章
    const stagArticle =()=>{
        let dataProps={}
        dataProps.typeId = selectedType
        dataProps.title = articleTitle || ''
        dataProps.article_content = articleContent || ''
        dataProps.introduce = introducemd || ''
        dataProps.addTime = showDate || ''
        localStorage.setItem('data',JSON.stringify(dataProps));
        message.success('暂存文章成功！')
    }
    return(
        <div>
            <Row gutter={5}>
                <Col span={18}>
                    <Row gutter={10}>
                        <Col span={20}>
                            <Input size="large" placeholder="博客标题" onChange={e=>{setArticleTitle(e.target.value)}} value={articleTitle}/>
                        </Col>
                        <Col span={4}>
                            <Select defaultValue={selectedType} size="large" onChange={selectTypeHandler} style={{ width: 100 }}>
                                {
                                    typeInfo.map((item,index)=>{
                                        return(<Option key={index} value={item.id}>{item.typeName}</Option>)
                                    })
                                }
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
                            <Button size="large" onClick={stagArticle}>暂存文章</Button>
                            &nbsp;&nbsp;
                            <Button size="large" type="primary" onClick={saveArticle}>发布文章</Button>
                            <br />
                        </Col>
                        <Col span={24}>
                            <br />
                            <TextArea rows={4} placeholder="文章简介"
                            onChange={changeIntroduce}
                            value={introducemd} 
                            onPressEnter={changeIntroduce}
                            placeholder="文章简介"
                            ></TextArea>
                            <br /><br />
                            <div className="introduce-html" dangerouslySetInnerHTML={{__html:introducehtml}}></div>
                        </Col>
                        <Col span={24}>
                            <br />
                            <div>
                                <DatePicker placeholder={preDate} size="large" onChange={(date,dateString)=>setShowDate(dateString)}/>
                            </div>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </div>
    )
}

export default AddArticle