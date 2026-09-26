import type {ReactNode} from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

type FeatureItem = {
  title: string;
  Svg: React.ComponentType<React.ComponentProps<'svg'>>;
  description: ReactNode;
};

const FeatureList: FeatureItem[] = [
  {
    title: 'Written in Markdown',
    Svg: require('@site/static/img/undraw_docusaurus_mountain.svg').default,
    description: (
      <>
        Every page is a plain Markdown file in the <code>docs/</code> folder.
        Hints, tabs, code blocks and{' '}
        <Link to="/docs/guides/architecture">Mermaid diagrams</Link> work out
        of the box.
      </>
    ),
  },
  {
    title: 'Versioned',
    Svg: require('@site/static/img/undraw_docusaurus_tree.svg').default,
    description: (
      <>
        Readers see the docs for the release they run. Use the version
        dropdown in the navbar to switch between <strong>1.0</strong> and the
        unreleased <strong>Next</strong> docs.
      </>
    ),
  },
  {
    title: 'Searchable and auto-deployed',
    Svg: require('@site/static/img/undraw_docusaurus_react.svg').default,
    description: (
      <>
        Full-text search is built into the static site, no external service
        needed. Every push to <code>main</code> is published to GitHub Pages by
        GitHub Actions.
      </>
    ),
  },
];

function Feature({title, Svg, description}: FeatureItem) {
  return (
    <div className={clsx('col col--4', styles.col)}>
      <div className={styles.card}>
        <Svg className={styles.featureSvg} role="img" />
        <Heading as="h3" className={styles.cardTitle}>
          {title}
        </Heading>
        <p className={styles.cardText}>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures(): ReactNode {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
