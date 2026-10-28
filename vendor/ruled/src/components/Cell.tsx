import type { ComponentPropsWithoutRef, ElementType } from 'react';
import { placementStyle, type PlacementProps } from './placement';

export type CellTone = 'paper' | 'wash' | 'tint' | 'ink' | 'accent';
export type CellPad = 'none' | 'sm' | 'md' | 'lg';
export type CellLayout = 'block' | 'stack' | 'split' | 'row';

export type CellOwnProps<E extends ElementType> = PlacementProps & {
  /** Element to render. Defaults to `div`, or `a` when `href` is given. */
  as?: E;
  /**
   * Background. `paper` is the default; `wash` is for the label column, `tint`
   * for highlights, `accent` (lime) is reserved for a single call to action.
   */
  tone?: CellTone;
  /** Padding: `none` 0, `sm` 16px, `md` 24px (default), `lg` 40px. */
  pad?: CellPad;
  /**
   * `stack` = column with a 16px gap; `split` = column pushed to top and bottom
   * (label up top, content at the foot); `row` = spaced horizontal row.
   */
  layout?: CellLayout;
  /** Invert to ink on hover/focus. Defaults to true when the cell is a link. */
  interactive?: boolean;
  href?: string;
};

export type CellProps<E extends ElementType = 'div'> = CellOwnProps<E> &
  Omit<ComponentPropsWithoutRef<E>, keyof CellOwnProps<E>>;

/** One block of a ruled grid. */
export function Cell<E extends ElementType = 'div'>({
  as,
  tone = 'paper',
  pad = 'md',
  layout = 'block',
  interactive,
  href,
  span,
  col,
  rowSpan,
  row,
  className,
  style,
  ...rest
}: CellProps<E>) {
  const Component: ElementType = as ?? (href ? 'a' : 'div');
  const isInteractive = interactive ?? href !== undefined;
  return (
    <Component
      className={className ? `r-cell ${className}` : 'r-cell'}
      data-tone={tone === 'paper' ? undefined : tone}
      data-pad={pad === 'md' ? undefined : pad}
      data-layout={layout === 'block' ? undefined : layout}
      data-interactive={isInteractive || undefined}
      href={href}
      style={{ ...placementStyle({ span, col, rowSpan, row }), ...style }}
      {...rest}
    />
  );
}
