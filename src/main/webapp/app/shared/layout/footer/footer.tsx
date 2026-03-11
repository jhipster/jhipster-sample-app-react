import './footer.scss';

import React from 'react';
import { Col, Row } from 'react-bootstrap';
import { Translate } from 'react-jhipster';

const Footer = () => (
  <div className="footer page-content">
    <Row>
      <Col md="12">
        <p>
          <Translate contentKey="footer">Your footer</Translate>
        </p>
      </Col>
    </Row>
  </div>
);

export default Footer;
