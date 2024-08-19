import React, { useState, useEffect, useCallback } from 'react';
import '../css/MainPage.css'; 

const DisplayWeather = (props) => {
    const cityValue = props.inputLocation;
    const key = 'fe9dd46de2db8b19d96bf53f5dd11283';

    const [weatherValue, setWeatherValue] = useState(null);
    const [forecastValue, setForecastValue] = useState([]);

    const currentLocation = useCallback(() => {
        return new Promise((resolve, reject) => {
            navigator.geolocation.getCurrentPosition(
                position => {
                    const latitude = position.coords.latitude;
                    const longitude = position.coords.longitude;
                    resolve({ latitude, longitude });
                },
                error => {
                    reject('error');
                },
            );
        });
    }, []);

    const getWeather = useCallback(async () => {
        try {
            const { latitude, longitude } = await currentLocation();

            const responseCurrent = await fetch(
                `https://api.openweathermap.org/data/2.5/weather?${cityValue ? 'q=' + cityValue : 'lat=' + latitude + '&lon=' + longitude
                }&appid=${key}&units=metric&lang=KR`,
            );

            const responseForecast = await fetch(
                `https://api.openweathermap.org/data/2.5/forecast?${cityValue ? 'q=' + cityValue : 'lat=' + latitude + '&lon=' + longitude
                }&appid=${key}&units=metric&lang=KR`,
            );

            const [dataCurrent, dataForecast] = await Promise.all([responseCurrent, responseForecast]);
            const resultCurrent = await dataCurrent.json();
            const resultForecast = await dataForecast.json();

            const oneDay = 1000 * 60 * 60 * 24;
            const offset = 1000 * 60 * 60 * 9;
            const current = new Date().getTime() + offset;
            const DesiredTime = ' 21:00:00';
            const oneDaysLater = new Date(current + oneDay).toISOString().slice(0, 10) + DesiredTime;
            const twoDaysLater = new Date(current + oneDay * 2).toISOString().slice(0, 10) + DesiredTime;
            const threeDaysLater = new Date(current + oneDay * 3).toISOString().slice(0, 10) + DesiredTime;

            const weatherData = resultForecast.list.filter(item => {
                return item.dt_txt === oneDaysLater || item.dt_txt === twoDaysLater || item.dt_txt === threeDaysLater;
            });

            setWeatherValue(resultCurrent);
            setForecastValue(weatherData);

            console.log(resultCurrent);
            console.log(weatherData);

        } catch (error) {
            console.error('Error: ', error);
            alert('⚠️ 위치를 받아올 수 없습니다. 영문으로 입력해주세요.');
        }
    }, [cityValue, key, currentLocation]);

    useEffect(() => {
        getWeather();
    }, [getWeather]);

    return (
        <>
            {weatherValue && (
                <div className='weather-background-img'>
                    <h2>{weatherValue.name}</h2>
                    <img className='main-weather-img'
                        src={`${process.env.PUBLIC_URL}/images/${weatherValue.weather[0].icon}.png`}
                        alt={`${weatherValue.weather[0].description}`}
                    />
                    <h3>
                        {parseInt(weatherValue.main.temp)}°C
                    </h3>
                    <h4>
                        현재 날씨는 <strong>{weatherValue.weather[0].description}</strong> 상태입니다.
                    </h4>
                    <ul>
                        <li>
                            <strong>습도</strong>
                            {weatherValue.main.humidity}
                        </li>
                        <li>
                            <strong>풍속</strong>
                            {weatherValue.wind.speed}
                        </li>
                    </ul>
                </div>
            )}
            {forecastValue.length > 0 && (
                <ul className='forecast-list'>
                    {forecastValue.map((item, index) => (
                        <li className='feature-weather' key={index}>
                            <h3>
                                {new Intl.RelativeTimeFormat("ko", {
                                    localeMatcher: "best fit",
                                    numeric: "always",
                                    style: "long",
                                }).format(index + 1, "day")}
                                <span>{item.dt_txt.slice(5, 10)}</span>
                            </h3>
                            <img
                                src={`${process.env.PUBLIC_URL}/images/${item.weather[0].icon}.png`}
                                alt=''
                            />
                            <h2>{parseInt(item.main.temp)}°C</h2>
                            <span>{item.weather[0].description}</span>
                        </li>
                    ))}
                </ul>
            )}
        </>
    );
};

export default DisplayWeather;
