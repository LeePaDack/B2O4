import React from "react";
import '../css/MainPage.css';
import MainPageCarousel from "./MainPageCarousel";
import MonthOfTheStadiumList from "./MonthOfTheStadiumList";
import GalleryList from "./GalleryList";
import RecommendedGears from "./RecommendedGears";
import Weather from "./Weather";

const Main = () => {

    return (
        <div className='main-container'>
            <div className='carousel-container'>
                <MainPageCarousel />
            </div>
            <div className="main-content row">
                <div className="recommended-content col-9">
                    <MonthOfTheStadiumList />
                    <GalleryList />
                    <RecommendedGears />
                </div>
                <div className="weather-container col-3">
                    <Weather/>
                </div>
            </div>
        </div>
    )
}
export default Main;