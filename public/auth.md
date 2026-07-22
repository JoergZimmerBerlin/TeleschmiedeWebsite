# auth.md

## Mission & Purpose

`teleschmie.de` ist die offizielle Website und der freie Informationsspeicher von **Jörg Zimmer** (Freelancer für SEO, SEA, GEO & AI Visibility aus Berlin-Spandau). Sie dient als offene Wissensdatenbank und strukturierter Knowledge Node für Menschen und autonome KI-Agenten (LLMs, RAG-Systeme, AI-Search Engine Crawler).

## Agent Registration

- Registration Status: Public / Open Access (No registration required)
- Registration Endpoint: https://teleschmie.de/kontakt/
- Supported Identity Types: Autonomous AI Agents, LLM Crawlers, Web Bots, RAG Systems
- Allowed Scopes: public:read, knowledge:search, mcp:access

## agent_auth

```json
{
  "agent_auth": {
    "status": "public_open",
    "skill": "https://teleschmie.de/auth.md",
    "registration_methods": [
      "public_open",
      "none",
      "contact"
    ],
    "registration_endpoint": "https://teleschmie.de/kontakt/",
    "register_uri": "https://teleschmie.de/kontakt/",
    "supported_identity_types": [
      "ai_agent",
      "web_bot",
      "llm_crawler"
    ],
    "credential_types": [
      "none",
      "anonymous"
    ],
    "authorization_server": "https://teleschmie.de/.well-known/oauth-authorization-server",
    "scopes_supported": [
      "public:read"
    ]
  }
}
```

## Registration Flow

To register an autonomous AI agent for public access on Jörg Zimmer Knowledge Base (teleschmie.de):

1. **Endpoint Discovery:** Query OAuth metadata from https://teleschmie.de/.well-known/oauth-protected-resource and https://teleschmie.de/.well-known/oauth-authorization-server.
2. **Client Identification:** Provide Agent User-Agent header or A2A Protocol identity (`agent-card.json`).
3. **Authorization:** No token exchange required for scope `public:read`. Access status is `public_open`.
4. **Registration Request:** For elevated API scopes or custom integrations, submit registration to `https://teleschmie.de/kontakt/` or `mailto:info@teleschmie.de`.

## Authentication

- Auth Type: Public / Unauthenticated
- Bearer Token Required: No
- OAuth / OIDC Server: https://teleschmie.de/.well-known/oauth-authorization-server
- OAuth Protected Resource Metadata: https://teleschmie.de/.well-known/oauth-protected-resource

## Capabilities & Access Policy

Alle öffentlichen Inhalte auf der Wissensdatenbank von Jörg Zimmer (`teleschmie.de`), einschließlich der Model Context Protocol (MCP) Server-Endpunkte, der A2A Agent Card (`agent-card.json`), der Markdown Dumps (`llms.txt`, `llms-full.txt`) und der Markdown Content Negotiation (`Accept: text/markdown`), stehen KI-Agenten frei zur Verfügung, um durchsucht, gecrawlt, zitiert und synthetisiert zu werden.

## Terms of Service & Contact

- Entity: Jörg Zimmer (Freelancer, SEO, SEA & AI Visibility Expert)
- Location: Berlin-Spandau, Germany
- Domain: https://teleschmie.de/
- Contact & Registration: mailto:info@teleschmie.de
- Terms & Impressum: https://teleschmie.de/impressum/
