const express = require('express');
const axios = require('axios');
require('dotenv').config();

const app = express();
const PORT = 3000;

// OpenWeatherMap API URL 및 키 설정
const BASE_URL = 'http://apis.data.go.kr/1360000/MidFcstInfoService/getMidFcst';
const API_KEY = 'http://apis.data.go.kr/1360000/MidFcstInfoService';
;

// 주간 날씨 데이터 가져오기
app.get('/weather/weekly', async (req, res) => {
    const { lat, lon } = req.query;

    if (!lat || !lon) {
        return res.status(400).json({ error: '위도(lat)와 경도(lon)를 제공해야 합니다.' });
    }

    try {
        const response = await axios.get(BASE_URL, {
            params: {
                lat,
                lon,
                exclude: 'current,minutely,hourly,alerts',
                units: 'metric',
                appid: API_KEY,
            }
        });

        const weeklyData = response.data.daily.map(day => {
            // UTC 시간을 KST로 변환
            const date = new Date(day.dt * 1000);
            date.setHours(date.getHours() + 9); // UTC+9로 변환

            return {
                date: date.toISOString().split('T')[0],
                temperature: {
                    day: day.temp.day,
                    min: day.temp.min,
                    max: day.temp.max,
                },
                weather: day.weather[0].description,
            };
        });

        res.json(weeklyData);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: '날씨 데이터를 가져오는 데 실패했습니다.' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
