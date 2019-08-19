import React from 'react';
import { Alert } from 'react-bootstrap';

const CityNotFound = message => (
  <Alert variant="danger">
    <Alert.Heading>Oh snap! You got an error</Alert.Heading>

    {message ? (
      <p>{message.message + '!'}</p>
    ) : (
      <p>
        <strong>404</strong> | We couldn't find a city with that name.
      </p>
    )}
  </Alert>
);
export default CityNotFound;
