# OmniDev Documentation Hub

Centralized documentation for all OmniDev projects, deployed on Cloudflare Pages.

## Projects

- **OmniDev Platform** — All-in-One AI development platform
- **Knowledge Engine** — Pluggable knowledge engine for RAG applications

## Development

### Prerequisites

- Node.js 20+
- npm or yarn

### Setup

```bash
# Install dependencies
npm install

# Start dev server
npm run dev
```

### Build

```bash
npm run build
```

### Preview

```bash
npm run preview
```

## Deployment

### Cloudflare Pages

1. Connect your GitHub repository to Cloudflare Pages
2. Set build command: `npm run build`
3. Set build output directory: `.vitepress/dist`
4. Deploy

### Manual Deployment

```bash
# Build
npm run build

# Deploy using Wrangler
npx wrangler pages deploy .vitepress/dist
```

## Adding New Projects

1. Create a new directory in the root (e.g., `new-project/`)
2. Add markdown files for the project documentation
3. Update `.vitepress/config.ts`:
   - Add navigation item
   - Add sidebar configuration
4. Update `index.md` feature section
5. Update `guide/overview.md` with project info

## Structure

```
omnidev-docs/
├── .vitepress/
│   └── config.ts          # VitePress configuration
├── platform/              # OmniDev Platform docs
├── knowledge-engine/      # Knowledge Engine docs
├── guide/                 # General guides
├── public/                # Static assets
├── index.md               # Homepage
├── package.json
└── wrangler.toml          # Cloudflare Pages config
```
