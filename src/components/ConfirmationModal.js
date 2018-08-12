import React, {Component} from 'react';
import { Button, Modal } from "semantic-ui-react";

class ConfirmationModal extends Component {
  
  render() {
    return (
      <Modal dimmer='inverted' size="mini" open={this.props.open} onClose={this.props.close}>
        <Modal.Header>Delete Todo</Modal.Header>
        <Modal.Content>
          <p>Are you sure you want to delete this todo?</p>
        </Modal.Content>
        <Modal.Actions>
          <Button onClick={this.props.close} negative>No</Button>
          <Button
            positive
            icon="checkmark"
            labelPosition="right"
            content="Yes"
            onClick={this.props.confirmDelete}
          />
        </Modal.Actions>
      </Modal>
    );
  }
}

export default ConfirmationModal;