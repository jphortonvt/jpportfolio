import type { CSSProperties } from 'react';

/** A single line (1), a pair of lines ([1, 4]), or a raw CSS value such as "1 / 4" or "span 2". */
export type GridLines = number | readonly [number, number] | string;

export interface PlacementProps {
  /** Number of columns to span, e.g. `span={3}`. Ignored when `col` is set. */
  span?: number;
  /** Explicit column lines, e.g. `col={[1, 4]}` covers columns 1–3. */
  col?: GridLines;
  /** Number of rows to span. Ignored when `row` is set. */
  rowSpan?: number;
  /** Explicit row lines, e.g. `row={[1, 3]}`. */
  row?: GridLines;
}

const lines = (value: GridLines): string =>
  typeof value === 'number' || typeof value === 'string' ? String(value) : `${value[0]} / ${value[1]}`;

/** Converts placement props to inline grid styles. Below the collapse breakpoint grid.css resets them. */
export function placementStyle({ span, col, rowSpan, row }: PlacementProps): CSSProperties {
  const style: CSSProperties = {};
  if (col !== undefined) style.gridColumn = lines(col);
  else if (span !== undefined) style.gridColumn = `span ${span}`;
  if (row !== undefined) style.gridRow = lines(row);
  else if (rowSpan !== undefined) style.gridRow = `span ${rowSpan}`;
  return style;
}
