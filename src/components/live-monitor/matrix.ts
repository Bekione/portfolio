import { Point, ScreenCorners } from './types';

/**
 * Computes a 4x4 homography transform matrix for CSS `transform: matrix3d(...)`
 * that maps a rectangle [0, width] x [0, height] to an arbitrary quadrilateral
 * defined by points p0 (top-left), p1 (top-right), p2 (bottom-right), p3 (bottom-left).
 */
export function calculateHomographyMatrix3D(
  width: number,
  height: number,
  p0: { x: number; y: number },
  p1: { x: number; y: number },
  p2: { x: number; y: number },
  p3: { x: number; y: number }
): string {
  const dx1 = p1.x - p2.x;
  const dx2 = p3.x - p2.x;
  const sx = p0.x - p1.x + p2.x - p3.x;
  const dy1 = p1.y - p2.y;
  const dy2 = p3.y - p2.y;
  const sy = p0.y - p1.y + p2.y - p3.y;

  let g = 0;
  let h = 0;
  const det = dx1 * dy2 - dx2 * dy1;

  if (Math.abs(det) > 1e-7) {
    g = (sx * dy2 - sy * dx2) / det;
    h = (dx1 * sy - dy1 * sx) / det;
  }

  const a = p1.x - p0.x + g * p1.x;
  const b = p3.x - p0.x + h * p3.x;
  const c = p0.x;
  const d = p1.y - p0.y + g * p1.y;
  const e = p3.y - p0.y + h * p3.y;
  const f = p0.y;

  // Scale from [0, width] x [0, height]
  const m00 = a / width;
  const m01 = b / height;
  const m02 = c;
  const m10 = d / width;
  const m11 = e / height;
  const m12 = f;
  const m20 = g / width;
  const m21 = h / height;
  const m22 = 1;

  // CSS matrix3d is column-major:
  // matrix3d(m00, m10, 0, m20,  m01, m11, 0, m21,  0, 0, 1, 0,  m02, m12, 0, m22)
  const vals = [
    m00.toFixed(8),
    m10.toFixed(8),
    '0',
    m20.toFixed(8),
    m01.toFixed(8),
    m11.toFixed(8),
    '0',
    m21.toFixed(8),
    '0',
    '0',
    '1',
    '0',
    m02.toFixed(4),
    m12.toFixed(4),
    '0',
    m22.toFixed(4),
  ];

  return `matrix3d(${vals.join(', ')})`;
}

/**
 * Converts percentage corners (0-100) to actual pixel coordinates given container width & height.
 */
export function cornersToPixels(
  corners: ScreenCorners,
  containerWidth: number,
  containerHeight: number
) {
  return {
    p0: {
      x: (corners.tl.x / 100) * containerWidth,
      y: (corners.tl.y / 100) * containerHeight,
    },
    p1: {
      x: (corners.tr.x / 100) * containerWidth,
      y: (corners.tr.y / 100) * containerHeight,
    },
    p2: {
      x: (corners.br.x / 100) * containerWidth,
      y: (corners.br.y / 100) * containerHeight,
    },
    p3: {
      x: (corners.bl.x / 100) * containerWidth,
      y: (corners.bl.y / 100) * containerHeight,
    },
  };
}

/**
 * Calibrated screen corner coordinates for `public/assets/hero-avatar.png`
 * Modify these coordinates to adjust the screen fit.
 */
export const HERO_AVATAR_CORNERS: ScreenCorners = {
  tl: { x: 63.2, y: 16.0 },
  tr: { x: 94.1, y: 7.7 },
  br: { x: 93.4, y: 37.2 },
  bl: { x: 62.4, y: 37.2 },
};
