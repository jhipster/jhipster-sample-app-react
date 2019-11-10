import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './bank-account.reducer';
import { IBankAccount } from 'app/shared/model/bank-account.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IBankAccountDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class BankAccountDetail extends React.Component<IBankAccountDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { bankAccountEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            <Translate contentKey="jhipsterSampleApplicationReactApp.bankAccount.detail.title">BankAccount</Translate> [
            <b>{bankAccountEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="name">
                <Translate contentKey="jhipsterSampleApplicationReactApp.bankAccount.name">Name</Translate>
              </span>
            </dt>
            <dd>{bankAccountEntity.name}</dd>
            <dt>
              <span id="balance">
                <Translate contentKey="jhipsterSampleApplicationReactApp.bankAccount.balance">Balance</Translate>
              </span>
            </dt>
            <dd>{bankAccountEntity.balance}</dd>
            <dt>
              <Translate contentKey="jhipsterSampleApplicationReactApp.bankAccount.user">User</Translate>
            </dt>
            <dd>{bankAccountEntity.userLogin ? bankAccountEntity.userLogin : ''}</dd>
          </dl>
          <Button tag={Link} to="/bank-account" replace color="info">
            <FontAwesomeIcon icon="arrow-left" />{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.back">Back</Translate>
            </span>
          </Button>
          &nbsp;
          <Button tag={Link} to={`/bank-account/${bankAccountEntity.id}/edit`} replace color="primary">
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

const mapStateToProps = ({ bankAccount }: IRootState) => ({
  bankAccountEntity: bankAccount.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BankAccountDetail);
