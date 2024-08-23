import React from "react";
import { useCreateGroupModal } from "../../hooks";
import "./widget.scss";

type CreateGroupWidgetProps = {};
const CreateGroupWidget: React.FC<CreateGroupWidgetProps> = () => {
  const createGroupModal = useCreateGroupModal();

  const handleCreateGroupClick = () => {
    createGroupModal.onOpen();
  };
  return (
    <div className="widget create-group">
      <p className="title">Create Group</p>
      <p className="description">Start your own private or public group.</p>
      <button onClick={handleCreateGroupClick}>Create Group</button>
    </div>
  );
};

export default CreateGroupWidget;
