import UserTypes from "./User";

type RelationshipTypes = {
    id: number;
    followerCount: number;
    followingCount: number;
    followers: UserTypes[];
    following: UserTypes[];
}

export default RelationshipTypes;