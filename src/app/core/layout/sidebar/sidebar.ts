import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CURRENT_USER } from '@core/data/mock-data';
import { NAV_SECTIONS } from '@core/navigation/navigation';
import { ThemeService } from '@core/services/theme.service';
import { Avatar } from '@shared/ui/avatar/avatar';
import { Icon } from '@shared/ui/icon/icon';
import { Logo } from '@shared/ui/logo/logo';

@Component({
  selector: 'app-sidebar',
  imports: [RouterLink, RouterLinkActive, Icon, Logo, Avatar],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.scss',
})
export class Sidebar {
  protected readonly theme = inject(ThemeService);
  protected readonly sections = NAV_SECTIONS;
  protected readonly user = CURRENT_USER;
}
