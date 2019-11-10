import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './operation.reducer';
import { IOperation } from 'app/shared/model/operation.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IOperationDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class OperationDetail extends React.Component<IOperationDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { operationEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            <Translate contentKey="jhipsterSampleApplicationReactApp.operation.detail.title">Operation</Translate> [
            <b>{operationEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="date">
                <Translate contentKey="jhipsterSampleApplicationReactApp.operation.date">Date</Translate>
              </span>
            </dt>
            <dd>
              <TextFormat value={operationEntity.date} type="date" format={APP_DATE_FORMAT} />
            </dd>
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
            <dd>{operationEntity.bankAccountName ? operationEntity.bankAccountName : ''}</dd>
            <dt>
              <Translate contentKey="jhipsterSampleApplicationReactApp.operation.label">Label</Translate>
            </dt>
            <dd>
              {operationEntity.labels
                ? operationEntity.labels.map((val, i) => (
                    <span key={val.id}>
                      <a>{val.label}</a>
                      {i === operationEntity.labels.length - 1 ? '' : ', '}
                    </span>
                  ))
                : null}
            </dd>
          </dl>
          <Button tag={Link} to="/operation" replace color="info">
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
  }
}

const mapStateToProps = ({ operation }: IRootState) => ({
  operationEntity: operation.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(OperationDetail);
