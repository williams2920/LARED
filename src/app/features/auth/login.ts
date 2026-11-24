import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { authErrorMessage } from '@core/services/auth-errors';
import { AuthService } from '@core/services/auth.service';
import { ThemeService } from '@core/services/theme.service';
import { Icon } from '@shared/ui/icon/icon';
import { Logo } from '@shared/ui/logo/logo';
import { NetworkBackground } from '@shared/ui/network-background/network-background';

type Mode = 'signin' | 'signup' | 'reset';

const COPY: Record<Mode, { title: string; subtitle: string; submit: string }> = {
  signin: {
    title: 'Bienvenido de nuevo',
    subtitle: 'Entra al núcleo donde la tecnología se conecta.',
    submit: 'Entrar',
  },
  signup: {
    title: 'Crea tu cuenta',
    subtitle: 'Personas, agentes y herramientas en una sola red.',
    submit: 'Crear cuenta',
  },
  reset: {
    title: 'Recupera tu acceso',
    subtitle: 'Te enviaremos un enlace para restablecer tu contraseña.',
    submit: 'Enviar enlace',
  },
};

/** Acceso a LA RED: iniciar sesión, registrarse o recuperar contraseña. */
@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, Icon, Logo, NetworkBackground],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {
  private readonly auth = inject(AuthService);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);
  protected readonly theme = inject(ThemeService);

  protected readonly mode = signal<Mode>('signin');
  protected readonly copy = computed(() => COPY[this.mode()]);
  protected readonly busy = signal(false);
  protected readonly error = signal<string | null>(null);
  protected readonly notice = signal<string | null>(null);
  protected readonly showPassword = signal(false);

  protected readonly form = inject(FormBuilder).nonNullable.group({
    name: [''],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });

  protected setMode(mode: Mode): void {
    this.mode.set(mode);
    this.error.set(null);
    this.notice.set(null);
    const { name, password } = this.form.controls;
    name.setValidators(mode === 'signup' ? [Validators.required, Validators.maxLength(50)] : []);
    password.setValidators(mode === 'reset' ? [] : [Validators.required, Validators.minLength(6)]);
    name.updateValueAndValidity();
    password.updateValueAndValidity();
  }

  protected async submit(): Promise<void> {
    if (this.busy()) return;
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    const { name, email, password } = this.form.getRawValue();
    await this.run(async () => {
      switch (this.mode()) {
        case 'signin':
          await this.auth.signIn(email, password);
          return this.enter();
        case 'signup':
          await this.auth.signUp({ name, email, password });
          return this.enter();
        case 'reset':
          await this.auth.resetPassword(email);
          this.notice.set(`Si existe una cuenta para ${email}, recibirás un correo en minutos.`);
          return undefined;
      }
    });
  }

  protected google(): Promise<void> {
    return this.run(async () => {
      await this.auth.signInWithGoogle();
      await this.enter();
    });
  }

  private async run(action: () => Promise<unknown>): Promise<void> {
    this.busy.set(true);
    this.error.set(null);
    try {
      await action();
    } catch (error) {
      this.error.set(authErrorMessage(error));
    } finally {
      this.busy.set(false);
    }
  }

  private enter(): Promise<boolean> {
    const redirect = this.route.snapshot.queryParamMap.get('redirect');
    // Solo rutas internas: evita redirecciones abiertas a otros dominios.
    const target = redirect?.startsWith('/') && !redirect.startsWith('//') ? redirect : '/';
    return this.router.navigateByUrl(target);
  }
}
