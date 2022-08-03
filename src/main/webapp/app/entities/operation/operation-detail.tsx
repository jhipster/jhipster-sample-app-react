import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntity } from './operation.reducer';

export const OperationDetail = () => {
  const dispatch = useAppDispatch();

  const { id } = useParams<'id'>();

  useEffect(() => {
    dispatch(getEntity(id));
  }, []);

  const operationEntity = useAppSelector(state => state.operation.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="operationDetailsHeading">
          <Translate contentKey="jhipsterSampleApplicationReactApp.operation.detail.title">Operation</Translate>
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">
              <Translate contentKey="global.field.id">ID</Translate>
            </span>
          </dt>
          <dd>{operationEntity.id}</dd>
          <dt>
            <span id="date">
              <Translate contentKey="jhipsterSampleApplicationReactApp.operation.date">Date</Translate>
            </span>
          </dt>
          <dd>{operationEntity.date ? <TextFormat value={operationEntity.date} type="date" format={APP_DATE_FORMAT} /> : null}</dd>
          <dt>
            <span id="description">
              <Translate contentKey="jhipsterSampleApplicationReactApp.operation.description">Description</Translate>
            </span>
          </dt>
          <dd>{operationEntity.description}</dd>
          <dt>
            <span id="amount">
              <Translate contentKey="jhipsterSampleApplicationReactApp.operation.amount">Amount</Translate>
            </span>
          </dt>
          <dd>{operationEntity.amount}</dd>
          <dt>
            <Translate contentKey="jhipsterSampleApplicationReactApp.operation.bankAccount">Bank Account</Translate>
          </dt>
          <dd>{operationEntity.bankAccount ? operationEntity.bankAccount.name : ''}</dd>
          <dt>
            <Translate contentKey="jhipsterSampleApplicationReactApp.operation.label">Label</Translate>
          </dt>
          <dd>
            {operationEntity.labels
              ? operationEntity.labels.map((val, i) => (
                  <span key={val.id}>
                    <a>{val.label}</a>
                    {operationEntity.labels && i === operationEntity.labels.length - 1 ? '' : ', '}
                  </span>
                ))
              : null}
          </dd>
        </dl>
        <Button tag={Link} to="/operation" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/operation/${operationEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

export default OperationDetail;
