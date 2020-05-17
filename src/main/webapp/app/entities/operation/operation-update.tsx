import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { IBankAccount } from 'app/shared/model/bank-account.model';
import { getEntities as getBankAccounts } from 'app/entities/bank-account/bank-account.reducer';
import { ILabel } from 'app/shared/model/label.model';
import { getEntities as getLabels } from 'app/entities/label/label.reducer';
import { getEntity, updateEntity, createEntity, reset } from './operation.reducer';
import { IOperation } from 'app/shared/model/operation.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IOperationUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const OperationUpdate = (props: IOperationUpdateProps) => {
  const [idslabel, setIdslabel] = useState([]);
  const [bankAccountId, setBankAccountId] = useState('0');
  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.id);

  const { operationEntity, bankAccounts, labels, loading, updating } = props;

  const handleClose = () => {
    props.history.push('/operation');
  };

  useEffect(() => {
    if (!isNew) {
      props.getEntity(props.match.params.id);
    }

    props.getBankAccounts();
    props.getLabels();
  }, []);

  useEffect(() => {
    if (props.updateSuccess) {
      handleClose();
    }
  }, [props.updateSuccess]);

  const saveEntity = (event, errors, values) => {
    values.date = convertDateTimeToServer(values.date);

    if (errors.length === 0) {
      const entity = {
        ...operationEntity,
        ...values,
        labels: mapIdList(values.labels),
      };

      if (isNew) {
        props.createEntity(entity);
      } else {
        props.updateEntity(entity);
      }
    }
  };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="jhipsterSampleApplicationReactApp.operation.home.createOrEditLabel">
            <Translate contentKey="jhipsterSampleApplicationReactApp.operation.home.createOrEditLabel">
              Create or edit a Operation
            </Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : operationEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="operation-id">
                    <Translate contentKey="global.field.id">ID</Translate>
                  </Label>
                  <AvInput id="operation-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="dateLabel" for="operation-date">
                  <Translate contentKey="jhipsterSampleApplicationReactApp.operation.date">Date</Translate>
                </Label>
                <AvInput
                  id="operation-date"
                  type="datetime-local"
                  className="form-control"
                  name="date"
                  placeholder={'YYYY-MM-DD HH:mm'}
                  value={isNew ? displayDefaultDateTime() : convertDateTimeFromServer(props.operationEntity.date)}
                  validate={{
                    required: { value: true, errorMessage: translate('entity.validation.required') },
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label id="descriptionLabel" for="operation-description">
                  <Translate contentKey="jhipsterSampleApplicationReactApp.operation.description">Description</Translate>
                </Label>
                <AvField id="operation-description" type="text" name="description" />
              </AvGroup>
              <AvGroup>
                <Label id="amountLabel" for="operation-amount">
                  <Translate contentKey="jhipsterSampleApplicationReactApp.operation.amount">Amount</Translate>
                </Label>
                <AvField
                  id="operation-amount"
                  type="text"
                  name="amount"
                  validate={{
                    required: { value: true, errorMessage: translate('entity.validation.required') },
                    number: { value: true, errorMessage: translate('entity.validation.number') },
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label for="operation-bankAccount">
                  <Translate contentKey="jhipsterSampleApplicationReactApp.operation.bankAccount">Bank Account</Translate>
                </Label>
                <AvInput id="operation-bankAccount" type="select" className="form-control" name="bankAccountId">
                  <option value="" key="0" />
                  {bankAccounts
                    ? bankAccounts.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.name}
                        </option>
                      ))
                    : null}
                </AvInput>
              </AvGroup>
              <AvGroup>
                <Label for="operation-label">
                  <Translate contentKey="jhipsterSampleApplicationReactApp.operation.label">Label</Translate>
                </Label>
                <AvInput
                  id="operation-label"
                  type="select"
                  multiple
                  className="form-control"
                  name="labels"
                  value={operationEntity.labels && operationEntity.labels.map(e => e.id)}
                >
                  <option value="" key="0" />
                  {labels
                    ? labels.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.label}
                        </option>
                      ))
                    : null}
                </AvInput>
              </AvGroup>
              <Button tag={Link} id="cancel-save" to="/operation" replace color="info">
                <FontAwesomeIcon icon="arrow-left" />
                &nbsp;
                <span className="d-none d-md-inline">
                  <Translate contentKey="entity.action.back">Back</Translate>
                </span>
              </Button>
              &nbsp;
              <Button color="primary" id="save-entity" type="submit" disabled={updating}>
                <FontAwesomeIcon icon="save" />
                &nbsp;
                <Translate contentKey="entity.action.save">Save</Translate>
              </Button>
            </AvForm>
          )}
        </Col>
      </Row>
    </div>
  );
};

const mapStateToProps = (storeState: IRootState) => ({
  bankAccounts: storeState.bankAccount.entities,
  labels: storeState.label.entities,
  operationEntity: storeState.operation.entity,
  loading: storeState.operation.loading,
  updating: storeState.operation.updating,
  updateSuccess: storeState.operation.updateSuccess,
});

const mapDispatchToProps = {
  getBankAccounts,
  getLabels,
  getEntity,
  updateEntity,
  createEntity,
  reset,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(OperationUpdate);
