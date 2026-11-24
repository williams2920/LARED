import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CURRENT_USER } from '@core/data/mock-data';
import { CommandPaletteService } from '@core/services/command-palette.service';
import { ThemeService } from '@core/services/theme.service';
import { Avatar } from '@shared/ui/avatar/avatar';
import { Icon } from '@shared/ui/icon/icon';
import { Logo } from '@shared/ui/logo/logo';

@Component({
  selector: 'app-topbar',
  imports: [RouterLink, Icon, Logo, Avatar],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './topbar.html',
  styleUrl: './topbar.scss',
})
export class Topbar {
  protected readonly palette = inject(CommandPaletteService);
  protected readonly theme = inject(ThemeService);
  protected readonly user = CURRENT_USER;
}
