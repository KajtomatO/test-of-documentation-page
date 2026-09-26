import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

const config: Config = {
  title: 'Nimbus Docs',
  tagline: 'Schedule it, retry it, see what happened.',
  favicon: 'img/favicon.ico',

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
      style: 'dark',
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
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
