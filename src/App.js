import React from 'react';
import { connect } from 'react-redux';
import { Container, Navbar, Row, Col } from 'react-bootstrap';
import SearchBar from './components/SearchBar';
import DailyForecast from './components/Forecast/Daily';
// import Welcome from './components/Welcome';
import CityNotFound from './components/CityNotFound';
import Loading from './components/Loading';
import CityInfo from './components/CityInfo';
// import Footer from './components/Footer';

import { fetchWeatherForecast, fetchUnitsIfNeeded } from './redux/weatherForcast/actions';

// import './App.scss';

const App = ({ fetchWeatherForecast, weatherForecast, fetchUnitsIfNeeded }) => {
  const { city, dailyForecast, error, loading, units } = weatherForecast;
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
            {error && error.message.includes('404') && !loading && <CityNotFound />}
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
};

const mapStateToProps = state => {
  return {
    weatherForecast: state.weatherForecast,
  };
};
const mapDispatchToProps = { fetchWeatherForecast, fetchUnitsIfNeeded };
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(App);
