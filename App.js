import React, { Component } from 'react';
import { StyleSheet, View, Text, StatusBar } from 'react-native';
import Weather from './Weather';

const API_KEY = "fbce657e077962e8099c6183aaffa48e";

class App extends Component {
  state = {
    isLoaded: false,
    error: null,
    temperature: null,
    name: null
  }
  componentDidMount() {
    navigator.geolocation.getCurrentPosition( 
    position => {
      this._getWeather(position.coords);
    }, 
    error => {
      this.setState({
        error: error
      });
    });
  }

  _getWeather({latitude, longitude}) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&APPID=${API_KEY}`)
    .then(response => response.json()) // 응답값을 json으로 변환
    .then(json => {
      this.setState({
        temperature: json.main.temp,
        name: json.weather[0].main,
        isLoaded: true
      })
    });
  }

  render() {
    const { isLoaded, error, temperature, name } = this.state; // this.state.isLoaded, error를 가르킴.
    return (
      <View style={styles.container}>
        <StatusBar hidden={true}/>
        { isLoaded ? ( 
          <Weather 
            weatherName={name} 
            temp={Math.ceil(temperature - 273.15)} 
          /> 
        ) : (
          <View style={styles.loading}>
            <Text style={styles.loadingText}>Getting the Weather~!</Text>
            {error ? <Text style={styles.errorText}>{error}</Text> : null}
          </View>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    // justifyContent: 'center', // 내용을 가운데로
    // justifyContent: 'flex-start', // 'center', 'flex-start', 'flex-end', 'space-between', 'space-around'
    // alignItems: 'stretch', // 자식컴포넌트들을 정렬해라
    // flexDirection: 'row', // html, css 에서 디폴트 값
    // flexWrap: 'wrap', // nowrap : 디폴트, wrap이 건반처럼 사이사이
  },
  errorText: {
    color: "red",
    backgroundColor: "transparent",
    marginBottom: 40
  },
  loading: {
    flex: 1,
    backgroundColor: '#FDF6AA', // 배경생 지정
    justifyContent: 'flex-end', // 내용을 하단으로
    paddingLeft: 25
  },
  loadingText: {
    fontSize: 34,
    marginBottom: 24, 
  }
});

export default App;