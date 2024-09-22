import React from "react";
import Popup from "../popup/Popup";
import useDeletePopup from "../../hooks/useDeletePopup";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAxios } from "../../hooks";
import { deleteImage } from "../../utils/firebaseUtils";
import './deletePost.scss';

type DeletePostProps = {};
const DeletePost: React.FC<DeletePostProps> = () => {
  const deletePopup = useDeletePopup();
  const queryClient = useQueryClient()

  const postId = deletePopup.postId as number;
  const type = deletePopup.type;
  const imagePath = deletePopup.imagePath

  const handleDeletePost = async (postId: number) => {
    try {
      await useAxios.delete("/posts", {
        data: {
          postId: postId,
          type: type,
        },
      });

      if(imagePath) {
        await deleteImage(imagePath)
      }
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
    <div className="delete-post">
      <p className="title">Delete post</p>
      <p className="message">Are you sure you want to delete your post?</p>
      <ul className="action-btn-list">
        <li>
        <button onClick={deletePopup.onClose} className="cancel-btn">Cancel</button>

        </li>
        <li>
        <button onClick={() => handleDeleteClick(postId)} className="delete-btn">Delete</button>

        </li>
      </ul>
    </div>
  );





  return (
    <div >
      <Popup
        body={bodyContent}
        isOpen={deletePopup.isOpen}
        onClose={handleClose}
        hideHeader
      />
    </div>
  );
};

export default DeletePost;
