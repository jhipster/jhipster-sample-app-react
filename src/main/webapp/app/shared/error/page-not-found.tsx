import React from 'react';
import { Alert } from 'react-bootstrap';
import { Translate } from 'react-jhipster';

const PageNotFound = () => {
  return (
    <div>
      <Alert variant="danger">
        <Translate contentKey="error.http.404">The page does not exist.</Translate>
      </Alert>
    </div>
  );
};

export default PageNotFound;
