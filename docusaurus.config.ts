import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

const config: Config = {
  title: 'Test Docs',
  tagline: 'Testing documentation generation - pleasse ignore ;-P.',
  favicon: 'img/favicon.svg',

  // Future flags, see https://docusaurus.io/docs/api/docusaurus-config#future
  future: {
    v4: true, // Improve compatibility with the upcoming Docusaurus v4
  },

  // Production URL and base path. For a GitHub Pages *project* site the
  // base path is always "/<repository-name>/". See SETUP.md before changing.
  url: 'https://kajtomato.github.io',
  baseUrl: '/test-of-documentation-page/',

  // GitHub pages deployment config.
  organizationName: 'KajtomatO', // GitHub user / org that owns the repo.
  projectName: 'test-of-documentation-page', // Repository name.

  // Fail the build on broken internal links instead of silently shipping them.
  onBrokenLinks: 'throw',

  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  // Self-hosted web fonts (no request to Google Fonts at runtime).
  // Referenced by --ifm-font-family-base / -monospace in src/css/custom.css.
  clientModules: [
    require.resolve('@fontsource-variable/inter'),
    require.resolve('@fontsource/ibm-plex-mono'),
  ],

  // Enable ```mermaid fenced code blocks in Markdown.
  markdown: {
    mermaid: true,
  },

  themes: [
    '@docusaurus/theme-mermaid',
    [
      '@easyops-cn/docusaurus-search-local',
      {
        // The search index is generated at build time. It is NOT available in
        // `npm start`; use `npm run build && npm run serve` to test search.
        hashed: true,
        indexBlog: false,
        docsRouteBasePath: '/docs',
        highlightSearchTermsOnTargetPage: true,
      },
    ],
  ],

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          // "Edit this page" links point at the file on GitHub. Docusaurus
          // resolves the right folder (docs/ or versioned_docs/) per version.
          editUrl:
            'https://github.com/KajtomatO/test-of-documentation-page/edit/main/',
          // Versioning. `docs/` is the unreleased "Next" version, served at
          // /docs/next/. Released snapshots live in versioned_docs/ and are
          // listed in versions.json; the newest one is served at /docs/.
          // Cutting a new version needs no change here, see CONTRIBUTING.md.
          versions: {
            current: {
              label: 'Next 🚧',
              banner: 'unreleased',
            },
          },
        },
        // This site has no blog.
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    image: 'img/docusaurus-social-card.jpg',
    colorMode: {
      respectPrefersColorScheme: true,
    },
    navbar: {
      title: 'Nimbus',
      logo: {
        alt: 'Nimbus logo',
        src: 'img/logo.svg',
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'docs',
          position: 'left',
          label: 'Docs',
        },
        {
          type: 'docsVersionDropdown',
          position: 'right',
        },
        {
          href: 'https://github.com/KajtomatO/test-of-documentation-page',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'light',
      links: [
        {
          title: 'Docs',
          items: [
            {label: 'Introduction', to: '/docs/'},
            {label: 'Quickstart', to: '/docs/getting-started/quickstart'},
            {label: 'CLI reference', to: '/docs/reference/cli'},
          ],
        },
        {
          title: 'Project',
          items: [
            {
              label: 'GitHub repository',
              href: 'https://github.com/KajtomatO/test-of-documentation-page',
            },
            {
              label: 'How to update these docs',
              href: 'https://github.com/KajtomatO/test-of-documentation-page/blob/main/CONTRIBUTING.md',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} KajtomatO. Nimbus is a fictional product. Built with Docusaurus.`,
    },
    prism: {
      // Stock token colours, but code block backgrounds follow the site's
      // neutral scale (see --gb-tint-2 in src/css/custom.css).
      theme: {
        ...prismThemes.github,
        plain: {...prismThemes.github.plain, backgroundColor: '#faf9fb'},
      },
      darkTheme: {
        ...prismThemes.dracula,
        plain: {...prismThemes.dracula.plain, backgroundColor: '#232223'},
      },
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
