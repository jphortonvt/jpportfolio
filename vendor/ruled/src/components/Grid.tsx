import type { ComponentPropsWithoutRef, CSSProperties, ElementType } from 'react';
import { placementStyle, type PlacementProps } from './placement';

export type GridOwnProps<E extends ElementType> = PlacementProps & {
  /** Element to render. Defaults to `div`; use `section`, `header`, `footer`, `figure`… for semantics. */
  as?: E;
  /** Number of equal columns. Default 12. */
  columns?: number;
  /** Rule color between cells: `ink` (default) or the softer lilac `soft`. Inherited by nested grids. */
  rule?: 'ink' | 'soft';
  /** Draw a 1px rule around the outside. Use on the outermost grid of a page. */
  framed?: boolean;
  /** `md` (default) collapses to one column below 900px; `never` keeps the columns. */
  collapse?: 'md' | 'never';
};

export type GridProps<E extends ElementType = 'div'> = GridOwnProps<E> &
  Omit<ComponentPropsWithoutRef<E>, keyof GridOwnProps<E>>;

/**
 * A ruled grid. Children are usually `Cell`s; a nested `Grid` can stand in for a
 * cell and takes the same placement props (`span`, `col`, `rowSpan`, `row`).
 *
 * Every track must be filled: the rules are the grid's background showing through
 * a 1px gap, so an empty area renders as a solid block of rule color.
 */
export function Grid<E extends ElementType = 'div'>({
  as,
  columns = 12,
  rule = 'ink',
  framed = false,
  collapse = 'md',
  span,
  col,
  rowSpan,
  row,
  className,
  style,
  ...rest
}: GridProps<E>) {
  const Component: ElementType = as ?? 'div';
  const gridStyle = {
    '--r-grid-columns': columns,
    ...placementStyle({ span, col, rowSpan, row }),
    ...style,
  } as CSSProperties;
  return (
    <Component
      className={className ? `r-grid ${className}` : 'r-grid'}
      data-rule={rule === 'soft' ? 'soft' : undefined}
      data-framed={framed || undefined}
      data-collapse={collapse === 'never' ? 'never' : undefined}
      style={gridStyle}
      {...rest}
    />
  );
}
