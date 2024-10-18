import React, { useState } from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Input,
} from "reactstrap";
import { updateUser } from "../../managers/UserManager.jsx";

function EditUser({ args, user, currentUser, fetchUser }) {
  const [modal, setModal] = useState(false);
  const [updatedUser, setUpdatedUser] = useState({});

  const toggle = () => {
    fetchUser();
    setModal(!modal);
  };

  const handleSave = (event) => {
    event.preventDefault();

    const editedUser = {
      id: currentUser.id,
      joinDateTime: user.joinDateTime,
      displayName: updatedUser.displayName || user.displayName,
      bio: updatedUser.bio || user.bio,
      image: updatedUser.image || user.image,
    };

    updateUser(editedUser).then(toggle);
  };

  return (
    <div>
      <Button color="primary" onClick={toggle}>
        Edit Profile
      </Button>
      <Modal isOpen={modal} toggle={toggle} {...args}>
        <ModalHeader toggle={toggle}>Edit Profile</ModalHeader>
        <ModalBody>
          Username
          <Input
            id="displayName"
            name="displayName"
            defaultValue={user.displayName}
            onChange={(event) => {
              const userCopy = { ...user };
              userCopy.displayName = event.target.value;
              setUpdatedUser(userCopy);
            }}
          />
          Bio
          <Input
            id="bio"
            name="bio"
            defaultValue={user.bio}
            type="textarea"
            onChange={(event) => {
              const userCopy = { ...user };
              userCopy.bio = event.target.value;
              setUpdatedUser(userCopy);
            }}
          />
          Profile Image
          <Input
            id="image"
            name="image"
            defaultValue={user.image}
            type="text"
            onChange={(event) => {
              const userCopy = { ...user };
              userCopy.image = event.target.value;
              setUpdatedUser(userCopy);
            }}
          />
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={handleSave}>
            Save
          </Button>{" "}
          <Button color="secondary" onClick={toggle}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}

export default EditUser;
