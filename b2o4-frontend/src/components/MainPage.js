import React from "react";
import '../css/MainPage.css';
import MainPageCarousel from "./MainPageCarousel";
import StadiumList from "./StadiumList";
import GalleryList from "./GalleryList";
import RecommendedGears from "./RecommendedGears";
import DisplayWeather from "./DisplayWeather";

const Main = () => {

    return (
        <div className='main-container'>
            <div className='carousel-container'>
                <MainPageCarousel />
            </div>
            <div className="main-content row">
                <div className="recommended-content col-9">
                    <StadiumList />
                    <GalleryList />
                    <RecommendedGears />
                </div>
                <div className="weather-container col-3">
                    <DisplayWeather/>
                </div>
            </div>
        </div>
    )
}
export default Main;