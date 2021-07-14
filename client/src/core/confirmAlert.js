import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

const ConfirmAlert = (props) => {
  const {
    className
  } = props;

  //const [modal, setModal] = useState(false);

  const toggle = () => props.setConfirm(!props.confirm);

  return (
      <Modal isOpen={props.confirm} toggle={toggle} className={className}>
        <ModalHeader toggle={toggle}>{props.title}</ModalHeader>
        <ModalBody>{props.message}</ModalBody>
        <ModalFooter>
          <Button color="danger" onClick={() => {
            toggle();
            props.confirmAction(props.confirmData);
          }}>Confirm</Button>{' '}
          <Button outline color="secondary" onClick={toggle}>Cancel</Button>
        </ModalFooter>
      </Modal>
  );
}

export default ConfirmAlert;