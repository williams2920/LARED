import { TestBed } from '@angular/core/testing';
import { AuthRepository } from '@core/domain/auth.repository';
import { provideInMemoryBackend } from '../../../testing/in-memory-backend';
import { extractTags, FeedService } from './feed.service';
import { ProfileService } from './profile.service';

describe('FeedService', () => {
  let feed: FeedService;

  beforeEach(async () => {
    TestBed.configureTestingModule({ providers: [provideInMemoryBackend()] });
    feed = TestBed.inject(FeedService);
    TestBed.inject(ProfileService);
    await TestBed.inject(AuthRepository).signUpWithEmail({
      name: 'Ada Lovelace',
      email: 'ada@lared.dev',
      password: 'secret',
    });
    await Promise.resolve();
  });

  it('publishes as the current user with extracted hashtags', async () => {
    await feed.publish('  Hola #Angular y #IA  ');
    const [post] = feed.posts();
    expect(post.content).toBe('Hola #Angular y #IA');
    expect(post.author).toEqual(expect.objectContaining({ name: 'Ada Lovelace', handle: 'ada' }));
    expect(post.tags).toEqual(['angular', 'ia']);
  });

  it('ignores empty drafts', async () => {
    await feed.publish('   ');
    expect(feed.posts()).toEqual([]);
  });

  it('toggles likes for the current user', async () => {
    await feed.publish('Me gusta esto');
    await feed.toggleLike(feed.posts()[0]);
    expect(feed.isLiked(feed.posts()[0])).toBe(true);
    await feed.toggleLike(feed.posts()[0]);
    expect(feed.posts()[0].likedBy).toEqual([]);
  });
});

describe('extractTags', () => {
  it('returns unique lowercase tags without #', () => {
    expect(extractTags('#Web #web #Diseño_UX texto')).toEqual(['web', 'diseño_ux']);
  });
});
