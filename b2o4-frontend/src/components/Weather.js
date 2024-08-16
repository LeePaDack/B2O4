import React, { Component } from 'react'; 
import axios from 'axios'; 
import styled from 'styled-components'; 
import { SlDrop } from 'react-icons/sl';

class Weather extends Component {
    // 상태 변수 정의
    constructor(props) {
      super(props);
      this.state = {
        temp: 0,
        temp_max: 0,
        temp_min: 0,
        humidity: 0,
        desc: '',
        icon: '',
        loading: true,
      };
    }
    // 컴포넌트 생성 후 날씨 정보 조회
    componentDidMount() {
      const cityName = 'Incheon';
      const apiKey = process.env.REACT_APP_WEATHER_KEY;
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}`;
  
      //위에서 만든 상태 변수에 값을 전달
      axios
        .get(url)
        .then((responseData) => {
          console.log(responseData);
          const data = responseData.data;
          this.setState({
            temp: data.main.temp,
            temp_max: data.main.temp_max,
            temp_min: data.main.temp_min,
            humidity: data.main.humidity,
            desc: data.weather[0].description,
            icon: data.weather[0].icon,
            loading: false,
          });
        })
        .catch((error) => console.log(error));
    }
    // 날씨 정보 출력
    render() {
      const imgSrc = `https://openweathermap.com/img/w/${this.state.icon}.png`;
      if (this.state.loading) {
        return <p>Loading</p>;
      } else {
        return (
            <Wrapper>
              <SpaceAround>
                <div>
                  <TemperText>{(this.state.temp - 273.15).toFixed(0)}°</TemperText>
                </div>
                <WeatherWrapper>
                  <ImgFlex>
                    <WeatherImg src={imgSrc} />{' '}
                  </ImgFlex>
                  <WeatherText>{this.state.desc}</WeatherText>
                </WeatherWrapper>
              </SpaceAround>
  
              <Margin height='10' />
              <SpaceAround>
                <MaxMin>
                  최고: {(this.state.temp_max - 273.15).toFixed(0)}° 최저: {(this.state.temp_min - 273.15).toFixed(0)}°
                </MaxMin>
                <HumidityText>
                  <SlDrop size='17px' style={{ marginTop: '7px', marginRight: '8px' }} />
                  {this.state.humidity}
                </HumidityText>
              </SpaceAround>
            </Wrapper>
  
        );
      }
    }
  }
  
  export default Weather;