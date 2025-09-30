import { Routes } from '@angular/router';
import { ConfiguracaoCanalComponent } from './configuracao-canal/configuracao-canal.component';

export const routes: Routes = [
  {
    path: '**',
    component: ConfiguracaoCanalComponent
  }
];
