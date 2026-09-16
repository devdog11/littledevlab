import type { DetailedHTMLProps, HTMLAttributes } from 'react';

/** Minimal shape of the parts of <model-viewer>'s API this site actually uses. */
export interface ModelViewerElement extends HTMLElement {
  loaded?: boolean;
  model?: {
    materials?: Array<{
      pbrMetallicRoughness?: {
        setBaseColorFactor(rgba: [number, number, number, number]): void;
      };
    }>;
  };
}

interface ModelViewerAttributes extends HTMLAttributes<ModelViewerElement> {
  /**
   * Use `class`, not `className`. React passes unknown props straight through
   * on custom elements, so `className` ships literally as className="..." and
   * no CSS rule ever matches it.
   */
  class?: string;
  src?: string;
  alt?: string;
  poster?: string;
  exposure?: string | number;
  'shadow-intensity'?: string | number;
  'camera-orbit'?: string;
  'field-of-view'?: string;
  'camera-controls'?: boolean | '';
  'auto-rotate'?: boolean | '';
  'disable-zoom'?: boolean | '';
  'interaction-prompt'?: string;
  'touch-action'?: string;
  ar?: boolean | '';
}

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'model-viewer': DetailedHTMLProps<ModelViewerAttributes, ModelViewerElement>;
    }
  }
}
