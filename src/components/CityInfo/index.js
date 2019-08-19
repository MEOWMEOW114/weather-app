import React from 'react';
import { Card } from 'react-bootstrap';

const CityInfo = ({ city: { name, country } }) => (
  <Card body className="text-center">
    {name}, {country}{' '}
    <img src={`https://www.countryflags.io/${country}/flat/32.png`} alt={country} />
  </Card>
);

export default CityInfo;
