export type CutiStatus = 'Pending' | 'Approved' | 'Rejected';

export interface Cuti {
  id: number;
  userId: number;
  userName?: string;
  fullName?: string;
  startDate: string;
  endDate: string;
  reason: string;
  status: CutiStatus;
  createdAt: string;
}

export interface CutiCreateRequest {
  startDate: string;
  endDate: string;
  reason: string;
}

export interface CutiUpdateRequest {
  startDate: string;
  endDate: string;
  reason: string;
  status: CutiStatus;
}