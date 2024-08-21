import UserTypes from "./User";

export type CommentTypes = {
    id: number;
    post_id: number;
    quote_repost_id: number;
    user_id: number;
    body: string;
    image: string;
    created_at: string;
    updated_at: string;
    user: UserTypes
}