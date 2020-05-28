import React,{useState} from 'react';
import 'antd/dist/antd.css';
import {Card,Input,Button,Spin,message} from 'antd';
import { UserOutlined,LockOutlined } from '@ant-design/icons';
import axios from 'axios';
import servicePath from '../config/apiUrl';
import "../static/Login.css";
import {login}  from '../config/request';

function Login(props){
    const [userName,setUserName] = useState('');
    const [passWord,setpassWord] = useState('');
    const [isLoading,setisLoading] = useState(false);
    const checkLogin =async ()=>{
        setisLoading(true);
        if(!userName){
            setisLoading(false)
            message.error('用户名不能为空');
            return false;
        }else if(!passWord){
            setisLoading(false)
            message.error('密码不能为空');
            return false;
        }
        let dataProps = {
            'userName':userName,
            'passWord':passWord
        };
        const options = {
            method:'post',
            url:servicePath.login,
            data:dataProps
        }
        const res  = await login(options);
        setisLoading(false)
        if(res.data.data==='登录成功'){
            localStorage.setItem('token',res.data.token)
            props.history.push('/index')
        }else{
            message.error(res.data.msg)
        }
        
       
        // axios({
        //     method:'post',
        //     url:servicePath.login,
        //     data:dataProps
        // }).then(res=>{
        //     console.log(res);
        //     setisLoading(false)
        //     if(res.data.data==='登录成功'){
        //         // 缓存token
        //         localStorage.setItem('token',res.data.token)
        //         props.history.push('/index')
        //     }else{
        //         message.error(res.data.msg)
        //     }
        // })
    };
    return(
        <div className="login-div">
            <Spin tip="Loading..." spinning={isLoading}>
                <Card title="李大山歪 Blog System" bordered={true} style={{ width: 400 }}>
                    <Input 
                        id="userName"
                        size="large"
                        placeholder="Enter your userName"
                        prefix={<UserOutlined />}
                        onChange={(e)=>{setUserName(e.target.value)}}
                    />
                    <br /><br />
                    <Input.Password
                        id="password"
                        size="large"
                        placeholder="Enter your passWord"
                        prefix={<LockOutlined />}
                        onChange={(e)=>{setpassWord(e.target.value)}}
                    />     
                    <br /><br />
                    <Button type="primary" size="large" onClick={checkLogin}> Login in </Button>
                </Card>
            </Spin>
        </div>
    )
}
export default Login