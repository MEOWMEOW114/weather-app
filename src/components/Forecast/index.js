import React from 'react';
import { Card } from 'react-bootstrap';
import { UNIT_SYMBOLS } from '../../constants/units';
import styled from 'styled-components';

// import highTempIcon from './high-temp.svg';
// import lowTempIcon from './low-temp.svg';

const isToday = date => {
  const today = new Date();
  return (
    date.getDate() === today.getDate() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear()
  );
};

const stringifyDate = date => {
  if (isToday(date)) {
    return 'Today';
  }
  return date.toLocaleString('en-US', { weekday: 'long' });
};

const Forecast = ({
  forecast: { date, highTemp, lowTemp, overallWeather, humidity, pressure },
  units,
}) => {
  // console.log(forecast + '');
  return (
    <Wrapper>
      <Card className="text-center forecast">
        <Card.Body>
          <Card.Text>
            <span className="high-temp">{`${highTemp}${UNIT_SYMBOLS[units]}`}</span>
            <br></br>
            <span className="low-temp">{`${lowTemp}${UNIT_SYMBOLS[units]}`}</span>
          </Card.Text>
          <Card.Text className="text-muted">Humidity: {humidity}</Card.Text>
          <Card.Text className="text-muted">Pressure: {pressure}</Card.Text>
        </Card.Body>
        <Card.Footer>
          <Card.Text>
            <strong>{stringifyDate(new Date(date))}</strong>
          </Card.Text>
        </Card.Footer>
      </Card>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  .forecast {
    .temp-icon {
      height: 0.8em;
      width: 0.8em;
    }

    .high-temp {
      color: orangered;
    }

    .low-temp {
      color: skyblue;
    }

    opacity: 0;

    -moz-animation: appear 1s 0.2s forwards;
    -o-animation: appear 1s 0.2s forwards;
    animation: appear 1s 0.2s forwards;

    @keyframes appear {
      0% {
        opacity: 0;
      }

      100% {
        opacity: 1;
      }
    }
  }
`;

export default Forecast;
