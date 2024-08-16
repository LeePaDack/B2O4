import { useState } from "react";
import Carousel from 'react-bootstrap/Carousel';
import '../css/MainPage.css';
import { Link } from "react-router-dom";

const MainPageCarousel = () => {
    const [index, setIndex] = useState(0);

    const handleSelect = (selectedIndex) => {
        setIndex(selectedIndex);
    };

    return (
        <Carousel activeIndex={index} onSelect={handleSelect}>
            <Carousel.Item className='carousel-item'>
                <Link to="/galleryBoard">
                    <img src="/images/p1065618386918309_213_thum.jpg" alt='캐러셀 이미지 1' />
                </Link>
                <Carousel.Caption className='carousel-caption-text'>
                    <h3>갤러리 게시판</h3>
                    <p>멋진 순간들을 공유하세요</p>
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item className='carousel-item'>
                <Link to="/GoodsShop">
                    <img src="/images/79496227.3.jpg" alt='캐러셀 이미지 2' />
                </Link>
                <Carousel.Caption className='carousel-caption-text'>
                    <h3>스포츠 용품</h3>
                    <p>경기에 나설 준비, 여기서 시작해보세요</p>
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item className='carousel-item'>
                <Link to="/LiveStreamingPage">
                    <img src="/images/AKR20230619077100007_01_i_P4.jpg" alt='캐러셀 이미지 3' />
                </Link>
                <Carousel.Caption className='carousel-caption-text'>
                    <h3>이벤트 라이브 중계</h3>
                    <p>지금 진행 중인 경기 실황을 놓치지 마세요</p>
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item className='carousel-item'>
                <Link to="/StadiumList">
                    <img src="/images/s4_01_soccer_img5.jpg" alt='캐러셀 이미지 4' />
                </Link>
                <Carousel.Caption className='carousel-caption-text'>
                    <h3>구장 보러가기</h3>
                    <p>친구들과, 또는 동료들과 함께 뛸 구장을 찾아보세요</p>
                </Carousel.Caption>
            </Carousel.Item>
        </Carousel>
    )
}
export default MainPageCarousel;