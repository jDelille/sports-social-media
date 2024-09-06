export const postDetailsQuery = `
SELECT
p.id,
p.body,
p.image,
p.created_at,
p.user_id,
JSON_OBJECT(
  'id', u.id,
  'name', u.name,
  'username', u.username,
  'avatar', u.avatar,
  'isVerified', u.isVerified
) AS user,
NULL AS reposter_username,
NULL AS reposted_at,
NULL AS original_post_body,
NULL AS quote_reposted_post_id,
NULL AS quote_reposted_quote_repost_id,
NULL AS original_post_user,
p.metadata,
'post' AS type
FROM  posts p
JOIN  users u ON p.user_id = u.id
  WHERE p.id = ?
`;