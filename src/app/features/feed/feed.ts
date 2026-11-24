import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { TRENDS } from '@core/data/catalog';
import { FeedPost, POST_MAX_LENGTH } from '@core/domain/post.model';
import { EcosystemService } from '@core/services/ecosystem.service';
import { FeedService } from '@core/services/feed.service';
import { ProfileService } from '@core/services/profile.service';
import { Avatar } from '@shared/ui/avatar/avatar';
import { Icon } from '@shared/ui/icon/icon';
import { PostCard } from './post-card';

type FeedTab = 'para-ti' | 'mias' | 'guardadas';

/** Inicio: compositor, timeline en tiempo real y resumen del núcleo del usuario. */
@Component({
  selector: 'app-feed',
  imports: [RouterLink, Avatar, Icon, PostCard],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './feed.html',
  styleUrl: './feed.scss',
})
export class Feed {
  protected readonly feed = inject(FeedService);
  protected readonly ecosystem = inject(EcosystemService);
  protected readonly profiles = inject(ProfileService);
  private readonly router = inject(Router);

  protected readonly trends = TRENDS;
  protected readonly maxLength = POST_MAX_LENGTH;
  protected readonly tabs: { id: FeedTab; label: string }[] = [
    { id: 'para-ti', label: 'Para ti' },
    { id: 'mias', label: 'Mis publicaciones' },
    { id: 'guardadas', label: 'Guardadas' },
  ];
  protected readonly tab = signal<FeedTab>('para-ti');
  protected readonly draft = signal('');
  protected readonly error = signal<string | null>(null);

  protected readonly posts = computed(() => {
    const profile = this.profiles.profile();
    const posts = this.feed.posts();
    switch (this.tab()) {
      case 'mias':
        return posts.filter((p) => p.authorId === profile?.uid);
      case 'guardadas':
        return posts.filter((p) => profile?.savedPosts.includes(p.id));
      default:
        return posts;
    }
  });

  protected async publish(): Promise<void> {
    this.error.set(null);
    try {
      await this.feed.publish(this.draft());
      this.draft.set('');
      this.tab.set('para-ti');
    } catch {
      this.error.set('No se pudo publicar. Revisa tu conexión e inténtalo de nuevo.');
    }
  }

  protected invokeAgent(): void {
    this.draft.update((text) => (text.includes('@nexus') ? text : `@nexus ${text}`));
  }

  protected isSaved(post: FeedPost): boolean {
    return this.profiles.has('savedPosts', post.id);
  }

  protected act(action: () => Promise<void>): void {
    action().catch(() => this.error.set('No se pudo completar la acción.'));
  }

  protected toggleSave(post: FeedPost): void {
    this.act(() => this.profiles.toggle('savedPosts', post.id));
  }

  protected remove(post: FeedPost): void {
    if (confirm('¿Eliminar esta publicación?')) this.act(() => this.feed.remove(post));
  }

  protected askAgent(): void {
    void this.router.navigateByUrl('/agentes');
  }
}
