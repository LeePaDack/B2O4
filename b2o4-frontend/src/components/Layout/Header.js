import React, { useContext, useState } from "react";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Form from "react-bootstrap/Form";
import "../css/Layout.css";
import { Link, useNavigate } from "react-router-dom";
import MyPageContext from "../MyPageContext";
import MyPageModal from "../MyPage/MyPageModal";

const Header = () => {
  const { loginMember, setLoginMember } = useContext(MyPageContext);
  const navigate = useNavigate();

  const logout = () => {
    setLoginMember(null);
    localStorage.removeItem("loginMember");
    navigate("/");
  };

  const afterLoginNavigate = (number) => {
    switch (number) {
      case 1:
        loginMember ? navigate("/GoodsShop") : navigate("/Login");
        break;
      case 2:
        loginMember ? navigate("/ShoppingBasket") : navigate("/Login");
        break;
      case 3:
        loginMember ? navigate("/LiveStreamingPage") : navigate("/Login");
        break;
      case 4:
        loginMember ? navigate("/boardPosting") : navigate("/Login");
        break;
      case 5:
        loginMember ? navigate("/mypage") : navigate("/Login");
        break;
      default:
        break;
    }
  };
  const [keyword, setKeyword] = useState(""); // 검색어 상태
  const [searchResults, setSearchResults] = useState({
    stadiums: [],
    goods: [],
    gallery: [],
  });

  const handleKeywordChange = (e) => {
    setKeyword(e.target.value);
  };

  // 검색 처리 함수
  const handleSearch = async (e) => {
    e.preventDefault(); // 폼 제출 기본 동작 방지
    console.log("Search keyword:", keyword); // 디버깅용 로그
    navigate(`/search?keyword=${encodeURIComponent(keyword)}`); // 검색어를 쿼리 파라미터로 추가하여 이동
  };


  const [isModalOpen, setIsModalOpen] = useState(false); // 모달 열림 상태

  const openModal = () => {
    setIsModalOpen(true); // 모달 열기
  };

  const closeModal = () => {
    setIsModalOpen(false); // 모달 닫기
  };

  const handlePasswordCorrect = () => {
    setIsModalOpen(false); // 모달 닫기
    navigate("/mypage"); // 비밀번호가 맞으면 mypage로 이동
  };

  return (
    <header>
      <div className="header-top">
        <Link to="/" className="d-flex align-items-center">
          <img src="/images/logo.png" className="brand-logo" alt="Brand Logo" />
        </Link>
        <div className="total-search-bar">
          <Form className="d-flex" onSubmit={handleSearch}>
            <div className="search-input-container">
              <Form.Control
                type="text"
                placeholder="통합검색"
                className="search-input"
                value={keyword}
                onChange={handleKeywordChange}
              />
              <button type="submit" className="search-button">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-search"
                  viewBox="0 0 16 16"
                >
                  <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
                </svg>
              </button>
            </div>
          </Form>
        </div>
        <div className="login-session">
          {loginMember ? (
            <div>
              <p className="login-hypertext">
                {loginMember.memberName}님 환영합니다.
              </p>
              <button className="logout-button" onClick={logout}>
                로그아웃
              </button>
            </div>
          ) : (
            <Link to="/login" className="login-hypertext">
              로그인
            </Link>
          )}
        </div>
      </div>

      <div className="navbar-container">
        <Navbar expand="lg" className="navbar-items">
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse
            id="basic-navbar-nav"
            className="justify-content-center"
          >
            <Nav className="d-flex">
              <Nav.Link
                href="/galleryBoard"
                className="item"
                style={{ marginLeft: "140px" }}
              >
                갤러리
              </Nav.Link>
              <NavDropdown
                title="용품 장터"
                id="basic-nav-dropdown"
                className="item"
              >
                <NavDropdown.Item onClick={() => afterLoginNavigate(1)}>
                  메인 장터
                </NavDropdown.Item>
                <NavDropdown.Item href="/usedMarket">
                  중고 장터
                </NavDropdown.Item>
                <NavDropdown.Item onClick={() => afterLoginNavigate(2)}>
                  장바구니
                </NavDropdown.Item>
              </NavDropdown>
              <NavDropdown
                title="구장 모음"
                id="basic-nav-dropdown"
                className="item"
              >
                <NavDropdown.Item href="/StadiumList">
                  구장 목록
                </NavDropdown.Item>
                <NavDropdown.Item href="/StadiumSearch">
                  구장 찾기
                </NavDropdown.Item>
              </NavDropdown>
              <Nav.Link className="item" onClick={() => afterLoginNavigate(3)}>
                라이브
              </Nav.Link>
              <Nav.Link href="/boardMain" className="item">
                고객센터
              </Nav.Link>
              <NavDropdown
                title="마이페이지"
                id="basic-nav-dropdown"
                className="item"
              >
                <NavDropdown.Item onClick={openModal}>
                  내 정보 수정
                </NavDropdown.Item>
                <NavDropdown.Item href="/paymentDetails/:memberNo">
                  내 예약 정보보기
                </NavDropdown.Item>
                <NavDropdown.Item href="/userDeliveryInfo/:memberNo">
                  내 상품 결재 내역보기
                </NavDropdown.Item>
                <NavDropdown.Item href="/stadiumInfo">
                  평가하기
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </div>
      <MyPageModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onPasswordCorrect={handlePasswordCorrect}
      />
    </header>
  );
};
export default Header;
