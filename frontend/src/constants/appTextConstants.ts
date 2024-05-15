export const TEXT_CONSTANTS = Object.freeze({
    /**
     * Posts and comments
     */
    REPLYING_TO: "Replying to",
    REPLY_TO_POST: "Reply to post",
    POST_TO_PUBLIC: "Post to Public",
    COMPOSE: "Compose",
    VERIFY_DELETE_POST: "Are you sure you want to delete this post?",

    /**
     * User auth
     */
    PASSWORD_STRENGTH: "Password strength",
    PASSWORD_REQUIREMENTS: "At least one letter, one number, and one special character",
    PASSWORD_CHARACTER_LENGTH: "10+ characters",

    /**
     * Menu options
     */
    FAVORITE_POST: "Favotite post",
    BOOKMARK_POST: "Bookmark post",
    ADD_COMMENT: "Add comment",
    DELETE_POST: "Delete post",
    SHOW_POST_DETAILS: "Show post details",
    COPY_POST_LINK: "Copy link to post",
    MUTE_USER: (username: string) => `Mute @${username}`,
    BLOCK_USER: (username: string) => `Block @${username}`,
    REPORT_USER: (username: string) => `Report @${username}`,

    /**
     * Profile 
     */
    FOLLOWERS: "Followers",
    FOLLOWING: "Following",
    FOLLOW: "Follow",
    UNFOLLOW: "Unfollow",
    BETS: "Bets",
    EDIT_PROFILE: "Edit profile",
    CANCEL: "Cancel",
    DELETE: "Delete"
})  