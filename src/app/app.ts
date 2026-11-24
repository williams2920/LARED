import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { BottomNav } from '@core/layout/bottom-nav/bottom-nav';
import { CommandPalette } from '@core/layout/command-palette/command-palette';
import { Sidebar } from '@core/layout/sidebar/sidebar';
import { Topbar } from '@core/layout/topbar/topbar';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Sidebar, Topbar, BottomNav, CommandPalette],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  // Con <base href="/"> un href="#id" navegaría a la raíz; se enfoca el contenido sin salir de la página.
  protected skipToContent(event: Event, main: HTMLElement): void {
    event.preventDefault();
    main.focus();
  }
}
