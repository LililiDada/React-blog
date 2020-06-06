import React,{useState,useEffect} from "react";
import {Row,Col,Button, message,List,BackTop ,Modal} from 'antd';
import  '../static/About.css';
import AddModal from "../components/AddModal";
import { request } from "../config/request";
import servicePath from "../config/apiUrl";
import { ExclamationCircleOutlined } from '@ant-design/icons';
const { confirm } = Modal;
function About(props){
    const [list,setList] =useState([]);
    const [visible, setVisible] = useState(false);
    const [record,setRecord] = useState();
    const [id,setId] = useState(0);
    const [updateDate,setUpdateDate] = useState()

    useEffect(() => {
        
        (async()=>{
            const options ={
                method:'GET',
                url:servicePath.getAboutTime,
            }
            const res = await request(options);
            if(res.data.list){
                console.log(res.data.list);
                setList(res.data.list)
            }else{
                // 清除token
                localStorage.removeItem('token')
                props.history.push('/')
            }
        })();
    }, [])

    // 修改按钮
    const updateAbout = (item) =>{
        setVisible(true);
        setRecord(item.content);
        console.log(item)
        // 设置为修改
        setId(item.id)
        setUpdateDate(item.createTime)
    }

    // 添加按钮
    const addRecord = ()=>{
        setVisible(true);
        // 设置为添加
        setId(0);
    }

    // 删除按钮
    const delAbout = async(id) =>{
        confirm({
            title: '确定要删除这条记录？',
            icon: <ExclamationCircleOutlined />,
            content: '如果你点击OK按钮，记录将会永远被删除，无法恢复',
            async onOk() {
                const options={
                    method:"GET",
                    url:servicePath.delAbout+id
                }
                const res = await request(options);
                if(res.data.isSuccess){
                    setList(list.filter(item=> item.id !== id ))
                    message.success('记录删除成功')
                }else{
                    message.error('记录修改失败！')
                }
            },
            onCancel() {
                message.success('没有任何改变！')
            },
        });
    }
    
    // 弹出层添加/修改记录
    const onOK =async () => {
     if(id){
        const options={
            method:"POST",
            url:servicePath.updateAbout,
            data:{
                type:1,
                content:record,
                id:id,
                create_time: (new Date(updateDate).getTime())/1000
            }
        }
        const res = await request(options);
        if(res.data.isSuccess){
            list.forEach(item=>{
                if(item.id === id){
                    item.content = record
                }
            })
            setList(list)
            message.success("修改‘时间轴’记录成功！")
            setVisible(false);
        }else{
            message.error("修改‘时间轴’记录失败！")
        }
     }else{
        const options={
            method:"POST",
            url:servicePath.addAbout,
            data:{
                type:1,
                content:record,
                create_time: Math.round(new Date() / 1000)
            }
        }
        const res = await request(options);
         if(res.data.isSuccess){
            message.success("添加‘时间轴’记录成功！")
            setVisible(false);
            const dataProps = {
                id:res.data.insertId,
                content:record,
                createTime:new Date().toLocaleDateString()
            }
            setList([dataProps,...list]);
         }else{
            message.error("添加‘时间轴’记录失败！")
         }
     }
     console.log(record)
     setRecord();
    };

    // 添加/修改文本框
    const changeRecord = (e) =>{
        console.log(e.target.value);
        setRecord(e.target.value);
    }

    

    return (
        <div className="about-page">
            <Button type="primary" className="add-about" onClick={addRecord}>添加</Button>
            <AddModal
                visible={visible}
                onCancel={() => {
                    setVisible(false);
                    setRecord();
                }}
                onOK={onOK}
                changeRecord={changeRecord}
                record={record}
            />
            <List
                header={
                    <Row>
                        <Col span={17}><b>内容</b></Col>
                        <Col span={3}><b>发布时间</b></Col>
                        <Col span={3}><b>操作</b></Col>
                    </Row>
                }
                bordered
                dataSource={list}
                pagination={{
                    pageSize: 5,
                  }}
                renderItem={item => (
                    <List.Item className="item-list">
                        <Row className="list-div">
                            <Col span={17} className="title-item">{item.content}</Col>
                            <Col span={3}>{item.createTime}</Col>
                            <Col span={3}>
                                <Button type="primary" onClick={()=>{updateAbout(item)}}>修改</Button>
                                &nbsp;
                                <Button type="primary" danger onClick={()=>{delAbout(item.id)}}>删除 </Button>    
                            </Col>
                        </Row>
                    </List.Item>
                )}
            />
            {/* <BackTop visibilityHeight={100}>
                <div className='about-up'>UP</div>
            </BackTop> */}
        </div>
    )
}

export default About