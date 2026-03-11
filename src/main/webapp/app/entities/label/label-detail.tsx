import React, { useEffect } from 'react';
import { Button, Col, Row } from 'react-bootstrap';
import { Translate } from 'react-jhipster';
import { Link, useParams } from 'react-router';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntity } from './label.reducer';

export const LabelDetail = () => {
  const dispatch = useAppDispatch();

  const { id } = useParams<'id'>();

  useEffect(() => {
    dispatch(getEntity(id));
  }, []);

  const labelEntity = useAppSelector(state => state.label.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="labelDetailsHeading">
          <Translate contentKey="jhipsterSampleApplicationReactApp.label.detail.title">Label</Translate>
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">
              <Translate contentKey="global.field.id">ID</Translate>
            </span>
          </dt>
          <dd>{labelEntity.id}</dd>
          <dt>
            <span id="label">
              <Translate contentKey="jhipsterSampleApplicationReactApp.label.label">Label</Translate>
            </span>
          </dt>
          <dd>{labelEntity.label}</dd>
          <dt>
            <Translate contentKey="jhipsterSampleApplicationReactApp.label.operation">Operation</Translate>
          </dt>
          <dd>
            {labelEntity.operations
              ? labelEntity.operations.map((val, i) => (
                  <span key={val.id}>
                    <a>{val.id}</a>
                    {labelEntity.operations && i === labelEntity.operations.length - 1 ? '' : ', '}
                  </span>
                ))
              : null}
          </dd>
        </dl>
        <Button as={Link as any} to="/label" replace variant="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button as={Link as any} to={`/label/${labelEntity.id}/edit`} replace variant="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

export default LabelDetail;
