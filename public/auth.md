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
    "skill": "https://teleschmie.de/auth.md",
    "register_uri": "https://teleschmie.de/kontakt/",
    "registration_endpoint": "https://teleschmie.de/kontakt/",
    "identity_endpoint": "https://teleschmie.de/kontakt/",
    "claim_endpoint": "https://teleschmie.de/kontakt/",
    "events_endpoint": "https://teleschmie.de/kontakt/",
    "identity_types_supported": [
      "anonymous",
      "identity_assertion",
      "service_auth"
    ],
    "supported_identity_types": [
      "anonymous",
      "identity_assertion",
      "service_auth"
    ],
    "credential_types": [
      "none",
      "anonymous"
    ],
    "registration_methods": [
      "Auth.md",
      "auth.md",
      "public_open",
      "none"
    ],
    "anonymous": {
      "credential_types_supported": [
        "none",
        "anonymous"
      ],
      "claim_uri": "https://teleschmie.de/kontakt/"
    },
    "identity_assertion": {
      "credential_types_supported": [
        "urn:ietf:params:oauth:token-type:id-jag"
      ],
      "assertion_types_supported": [
        "urn:ietf:params:oauth:token-type:id-jag"
      ]
    },
    "events_supported": [
      "https://schemas.workos.com/events/agent/auth/identity/assertion/revoked"
    ],
    "authorization_server": "https://teleschmie.de/.well-known/oauth-authorization-server",
    "scopes_supported": [
      "public:read"
    ]
  }
}
```

## Step 1 — Discover
Discovery is two hops.
1. Fetch the Protected Resource Metadata: `GET /.well-known/oauth-protected-resource`
2. Fetch the Authorization Server metadata: `GET /.well-known/oauth-authorization-server`

## Step 2 — Pick a method
Use this decision tree:
1. **identity_assertion + id-jag**
2. **service_auth**
3. **anonymous**

## Step 3 — Register
### identity_assertion + id-jag
Mint the assertion with aud = the resource from the PRM.
### service_auth
Claim ceremony required.
### anonymous
Claim ceremony optional.

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
