import { MAIN_MENU, findMenuItem } from './menu';

describe('menu', () => {
  it('has four sections with four subsections each', () => {
    const sections = MAIN_MENU.filter((i) => i.children);
    expect(sections.length).toBe(4);
    sections.forEach((s) => expect(s.children?.length).toBe(4));
  });

  it('finds nested items by path', () => {
    expect(findMenuItem('/secciones/dos/tres')?.label).toBe('Subsección dos tres');
    expect(findMenuItem('/no-existe')).toBeUndefined();
  });
});
