export const originalPostsQuery = `
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
      'avatar', u.avatar
    ) AS user,
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
  WHERE p.user_id IN (?)`;

export const repostsQuery = `
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
      'avatar', ou.avatar
    ) AS user,
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
  WHERE p.user_id IN (?)`;

export const quoteRepostsRepostsQuery = `
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
      'avatar', ur.avatar
    ) AS user,
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
      'avatar', ou.avatar
    ) AS original_post_user,
    p1.metadata,
    'quote_repost_repost' AS type
  FROM defaultdb.quote_reposts qr
  JOIN defaultdb.reposts r ON qr.id = r.reposted_quote_repost_id
  JOIN defaultdb.users ur ON r.reposter_id = ur.id
  LEFT JOIN defaultdb.posts p1 ON qr.quote_reposted_post_id = p1.id
  LEFT JOIN defaultdb.quote_reposts qrr ON qr.quote_reposted_quote_repost_id = qrr.id
  LEFT JOIN defaultdb.users ou ON qr.original_post_user_id = ou.id
  WHERE qr.quote_reposter_id IN (?)`;

  export const quoteRepostsQuery = `
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
      'avatar', ur.avatar
    ) AS user,
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
      'avatar', ou.avatar
    ) AS original_post_user,
    p1.metadata,
    'quote_repost' AS type
  FROM defaultdb.quote_reposts qr
  LEFT JOIN defaultdb.posts p1 ON qr.quote_reposted_post_id = p1.id
  LEFT JOIN defaultdb.quote_reposts qrr ON qr.quote_reposted_quote_repost_id = qrr.id
  JOIN defaultdb.users ur ON qr.quote_reposter_id = ur.id
  LEFT JOIN defaultdb.users ou ON qr.original_post_user_id = ou.id
  WHERE qr.quote_reposter_id IN (?)`;