import type { Dayjs } from 'dayjs';
import type { UploadFile } from 'antd/es/upload/interface';

export type TenantMode = 'CREATE' | 'UPDATE';

export interface TenantDTO {
  id: string;
  name: string;
  phone?: string;
  email?: string;
  cardId?: string;
  gender?: string;
  location?: string;
  birthday?: string;
  createdAt?: string;
  updatedAt?: string;
  apartmentName?: string;
  roomName?: string;
}

export interface TenantFormValues {
  id?: string;
  fullName: string;
  phone: string;
  email?: string;
  identityNumber: string;
  gender?: string;
  permanentAddress?: string;
  dob?: Dayjs;
  idFront?: UploadFile[];
  idBack?: UploadFile[];
  portrait?: UploadFile[];
  contractScan?: UploadFile[];
}

export interface TenantPayload {
  name: string;
  phone: string;
  email?: string;
  cardId: string;
  gender?: string;
  location?: string;
  birthday?: string;
}
