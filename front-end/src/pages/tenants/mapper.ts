import dayjs from 'dayjs';
import type { UploadFile } from 'antd/es/upload/interface';
import type { TenantDTO, TenantFormValues, TenantPayload } from './types';

const toUploadFiles = (files?: Array<{ url?: string; fileName?: string; name?: string }>): UploadFile[] => {
  if (!files?.length) return [];

  return files
    .filter((file) => file.url)
    .map((file, index) => ({
      uid: `existing-${index}`,
      name: file.fileName || file.name || `file-${index + 1}`,
      status: 'done',
      url: file.url,
    }));
};

export const mapTenantDtoToFormValues = (dto: TenantDTO): TenantFormValues => ({
  id: dto.id,
  fullName: dto.name || '',
  phone: dto.phone || '',
  email: dto.email || '',
  identityNumber: dto.cardId || '',
  gender: dto.gender,
  permanentAddress: dto.location || '',
  dob: dto.birthday ? dayjs(dto.birthday) : undefined,
  idFront: toUploadFiles(),
  idBack: toUploadFiles(),
  portrait: toUploadFiles(),
  contractScan: toUploadFiles(),
});

export const mapFormValuesToPayload = (values: TenantFormValues): TenantPayload => ({
  name: values.fullName.trim(),
  phone: values.phone.trim(),
  email: values.email?.trim() || undefined,
  cardId: values.identityNumber.trim(),
  gender: values.gender,
  location: values.permanentAddress?.trim() || undefined,
  birthday: values.dob ? values.dob.toISOString() : undefined,
});
