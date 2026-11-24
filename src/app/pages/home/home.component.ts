import { Component, inject, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { CutiService } from '../../services/cuti/cuti.service';
import { CutiRemainingService } from '../../services/cutiRemaining/cuti-remaining.service';
import { User } from '../../models/user-model';
import { RouterLink, Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { Cuti } from '../../models/cuti-model';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink, DatePipe],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
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

  cutiForm = this.fb.group({
    startDate: ['', [
      Validators.required,
    ]],
    endDate: ['', [
      Validators.required,
    ]],
    reason: ['', [
      Validators.required,
      Validators.minLength(10),
      Validators.maxLength(500)
    ]]
  }, [{

  }]);

  onSubmitCutiHandler() {
    console.log('submit cuti')
    const formValue = this.cutiForm.value
    console.log('form value ', formValue)

    this.cutiSvc.create({
      startDate: formValue.startDate,
      endDate: formValue.endDate,
      reason: formValue.reason
    }).subscribe({
      next: (response: any) => {
        console.log('response cuti request', response)
        alert('Pengajuan cuti berhasil dikirim!');
        this.cutiForm.reset();
      },
      error: (err: any) => {
        console.log('error ', err)
        alert(err?.error?.message ?? 'Gagal mengajukan cuti.');
      }
    })
  }

  onCancelRequestCuti(cuti: Cuti) {
    console.log('oncancel request cuti')
  }

  ngOnInit(): void {
    this.userToken = this.authSvc.getToken();
    this.user = this.authSvc.getUser();
    // console.log('this full name ', this.user?.fullName)
    this.displayName = this.user?.fullName
    // console.log('user token ', this.userToken);

    console.log('user ', this.user)

    this.cutiSvc.getAllCutiByEmployeeId().subscribe({
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
}