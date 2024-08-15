import React, { useState } from "react";
import { useAxios, useBetPostModal, useBetSlip } from "../../hooks";
import Modal from "../modal/Modal";
import MentionsTextarea from "../mentions-textarea/MentionsTextarea";
import betslipStore, { Pick } from "../../store/betslipStore";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import "./betpostmodal.scss";

type BetPostModalProps = {};

const BetPostModal: React.FC<BetPostModalProps> = () => {
  const [file, setFile] = useState(null);
  const [body, setBody] = useState("");

  const betPostModal = useBetPostModal();
  const betslip = useBetSlip();
  const queryClient = useQueryClient();

  const betstore = betslipStore;
  const isParlay = betstore.isParlay


  const handleSubmitBet = async (newPost: any) => {
    await useAxios.post("/posts", newPost)
  }

  const { mutate } = useMutation({
    mutationFn: (newPost: any) => handleSubmitBet(newPost),
    onSettled: async () => {
      queryClient.refetchQueries();
      setBody("");
    },
    mutationKey: ["addPost"],
  });

  const handlePostClick = async (e: any) => {
    e.preventDefault();
    
    const picks = betstore.picks;
    const wager = betstore.wager;
    const payout = betstore.payout;

    const bet = {
      picks,
      wager,
      payout,
      isParlay
    }

    try {
      mutate({ body, bet });
      setBody("");
      betslip.onClose();
    } catch (error) {
      console.log(error);
    }
  };

  const bodyContent = (
    <div className="bet-post-modal">
      <div className="picks">
        {isParlay && (
          <p className="parlay-picks">(Parlay) {betstore.picks.length} picks</p>
        )}
        {betstore.picks.map((pick: Pick) => (
          <div className="pick">
            <p>{pick.matchup}</p>
            <p>{pick.type}</p>
            <p>{pick.team} </p>
            <span>{pick.price}</span>
          </div>
        ))}
      </div>
      <div className="textarea-wrapper">
        <MentionsTextarea
          setBody={setBody}
          body={body}
          setFile={setFile}
          file={file}
          handleClick={(e) => console.log(e)}
          placeholder="Say something about your picks"
          isActive
        />
      </div>
      <button className="submit-btn" onClick={handlePostClick}>Post your bet</button>
    </div>
  );

  const handleClose = () => {
    betPostModal.onClose();
  };

  const previousModal = () => {
    betPostModal.onClose();
    betslip.onOpen();
  };

  return (
    <div className="bet-post-modal">
      <Modal
        body={bodyContent}
        title="Compose"
        onClose={handleClose}
        isOpen={betPostModal.isOpen}
        hasBack={true}
        previousModal={previousModal}
      />
    </div>
  );
};

export default BetPostModal;
