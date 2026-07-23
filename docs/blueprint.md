# CyberEthics & Modding Guide — Bot specification

**Archetype:** education

**Voice:** professional and informative — write every user-facing message, button label, error, and empty state in this voice.

A Telegram bot that provides educational, high-level information about ethical hacking and game/software modding, focusing on concepts, legal considerations, and community resources. The bot offers curated articles, search functionality, and user bookmarking features, with optional digest subscriptions and moderation reporting.

> This is the complete contract for the bot. Implement EVERY entry point, flow, feature, integration, and edge case below. The completeness review checks the bot against this document after each build pass.

## Primary audience

- hobbyists
- learners
- cybersecurity enthusiasts
- modding community members

## Success criteria

- User engagement with educational content
- Active use of search and bookmarking features
- Moderation reports handled promptly by admin

## Entry points

Every feature must be reachable from the bot's command/button surface (button-first; only /start and /help are slash commands).

- **/start** (command, actor: user, command: /start) — Open the main menu
- **/help** (command, actor: user, command: /help) — Display help and available commands
- **/topics** (command, actor: user, command: /topics) — Browse available topics
- **/search** (command, actor: user, command: /search) — Search for resources by query
- **/latest** (command, actor: user, command: /latest) — View the latest resources
- **Cybersecurity** (button, actor: user, callback: topic:cybersecurity) — Browse cybersecurity resources
- **Modding** (button, actor: user, callback: topic:modding) — Browse modding resources
- **Careers** (button, actor: user, callback: topic:careers) — Explore career paths in cybersecurity
- **Tools & Frameworks** (button, actor: user, callback: topic:tools) — Discover tools and frameworks
- **Communities** (button, actor: user, callback: topic:communities) — Join and explore communities

## Flows

### Main Menu
_Trigger:_ /start

1. Display main menu with topic buttons
2. Handle user selection of a topic

_Data touched:_ User preferences

### Resource Search
_Trigger:_ /search

1. Prompt user for search query
2. Display up to 5 resource cards with summary, source link, tags, and save/share buttons

_Data touched:_ Search query, Resource data

### Latest Resources
_Trigger:_ /latest

1. Fetch and display the latest resources
2. Show resource cards with summary, source link, tags, and save/share buttons

_Data touched:_ Resource data

### Digest Subscription
_Trigger:_ User subscribes to daily/weekly digest

1. Prompt user to select digest frequency
2. Save subscription preference
3. Send confirmation message

_Data touched:_ User preferences

### Report Resource
_Trigger:_ User clicks report button on a resource

1. Prompt user for report reason
2. Log report entry
3. Send notification to admin chat

_Data touched:_ Moderation reports

## Data entities

Durable data (must survive a restart) uses the toolkit's persistent store, never in-memory maps.

- **Topic** _(retention: persistent)_ — A category of content (e.g., Cybersecurity, Modding)
  - fields: name, description
- **Resource** _(retention: persistent)_ — An article or resource with title, summary, URL, and tags
  - fields: title, summary, url, tags
- **User Bookmark** _(retention: persistent)_ — A saved resource by a user
  - fields: user_id, title, url, tags, timestamp
- **User Preference** _(retention: persistent)_ — User settings for topics of interest and digest subscriptions
  - fields: user_id, topics_of_interest, digest_frequency
- **Moderation Report** _(retention: persistent)_ — A report of inappropriate content
  - fields: user_id, resource_url, report_reason, timestamp

## Integrations

- **Telegram** (required) — Bot API messaging
- **Web URLs** (required) — Public resource links shared in chat
Call external APIs against their real contract (correct endpoints, ids, params); credentials from env. Do not fake responses.

## Owner controls

- Curate public resources and community links
- Configure admin chat for moderation reports
- Set digest frequency options
- Manage content filtering rules for safety

## Notifications

- Daily/weekly digest notifications to subscribed users
- Moderation report notifications to admin chat

## Permissions & privacy

- User data (bookmarks, preferences) stored securely and privately
- User IDs used for personalization and moderation tracking
- Moderation reports anonymized if requested

## Edge cases

- User attempts to search for non-existent resources
- User tries to bookmark the same resource multiple times
- Moderation report submitted for a non-existent resource
- User unsubscribes from a digest they never subscribed to

## Required tests

- Verify resource search returns up to 5 relevant results
- Test digest subscription and unsubscription flow
- Validate moderation report submission and admin notification
- Ensure content filtering blocks detailed exploit/mod-install instructions

## Assumptions

- Owner will provide curated public resources and community links later
- Admin will handle moderation reports promptly
- Users will follow legal and ethical guidelines
