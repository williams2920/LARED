import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  inject,
  signal,
} from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { AuthService } from '@core/services/auth.service';
import { EcosystemService } from '@core/services/ecosystem.service';
import { FeedService } from '@core/services/feed.service';
import { ProfileService } from '@core/services/profile.service';
import { Avatar } from '@shared/ui/avatar/avatar';
import { Icon } from '@shared/ui/icon/icon';

/** Perfil del usuario en sesión: identidad editable y resumen de su núcleo. */
@Component({
  selector: 'app-profile',
  imports: [ReactiveFormsModule, RouterLink, Avatar, Icon],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './profile.html',
  styleUrl: './profile.scss',
})
export class Profile {
  protected readonly profiles = inject(ProfileService);
  protected readonly ecosystem = inject(EcosystemService);
  private readonly auth = inject(AuthService);
  protected readonly email = computed(() => this.auth.user()?.email ?? '');
  private readonly feed = inject(FeedService);

  protected readonly editing = signal(false);
  protected readonly saving = signal(false);
  protected readonly message = signal<string | null>(null);
  protected readonly postCount = computed(
    () => this.feed.posts().filter((p) => p.authorId === this.profiles.profile()?.uid).length,
  );

  protected readonly form = inject(FormBuilder).nonNullable.group({
    displayName: ['', [Validators.required, Validators.maxLength(50)]],
    handle: ['', [Validators.required, Validators.pattern(/^[a-z0-9_]{3,20}$/)]],
    bio: ['', Validators.maxLength(160)],
  });

  constructor() {
    effect(() => {
      const profile = this.profiles.profile();
      if (profile && !this.editing()) {
        this.form.setValue({
          displayName: profile.displayName,
          handle: profile.handle,
          bio: profile.bio,
        });
      }
    });
  }

  protected async save(): Promise<void> {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.saving.set(true);
    this.message.set(null);
    try {
      const { displayName, handle, bio } = this.form.getRawValue();
      await this.profiles.update({ displayName: displayName.trim(), handle, bio: bio.trim() });
      this.editing.set(false);
    } catch {
      this.message.set('No se pudo guardar el perfil.');
    } finally {
      this.saving.set(false);
    }
  }
}
