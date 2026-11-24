import { createDefaultProfile, toHandle } from './profile.defaults';

describe('profile defaults', () => {
  it('derives a clean handle from the email', () => {
    expect(toHandle('José.Pérez+dev@correo.com')).toBe('joseperezdev');
  });

  it('builds a default profile with Nexus connected', () => {
    const profile = createDefaultProfile({
      uid: 'u1',
      email: 'ada@lared.dev',
      displayName: null,
      photoURL: null,
    });
    expect(profile).toEqual(
      expect.objectContaining({ displayName: 'ada', handle: 'ada', connectedAgents: ['nexus'] }),
    );
  });
});
