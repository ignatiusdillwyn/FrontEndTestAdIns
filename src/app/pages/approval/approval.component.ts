import { Component, inject, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { CutiService } from '../../services/cuti/cuti.service';
import { CutiRemainingService } from '../../services/cutiRemaining/cuti-remaining.service';
import { User } from '../../models/user-model';
import { RouterLink, Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Cuti } from '../../models/cuti-model';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-approval',
  standalone: true,
  imports: [RouterLink, DatePipe],
  templateUrl: './approval.component.html',
  styleUrl: './approval.component.css'
})
export class ApprovalComponent implements OnInit {
  fb = inject(FormBuilder)
  http = inject(HttpClient)
  authSvc = inject(AuthService);
  cutiSvc = inject(CutiService);
  cutiRemainingSvc = inject(CutiRemainingService);
  router = inject(Router);

  userToken: string | null = null;
  user: User | null = null;
  displayName: any
  cutis: Cuti[] = []

  statusLabel(status: string): string {
    switch (status) {
      case 'Pending': return 'Menunggu Persetujuan';
      case 'Approved': return 'Disetujui';
      case 'Rejected': return 'Ditolak';
      default: return status;
    }
  }

  ngOnInit(): void {
    this.userToken = this.authSvc.getToken();
    this.user = this.authSvc.getUser();
    // console.log('this full name ', this.user?.fullName)
    this.displayName = this.user?.fullName
    // console.log('user token ', this.userToken);

    console.log('user ', this.user)

    // daftarFilm:Cuti[] = this.movieSvc.getFilms()
    this.cutiSvc.getAll().subscribe({
      next: (response: any) => {
        console.log('response get all cuti ', response)
        this.cutis = response
        console.log('this cutis ', this.cutis)
      }
    })
  }

  onLogoutHandle(): void {
    this.authSvc.clearData()
    this.router.navigate(['/login'])
  }

  onApproveHandle(cuti: Cuti): void {
    if (!confirm(`Setujui cuti ${cuti.fullName}?`)) return;
    this.updateStatus(cuti, 'Approved');
  }

  onRejectHandle(cuti: Cuti): void {
    if (!confirm(`Tolak cuti ${cuti.fullName}?`)) return;
    this.updateStatus(cuti, 'Rejected');
  }

  private updateStatus(cuti: Cuti, status: 'Approved' | 'Rejected'): void {
    this.cutiSvc.updateStatus(cuti, status).subscribe({
      next: () => {
        alert(status === 'Approved' ? 'Cuti disetujui.' : 'Cuti ditolak.');
        this.loadCutis();
      },
      error: (err) => alert(err?.error?.message ?? 'Gagal memperbarui status.')
    });
  }

  loadCutis(): void {
    this.cutiSvc.getAll().subscribe({
      next: (response) => (this.cutis = response),
      error: (err) => console.error(err)
    });
  }
}
