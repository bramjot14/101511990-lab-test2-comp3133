import { Component, EventEmitter, Output, signal } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-mission-filter',
  imports: [FormsModule, ReactiveFormsModule, MatButtonModule, MatFormFieldModule, MatIconModule, MatInputModule],
  templateUrl: './mission-filter.component.html',
  styleUrl: './mission-filter.component.css'
})
export class MissionFilterComponent {
  @Output() yearSelected = new EventEmitter<string>();
  @Output() cleared = new EventEmitter<void>();
  protected readonly activeYear = signal('');
  protected readonly filterForm = new FormGroup({ launchYear: new FormControl('', [Validators.pattern(/^\d{4}$/)]) });
  protected applyFilter(): void { if (this.filterForm.invalid) { this.filterForm.markAllAsTouched(); return; } const year = this.filterForm.controls.launchYear.value?.trim() ?? ''; this.activeYear.set(year); this.yearSelected.emit(year); }
  protected clearFilter(): void { this.filterForm.reset(); this.activeYear.set(''); this.cleared.emit(); }
}
