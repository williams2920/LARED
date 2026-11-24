import { Component, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import {
  NavigationEnd,
  NavigationSkipped,
  Router,
  RouterLink,
  RouterLinkActive,
} from '@angular/router';
import { filter } from 'rxjs';
import { MAIN_MENU } from '@core/navigation/menu';
import { ThemeService } from '@core/services/theme.service';

@Component({
  selector: 'app-header',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './header.html',
  styleUrl: './header.scss',
  host: {
    '(document:keydown.escape)': 'closeAll()',
  },
})
export class Header {
  protected readonly theme = inject(ThemeService);
  protected readonly menu = MAIN_MENU;

  /** Menú móvil abierto/cerrado. */
  protected readonly mobileOpen = signal(false);
  /** Ruta del submenú desplegado (o null). */
  protected readonly openSubmenu = signal<string | null>(null);

  constructor() {
    inject(Router)
      .events.pipe(
        filter((e) => e instanceof NavigationEnd || e instanceof NavigationSkipped),
        takeUntilDestroyed(),
      )
      .subscribe(() => this.closeAll());
  }

  protected toggleMobile(): void {
    this.mobileOpen.update((open) => !open);
  }

  protected toggleSubmenu(path: string): void {
    this.openSubmenu.update((current) => (current === path ? null : path));
  }

  protected closeAll(): void {
    this.mobileOpen.set(false);
    this.openSubmenu.set(null);
  }
}
