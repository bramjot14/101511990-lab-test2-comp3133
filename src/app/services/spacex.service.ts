import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, catchError, map, of, throwError } from 'rxjs';
import { MOCK_MISSIONS } from '../data/mock-missions';
import { SpaceMission } from '../models/mission.model';

@Injectable({ providedIn: 'root' })
export class SpacexService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = 'https://api.spacexdata.com/v3/launches';

  getMissions(launchYear?: string): Observable<SpaceMission[]> {
    const url = launchYear?.trim() ? `${this.baseUrl}?launch_year=${launchYear.trim()}` : this.baseUrl;
    return this.http.get<SpaceMission[]>(url).pipe(
      map((missions) => [...missions].sort((a, b) => b.flight_number - a.flight_number)),
      catchError(() => {
        const filtered = launchYear?.trim() ? MOCK_MISSIONS.filter((mission) => mission.launch_year === launchYear.trim()) : MOCK_MISSIONS;
        return of([...filtered].sort((a, b) => b.flight_number - a.flight_number));
      })
    );
  }

  getMissionByFlightNumber(flightNumber: number): Observable<SpaceMission> {
    return this.http.get<SpaceMission>(`${this.baseUrl}/${flightNumber}`).pipe(
      catchError(() => {
        const mission = MOCK_MISSIONS.find((item) => item.flight_number === flightNumber);
        return mission ? of(mission) : throwError(() => new Error('Mission details could not be loaded. Please go back and retry.'));
      })
    );
  }
}
