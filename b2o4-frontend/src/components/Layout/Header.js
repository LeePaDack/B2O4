import React from "react";
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

const Header = () => {

    return (
        <Navbar expand="lg" className="bg-body-tertiary">
            <Navbar.Brand href="Main" className="d-flex align-items-center" style={{ marginLeft: "20px" }}>
                <img src="/image/pngwing.com.png" style={{ width: "180px", height: "100px" }} alt="Brand Logo" className="brand-logo" />
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Form inline>
                <Row>
                    <Col xs="auto">
                        <Form.Control
                            type="text"
                            placeholder="Search"
                            className=" mr-sm-2"
                        />
                    </Col>
                    <Col xs="auto">
                        <Button type="submit">Submit</Button>
                    </Col>
                </Row>
            </Form>
            <Navbar.Collapse id="basic-navbar-nav" className="justify-content-center">
                <Nav className="d-flex">
                    <Nav.Link href="#link" className="mx-3">갤러리</Nav.Link>
                    <NavDropdown title="용품 장터" id="basic-nav-dropdown" className="mx-3">
                        <NavDropdown.Item href="#action/3.1">메인 장터</NavDropdown.Item>
                        <NavDropdown.Item href="#action/3.2">중고 장터</NavDropdown.Item>
                        <NavDropdown.Item href="#action/3.3">장바구니</NavDropdown.Item>
                    </NavDropdown>
                    <NavDropdown title="구장 모음" id="basic-nav-dropdown" className="mx-3">
                        <NavDropdown.Item href="#action/3.1">구장 목록</NavDropdown.Item>
                        <NavDropdown.Item href="#action/3.2">구장 찾기</NavDropdown.Item>
                    </NavDropdown>
                    <NavDropdown title="라이브" id="basic-nav-dropdown" className="mx-3">
                        <NavDropdown.Item href="#action/3.1">라이브 경기 보러 가기</NavDropdown.Item>
                    </NavDropdown>
                    <NavDropdown title="고객센터" id="basic-nav-dropdown" className="mx-3">
                        <NavDropdown.Item href="#action/3.1">1:1문의</NavDropdown.Item>
                        <NavDropdown.Item href="#action/3.2">FAQ</NavDropdown.Item>
                    </NavDropdown>
                    <NavDropdown title="마이페이지" id="basic-nav-dropdown" className="mx-3">
                        <NavDropdown.Item href="#action/3.1">내 정보 수정</NavDropdown.Item>
                        <NavDropdown.Item href="#action/3.2">평가하기</NavDropdown.Item>
                    </NavDropdown>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    )
}
export default Header;