import { Routes } from '@angular/router';
import { MissionDetailsComponent } from './components/mission-details/mission-details.component';
import { MissionListComponent } from './components/mission-list/mission-list.component';

export const routes: Routes = [
  { path: '', component: MissionListComponent, title: 'SpaceX Mission List' },
  { path: 'mission/:flightNumber', component: MissionDetailsComponent, title: 'SpaceX Mission Details' },
  { path: '**', redirectTo: '' }
];
