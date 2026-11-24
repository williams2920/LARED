import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MAIN_MENU } from '@core/navigation/menu';

@Component({
  selector: 'app-home',
  imports: [RouterLink],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {
  protected readonly sections = MAIN_MENU.filter((item) => item.children?.length);

  protected readonly features = [
    {
      title: 'Angular moderno',
      text: 'Componentes standalone, signals, zoneless y control flow (@if / @for).',
    },
    {
      title: 'Estilos con tokens',
      text: 'SCSS + CSS custom properties: colores, tipografía, espaciados y sombras.',
    },
    {
      title: 'Tema claro/oscuro',
      text: 'Respeta la preferencia del sistema y se guarda en el navegador.',
    },
    { title: 'Fuentes locales', text: 'Inter y Montserrat empaquetadas con @fontsource, sin CDN.' },
    {
      title: 'Menú responsive',
      text: 'Desplegables en escritorio y menú hamburguesa accesible en móvil.',
    },
    { title: 'Rutas lazy', text: 'Cada página se carga bajo demanda y tiene su propio título.' },
  ];
}
