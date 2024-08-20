import React, { useState, useEffect } from 'react';
import '../css/MainPage.css';
import weatherDescKo from './WeatherDescKo'; // 

const DisplayWeather = () => {

    const [weatherValue, setWeatherValue] = useState(null);
    const [forecastValue, setForecastValue] = useState([]);
    const key = 'fe9dd46de2db8b19d96bf53f5dd11283';
    
    //기상정보 번역 가져오기
    const getWeatherDescKo = (code) => {
        const desc = weatherDescKo.find(item => item[code]);
        return desc ? desc[code] : '정보 없음';
    };

    //요일 계산
    const getDayOfWeek = (dateStr) => {
        const daysOfWeek = ["일", "월", "화", "수", "목", "금", "토"];
        const date = new Date(dateStr);
        return daysOfWeek[date.getDay()];
    };

    //위치 정보 허용했을 때 위치 정보 가져옴
    const currentLocation = () => {
        return new Promise((resolve, reject) => {
            navigator.geolocation.getCurrentPosition(
                position => {
                    const latitude = position.coords.latitude;
                    const longitude = position.coords.longitude;
                    resolve({ latitude, longitude });                 
                },
                error => {
                    reject(error);
                }
            );
        });
    };

    useEffect(() => {
        const getWeather = async () => {
            try {
                const { latitude, longitude } = await currentLocation();
                
                const responseCurrent = await fetch(
                    `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${key}&units=metric&lang=KR`,
                );
                
                const responseForecast = await fetch(
                    `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${key}&units=metric&lang=KR`,
                );

                if (!responseCurrent.ok || !responseForecast.ok) {
                    throw new Error('네트워크 응답이 좋지 않습니다.');
                }

                const resultCurrent = await responseCurrent.json();
                const resultForecast = await responseForecast.json();

                const oneDay = 1000 * 60 * 60 * 24;
                const offset = 1000 * 60 * 60 * 9;
                const current = new Date().getTime() + offset;
                const DesiredTime = ' 21:00:00';
                const futureDates = Array.from({ length: 5 }, (_, i) =>
                    new Date(current + oneDay * i).toISOString().slice(0, 10) + DesiredTime
                );

                const weatherData = resultForecast.list.filter(item => {
                    return futureDates.includes(item.dt_txt);
                });

                setWeatherValue(resultCurrent);
                setForecastValue(weatherData);

                console.log(resultCurrent);
                console.log(weatherData);

            } catch (error) {
                console.error('Error: ', error);
                alert('⚠️ 위치를 받아올 수 없습니다. 잠시만 기다려주세요.');
            }
        };
        getWeather();
    }, [key]);

    return (
        <div className='weather-widget'>
            <div className='today-weather-container'>
                {weatherValue && (
                    <div>
                        <h2>{weatherValue.name}</h2>
                        <div className='today-weather row'>
                            <div className='col-6'>
                                <img
                                    src={`${process.env.PUBLIC_URL}/images/${weatherValue.weather[0].icon}.png`}
                                    alt={`${weatherValue.weather[0].description}`}

                                />
                            </div>
                            <div className='col-6'>
                                <ul>
                                    <li>
                                        <h3>
                                            {parseInt(weatherValue.main.temp)}°C
                                        </h3>
                                    </li>
                                    <li>
                                        <img src='/images/humidity.png' alt='습도' />
                                        {weatherValue.main.humidity} %
                                    </li>
                                    <li>
                                        <img src="/images/wind.png" alt='풍속' />
                                        {weatherValue.wind.speed} m/s
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            <div className='forecast-container'>
                {forecastValue.length > 0 && (
                    <ul className='forecast-list'>
                        {forecastValue.map((item, index) => (
                            <li className='feature-weather' key={index}>
                                <p>{getDayOfWeek(item.dt_txt)}</p>
                                <img
                                    src={`${process.env.PUBLIC_URL}/images/${item.weather[0].icon}.png`}
                                    alt=''
                                />
                                <p>{parseInt(item.main.temp)}°C</p>
                                <span>{getWeatherDescKo(item.weather[0].id)}</span>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
};

export default DisplayWeather;
