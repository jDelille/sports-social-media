export const betPostsQuery = `
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
    p.bet AS bet,
    NULL AS reposter_username,
    NULL AS reposted_at,
    NULL AS original_post_body,
    NULL AS quote_reposted_post_id,
    NULL AS quote_reposted_quote_repost_id,
    NULL AS original_post_user,
    p.metadata,
    'post' AS type
FROM defaultdb.posts p
JOIN defaultdb.users u ON p.user_id = u.id
WHERE JSON_EXTRACT(p.bet, '$') IS NOT NULL AND JSON_EXTRACT(p.bet, '$') != '{}'
`;

export const betRepostsQuery = `
SELECT
    p.id,
    p.body,
    p.image,
    p.created_at,
    r.reposter_id AS user_id,
    JSON_OBJECT(
        'id', ou.id,
        'name', ou.name,
        'username', ou.username,
        'avatar', ou.avatar,
        'isVerified', ou.isVerified
    ) AS user,
    p.bet AS bet,
    r.reposter_username,
    r.created_at AS reposted_at,
    NULL AS original_post_body,
    NULL AS quote_reposted_post_id,
    NULL AS quote_reposted_quote_repost_id,
    NULL AS original_post_user,
    p.metadata,
    'repost' AS type
FROM defaultdb.posts p
JOIN defaultdb.reposts r ON p.id = r.reposted_post_id
JOIN defaultdb.users ur ON r.reposter_id = ur.id
LEFT JOIN defaultdb.posts op ON p.id = op.id
LEFT JOIN defaultdb.users ou ON op.user_id = ou.id
WHERE JSON_EXTRACT(p.bet, '$') IS NOT NULL AND JSON_EXTRACT(p.bet, '$') != '{}'
`;

export const betQuoteRepostsQuery = `
SELECT 
    qr.id,
    qr.body,
    qr.image,
    qr.created_at,
    qr.quote_reposter_id AS user_id,
    JSON_OBJECT(
        'id', ur.id,
        'name', ur.name,
        'username', ur.username,
        'avatar', ur.avatar,
        'isVerified', ur.isVerified
    ) AS user,
    p1.bet AS bet,
    NULL AS reposter_username,
    qr.created_at AS reposted_at,
    CASE
        WHEN qrr.id IS NOT NULL THEN qrr.body
        ELSE p1.body
    END AS original_post_body,
    qr.quote_reposted_post_id,
    qr.quote_reposted_quote_repost_id,
    JSON_OBJECT(
        'id', ou.id,
        'name', ou.name,
        'username', ou.username,
        'avatar', ou.avatar,
        'isVerified', ou.isVerified
    ) AS original_post_user,
    p1.metadata,
    'quote_repost' AS type
FROM  quote_reposts qr
LEFT JOIN defaultdb.posts p1 ON qr.quote_reposted_post_id = p1.id
LEFT JOIN defaultdb.quote_reposts qrr ON qr.quote_reposted_quote_repost_id = qrr.id
JOIN defaultdb.users ur ON qr.quote_reposter_id = ur.id
LEFT JOIN defaultdb.users ou ON qr.original_post_user_id = ou.id
WHERE JSON_EXTRACT(p1.bet, '$') IS NOT NULL AND JSON_EXTRACT(p1.bet, '$') != '{}'
`;

export const betQuoteRepostsRepostsQuery = `
SELECT
    qr.id,
    qr.body,
    qr.image,
    qr.created_at,
    r.reposter_id AS user_id,
    JSON_OBJECT(
        'id', ur.id,
        'name', ur.name,
        'username', ur.username,
        'avatar', ur.avatar,
        'isVerified', ur.isVerified
    ) AS user,
    p1.bet AS bet,
    ur.username AS reposter_username,
    r.created_at AS reposted_at,
    CASE
        WHEN qrr.body IS NOT NULL THEN qrr.body
        ELSE p1.body
    END AS original_post_body,
    qr.quote_reposted_post_id,
    qr.quote_reposted_quote_repost_id,
    JSON_OBJECT(
        'id', ou.id,
        'name', ou.name,
        'username', ou.username,
        'avatar', ou.avatar,
        'isVerified', ou.isVerified
    ) AS original_post_user,
    p1.metadata,
    'quote_repost_repost' AS type
FROM defaultdb.quote_reposts qr
JOIN defaultdb.reposts r ON qr.id = r.reposted_quote_repost_id
JOIN defaultdb.users ur ON r.reposter_id = ur.id
LEFT JOIN defaultdb.posts p1 ON qr.quote_reposted_post_id = p1.id
LEFT JOIN defaultdb.quote_reposts qrr ON qr.quote_reposted_quote_repost_id = qrr.id
LEFT JOIN defaultdb.users ou ON qr.original_post_user_id = ou.id
WHERE JSON_EXTRACT(p1.bet, '$') IS NOT NULL AND JSON_EXTRACT(p1.bet, '$') != '{}'
`;