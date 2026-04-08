import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit, inject, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { SpaceMission } from '../../models/mission.model';
import { SpacexService } from '../../services/spacex.service';

@Component({
  selector: 'app-mission-details',
  imports: [HttpClientModule, RouterLink, MatButtonModule, MatCardModule, MatChipsModule, MatIconModule, MatProgressSpinnerModule],
  templateUrl: './mission-details.component.html',
  styleUrl: './mission-details.component.css'
})
export class MissionDetailsComponent implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly spacexService = inject(SpacexService);
  protected readonly mission = signal<SpaceMission | null>(null);
  protected readonly isLoading = signal(true);
  protected readonly errorMessage = signal('');
  ngOnInit(): void { const flightNumber = Number(this.route.snapshot.paramMap.get('flightNumber')); if (!flightNumber) { this.errorMessage.set('The selected mission ID is invalid.'); this.isLoading.set(false); return; } this.spacexService.getMissionByFlightNumber(flightNumber).subscribe({ next: (mission) => { this.mission.set(mission); this.isLoading.set(false); }, error: (error: Error) => { this.errorMessage.set(error.message); this.isLoading.set(false); } }); }
}
