import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';
import { CutiService } from '../../services/cuti/cuti.service';
import { User } from '../../models/user-model';
import { dateRangeValidator } from '../../validators/date-range.validator';

@Component({
  selector: 'app-cuti-details',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './cuti-details.component.html',
  styleUrl: './cuti-details.component.css'
})
export class CutiDetailsComponent implements OnInit {
  private fb = inject(FormBuilder);
  private router = inject(Router);
  authSvc = inject(AuthService);
  cutiSvc = inject(CutiService);

  user: User | null = null;
  displayName = '';
  isSubmitting = false;

  cutiForm = this.fb.group(
    {
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      reason: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(500)]]
    },
    { validators: dateRangeValidator }
  );

  ngOnInit(): void {
    this.user = this.authSvc.getUser();
    this.displayName = this.user?.fullName ?? '';
  }

  get startDate() { return this.cutiForm.get('startDate'); }
  get endDate() { return this.cutiForm.get('endDate'); }
  get reason() { return this.cutiForm.get('reason'); }

  onSubmitCutiHandler(): void {
    if (this.cutiForm.invalid) {
      this.cutiForm.markAllAsTouched();
      return;
    }

    const { startDate, endDate, reason } = this.cutiForm.value;
    this.isSubmitting = true;

    this.cutiSvc.create({
      startDate: new Date(startDate!).toISOString(),
      endDate: new Date(endDate!).toISOString(),
      reason: reason!
    }).subscribe({
      next: () => {
        this.isSubmitting = false;
        alert('Pengajuan cuti berhasil dikirim!');
        this.cutiForm.reset();
        this.router.navigate(['/home']);
      },
      error: (err) => {
        this.isSubmitting = false;
        console.error('error ', err);
        alert(err?.error?.message ?? 'Gagal mengajukan cuti.');
      }
    });
  }

  onLogoutHandle(): void {
    this.authSvc.clearData();
    this.router.navigate(['/login']);
  }
}