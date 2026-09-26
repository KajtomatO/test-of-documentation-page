/**
 * Replaces the default Docusaurus admonition types with a "hint" layout:
 * an icon column on the left and the content on the right, without a
 * forced title. A title written after the type (`:::tip Requirements`)
 * is rendered in bold above the content; a plain `:::tip` shows none.
 *
 * Docusaurus resolves `@theme/Admonition/Types` to this file (theme
 * swizzling), see https://docusaurus.io/docs/swizzling. The visual style
 * lives in src/css/custom.css under ".gb-hint".
 */
import type {ComponentType, ReactNode} from 'react';
import clsx from 'clsx';
import {ThemeClassNames} from '@docusaurus/theme-common';
import type {Props} from '@theme/Admonition';
import IconNote from '@theme/Admonition/Icon/Note';
import IconTip from '@theme/Admonition/Icon/Tip';
import IconInfo from '@theme/Admonition/Icon/Info';
import IconWarning from '@theme/Admonition/Icon/Warning';
import IconDanger from '@theme/Admonition/Icon/Danger';

type HintKind = 'note' | 'tip' | 'info' | 'warning' | 'danger';

const icons: Record<HintKind, ReactNode> = {
  note: <IconNote />,
  tip: <IconTip />,
  info: <IconInfo />,
  warning: <IconWarning />,
  danger: <IconDanger />,
};

function Hint({kind, ...props}: Props & {kind: HintKind}) {
  const {title, children, className, id, icon} = props;
  return (
    <div
      id={id}
      role="note"
      className={clsx(
        ThemeClassNames.common.admonition,
        ThemeClassNames.common.admonitionType(kind),
        'gb-hint',
        `gb-hint--${kind}`,
        className,
      )}>
      <div className="gb-hint__icon" aria-hidden="true">
        {icon ?? icons[kind]}
      </div>
      <div className="gb-hint__body">
        {title ? <div className="gb-hint__title">{title}</div> : null}
        {children}
      </div>
    </div>
  );
}

function hintOfKind(kind: HintKind): ComponentType<Props> {
  return function HintOfKind(props: Props) {
    return <Hint kind={kind} {...props} />;
  };
}

const AdmonitionTypes: {[type: string]: ComponentType<Props>} = {
  note: hintOfKind('note'),
  tip: hintOfKind('tip'),
  info: hintOfKind('info'),
  warning: hintOfKind('warning'),
  danger: hintOfKind('danger'),
  // Legacy aliases kept for compatibility with older Markdown.
  secondary: hintOfKind('note'),
  important: hintOfKind('info'),
  success: hintOfKind('tip'),
  caution: hintOfKind('warning'),
};

export default AdmonitionTypes;
