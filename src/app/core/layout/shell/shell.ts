import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { BottomNav } from '@core/layout/bottom-nav/bottom-nav';
import { CommandPalette } from '@core/layout/command-palette/command-palette';
import { Sidebar } from '@core/layout/sidebar/sidebar';
import { Topbar } from '@core/layout/topbar/topbar';

/** Marco de la app autenticada: sidebar, topbar, barra inferior y paleta de comandos. */
@Component({
  selector: 'app-shell',
  imports: [RouterOutlet, Sidebar, Topbar, BottomNav, CommandPalette],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './shell.html',
  styleUrl: './shell.scss',
})
export class Shell {
  // Con <base href="/"> un href="#id" navegaría a la raíz; se enfoca el contenido sin salir de la página.
  protected skipToContent(event: Event, main: HTMLElement): void {
    event.preventDefault();
    main.focus();
  }
}
