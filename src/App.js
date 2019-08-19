import React from 'react';
import { connect } from 'react-redux';
import { Container, Navbar, Row, Col } from 'react-bootstrap';
import SearchBar from './components/SearchBar';
import DailyForecast from './components/Forecast/Daily';
// import Welcome from './components/Welcome';
import CityNotFound from './components/CityNotFound';
import Loading from './components/Loading';
import CityInfo from './components/CityInfo';
import { geolocated } from 'react-geolocated';

import { fetchWeatherForecast, fetchUnitsIfNeeded } from './redux/weatherForcast/actions';

// import './App.scss';
class App extends React.Component {
  componentDidUpdate(prevProps) {
    const { weatherForecast, coords, fetchWeatherForecast } = this.props;
    const { city, dailyForecast, error, loading, units } = weatherForecast;

    // Feature requirment II
    // The first time the user comes to the site, we want the query to be by their current
    // location.
    if (!city && !dailyForecast && coords !== prevProps.coords) {
      console.log(coords);
      fetchWeatherForecast({
        latlng: coords.latitude + ',' + coords.longitude,
        units,
      });
    }
  }
  render() {
    const {
      fetchWeatherForecast,
      weatherForecast,
      fetchUnitsIfNeeded,
      isGeolocationAvailable,
      isGeolocationEnabled,
      coords,
    } = this.props;
    const { city, dailyForecast, error, loading, units } = weatherForecast;
    console.log(weatherForecast);

    return (
      <div className="App">
        <Navbar bg="dark" variant="dark">
          <Navbar.Brand href="/">Weather Forecast</Navbar.Brand>
          <SearchBar
            units={units}
            onUnitsChange={fetchUnitsIfNeeded}
            onSubmit={fetchWeatherForecast}
          />
        </Navbar>
        <Container>
          <Row className="justify-content-md-center">
            <Col xs lg="8">
              {/* {!error && !dailyForecast && !loading && <Welcome />} */}
              {error && !loading && <CityNotFound message={error.message} />}
            </Col>
          </Row>
          {!loading && city && (
            <Row className="city-info">
              <Col xs lg="auto">
                {!loading && dailyForecast && <CityInfo city={city} />}
              </Col>
            </Row>
          )}
          {!loading && dailyForecast && (
            <Row className="justify-content-md-center">
              <Col xs>
                <DailyForecast dailyForecast={dailyForecast} units={units} />
              </Col>
            </Row>
          )}
          <Row className="justify-content-md-center">
            <Col xs>{loading && <Loading />}</Col>
          </Row>
        </Container>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    weatherForecast: state.weatherForecast,
  };
};
const mapDispatchToProps = { fetchWeatherForecast, fetchUnitsIfNeeded };
export default geolocated({
  positionOptions: {
    enableHighAccuracy: false,
  },
  userDecisionTimeout: 5000,
})(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(App),
);
