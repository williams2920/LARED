import {
  afterNextRender,
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  ElementRef,
  inject,
  viewChild,
} from '@angular/core';

interface Node {
  x: number;
  y: number;
  vx: number;
  vy: number;
}

const LINK_DISTANCE = 140;

/**
 * Fondo animado: nodos que derivan lentamente y se enlazan al acercarse (la "red").
 * Toma los colores de los tokens CSS, se pausa con la pestaña oculta y respeta
 * `prefers-reduced-motion` dibujando un único fotograma estático.
 */
@Component({
  selector: 'app-network-background',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<canvas #canvas aria-hidden="true"></canvas>',
  styles: `
    :host {
      position: fixed;
      inset: 0;
      z-index: 0;
      pointer-events: none;
    }
    canvas {
      display: block;
      width: 100%;
      height: 100%;
    }
  `,
})
export class NetworkBackground {
  private readonly canvas = viewChild.required<ElementRef<HTMLCanvasElement>>('canvas');
  private readonly destroyRef = inject(DestroyRef);

  constructor() {
    afterNextRender(() => this.start());
  }

  private start(): void {
    const canvas = this.canvas().nativeElement;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
    let nodes: Node[] = [];
    let width = 0;
    let height = 0;
    let frame = 0;

    const resize = () => {
      const ratio = Math.min(devicePixelRatio || 1, 2);
      width = canvas.clientWidth;
      height = canvas.clientHeight;
      canvas.width = width * ratio;
      canvas.height = height * ratio;
      ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
      const count = Math.round(Math.min(90, (width * height) / 16000));
      nodes = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.25,
        vy: (Math.random() - 0.5) * 0.25,
      }));
    };

    const draw = () => {
      const styles = getComputedStyle(canvas);
      const ink = styles.getPropertyValue('--color-text').trim() || '#f5f5f7';
      const accent = styles.getPropertyValue('--color-primary').trim() || '#5e5ce6';
      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < nodes.length; i++) {
        const a = nodes[i];
        for (let j = i + 1; j < nodes.length; j++) {
          const b = nodes[j];
          const distance = Math.hypot(a.x - b.x, a.y - b.y);
          if (distance < LINK_DISTANCE) {
            ctx.globalAlpha = (1 - distance / LINK_DISTANCE) * 0.18;
            ctx.strokeStyle = ink;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }
      nodes.forEach((n, i) => {
        ctx.globalAlpha = i % 7 === 0 ? 0.9 : 0.35;
        ctx.fillStyle = i % 7 === 0 ? accent : ink;
        ctx.beginPath();
        ctx.arc(n.x, n.y, i % 7 === 0 ? 2.4 : 1.5, 0, Math.PI * 2);
        ctx.fill();
      });
      ctx.globalAlpha = 1;
    };

    const step = () => {
      for (const n of nodes) {
        n.x += n.vx;
        n.y += n.vy;
        if (n.x < 0 || n.x > width) n.vx *= -1;
        if (n.y < 0 || n.y > height) n.vy *= -1;
      }
      draw();
      frame = requestAnimationFrame(step);
    };

    const onVisibility = () => {
      cancelAnimationFrame(frame);
      if (!document.hidden && !reducedMotion) frame = requestAnimationFrame(step);
    };

    const observer = new ResizeObserver(() => {
      resize();
      draw();
    });
    observer.observe(canvas);
    resize();
    draw();
    if (!reducedMotion) frame = requestAnimationFrame(step);
    document.addEventListener('visibilitychange', onVisibility);

    this.destroyRef.onDestroy(() => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      document.removeEventListener('visibilitychange', onVisibility);
    });
  }
}
