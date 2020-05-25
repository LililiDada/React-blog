import React,{useState} from 'react';
import 'antd/dist/antd.css';
import '../static/AdminIndex.css'
import { Layout, Menu, Breadcrumb } from 'antd';
import {
  DesktopOutlined,
  PieChartOutlined,
  FileOutlined,
} from '@ant-design/icons';
import {Route, Router} from "react-router-dom";
import AddArticle from "./AddArticle";
const { Content, Footer, Sider } = Layout;
// const { SubMenu } = Menu;

function AdminIndex(){
    const [collapsed,seyCollapsed]= useState(false)

  const onCollapse = collapsed => {
    console.log(collapsed);
    seyCollapsed(collapsed)
  };

  return(
    <Layout style={{ minHeight: '100vh' }}>
        <Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
          <div className="logo" />
          <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
            <Menu.Item key="1" icon={<PieChartOutlined />}>
              工作台
            </Menu.Item>
            <Menu.Item key="2" icon={<DesktopOutlined />}>
              添加文章
            </Menu.Item>
            <Menu.Item key="3" icon={<DesktopOutlined />}>
              文章列表
            </Menu.Item>
            {/* <SubMenu key="sub1" icon={<UserOutlined />} title="文章管理">
              <Menu.Item key="3">添加文章</Menu.Item>
              <Menu.Item key="4">文章列表</Menu.Item>
            </SubMenu> */}
            <Menu.Item key="9" icon={<FileOutlined />}>
              叨叨管理
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout className="site-layout">
          <Content style={{ margin: '0 16px' }}>
            <Breadcrumb style={{ margin: '16px 0' }}>
              <Breadcrumb.Item>后台管理</Breadcrumb.Item>
              <Breadcrumb.Item>工作台</Breadcrumb.Item>
            </Breadcrumb>
            <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
              <Route path="/index/" exact component={AddArticle} />
            </div>
          </Content>
          <Footer style={{ textAlign: 'center' }}>李大山歪 ©2020 Created by Blog System</Footer>
        </Layout>
      </Layout>
  )
}

export default AdminIndex