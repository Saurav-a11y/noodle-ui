# 🍜 Noodles Crypto – Database Collections & Relationships

This document provides a complete overview of the Crypto-related MongoDB collections used by Noodles API, including field structures and entity relationships.

---

## 📌 Collections Overview

### 1️⃣ v2-token  
Stores core metadata of each crypto asset.

| Field | Type |
|-------|------|
| _id | ObjectId |
| symbol | string |
| base_currency | string |
| base_currency_desc | string |
| base_currency_id | number |
| base_currency_logoid | string |
| circulating_supply | number |
| crypto_blockchain_ecosystems_tr | string[] |
| crypto_common_categories_tr | string[] |
| crypto_consensus_algorithms_tr | string |
| fundamental_currency_code | string |
| max_supply | string |
| slug | string |
| total_supply | number |
| tvl | string |
| brief_info | string |
| mechanism | string |
| depegging_history | number |
| business_description | string |
| community | string[] |
| community_x_username | string |
| contracts | object[] |
| ├─ blockchain-id | string |
| ├─ blockchain-name | string |
| ├─ contract | string |
| └─ link | string |
| doc | string[] |
| explorer | string[] |
| has_bonds | boolean |
| has_contracts | boolean |
| instrument_name | string |
| is_blacklisted_in_scanner | boolean |
| medium_logo_url | string |
| sources | string[] |
| ticker_title | string |
| website | string[] |
| social | object |
| ├─ twitter | string |
| ├─ channelId | string |
| ├─ reddit | string |
| └─ github | string |
| lastCrawled | Date |
| countVideos | number |

---

### 2️⃣ v2-token-overview  
Stores enriched analytics & market insights linked to a token.

| Field | Type |
|-------|------|
| _id | ObjectId |
| symbol | string |
| crypto_total_rank | number |
| holders | object |
| ├─ active_addresses_ratio | string |
| ├─ total_addresses_with_balance | string |
| ├─ addresses_zero_balance | string |
| ├─ at_the_money_addresses_percentage | string |
| ├─ avg_balance | string |
| ├─ fundamental_currency_code | string |
| ├─ break_even_addresses_percentage | string |
| ├─ addresses_active | string |
| ├─ in_the_money_addresses_percentage | string |
| ├─ losses_addresses_percentage | string |
| ├─ addresses_new | string |
| ├─ out_the_money_addresses_percentage | string |
| └─ profit_addresses_percentage | string |
| info | object |
| ├─ base_currency | string |
| ├─ base_currency_desc | string |
| ├─ base_currency_logoid | string |
| ├─ crypto_blockchain_ecosystems_tr | string |
| ├─ crypto_common_categories_tr | string[] |
| ├─ circulating_supply | number |
| ├─ crypto_consensus_algorithms_tr | string |
| ├─ max_supply | number |
| ├─ total_supply | number |
| ├─ tvl | string |
| └─ fundamental_currency_code | string |
| isOutdated | boolean |
| market | object |
| ├─ change_from_open | number |
| ├─ change_from_open_1w | number |
| ├─ change_from_open_1m | number |
| ├─ change_from_open_abs | number |
| ├─ pricescale | number |
| ├─ minmov | number |
| ├─ fractional | string |
| ├─ minmove2 | number |
| ├─ currency | string |
| ├─ change_from_open_abs_1w | number |
| ├─ change_from_open_abs_1m | number |
| ├─ gap | number |
| ├─ gap_1w | string |
| ├─ gap_1m | string |
| ├─ high | number |
| ├─ high_1w | number |
| ├─ high_1m | number |
| ├─ high_3m | number |
| ├─ high_6m | number |
| ├─ price_52_week_high | number |
| ├─ high_all | number |
| ├─ low | number |
| ├─ low_1w | number |
| ├─ low_1m | number |
| ├─ low_3m | number |
| ├─ low_6m | number |
| ├─ price_52_week_low | number |
| ├─ low_all | number |
| ├─ open | number |
| ├─ open_1w | number |
| ├─ open_1m | number |
| ├─ perf_w | number |
| ├─ perf_1m | number |
| ├─ perf_3m | number |
| ├─ perf_6m | number |
| ├─ perf_ytd | number |
| ├─ perf_y | number |
| ├─ perf_5y | number |
| ├─ perf_10y | number |
| ├─ perf_all | number |
| ├─ close | number |
| ├─ change_abs | number |
| ├─ change_abs_1w | string |
| ├─ change_abs_1m | string |
| ├─ change | number |
| ├─ 24h_close_change_5 | string |
| ├─ change_1w | string |
| ├─ change_1m | string |
| ├─ volatility_d | number |
| ├─ volatility_w | number |
| ├─ volatility_m | number |
| ├─ 24h_vol_change_cmc | number |
| ├─ 24h_vol_cmc | number |
| └─ fundamental_currency_code | string |
| sentiment | object |
| ├─ contributorsactive | string |
| ├─ postsactive | string |
| ├─ altrank | string |
| ├─ contributorscreated | string |
| ├─ postscreated | string |
| ├─ interactions | string |
| ├─ galaxyscore | string |
| ├─ github_commits | string |
| ├─ sentiment | string |
| ├─ socialdominance | string |
| ├─ social_volume_24h | string |
| ├─ telegram_members | string |
| ├─ telegram_positive | string |
| ├─ telegram_negative | string |
| └─ tweets | string |
| transactions | object |
| ├─ average_transaction_usd | string |
| ├─ fundamental_currency_code | string |
| ├─ large_tx_count | string |
| ├─ large_tx_volume_usd | string |
| ├─ txs_count | string |
| ├─ txs_volume | string |
| └─ txs_volume_usd | string |
| valuation | object |
| ├─ market_cap_diluted_calc | number |
| ├─ fundamental_currency_code | string |
| ├─ market_cap_calc | number |
| ├─ market_cap_to_tvl | string |
| ├─ nvt | string |
| ├─ crypto_total_rank | number |
| ├─ velocity | string |
| └─ 24h_vol_to_market_cap | number |

Relation → `v2-token.base_currency` base `info.base_currency`

---

### 3️⃣ user  
Stores user authentication and identity information.

| Field | Type |
|-------|------|
| _id | ObjectId |
| id | string |
| avatar | string |
| biography | string |
| createdAt | Date |
| email | string |
| name | string |
| oauth_token | string |
| oauth_token_secret | string |
| provider | string |
| updatedAt | Date |
| username | string |
| birthday | Date |

---

### 4️⃣ user_activity_logs  
Tracks user browsing events and behavioral analytics.

| Field | Type |
|-------|------|
| _id | ObjectId |
| userId | string |
| type | string |
| assetType | string |
| assetSymbol | string |
| assetName | string |
| assetLogo | string |
| searchQuery | string |
| sortBy | string |
| filterBy | string |
| content | string |
| activity | string |
| createdAt | Date |

Relation → `user.id` base `userId`

---

### 5️⃣ ai_conversations  
Stores AI chat history per user per crypto session.

| Field | Type |
|-------|------|
| _id | ObjectId |
| userId | string |
| sessionId | string |
| assetType | string |
| assetSymbol | string |
| assetName | string |
| assetLogo | string |
| messages | array<object> |
| ├─ id | string |
| ├─ ai | boolean |
| ├─ text | string |
| └─ timestamp | number |
| createdAt | Date |
| updatedAt | Date |

---

### 6️⃣ v4_github_recent_commits  
Latest commits from open-source repos related to token dev activity.

| Field | Type |
|-------|------|
| _id | ObjectId |
| sha | string |
| author | object |
| ├─ login | string |
| ├─ id | number |
| ├─ node_id | string |
| ├─ avatar_url | string |
| ├─ gravatar_id | string |
| ├─ url | string |
| ├─ html_url | string |
| ├─ followers_url | string |
| ├─ following_url | string |
| ├─ gists_url | string |
| ├─ starred_url | string |
| ├─ subscriptions_url | string |
| ├─ organizations_url | string |
| ├─ repos_url | string |
| ├─ events_url | string |
| ├─ received_events_url | string |
| ├─ type | string |
| ├─ user_view_type | string |
| └─ site_admin | boolean |
| comments_url | string |
| commit | object |
| ├─ author | object |
| │ ├─ name | string |
| │ ├─ email | string |
| │ └─ date | Date (ISO string) |
| ├─ committer | object |
| │ ├─ name | string |
| │ ├─ email | string |
| │ └─ date | Date (ISO string) |
| ├─ message | string |
| ├─ tree | object |
| │ ├─ sha | string |
| │ └─ url | string |
| ├─ url | string |
| ├─ comment_count | number |
| └─ verification | object |
| ├─ verified | boolean |
| ├─ reason | string |
| ├─ signature | string |
| ├─ payload | string |
| └─ verified_at | Date (ISO string) |
| committer | object |
| ├─ login | string |
| ├─ id | number |
| ├─ node_id | string |
| ├─ avatar_url | string |
| ├─ gravatar_id | string |
| ├─ url | string |
| ├─ html_url | string |
| ├─ followers_url | string |
| ├─ following_url | string |
| ├─ gists_url | string |
| ├─ starred_url | string |
| ├─ subscriptions_url | string |
| ├─ organizations_url | string |
| ├─ repos_url | string |
| ├─ events_url | string |
| ├─ received_events_url | string |
| ├─ type | string |
| ├─ user_view_type | string |
| └─ site_admin | boolean |
| crawledAt | Date |
| html_url | string |
| node_id | string |
| parents | array of objects |
| ├─ sha | string |
| ├─ url | string |
| └─ html_url | string |
| repo | string |
| symbol | string |
| url | string |
| username | string |

Relation → `v2-token.base_currency` base `symbol`

---

### 7️⃣ v4_x_users  
Stores Twitter/X user profiles.

| Field | Type |
|-------|------|
| _id | ObjectId |
| id | string |
| created_at | Date (ISO string) |
| description | string |
| entities | object |
| ├─ url | object |
| │ └─ urls | array of objects |
| │   ├─ start | number |
| │   ├─ end | number |
| │   ├─ url | string |
| │   ├─ expanded_url | string |
| │   └─ display_url | string |
| └─ description | object |
|   └─ mentions | array of objects |
|     ├─ start | number |
|     ├─ end | number |
|     └─ username | string |
| is_identity_verified | boolean |
| lastUpdated | Date |
| most_recent_tweet_id | string |
| name | string |
| parody | boolean |
| profile_banner_url | string |
| profile_image_url | string |
| protected | boolean |
| public_metrics | object |
| ├─ followers_count | number |
| ├─ following_count | number |
| ├─ tweet_count | number |
| ├─ listed_count | number |
| ├─ like_count | number |
| └─ media_count | number |
| receives_your_dm | boolean |
| subscription | object |
| └─ subscribes_to_you | boolean |
| subscription_type | string |
| url | string |
| username | string |
| verified | boolean |
| verified_type | string |

Relation → `v4_x_tweets.author_id` base `id`
---

### 8️⃣ v4_x_tweets  
Engagement activity related to crypto assets on X (Twitter).

| Field | Type |
|-------|------|
| _id | ObjectId |
| id | string (Tweet ID) |
| attachments | object |
| └─ media_keys | string[] |
| author_id | string |
| collectionDate | Date |
| conversation_id | string |
| created_at | Date |
| dataType | string ("official" | "community" | ...) |
| display_text_range | number[] |
| edit_controls | object |
| ├─ edits_remaining | number |
| ├─ is_edit_eligible | boolean |
| └─ editable_until | Date |
| edit_history_tweet_ids | string[] |
| entities | object |
| ├─ urls | array of objects |
| │ ├─ start | number |
| │ ├─ end | number |
| │ ├─ url | string |
| │ ├─ expanded_url | string |
| │ ├─ display_url | string |
| │ └─ media_key | string (optional) |
| └─ annotations | array of objects |
|   ├─ start | number |
|   ├─ end | number |
|   ├─ probability | number |
|   ├─ type | string |
|   └─ normalized_text | string |
| lang | string |
| lastUpdated | Date |
| media_metadata | array of objects |
| └─ media_key | string |
| possibly_sensitive | boolean |
| public_metrics | object |
| ├─ retweet_count | number |
| ├─ reply_count | number |
| ├─ like_count | number |
| ├─ quote_count | number |
| ├─ bookmark_count | number |
| └─ impression_count | number |
| referenced_tweets | array of objects |
| ├─ type | string |
| └─ id | string |
| reply_settings | string |
| text | string |
| tokenSymbol | string |
| userId | string |
| username | string |

Relations:  
→ `v2-token.base_currency` base `tokenSymbol`
→ `v4_x_users.id` base `author_id`

---

### 9️⃣ v4_youtube_videos  
YouTube video analytics linked to token by hashtag or channel.

| Field | Type |
|-------|------|
| _id | ObjectId |
| videoId | string |
| channelId | string |
| channelName | string |
| description | string |
| hashtag | string (Token symbol) |
| lastUpdated | Date |
| metrics | object |
| ├─ views | number |
| ├─ likes | number |
| ├─ comments | number |
| ├─ content | object |
| │ ├─ duration | number (seconds) |
| │ ├─ category | string |
| │ └─ tags | string[] |
| └─ performance | object |
|   ├─ engagementRate | number |
|   ├─ likeToViewRatio | number |
|   └─ commentToViewRatio | number |
| publishedAt | Date |
| title | string |

Relation → `v2-token.social.channelId` base `channelId`

---

### 🔟 v5_reddit_post_engagement  
Reddit posts related to token (official or community).

| Field | Type |
|-------|------|
| _id | ObjectId |
| id | string (Reddit post id) |
| crawledAt | Date |
| data | object |
| ├─ approved_at_utc | string |
| ├─ subreddit | string |
| ├─ selftext | string |
| ├─ author_fullname | string |
| ├─ saved | boolean |
| ├─ mod_reason_title | string |
| ├─ gilded | number |
| ├─ clicked | boolean |
| ├─ title | string |
| ├─ link_flair_richtext | array |
| ├─ subreddit_name_prefixed | string |
| ├─ hidden | boolean |
| ├─ pwls | number |
| ├─ link_flair_css_class | string |
| ├─ downs | number |
| ├─ thumbnail_height | number/string |
| ├─ top_awarded_type | string |
| ├─ hide_score | boolean |
| ├─ name | string |
| ├─ quarantine | boolean |
| ├─ link_flair_text_color | string |
| ├─ upvote_ratio | number |
| ├─ author_flair_background_color | string |
| ├─ subreddit_type | string |
| ├─ ups | number |
| ├─ total_awards_received | number |
| ├─ media_embed | object |
| ├─ thumbnail_width | number/string |
| ├─ author_flair_template_id | string |
| ├─ is_original_content | boolean |
| ├─ user_reports | array |
| ├─ secure_media | object/string |
| ├─ is_reddit_media_domain | boolean |
| ├─ is_meta | boolean |
| ├─ category | string |
| ├─ secure_media_embed | object |
| ├─ link_flair_text | string |
| ├─ can_mod_post | boolean |
| ├─ score | number |
| ├─ approved_by | string |
| ├─ is_created_from_ads_ui | boolean |
| ├─ author_premium | boolean |
| ├─ thumbnail | string |
| ├─ edited | boolean |
| ├─ author_flair_css_class | string |
| ├─ author_flair_richtext | array |
| ├─ gildings | object |
| ├─ content_categories | array/string |
| ├─ is_self | boolean |
| ├─ mod_note | string |
| ├─ created | number (Unix timestamp) |
| ├─ link_flair_type | string |
| ├─ wls | number |
| ├─ removed_by_category | string |
| ├─ banned_by | string |
| ├─ author_flair_type | string |
| ├─ domain | string |
| ├─ allow_live_comments | boolean |
| ├─ selftext_html | string (HTML encoded) |
| ├─ likes | number/string |
| ├─ suggested_sort | string |
| ├─ banned_at_utc | string |
| ├─ view_count | number/string |
| ├─ archived | boolean |
| ├─ no_follow | boolean |
| ├─ is_crosspostable | boolean |
| ├─ pinned | boolean |
| ├─ over_18 | boolean |
| ├─ all_awardings | array |
| ├─ awarders | array |
| ├─ media_only | boolean |
| ├─ can_gild | boolean |
| ├─ spoiler | boolean |
| ├─ locked | boolean |
| ├─ author_flair_text | string |
| ├─ treatment_tags | array |
| ├─ visited | boolean |
| ├─ removed_by | string |
| ├─ num_reports | number/string |
| ├─ distinguished | string |
| ├─ subreddit_id | string |
| ├─ author_is_blocked | boolean |
| ├─ mod_reason_by | string |
| ├─ removal_reason | string |
| ├─ link_flair_background_color | string |
| ├─ id | string (duplicate field from Reddit) |
| ├─ is_robot_indexable | boolean |
| ├─ report_reasons | string |
| ├─ author | string |
| ├─ discussion_type | string |
| ├─ num_comments | number |
| ├─ send_replies | boolean |
| ├─ contest_mode | boolean |
| ├─ mod_reports | array |
| ├─ author_patreon_flair | boolean |
| ├─ author_flair_text_color | string |
| ├─ permalink | string |
| ├─ stickied | boolean |
| ├─ url | string |
| ├─ subreddit_subscribers | number |
| ├─ created_utc | number (Unix timestamp) |
| ├─ num_crossposts | number |
| ├─ media | object/string |
| └─ is_video | boolean |
| entityId | string (Mongo Ref but not enforced) |
| entityType | string ("official" | "community") |
| kind | string ("t3" means Reddit Post) |
| symbol | string (token symbol) |
| username | string |

Relation → `v2-token.base_currency` base `symbol`

---

## 🔗 Entity Relationship Diagram (Crypto)

```mermaid
erDiagram
    V2Token ||--o{ V2TokenOverview : "base_currency->info.base_currency"
    V2Token ||--o{ X_Tweets : "base_currency->tokenSymbol"
    V2Token ||--o{ Github_Commits : "base_currency->symbol"
    V2Token ||--o{ Youtube_Videos : "social.channelId->channelId"
    V2Token ||--o{ RedditEngagement : "base_currency->symbol"

    User ||--o{ AIConversations : "id->userId"
    User ||--o{ UserActivityLogs : "id->userId"

    X_Users ||--o{ X_Tweets : "id->author_id"

    V2Token {
      string base_currency
      string symbol
    }

    V2TokenOverview {
      object info { string base_currency}
      string symbol
    }

    X_Tweets {
      string tokenSymbol
      string author_id
    }

    X_Users {
      string id
    }

    Github_Commits {
      string symbol
    }

    Youtube_Videos {
      string channelId
    }

    RedditEngagement {
      string symbol
    }

    User {
      string id
    }

    UserActivityLogs {
      string userId
    }

    AIConversations {
      string userId
    }



                                  +------------------+
                                  |    user          |
                                  |------------------|
                                  |  id (PK)         |
                                  +---------+--------+
                                            |
                                            | 1 - N
                                            |
                     +----------------------+-------------------+
                     |                                          |
             +-------v---------+                        +--------v------------+
             | ai_conversations|                        | user_activity_logs  |
             |-----------------|                        |---------------------|
             | userId (FK)     |                        | userId (FK)         |
             | assetSymbol (FK)|                        | assetSymbol (FK)    |
             +-------+---------+                        +---------+-----------+
                     |                                            |
                     | N                                          | N
                     |                                            |
           +---------v---------------------------------------------v---------+
           |                        v2-token-overview                        |
           |-----------------------------------------------------------------|
           | symbol (PK)                                                     |
           | info.base_currency (FK → v2-token.base_currency)                |
           +---------+-------------------------------------------------------+
                     |
                     | 1
                     |
           +---------v---------+
           |    v2-token       |
           |-------------------|
           | base_currency PK  |
           | social.*          |
           +---+---------------+
               |
      +--------+--------+---------------+----------------+
      |                 |               |                |
      |                 |               |                |
    FK via            FK via          FK via           FK via
    github          channelId         reddit           twitter
      |                 |               |                |
+-----v------+   +------v------+    +---v-------+    +---v------+
| v4_github  |   | v4_youtube  |    | v5_reddit |    | v4_x     |
| commits    |   | _videos     |    | _posts    |    | _tweets  |
+------------+   +-------------+    +-----------+    +----------+
                                                         |
                                                         | FK
                                                         v
                                                    +-----------+
                                                    | v4_x_users|
                                                    +-----------+