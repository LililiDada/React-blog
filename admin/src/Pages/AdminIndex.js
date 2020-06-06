import React,{useState} from 'react';
import 'antd/dist/antd.css';
import '../static/AdminIndex.css'
import { Layout, Menu, Breadcrumb } from 'antd';
import {
  DesktopOutlined,
  EditOutlined,
  SmileOutlined,
  BranchesOutlined,
  AliwangwangOutlined
} from '@ant-design/icons';
import {Route} from "react-router-dom";
import AddArticle from "./AddArticle";
import ArticleList from './ArticleList';
import About from './About';
import Timeline from './Timeline';

const { Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

function AdminIndex(props){
    const [collapsed,setCollapsed]= useState(false)

  const onCollapse = collapsed => {
    console.log(collapsed);
    setCollapsed(collapsed)
  };

  const handleClick = e =>{
    console.log(e)
    if(e.key === 'articleList'){
      props.history.push('/index/')
    }else if(e.key === 'addArticle'){
      props.history.push('/index/add')
    }else if(e.key === 'about'){
      props.history.push('/index/about')
    }else{
      props.history.push('/index/timeline')
    }

  }
  return(
    <Layout style={{ minHeight: '100vh' }}>
        <Sider collapsible collapsed={collapsed} onCollapse={onCollapse} className='menu-list'>
          <div className="logo">
            <img src='/blog.png'/>
          </div>
          <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" onClick={handleClick}>
            <Menu.Item key="articleList" icon={<DesktopOutlined />}>
              工作台
            </Menu.Item>
            {/* <Menu.Item key="2" icon={<PieChartOutlined />}>
              添加文章
            </Menu.Item> */}
            <Menu.Item key="addArticle" icon={<EditOutlined />}>
              编辑文章
            </Menu.Item>
            {/* <SubMenu key="sub1" icon={<UserOutlined />} title="文章管理">
              <Menu.Item key="3">添加文章</Menu.Item>
              <Menu.Item key="4">文章列表</Menu.Item>
            </SubMenu> */}
            {/* <Menu.Item key="9" icon={<FileOutlined />}>
              叨叨管理
            </Menu.Item> */}
            <SubMenu key="sub1" icon={<SmileOutlined />} title="叨叨管理">
              <Menu.Item key="about" icon={<AliwangwangOutlined />}>关于我</Menu.Item>
              <Menu.Item key="timeline" icon={<BranchesOutlined />}>时间轴</Menu.Item>
            </SubMenu>
          </Menu>
        </Sider>
        <Layout className="site-layout" className={collapsed?'site-small':'site-big'}>
          <Content style={{ margin: '0 16px' }}>
            <Breadcrumb style={{ margin: '16px 0' }}>
              <Breadcrumb.Item>后台管理</Breadcrumb.Item>
              <Breadcrumb.Item>工作台</Breadcrumb.Item>
            </Breadcrumb>
            <div className="site-layout-background" style={{ padding: 24, minHeight: 360 ,background: '#fff'}}>
                <Route path="/index/add/" exact   component={AddArticle} />
                <Route path="/index/add/:id"  exact   component={AddArticle} />
                <Route path="/index/" exact  component={ArticleList} />
                <Route path="/index/about" exact  component={About} />
                <Route path="/index/timeline" exact  component={Timeline} />
            </div>
          </Content>
          <Footer style={{ textAlign: 'center' }}>李大山歪 ©2020 Created by Blog System</Footer>
        </Layout>
      </Layout>
  )
}

export default AdminIndex