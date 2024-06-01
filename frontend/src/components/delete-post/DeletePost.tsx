import React from "react";
import Popup from "../popup/Popup";
import useDeletePopup from "../../hooks/useDeletePopup";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAxios } from "../../hooks";

type DeletePostProps = {};
const DeletePost: React.FC<DeletePostProps> = () => {
  const deletePopup = useDeletePopup();
  const queryClient = useQueryClient()

  const postId = deletePopup.postId as number;
  const type = deletePopup.type;

  const handleDeletePost = async (postId: number) => {
    try {
      await useAxios.delete("/posts", {
        data: {
          postId: postId,
          type: type,
        },
      });
      handleClose();
    } catch (error) {
      console.log(error);
    }
  };

  const handleClose = () => {
    deletePopup.onClose();
  };

  const {mutate} = useMutation({
    mutationFn: (postId: number) => handleDeletePost(postId),
    onSettled: async () => {
        queryClient.refetchQueries();
      },
    mutationKey: ["deletePost"]
  })

  const handleDeleteClick = async (postId: number) => {
    try {
        mutate(postId)
    } catch (error) {
        console.log(error)
    }
  }

  const bodyContent = (
    <div>
      <p>Are you sure you want to delete your post?</p>
      <ul>
        <li>
          <button onClick={() => handleDeleteClick(postId)}>Delete</button>
        </li>
        <li>
          <button onClick={deletePopup.onClose}>Cancel</button>
        </li>
      </ul>
    </div>
  );





  return (
    <div className="delete-post">
      <Popup
        body={bodyContent}
        isOpen={deletePopup.isOpen}
        onClose={handleClose}
      />
    </div>
  );
};

export default DeletePost;
