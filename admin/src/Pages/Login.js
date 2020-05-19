import React,{useState} from 'react';
import 'antd/dist/antd.css';
import {Card,Input,Button,Spin} from 'antd';
import { UserOutlined,LockOutlined} from '@ant-design/icons';
import "../static/Login.css"
function Login(){
    const [userName,setUserName] = useState('');
    const [passWord,setpassWord] = useState('');
    const [isLoading,setisLoading] = useState(false);
    const checkLogin =()=>{
        setisLoading(true);
        setTimeout(()=>{
            setisLoading(false)
        },1000)
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