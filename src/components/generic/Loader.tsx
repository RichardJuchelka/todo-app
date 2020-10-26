import React from 'react';
import { Spinner } from 'react-bootstrap';

export const Loader: React.FC = () => {
  return (
    <div className="text-center p-5">
      <Spinner animation="border" variant="primary">
        <span className="sr-only">Loading...</span>
      </Spinner>
    </div>
  );
};
