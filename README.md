# Fidelidade — HubSpot CMS Theme

The unified HubSpot CMS theme for all Fidelidade digital properties, including websites, landing pages, microsites, emails, and more. Built by **WPP Portugal**, forked from HubSpot's Elevate theme and fully rebranded for the Fidelidade ecosystem.

## Overview

This theme is built with modern development practices:
- Vite for fast and efficient builds
- PostCSS for modern CSS processing
- HubL templating for dynamic content
- TypeScript support
- Built-in testing with Vitest

## Prerequisites

- [Node.js](https://nodejs.org) (version specified in `.node-version`)
- [HubSpot CLI](https://developers.hubspot.com/docs/cms/developer-reference/local-development-cli)

## Getting Started

1. Clone this repository:
   ```bash
   git clone [repository-url]
   cd wpp-hubspot-cms-fidelidade-theme
   ```

2. Install dependencies:
   ```bash
   npm run npm-install:all
   # or
   yarn yarn-install:all
   ```

3. Configure the HubSpot CLI (if not already set up):
   ```bash
   hs init
   ```

4. Build and upload the theme to your portal:
   ```bash
   npm run build-upload
   # or
   yarn build-upload
   ```

5. Start the development server:
   ```bash
   npm run npm-start
   # or
   yarn yarn-start
   ```

## Available Scripts

- `build` — Builds the theme for production
- `upload` — Uploads the theme to HubSpot
- `build-upload` — Builds and uploads in one step
- `test` — Runs the test suite
- `npm-install:all` — Installs dependencies for all workspaces
- `yarn-install:all` — Installs dependencies using Yarn for all workspaces
- `npm-start` — Starts the development server (npm)
- `yarn-start` — Starts the development server (Yarn)

## Project Structure

```
├── src/
│   └── fidelidade-theme/         # Main theme directory
│       ├── _locales/             # Localization files
│       ├── assets/               # Theme assets
│       ├── components/           # React components
│       │   ├── modules/          # Theme modules (Accordion, Button, Card, etc.)
│       │   ├── fieldLibrary/     # Field components for module fields
│       │   ├── utils/            # Utility helpers
│       │   ├── types/            # TypeScript type definitions
│       │   └── ButtonComponent/  # Example shared component consumed by modules
│       ├── helpers/              # Helper functions and utilities
│       ├── images/               # Theme images
│       ├── sections/             # Theme sections
│       ├── templates/            # Theme templates
│       ├── fields.json           # Theme settings
│       ├── theme.json            # Theme configuration
│       ├── package.json          # Theme-specific dependencies
│       └── tsconfig.json         # TypeScript configuration
├── build/                        # Build configuration
├── vite.config.ts                # Vite configuration
├── package.json                  # Project dependencies
└── hsproject.json                # HubSpot project configuration
```

## Development

The theme uses HubSpot's local development server for real-time previews. Run `npm run npm-start` or `yarn yarn-start` and open the local development URL provided by the CLI.

## Creating a Child Theme

Building a child theme lets you extend this theme without modifying its core files.

### Using Design Manager

1. Create a new theme in Design Manager.
2. Select "Use blank theme as starting point."
3. In your `theme.json`, add `"extends": "@fidelidade/cms-theme"`.
4. Copy `src/fidelidade-theme/fields.json` into the root of your new theme.
5. Add your custom code from there.

### Using the Unified Theme Framework

1. Run `npx @hubspot/create-cms-theme` from your CLI.
2. Follow the prompts to create a blank unified theme project.
3. In your `theme.json`, add `"extends": "@fidelidade/cms-theme"`.
4. Copy `src/fidelidade-theme/fields.json` into the root of your new theme.

### Grids

The grids system and related HubL tags are only available within the default HubSpot Elevate theme — they do not work in child themes or custom implementations. In the theme templates, look for `{% if grids %} ... {% else %} ...` blocks and reference the code inside `{% else %}`.

### Inline Editing

The inline editing functionality (`data-hs-token` attribute, `inlineEditable` field property) is only available within the default HubSpot Elevate theme and cannot be used in child themes or custom implementations.

### Overriding Parent Theme Files

To override a file from the parent theme, place a file at the same path with the same name in your child theme.

## Contributing

This theme is maintained by **WPP Portugal** for Fidelidade projects. Open an issue if you find a bug or want to request a feature.

## License

This project is licensed under the Apache-2.0 License — see the LICENSE file for details.

## Resources

- [Building with React on HubSpot](https://developers.hubspot.com/docs/guides/cms/react/overview)
- [HubSpot Developer Documentation](https://developers.hubspot.com/)
- [HubSpot Community](https://community.hubspot.com/)
