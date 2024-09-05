import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import "./skeleton.scss";

type PostSkeletonProps = {};
const PostSkeleton: React.FC<PostSkeletonProps> = () => {
  return (
    <div className="post-skeleton">
      <div className="header">
      <Skeleton className="avatar"/>
      <div className="text">
        <Skeleton className="name" />
        <Skeleton className="username" />
      </div>
      </div>
      <Skeleton count={4} className="body" />
    </div>
  );
};

export default PostSkeleton;
