import { FiltroPorNombrePipe } from './pipes/filtro-por-nombre.pipe';

describe('FiltroPorNombrePipe', () => {
  it('create an instance', () => {
    const pipe = new FiltroPorNombrePipe();
    expect(pipe).toBeTruthy();
  });
});
