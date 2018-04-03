import * as React from 'react';
import { connect } from 'react-redux';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';
import { Translate, ICrudGetAction, ICrudDeleteAction } from 'react-jhipster';
import { FaBan, FaTrash } from 'react-icons/lib/fa';

import { IUser } from 'app/shared/model/user.model';
import { getUser, deleteUser } from './user-management.reducer';

export interface IUserManagementDeleteDialogProps {
  getUser: ICrudGetAction<IUser>;
  deleteUser: ICrudDeleteAction<IUser>;
  user: IUser;
  match: any;
  history: any;
}

export class UserManagementDeleteDialog extends React.Component<IUserManagementDeleteDialogProps> {
  componentDidMount() {
    this.props.getUser(this.props.match.params.login);
  }

  confirmDelete = event => {
    this.props.deleteUser(this.props.user.login);
    this.handleClose(event);
  };

  handleClose = event => {
    event.stopPropagation();
    this.props.history.goBack();
  };

  render() {
    const { user } = this.props;
    return (
      <Modal isOpen toggle={this.handleClose}>
        <ModalHeader toggle={this.handleClose}>
          <Translate contentKey="entity.delete.title">Confirm delete operation</Translate>
        </ModalHeader>
        <ModalBody>
          <Translate contentKey="userManagement.delete.question" interpolate={{ login: user.login }}>
            Are you sure you want to delete this User?
          </Translate>
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={this.handleClose}>
            <FaBan />&nbsp;
            <Translate contentKey="entity.action.cancel">Cancel</Translate>
          </Button>
          <Button color="danger" onClick={this.confirmDelete}>
            <FaTrash />&nbsp;
            <Translate contentKey="entity.action.delete">Delete</Translate>
          </Button>
        </ModalFooter>
      </Modal>
    );
  }
}

const mapStateToProps = storeState => ({
  user: storeState.userManagement.user
});

const mapDispatchToProps = { getUser, deleteUser };

export default connect(mapStateToProps, mapDispatchToProps)(UserManagementDeleteDialog);
