import React from "react";
import '../css/MainPage.css';
import MainPageCarousel from "./MainPageCarousel";
import StadiumList from "./StadiumList";
import GalleryList from "./GalleryList";
import RecommendedGears from "./RecommendedGears";

const Main = () => {

    return (
        <div className='main-container'>
            <div className='carousel-container'>
                <MainPageCarousel/>
            </div>
            <StadiumList/>
            <GalleryList/>
            <RecommendedGears/>
        </div>
    )
}
export default Main;