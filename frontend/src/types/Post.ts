import UserTypes from "./User";

type PostTypes = {
    id: number;
    user_id: number;
    body: string;
    type: string;
    name: string;
    username: string;
    user: UserTypes;
    reposter_username: string;
    reposted_post_id: number;
    original_post_body: string;
    quote_reposted_post_id: number;
    quote_reposted_quote_repost_id: number;
    created_at: string;
    original_post_user: {
        id: number;
        name: string;
        username: string;
    }
}

export default PostTypes;