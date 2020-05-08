import react from 'react'
import '../public/style/components/header.css'
import Logo from '../public/assets/blog.png'
import {Row,Col,Menu} from 'antd'
import { SmileOutlined ,HomeOutlined ,BranchesOutlined} from '@ant-design/icons';
const Header = ()=>(

    <div className="header">
        <Row align="middle" justify="center">
            <Col xs={13} sm={10} md={10} lg={9} xl={9} className="header-title">
                <img className="header-logo" src={Logo} />
                <span className="header-txt">李大山歪</span>
            </Col>
            <Col xs={7} sm={8} md={8} lg={7} xl={7} className="header-menu">
                <Menu mode="horizontal">
                    <Menu.Item key="home">
                        <HomeOutlined />
                        首页
                    </Menu.Item>
                    <Menu.Item key="video">
                        <BranchesOutlined />
                        归档
                    </Menu.Item>
                    <Menu.Item key="life">
                        <SmileOutlined />
                        生活
                    </Menu.Item>
                </Menu>
            </Col>
        </Row>
    </div>
)

export default Header