import React, { useContext } from "react";
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Form from 'react-bootstrap/Form';
import '../css/Layout.css';
import { Link } from "react-router-dom";
import Button from "react-bootstrap/esm/Button";
import MyPageContext from "../MyPageContext";


const Header = () => {
    const {loginMember, setLoginMember} = useContext(MyPageContext);

    return (
        <header>
            <div className="header-top">
                <Link to="/" className="d-flex align-items-center">
                    <img src="/pngwing.com.png" className="brand-logo" alt="Brand Logo" />
                </Link>
                <div className="search-bar">
                    <Form className="d-flex">
                        <div className="search-input-container">
                            <Form.Control type="text" placeholder="통합검색" className="search-input" />
                            <button type="submit" className="search-button">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-search" viewBox="0 0 16 16">
                                    <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
                                </svg>
                            </button>
                        </div>
                    </Form>
                </div>
                <div className="login-session">
                {/* 
                {isLogin ?
                <div>
                    <p>{memberName}님 환영합니다.</p>
                    <a href="#">로그아웃</a>  
                </div>  
                :
                    <a className="login-hypertext">로그인</a>
                }
                */}
                {loginMember ?
                <div>
                    <p className="login-hypertext">{loginMember.memberId}님 환영합니다.</p>
                    <a href="/" className="login-hypertext">로그아웃</a>  
                </div>  
                :
                <Button className="login-hypertext" href="/login">로그인</Button>
                }
                </div>
                
            </div>

            <div className="navbar-container">
                <Navbar expand="lg" className="navbar-items">
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav" className="justify-content-center">
                        <Nav className="d-flex">
                            <Nav.Link href="/galleryBoard" className="item" style={{ marginLeft: "140px" }}>갤러리</Nav.Link>
                            <NavDropdown title="용품 장터" id="basic-nav-dropdown" className="item">
                                <NavDropdown.Item href="#action/3.1">메인 장터</NavDropdown.Item>
                                <NavDropdown.Item href="#action/3.2">중고 장터</NavDropdown.Item>
                                <NavDropdown.Item href="#action/3.3">장바구니</NavDropdown.Item>
                            </NavDropdown>
                            <NavDropdown title="구장 모음" id="basic-nav-dropdown" className="item">
                                <NavDropdown.Item href="#action/3.1">구장 목록</NavDropdown.Item>
                                <NavDropdown.Item href="#action/3.2">구장 찾기</NavDropdown.Item>
                            </NavDropdown>
                            <NavDropdown title="라이브" id="basic-nav-dropdown" className="item">
                                <NavDropdown.Item href="LiveStreamingPage">라이브 경기 보러 가기</NavDropdown.Item>
                            </NavDropdown>
                            <NavDropdown title="고객센터" id="basic-nav-dropdown" className="item">
                                <NavDropdown.Item href="#action/3.1">1:1문의</NavDropdown.Item>
                                <NavDropdown.Item href="#action/3.2">FAQ</NavDropdown.Item>
                            </NavDropdown>
                            <NavDropdown title="마이페이지" id="basic-nav-dropdown" className="item">
                                <NavDropdown.Item href="#action/3.1">내 정보 수정</NavDropdown.Item>
                                <NavDropdown.Item href="#action/3.2">평가하기</NavDropdown.Item>
                            </NavDropdown>
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
            </div>
        </header>
    )
}
export default Header;