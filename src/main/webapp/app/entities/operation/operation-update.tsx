import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Button, Row, Col, FormText } from 'reactstrap';
import { isNumber, Translate, translate, ValidatedField, ValidatedForm } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { IBankAccount } from 'app/shared/model/bank-account.model';
import { getEntities as getBankAccounts } from 'app/entities/bank-account/bank-account.reducer';
import { ILabel } from 'app/shared/model/label.model';
import { getEntities as getLabels } from 'app/entities/label/label.reducer';
import { IOperation } from 'app/shared/model/operation.model';
import { getEntity, updateEntity, createEntity, reset } from './operation.reducer';

export const OperationUpdate = () => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const { id } = useParams<'id'>();
  const isNew = id === undefined;

  const bankAccounts = useAppSelector(state => state.bankAccount.entities);
  const labels = useAppSelector(state => state.label.entities);
  const operationEntity = useAppSelector(state => state.operation.entity);
  const loading = useAppSelector(state => state.operation.loading);
  const updating = useAppSelector(state => state.operation.updating);
  const updateSuccess = useAppSelector(state => state.operation.updateSuccess);

  const handleClose = () => {
    navigate('/operation');
  };

  useEffect(() => {
    if (!isNew) {
      dispatch(getEntity(id));
    }

    dispatch(getBankAccounts({}));
    dispatch(getLabels({}));
  }, []);

  useEffect(() => {
    if (updateSuccess) {
      handleClose();
    }
  }, [updateSuccess]);

  const saveEntity = values => {
    values.date = convertDateTimeToServer(values.date);

    const entity = {
      ...operationEntity,
      ...values,
      labels: mapIdList(values.labels),
      bankAccount: bankAccounts.find(it => it.id.toString() === values.bankAccount.toString()),
    };

    if (isNew) {
      dispatch(createEntity(entity));
    } else {
      dispatch(updateEntity(entity));
    }
  };

  const defaultValues = () =>
    isNew
      ? {
          date: displayDefaultDateTime(),
        }
      : {
          ...operationEntity,
          date: convertDateTimeFromServer(operationEntity.date),
          bankAccount: operationEntity?.bankAccount?.id,
          labels: operationEntity?.labels?.map(e => e.id.toString()),
        };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="jhipsterSampleApplicationReactApp.operation.home.createOrEditLabel" data-cy="OperationCreateUpdateHeading">
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
            <ValidatedForm defaultValues={defaultValues()} onSubmit={saveEntity}>
              {!isNew ? (
                <ValidatedField
                  name="id"
                  required
                  readOnly
                  id="operation-id"
                  label={translate('global.field.id')}
                  validate={{ required: true }}
                />
              ) : null}
              <ValidatedField
                label={translate('jhipsterSampleApplicationReactApp.operation.date')}
                id="operation-date"
                name="date"
                data-cy="date"
                type="datetime-local"
                placeholder="YYYY-MM-DD HH:mm"
                validate={{
                  required: { value: true, message: translate('entity.validation.required') },
                }}
              />
              <ValidatedField
                label={translate('jhipsterSampleApplicationReactApp.operation.description')}
                id="operation-description"
                name="description"
                data-cy="description"
                type="text"
              />
              <ValidatedField
                label={translate('jhipsterSampleApplicationReactApp.operation.amount')}
                id="operation-amount"
                name="amount"
                data-cy="amount"
                type="text"
                validate={{
                  required: { value: true, message: translate('entity.validation.required') },
                  validate: v => isNumber(v) || translate('entity.validation.number'),
                }}
              />
              <ValidatedField
                id="operation-bankAccount"
                name="bankAccount"
                data-cy="bankAccount"
                label={translate('jhipsterSampleApplicationReactApp.operation.bankAccount')}
                type="select"
              >
                <option value="" key="0" />
                {bankAccounts
                  ? bankAccounts.map(otherEntity => (
                      <option value={otherEntity.id} key={otherEntity.id}>
                        {otherEntity.name}
                      </option>
                    ))
                  : null}
              </ValidatedField>
              <ValidatedField
                label={translate('jhipsterSampleApplicationReactApp.operation.label')}
                id="operation-label"
                data-cy="label"
                type="select"
                multiple
                name="labels"
              >
                <option value="" key="0" />
                {labels
                  ? labels.map(otherEntity => (
                      <option value={otherEntity.id} key={otherEntity.id}>
                        {otherEntity.label}
                      </option>
                    ))
                  : null}
              </ValidatedField>
              <Button tag={Link} id="cancel-save" data-cy="entityCreateCancelButton" to="/operation" replace color="info">
                <FontAwesomeIcon icon="arrow-left" />
                &nbsp;
                <span className="d-none d-md-inline">
                  <Translate contentKey="entity.action.back">Back</Translate>
                </span>
              </Button>
              &nbsp;
              <Button color="primary" id="save-entity" data-cy="entityCreateSaveButton" type="submit" disabled={updating}>
                <FontAwesomeIcon icon="save" />
                &nbsp;
                <Translate contentKey="entity.action.save">Save</Translate>
              </Button>
            </ValidatedForm>
          )}
        </Col>
      </Row>
    </div>
  );
};

export default OperationUpdate;
