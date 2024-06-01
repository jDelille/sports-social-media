import React from 'react';
import { useAxios } from '../../../hooks';
import { useMutation, useQueryClient } from '@tanstack/react-query';

type MuteButtonProps = {
    postId: number;
    type: string;
    setError: (error: string | null) => void;
    hasMuted: boolean;
 }

const MuteButton: React.FC<MuteButtonProps> = ({type, postId, setError, hasMuted}) => {
    const queryClient = useQueryClient();

    const handleMutePost = async (postId: number) => {
        try {
          if (!hasMuted) {
            await useAxios.post("/muted-posts", {
              postId: postId,
              type: type,
            });
          } else {
            await useAxios.delete("/muted-posts", {
              data: {
                postId: postId,
                type: type,
              },
            });
          }
        } catch (error) {
          setError("error muting post");
        }
      };

      const { mutate } = useMutation({
        mutationFn: handleMutePost,
        onSettled: async () => {
          queryClient.refetchQueries();
        },
        mutationKey: ["addMute"],
      });

      const handleMuteClick = async (postId: number) => {
        try {
          mutate(postId);
        } catch (error) {
          console.log(error);
        }
      };

  return (
   <button onClick={() => handleMuteClick(postId)}>
    {hasMuted ? "Unmute" : "Mute"}
   </button>
  );
};

export default MuteButton;