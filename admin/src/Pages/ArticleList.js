import React,{useState,useEffect} from 'react';
import '../static/ArticleList.css';
import {List,Row,Col,Modal,message,Button,Pagination } from 'antd';
import axios from 'axios';
import servicePath from '../config/apiUrl';
import { request } from '../config/request';
const { confirm } = Modal;

function ArticleList(props){
    const [list,setList] = useState([]);
    const [count,setCount] = useState();

    useEffect(() => {
        (async ()=> {
            const options ={
                method:'GET',
                url:servicePath.getArticleList + 0,
            }
            const res = await request(options);
            if(res.data.list){
                setList(res.data.list)
                setCount(list.count);
            }else{
                // 清除token
                localStorage.removeItem('token')
                props.history.push('/')
            }
        })();
        
        // axios({
        //     method:'GET',
        //     url:servicePath.getArticleList + 0,
        //     headers:{
        //         'Access-Control-Allow-Origin':'*',
        //         'Authorization':localStorage.getItem('token')?`Bearer ${localStorage.getItem('token')}`:''
        //     }
        // }).then(res=>{
        //     console.log(res);
        //     if(res.data.list){
        //         setList(res.data.list)
        //         setCount(list.count);
        //     }else{
        //         // 清除token
        //         localStorage.removeItem('token')
        //         props.history.push('/')
        //     }
        // })
    }, [])

    // 分页
    const onChange = async (page) => {
        let offset =  servicePath.ArticleListNum * (page-1)//偏移量
        const options = {
            method:"GET",
            url:servicePath.getArticleList + offset
        }
        const res = await request(options);
        setList(res.data.list);
    };

    // 修改文章
    const updateArticle =(id)=>{
        props.history.push('/index/add/'+id);
    }

    // 删除文章
    const delArticle =(id)=>{
        confirm({
            title:'确定要删除这篇博客文章吗？',
            content:'如果你点击OK按钮，文章将会永远被删除，无法恢复！',
            async onOk(){
                const options = {
                    method:'GET',
                    url:servicePath.delArticle+id
                }
                const res = await request(options);
                if(res.data.data.affectedRows){
                    setList(list.filter(item=> item.id !== id ))
                    setCount(count-1);
                    message.success('文章删除成功');
                }
                // axios({
                //     method:'GET',
                //     url:servicePath.delArticle+id,
                //     headers:{
                //         'Access-Control-Allow-Origin':'*',
                //         'Authorization':localStorage.getItem('token')?`Bearer ${localStorage.getItem('token')}`:''
                //     }
                // }).then(res=>{
                //     console.log(res);
                //     if(res.data.data.affectedRows){
                //         setList(list.filter(item=> item.id !== id ))
                //         setCount(count-1);
                //         message.success('文章删除成功');
                //     }
                    
                // })
                
            },
            onCancel(){
                message.success('没有任何改变！')
            }
        })
    }
    return(
        <div>
            <List
                header={
                    <Row className="list-div">
                        <Col span={5}><b>标题</b></Col>
                        <Col span={2}><b>类别</b></Col>
                        <Col span={11}><b>简介</b></Col>
                        <Col span={2}><b>发布时间</b></Col>
                        <Col span={3}><b>操作</b></Col>
                    </Row>
                }
                bordered
                dataSource={list}
                renderItem={item => (
                    <List.Item className="item-list">
                        <Row className="list-div">
                            <Col span={5} className="title-item">{item.title}</Col>
                            <Col span={2}>{item.typeName}</Col>
                            <Col span={11} className="introduce-item">{item.introduce.length>150?item.introduce.substring(0,150)+'...':item.introduce}</Col>
                            <Col span={2}>{item.addTime}</Col>
                            <Col span={3}>
                                <Button type="primary" onClick={()=>{updateArticle(item.id)}}>修改</Button>
                                &nbsp;
                                <Button type="primary" danger onClick={()=>{delArticle(item.id)}}>删除 </Button>    
                            </Col>
                        </Row>
                    </List.Item>
                )}
            />
            <Pagination total={count} className="page-list" pageSize={7} hideOnSinglePage={true} onChange={onChange}/>
        </div>
    )
}
export default ArticleList