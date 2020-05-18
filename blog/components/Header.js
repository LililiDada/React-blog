import react,{useState} from 'react'
import '../public/style/components/header.css'
import Logo from '../public/assets/blog.png'
import {Row,Col,Menu} from 'antd'
import { SmileOutlined ,HomeOutlined ,BranchesOutlined} from '@ant-design/icons';
import Link from 'next/link'
const Header = ()=>{

    return (
        <div className="header">
        <Row align="middle" justify="center">
            <Col xs={13} sm={10} md={10} lg={11} xl={9} className="header-title">
                <img className="header-logo" src={Logo} />
                <span className="header-txt">李大山歪</span>
            </Col>
            <Col xs={7} sm={8} md={8} lg={9} xl={7} className="header-menu">
                <Menu mode="horizontal">
                    <Menu.Item key="index">
                        <Link href={{pathname:'/'}}>
                            <a>
                                <HomeOutlined />
                                首页
                            </a>
                        </Link>
                        
                    </Menu.Item>
                    <Menu.Item key="archives">
                        <Link href={{pathname:'/archives'}}>
                            <a>
                                <BranchesOutlined />
                                归档
                            </a>
                        </Link>
                    </Menu.Item>
                    <Menu.Item key="about" className='life'>
                        <Link href={{pathname:'/about'}}>
                            <a>
                                <SmileOutlined />
                                叨叨
                            </a>
                        </Link>
                    </Menu.Item>
                </Menu>
            </Col>
        </Row>
    </div>
    )
}

export default Header