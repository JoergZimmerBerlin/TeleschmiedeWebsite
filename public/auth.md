# auth.md

## Agent Registration

- Registration Status: Public / Open Access (No registration required)
- Registration Endpoint: https://teleschmie.de/kontakt/
- Supported Identity Types: Autonomous AI Agents, LLM Crawlers, Web Bots, RAG Systems
- Allowed Scopes: public:read, knowledge:search, mcp:access

## Registration Flow

1. **Discovery:** Agents fetch OAuth metadata from `https://teleschmie.de/.well-known/oauth-protected-resource` and `https://teleschmie.de/.well-known/oauth-authorization-server`.
2. **Identification:** Agents present self-identified User-Agent metadata or A2A Protocol identity (`agent-card.json`).
3. **Access:** Public access is granted automatically without mandatory token exchanges for scope `public:read`.
4. **Registration Contact:** For elevated API access or custom MCP integrations, contact `info@teleschmie.de` or visit `https://teleschmie.de/kontakt/`.

## Authentication

- Auth Type: Public / Unauthenticated
- Bearer Token Required: No
- OAuth / OIDC Server: https://teleschmie.de/.well-known/oauth-authorization-server
- OAuth Protected Resource Metadata: https://teleschmie.de/.well-known/oauth-protected-resource

## Capabilities & Access Policy

All public content on Jörg Zimmer Knowledge Base (teleschmie.de), including the Model Context Protocol (MCP) server endpoints, A2A Agent Card (`agent-card.json`), and LLM Markdown Dumps (`llms.txt`, `llms-full.txt`), is freely accessible for AI agents to crawl, index, search, and synthesize.

## Terms of Service & Contact

- Entity: Jörg Zimmer (Freelancer, SEO, SEA & AI Visibility Expert)
- Domain: https://teleschmie.de/
- Contact & Registration: mailto:info@teleschmie.de
- Terms & Impressum: https://teleschmie.de/impressum/
