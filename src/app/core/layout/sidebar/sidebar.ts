import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '@core/services/auth.service';
import { NAV_SECTIONS } from '@core/navigation/navigation';
import { ProfileService } from '@core/services/profile.service';
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
  protected readonly user = inject(ProfileService).profile;
  private readonly auth = inject(AuthService);
  private readonly router = inject(Router);

  protected async signOut(): Promise<void> {
    await this.auth.signOut();
    await this.router.navigateByUrl('/login');
  }
}
