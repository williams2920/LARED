import { DOCUMENT, Injectable, effect, inject, signal } from '@angular/core';

export type Theme = 'light' | 'dark';

const STORAGE_KEY = 'lared-theme';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  private readonly document = inject(DOCUMENT);
  private readonly window = this.document.defaultView;

  readonly theme = signal<Theme>(this.initialTheme());

  constructor() {
    effect(() => {
      this.document.documentElement.dataset['theme'] = this.theme();
    });
  }

  toggle(): void {
    const next: Theme = this.theme() === 'dark' ? 'light' : 'dark';
    this.theme.set(next);
    this.writeStorage(next);
  }

  private initialTheme(): Theme {
    const stored = this.readStorage();
    if (stored === 'light' || stored === 'dark') return stored;
    return this.window?.matchMedia?.('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }

  // localStorage puede lanzar si el navegador bloquea el almacenamiento.
  private readStorage(): string | null {
    try {
      return this.window?.localStorage?.getItem(STORAGE_KEY) ?? null;
    } catch {
      return null;
    }
  }

  private writeStorage(theme: Theme): void {
    try {
      this.window?.localStorage?.setItem(STORAGE_KEY, theme);
    } catch {
      /* almacenamiento no disponible */
    }
  }
}
