import { useState } from "react";
import { Modal, Button } from "react-bootstrap";

const UpdateModal = ({ comment, handleUpdateComment }) =>
{
  const [updatedComment, setUpdatedComment] = useState(comment.text);

  const handleChange = (e) =>
  {
    setUpdatedComment(e.target.value);
  };

  const handleUpdate = () =>
  {
    handleUpdateComment(updatedComment);
  };

  return (
    <Modal show={true} onHide={() => { }}>
      <Modal.Header closeButton>
        <Modal.Title>Update Comment</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <textarea
          className="form-control"
          value={updatedComment}
          onChange={handleChange}
        ></textarea>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => { }}>
          Cancel
        </Button>
        <Button variant="primary" onClick={handleUpdate}>
          Update
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default UpdateModal;
