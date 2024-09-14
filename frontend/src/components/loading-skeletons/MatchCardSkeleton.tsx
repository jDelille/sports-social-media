import React from "react";
import Skeleton from "react-loading-skeleton";

type MatchCardSkeletonProps = {};
const MatchCardSkeleton: React.FC<MatchCardSkeletonProps> = () => {
  return (
    <div className="match-card-skeleton-list">
      <div className="match-card-skeleton">
        <div className="left">
          <Skeleton className="team" />
          <Skeleton className="team" />
          <Skeleton className="status" />
        </div>
        <div className="right">
          <div className="odds">
            <Skeleton className="odd" />
            <Skeleton className="odd" />
            <Skeleton className="odd" />
          </div>
          <div className="odds">
            <Skeleton className="odd" />
            <Skeleton className="odd" />
            <Skeleton className="odd" />
          </div>
        </div>
      </div>
      <div className="match-card-skeleton">
        <div className="left">
          <Skeleton className="team" />
          <Skeleton className="team" />
          <Skeleton className="status" />
        </div>
        <div className="right">
          <div className="odds">
            <Skeleton className="odd" />
            <Skeleton className="odd" />
            <Skeleton className="odd" />
          </div>
          <div className="odds">
            <Skeleton className="odd" />
            <Skeleton className="odd" />
            <Skeleton className="odd" />
          </div>
        </div>
      </div>
      <div className="match-card-skeleton">
        <div className="left">
          <Skeleton className="team" />
          <Skeleton className="team" />
          <Skeleton className="status" />
        </div>
        <div className="right">
          <div className="odds">
            <Skeleton className="odd" />
            <Skeleton className="odd" />
            <Skeleton className="odd" />
          </div>
          <div className="odds">
            <Skeleton className="odd" />
            <Skeleton className="odd" />
            <Skeleton className="odd" />
          </div>
        </div>
      </div>
      <div className="match-card-skeleton">
        <div className="left">
          <Skeleton className="team" />
          <Skeleton className="team" />
          <Skeleton className="status" />
        </div>
        <div className="right">
          <div className="odds">
            <Skeleton className="odd" />
            <Skeleton className="odd" />
            <Skeleton className="odd" />
          </div>
          <div className="odds">
            <Skeleton className="odd" />
            <Skeleton className="odd" />
            <Skeleton className="odd" />
          </div>
        </div>
      </div>
      <div className="match-card-skeleton">
        <div className="left">
          <Skeleton className="team" />
          <Skeleton className="team" />
          <Skeleton className="status" />
        </div>
        <div className="right">
          <div className="odds">
            <Skeleton className="odd" />
            <Skeleton className="odd" />
            <Skeleton className="odd" />
          </div>
          <div className="odds">
            <Skeleton className="odd" />
            <Skeleton className="odd" />
            <Skeleton className="odd" />
          </div>
        </div>
      </div>
      <div className="match-card-skeleton">
        <div className="left">
          <Skeleton className="team" />
          <Skeleton className="team" />
          <Skeleton className="status" />
        </div>
        <div className="right">
          <div className="odds">
            <Skeleton className="odd" />
            <Skeleton className="odd" />
            <Skeleton className="odd" />
          </div>
          <div className="odds">
            <Skeleton className="odd" />
            <Skeleton className="odd" />
            <Skeleton className="odd" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MatchCardSkeleton;
