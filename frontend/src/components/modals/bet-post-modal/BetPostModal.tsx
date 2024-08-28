import React, { useContext, useState } from "react";
import { useAxios, useBetPostModal, useBetSlip } from "../../../hooks";
import Modal from "../modal/Modal";
import MentionsTextarea from "../../mentions-textarea/MentionsTextarea";
import betslipStore, { Pick } from "../../../store/betslipStore";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AuthContext } from "../../../context/AuthContext";
import "./betpostmodal.scss";
import { Bet } from "../../../types/BetTypes";

type BetPostModalProps = {};

const BetPostModal: React.FC<BetPostModalProps> = () => {
  const [file, setFile] = useState(null);
  const [body, setBody] = useState("");

  const { currentUser } = useContext(AuthContext) || {};

  const betPostModal = useBetPostModal();
  const betslip = useBetSlip();
  const queryClient = useQueryClient();

  const betstore = betslipStore;
  const isParlay = betstore.isParlay;

  const handleSubmitPost = async (newPost: any) => {
    return await useAxios.post("/posts", newPost);
  };

  const handleCreateBet = async (bet: Bet) => {
    return await useAxios.post("/single_bets", bet);
  };

  const { mutate } = useMutation({
    mutationFn: async (newPost: any) => {
      const postResponse = await handleSubmitPost(newPost);
      const postId = postResponse.data.id;

      const picks = betstore.picks;
      console.log(picks)
      const wager = betstore.wager;
      const payout = betstore.payout;

      console.log(wager)

    //   picks.map((pick) => (
    //    console.log(pick)
    //  ));

      // await Promise.all(bet.map((bet) => handleCreateBet(bet)));
    },
    onSettled: async () => {
      queryClient.refetchQueries();
      setBody("");
      betPostModal.onClose();
    },
    mutationKey: ["addPostAndBet"],
  });

  const handlePostClick = async (e: React.FormEvent) => {
    e.preventDefault();

    const newPost = {
      body,
      // Add any other required fields for the post
    };

    try {
      mutate(newPost);
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
        {/* {betstore.picks.map((pick: Pick) => (
          <div className="pick">
            <p>{pick.matchup}</p>
            <p>{pick.type}</p>
            <p>{pick.team} </p>
            <span>{pick.price}</span>
          </div>
        ))} */}
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
      <button className="submit-btn" onClick={handlePostClick}>
        Post your bet
      </button>
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
