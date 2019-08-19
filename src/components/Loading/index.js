import React from 'react';
import styled from 'styled-components';
import { Spinner } from 'react-bootstrap';

// import './Loading.scss';
const Wrapper = styled.div`
  .loading {
    .text-primary {
      color: #79a9d1 !important;
    }

    :not(:last-child) {
      margin-right: 1em;
    }
  }
`;

const Loading = () => (
  <Wrapper>
    <div className="loading text-center">
      <Spinner animation="grow" variant="primary" />
      <Spinner animation="grow" variant="primary" />
      <Spinner animation="grow" variant="primary" />
    </div>
  </Wrapper>
);

export default Loading;
