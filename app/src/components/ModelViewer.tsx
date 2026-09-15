import { useEffect, useRef } from 'react';
import type { ModelViewerElement } from '../types/model-viewer';

interface ModelViewerProps {
  id: string;
  src: string;
  alt: string;
  /** Six-digit hex, no leading '#'. Tints every material on the model. */
  tint?: string | null;
  active: boolean;
}

export function ModelViewer({ id, src, alt, tint, active }: ModelViewerProps) {
  const ref = useRef<ModelViewerElement>(null);

  useEffect(() => {
    const mv = ref.current;
    if (!mv || !tint) return;

    const apply = () => {
      const materials = mv.model?.materials;
      if (!materials?.length) return;
      const r = parseInt(tint.slice(0, 2), 16) / 255;
      const g = parseInt(tint.slice(2, 4), 16) / 255;
      const b = parseInt(tint.slice(4, 6), 16) / 255;
      materials.forEach((m) => m.pbrMetallicRoughness?.setBaseColorFactor([r, g, b, 1]));
    };

    if (mv.loaded) apply();
    // Re-apply whenever a new model finishes loading, since swapping `src`
    // replaces the materials the tint was applied to.
    mv.addEventListener('load', apply);
    return () => mv.removeEventListener('load', apply);
  }, [tint, src]);

  return (
    <model-viewer
      ref={ref}
      id={id}
      class={`main-photo main-3d${active ? ' active' : ''}`}
      src={src}
      camera-controls=""
      auto-rotate=""
      auto-rotate-delay="0"
      rotation-per-second="18deg"
      shadow-intensity="1"
      exposure="1"
      environment-image="neutral"
      alt={alt}
    ></model-viewer>
  );
}
