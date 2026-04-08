import { Pipe, PipeTransform } from '@angular/core';
@Pipe({ name: 'missionSummary' })
export class MissionSummaryPipe implements PipeTransform {
  transform(value?: string | null, limit = 140): string {
    if (!value?.trim()) return 'No mission details were provided by the API for this launch.';
    return value.length > limit ? `${value.slice(0, limit).trim()}...` : value;
  }
}
