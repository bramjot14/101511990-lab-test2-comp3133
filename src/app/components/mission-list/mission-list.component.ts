import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit, computed, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { SpaceMission } from '../../models/mission.model';
import { MissionSummaryPipe } from '../../pipes/mission-summary.pipe';
import { SpacexService } from '../../services/spacex.service';
import { MissionFilterComponent } from '../mission-filter/mission-filter.component';

@Component({
  selector: 'app-mission-list',
  imports: [HttpClientModule, RouterLink, MatButtonModule, MatCardModule, MatChipsModule, MatIconModule, MatProgressSpinnerModule, MissionSummaryPipe, MissionFilterComponent],
  templateUrl: './mission-list.component.html',
  styleUrl: './mission-list.component.css'
})
export class MissionListComponent implements OnInit {
  private readonly spacexService = inject(SpacexService);
  protected readonly missions = signal<SpaceMission[]>([]);
  protected readonly isLoading = signal(true);
  protected readonly errorMessage = signal('');
  protected readonly selectedYear = signal('');
  protected readonly missionCount = computed(() => this.missions().length);
  ngOnInit(): void { this.loadMissions(); }
  protected applyYear(year: string): void { this.selectedYear.set(year); this.loadMissions(year); }
  protected resetYear(): void { this.selectedYear.set(''); this.loadMissions(); }
  private loadMissions(year = ''): void { this.isLoading.set(true); this.errorMessage.set(''); this.spacexService.getMissions(year).subscribe({ next: (missions) => { this.missions.set(missions); this.isLoading.set(false); }, error: (error: Error) => { this.errorMessage.set(error.message); this.missions.set([]); this.isLoading.set(false); } }); }
}
