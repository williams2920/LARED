import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { authErrorMessage } from '@core/services/auth-errors';
import { AuthService } from '@core/services/auth.service';
import { ThemeService } from '@core/services/theme.service';
import { PageHeader } from '@shared/components/page-header/page-header';
import { Icon } from '@shared/ui/icon/icon';

/** Ajustes: apariencia y cuenta (restablecer contraseña, cerrar sesión). */
@Component({
  selector: 'app-settings',
  imports: [PageHeader, Icon],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="page narrow">
      <app-page-header eyebrow="Ajustes" title="Preferencias y cuenta" />

      <section class="card group">
        <h2>Apariencia</h2>
        <div class="row-setting">
          <div>
            <strong>Tema oscuro</strong>
            <p>Se recuerda en este dispositivo.</p>
          </div>
          <button
            type="button"
            role="switch"
            class="switch"
            [attr.aria-checked]="theme.theme() === 'dark'"
            aria-label="Tema oscuro"
            (click)="theme.toggle()"
          >
            <span class="switch__thumb"></span>
          </button>
        </div>
      </section>

      <section class="card group">
        <h2>Cuenta</h2>
        <div class="row-setting">
          <div>
            <strong>Correo</strong>
            <p>{{ email() }}</p>
          </div>
        </div>
        <div class="row-setting">
          <div>
            <strong>Contraseña</strong>
            <p>{{ notice() ?? 'Te enviamos un enlace para cambiarla.' }}</p>
          </div>
          <button type="button" class="btn btn--outline btn--sm" (click)="resetPassword()">
            <app-icon name="mail" [size]="14" /> Enviar enlace
          </button>
        </div>
        <div class="row-setting">
          <div>
            <strong>Sesión</strong>
            <p>Cierra la sesión en este dispositivo.</p>
          </div>
          <button type="button" class="btn btn--outline btn--sm danger" (click)="signOut()">
            <app-icon name="logout" [size]="14" /> Cerrar sesión
          </button>
        </div>
      </section>
    </div>
  `,
  styles: `
    .narrow {
      max-width: 44rem;
    }
    .group {
      display: grid;
      gap: var(--space-4);
      margin-bottom: var(--space-5);

      h2 {
        font-size: var(--text-lg);
      }
    }
    .row-setting {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: var(--space-4);
      padding-top: var(--space-4);
      border-top: 1px solid var(--color-border);

      p {
        font-size: var(--text-sm);
        color: var(--color-text-muted);
      }
    }
    .danger {
      color: var(--color-danger);
    }
    .switch {
      position: relative;
      flex-shrink: 0;
      width: 3rem;
      height: 1.75rem;
      border: 0;
      border-radius: var(--radius-full);
      background: var(--color-surface-hover);
      cursor: pointer;
      transition: background var(--duration-base) var(--ease-standard);

      &[aria-checked='true'] {
        background: var(--color-success);
      }
      &__thumb {
        position: absolute;
        top: 0.1875rem;
        left: 0.1875rem;
        width: 1.375rem;
        height: 1.375rem;
        border-radius: 50%;
        background: #fff;
        box-shadow: var(--shadow-sm);
        transition: transform var(--duration-base) var(--ease-spring);
      }
      &[aria-checked='true'] .switch__thumb {
        transform: translateX(1.25rem);
      }
    }
  `,
})
export class Settings {
  protected readonly theme = inject(ThemeService);
  private readonly auth = inject(AuthService);
  private readonly router = inject(Router);
  protected readonly email = computed(() => this.auth.user()?.email ?? '');
  protected readonly notice = signal<string | null>(null);

  protected async resetPassword(): Promise<void> {
    try {
      await this.auth.resetPassword(this.email());
      this.notice.set(`Enviado a ${this.email()}.`);
    } catch (error) {
      this.notice.set(authErrorMessage(error));
    }
  }

  protected async signOut(): Promise<void> {
    await this.auth.signOut();
    await this.router.navigateByUrl('/login');
  }
}
