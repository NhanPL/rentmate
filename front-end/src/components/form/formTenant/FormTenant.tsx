import React, { useEffect, useMemo, useState } from 'react';
import {
  Button,
  Col,
  DatePicker,
  Drawer,
  Form,
  Input,
  InputNumber,
  Modal,
  Row,
  Select,
  Spin,
  Space,
  Tabs,
  Upload,
  message,
} from 'antd';
import type { FormListFieldData, FormListOperation } from 'antd/es/form/FormList';
import type { UploadFile, UploadProps } from 'antd/es/upload/interface';
import dayjs, { Dayjs } from 'dayjs';
import axios from 'axios';
import { addTenant, getTenantByID, updateTenant } from '../../../api/tenant';
import { mapTenantDtoToFormValues } from '../../../pages/tenants/mapper';
import type { TenantMode } from '../../../pages/tenants/types';

type Mode = TenantMode;

type Gender = 'MALE' | 'FEMALE' | 'OTHER';
type TenantStatus = 'ACTIVE' | 'MOVED_OUT' | 'BLACKLIST';

interface CoTenant {
  fullName: string;
  phone?: string;
  identityNumber?: string;
}

interface Tenant {
  id?: string;
  fullName: string;
  dob?: string;
  gender?: Gender;
  identityNumber: string;
  identityIssuedDate?: string;
  identityIssuedPlace?: string;
  phone: string;
  email?: string;
  permanentAddress?: string;
  status: TenantStatus;
  note?: string;
}

interface ContractInput {
  roomId?: string;
  startDate?: string;
  endDate?: string;
  depositAmount?: number;
  rentPrice?: number;
  occupantsCount?: number;
  coTenants?: CoTenant[];
}

interface EmergencyContact {
  emergencyName?: string;
  emergencyPhone?: string;
  emergencyRelation?: string;
}

interface AttachmentMetadata {
  name: string;
  url?: string;
}

interface AttachmentPayload {
  idFront?: AttachmentMetadata[];
  idBack?: AttachmentMetadata[];
  portrait?: AttachmentMetadata[];
  contractScan?: AttachmentMetadata[];
}

export interface TenantFormPayload {
  tenant: Tenant;
  contract: ContractInput;
  emergencyContact: EmergencyContact;
  attachments: AttachmentPayload;
}

export interface TenantFormInitialValues {
  tenant?: Partial<Tenant>;
  contract?: Partial<ContractInput>;
  emergencyContact?: Partial<EmergencyContact>;
  attachments?: Partial<{
    idFront: UploadFile[];
    idBack: UploadFile[];
    portrait: UploadFile[];
    contractScan: UploadFile[];
  }>;
}

interface LegacyInitialData {
  id?: string;
  name?: string;
  email?: string;
  phone?: string;
  gender?: string;
  cardId?: string;
  location?: string;
  birthday?: string;
}

interface TenantFormDrawerProps {
  open: boolean;
  mode?: Mode;
  editingId?: string | null;
  loading?: boolean;
  initialValues?: TenantFormInitialValues;
  initialData?: LegacyInitialData;
  onSubmit?: (payload: TenantFormPayload) => Promise<void> | void;
  onSuccess?: () => Promise<void> | void;
  onCancel?: () => void;
  onClose?: () => void;
}

interface TenantFormValues {
  id?: string;
  fullName: string;
  dob?: Dayjs;
  gender?: Gender;
  identityNumber: string;
  identityIssuedDate?: Dayjs;
  identityIssuedPlace?: string;
  phone: string;
  email?: string;
  permanentAddress?: string;
  status: TenantStatus;
  note?: string;
  roomId?: string;
  startDate?: Dayjs;
  endDate?: Dayjs;
  depositAmount?: number;
  rentPrice?: number;
  occupantsCount?: number;
  coTenants?: CoTenant[];
  emergencyName?: string;
  emergencyPhone?: string;
  emergencyRelation?: string;
  idFront?: UploadFile[];
  idBack?: UploadFile[];
  portrait?: UploadFile[];
  contractScan?: UploadFile[];
}

const i18n = {
  vi: {
    titleCreate: 'Thêm người thuê',
    titleUpdate: 'Cập nhật người thuê',
    tabs: {
      personal: 'A. Thông tin cá nhân',
      contract: 'B. Thông tin thuê phòng / hợp đồng',
      emergency: 'C. Liên hệ khẩn cấp',
      attachment: 'D. Tệp đính kèm & ghi chú',
    },
    actions: {
      cancel: 'Hủy',
      save: 'Lưu',
      addCoTenant: 'Thêm người ở cùng',
      remove: 'Xóa',
    },
  },
};

const roomOptions = [
  { value: 'R101', label: 'Phòng R101' },
  { value: 'R102', label: 'Phòng R102' },
  { value: 'R201', label: 'Phòng R201' },
  { value: 'R202', label: 'Phòng R202' },
];

const genderOptions = [
  { value: 'MALE', label: 'Nam' },
  { value: 'FEMALE', label: 'Nữ' },
  { value: 'OTHER', label: 'Khác' },
];

const statusOptions = [
  { value: 'ACTIVE', label: 'Đang ở' },
  { value: 'MOVED_OUT', label: 'Đã chuyển đi' },
  { value: 'BLACKLIST', label: 'Danh sách đen' },
];

const PHONE_REGEX = /^0\d{9}$/;
const IDENTITY_REGEX = /^(\d{9}|\d{12})$/;

const validateMinTwoWords = (_: unknown, value?: string) => {
  if (!value?.trim()) return Promise.reject(new Error('Vui lòng nhập họ và tên'));
  const words = value.trim().split(/\s+/).filter(Boolean);
  if (words.length < 2) return Promise.reject(new Error('Họ tên phải có ít nhất 2 từ'));
  return Promise.resolve();
};

const validateVietnamPhone = (_: unknown, value?: string) => {
  if (!value?.trim()) return Promise.reject(new Error('Vui lòng nhập số điện thoại'));
  if (!PHONE_REGEX.test(value.trim())) {
    return Promise.reject(new Error('Số điện thoại phải có 10 số và bắt đầu bằng 0'));
  }
  return Promise.resolve();
};

const validateIdentityNumber = (_: unknown, value?: string) => {
  if (!value?.trim()) return Promise.reject(new Error('Vui lòng nhập CCCD/CMND'));
  if (!IDENTITY_REGEX.test(value.trim())) return Promise.reject(new Error('CCCD/CMND phải có 9 hoặc 12 chữ số'));
  return Promise.resolve();
};

const toISO = (value?: Dayjs) => (value ? value.toISOString() : undefined);

const getUploadFileMeta = (files?: UploadFile[]): AttachmentMetadata[] | undefined => {
  if (!files?.length) return undefined;
  return files.map((file) => ({
    name: file.name,
    url: file.url || (file.response as { url?: string } | undefined)?.url,
  }));
};

const legacyToInitialValues = (legacy?: LegacyInitialData): TenantFormInitialValues | undefined => {
  if (!legacy) return undefined;
  return {
    tenant: {
      id: legacy.id,
      fullName: legacy.name,
      email: legacy.email,
      phone: legacy.phone,
      gender: (legacy.gender as Gender) || undefined,
      identityNumber: legacy.cardId,
      permanentAddress: legacy.location,
      dob: legacy.birthday,
      status: 'ACTIVE',
    },
  };
};

const mapInitialValuesToForm = (mode: Mode, values?: TenantFormInitialValues): TenantFormValues => ({
  id: values?.tenant?.id,
  fullName: values?.tenant?.fullName || '',
  dob: values?.tenant?.dob ? dayjs(values.tenant.dob) : undefined,
  gender: values?.tenant?.gender,
  identityNumber: values?.tenant?.identityNumber || '',
  identityIssuedDate: values?.tenant?.identityIssuedDate ? dayjs(values.tenant.identityIssuedDate) : undefined,
  identityIssuedPlace: values?.tenant?.identityIssuedPlace || '',
  phone: values?.tenant?.phone || '',
  email: values?.tenant?.email || '',
  permanentAddress: values?.tenant?.permanentAddress || '',
  status: values?.tenant?.status || (mode === 'CREATE' ? 'ACTIVE' : 'ACTIVE'),
  note: values?.tenant?.note || '',
  roomId: values?.contract?.roomId,
  startDate: values?.contract?.startDate ? dayjs(values.contract.startDate) : undefined,
  endDate: values?.contract?.endDate ? dayjs(values.contract.endDate) : undefined,
  depositAmount: values?.contract?.depositAmount,
  rentPrice: values?.contract?.rentPrice,
  occupantsCount: values?.contract?.occupantsCount,
  coTenants: values?.contract?.coTenants?.length ? values.contract.coTenants : [{ fullName: '' }],
  emergencyName: values?.emergencyContact?.emergencyName || '',
  emergencyPhone: values?.emergencyContact?.emergencyPhone || '',
  emergencyRelation: values?.emergencyContact?.emergencyRelation || '',
  idFront: values?.attachments?.idFront || [],
  idBack: values?.attachments?.idBack || [],
  portrait: values?.attachments?.portrait || [],
  contractScan: values?.attachments?.contractScan || [],
});

const normalizeSubmitPayload = (formValues: TenantFormValues): TenantFormPayload => ({
  tenant: {
    id: formValues.id,
    fullName: formValues.fullName.trim(),
    dob: toISO(formValues.dob),
    gender: formValues.gender,
    identityNumber: formValues.identityNumber.trim(),
    identityIssuedDate: toISO(formValues.identityIssuedDate),
    identityIssuedPlace: formValues.identityIssuedPlace?.trim() || undefined,
    phone: formValues.phone.trim(),
    email: formValues.email?.trim() || undefined,
    permanentAddress: formValues.permanentAddress?.trim() || undefined,
    status: formValues.status,
    note: formValues.note?.trim() || undefined,
  },
  contract: {
    roomId: formValues.roomId,
    startDate: toISO(formValues.startDate),
    endDate: toISO(formValues.endDate),
    depositAmount: typeof formValues.depositAmount === 'number' ? Number(formValues.depositAmount) : undefined,
    rentPrice: typeof formValues.rentPrice === 'number' ? Number(formValues.rentPrice) : undefined,
    occupantsCount: typeof formValues.occupantsCount === 'number' ? Number(formValues.occupantsCount) : undefined,
    coTenants: formValues.coTenants
      ?.filter((item) => item?.fullName?.trim())
      .map((item) => ({
        fullName: item.fullName.trim(),
        phone: item.phone?.trim() || undefined,
        identityNumber: item.identityNumber?.trim() || undefined,
      })),
  },
  emergencyContact: {
    emergencyName: formValues.emergencyName?.trim() || undefined,
    emergencyPhone: formValues.emergencyPhone?.trim() || undefined,
    emergencyRelation: formValues.emergencyRelation?.trim() || undefined,
  },
  attachments: {
    idFront: getUploadFileMeta(formValues.idFront),
    idBack: getUploadFileMeta(formValues.idBack),
    portrait: getUploadFileMeta(formValues.portrait),
    contractScan: getUploadFileMeta(formValues.contractScan),
  },
});

const uploadNormalizer: UploadProps['getValueFromEvent'] = (event: { fileList?: UploadFile[] } | UploadFile[]) => {
  if (Array.isArray(event)) return event;
  return event?.fileList;
};

const TenantFormDrawer: React.FC<TenantFormDrawerProps> = ({
  open,
  mode,
  editingId,
  loading = false,
  initialValues,
  initialData,
  onSubmit,
  onSuccess,
  onCancel,
  onClose,
}) => {
  const [form] = Form.useForm<TenantFormValues>();
  const [activeTab, setActiveTab] = useState('personal');
  const [isFetchingTenant, setIsFetchingTenant] = useState(false);

  const resolvedMode: Mode = mode || (initialValues || initialData ? 'UPDATE' : 'CREATE');
  const resolvedInitialValues = useMemo(
    () => initialValues || legacyToInitialValues(initialData),
    [initialData, initialValues],
  );
  const mappedInitialValues = useMemo(
    () => mapInitialValuesToForm(resolvedMode, resolvedInitialValues),
    [resolvedInitialValues, resolvedMode],
  );

  useEffect(() => {
    if (!open) {
      form.resetFields();
      return;
    }

    setActiveTab('personal');

    if (resolvedMode === 'CREATE') {
      form.resetFields();
      form.setFieldsValue({ ...mappedInitialValues, status: 'ACTIVE' });
      return;
    }

    if (!editingId) {
      return;
    }

    const controller = new AbortController();

    const fetchTenant = async () => {
      setIsFetchingTenant(true);
      try {
        const tenant = await getTenantByID(editingId, controller.signal);
        if (!tenant) {
          message.error('Không tìm thấy dữ liệu người thuê.');
          onClose?.();
          return;
        }

        const mapped = mapTenantDtoToFormValues(tenant);
        form.resetFields();
        form.setFieldsValue({
          ...mappedInitialValues,
          ...mapped,
          status: mappedInitialValues.status || 'ACTIVE',
        });
      } catch (error) {
        if (axios.isCancel(error)) {
          return;
        }

        if (axios.isAxiosError(error) && error.response?.status === 404) {
          message.error('Tenant không tồn tại hoặc đã bị xóa.');
          onClose?.();
          return;
        }

        message.error('Không thể tải thông tin tenant để cập nhật.');
      } finally {
        setIsFetchingTenant(false);
      }
    };

    fetchTenant();

    return () => {
      controller.abort();
    };
  }, [editingId, form, mappedInitialValues, onClose, open, resolvedMode]);

  const closeHandler = onCancel || onClose || (() => undefined);

  const handleClose = () => {
    if (!form.isFieldsTouched(true)) {
      closeHandler();
      return;
    }

    Modal.confirm({
      title: 'Bạn có thay đổi chưa lưu',
      content: 'Bạn có chắc muốn đóng form? Dữ liệu chưa lưu sẽ bị mất.',
      okText: 'Đóng form',
      cancelText: 'Ở lại',
      onOk: closeHandler,
    });
  };

  const handleLegacySubmit = async (payload: TenantFormPayload) => {
    const legacyTenant = {
      name: payload.tenant.fullName,
      email: payload.tenant.email || '',
      phone: payload.tenant.phone,
      gender: payload.tenant.gender || '',
      cardId: payload.tenant.identityNumber,
      location: payload.tenant.permanentAddress || '',
      birthday: payload.tenant.dob || '',
    };

    if (resolvedMode === 'UPDATE' && editingId) {
      await updateTenant(editingId, legacyTenant);
      message.success('Cập nhật người thuê thành công');
    } else {
      await addTenant(legacyTenant);
      message.success('Thêm người thuê thành công');
    }

    await onSuccess?.();
  };

  const handleFinish = async (values: TenantFormValues) => {
    const payload = normalizeSubmitPayload(values);
    if (onSubmit) {
      await onSubmit(payload);
    } else {
      await handleLegacySubmit(payload);
    }
    form.resetFields();
    closeHandler();
  };

  return (
    <Drawer
      title={resolvedMode === 'CREATE' ? i18n.vi.titleCreate : i18n.vi.titleUpdate}
      open={open}
      width={780}
      onClose={handleClose}
      destroyOnClose
      extra={
        <Space>
          <Button onClick={handleClose}>{i18n.vi.actions.cancel}</Button>
          <Button type="primary" loading={loading || isFetchingTenant} onClick={() => form.submit()} disabled={isFetchingTenant}>
            {i18n.vi.actions.save}
          </Button>
        </Space>
      }
    >
      <Spin spinning={isFetchingTenant}>
        <Form<TenantFormValues> form={form} layout="vertical" onFinish={handleFinish} requiredMark="optional">
        <Tabs
          activeKey={activeTab}
          onChange={setActiveTab}
          items={[
            {
              key: 'personal',
              label: i18n.vi.tabs.personal,
              children: (
                <Row gutter={16}>
                  <Col span={24}>
                    <Form.Item name="fullName" label="Họ và tên" rules={[{ validator: validateMinTwoWords }]}>
                      <Input placeholder="VD: Nguyễn Văn A" />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item name="dob" label="Ngày sinh">
                      <DatePicker style={{ width: '100%' }} format="DD/MM/YYYY" />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item name="gender" label="Giới tính">
                      <Select options={genderOptions} placeholder="Chọn giới tính" allowClear />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item name="identityNumber" label="CCCD/CMND" rules={[{ validator: validateIdentityNumber }]}>
                      <Input placeholder="9 hoặc 12 chữ số" maxLength={12} />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item name="identityIssuedDate" label="Ngày cấp CCCD/CMND">
                      <DatePicker style={{ width: '100%' }} format="DD/MM/YYYY" />
                    </Form.Item>
                  </Col>
                  <Col span={24}>
                    <Form.Item name="identityIssuedPlace" label="Nơi cấp CCCD/CMND">
                      <Input placeholder="VD: Cục Cảnh sát QLHC về TTXH" />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item name="phone" label="Số điện thoại" rules={[{ validator: validateVietnamPhone }]}>
                      <Input placeholder="0xxxxxxxxx" maxLength={10} />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item name="email" label="Email" rules={[{ type: 'email', message: 'Email không hợp lệ' }]}>
                      <Input placeholder="example@email.com" />
                    </Form.Item>
                  </Col>
                  <Col span={24}>
                    <Form.Item name="permanentAddress" label="Địa chỉ thường trú">
                      <Input.TextArea rows={3} placeholder="Nhập địa chỉ thường trú" />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item name="status" label="Trạng thái" rules={[{ required: true, message: 'Vui lòng chọn trạng thái' }]}>
                      <Select options={statusOptions} placeholder="Chọn trạng thái" />
                    </Form.Item>
                  </Col>
                </Row>
              ),
            },
            {
              key: 'contract',
              label: i18n.vi.tabs.contract,
              children: (
                <>
                  <Row gutter={16}>
                    <Col span={12}>
                      <Form.Item name="roomId" label="Phòng">
                        <Select options={roomOptions} placeholder="Chọn phòng" allowClear />
                      </Form.Item>
                    </Col>
                    <Col span={12}>
                      <Form.Item noStyle shouldUpdate={(prev: TenantFormValues, current: TenantFormValues) => prev.roomId !== current.roomId}>
                        {({ getFieldValue }: { getFieldValue: (name: keyof TenantFormValues) => TenantFormValues[keyof TenantFormValues] }) => (
                          <Form.Item
                            name="startDate"
                            label="Ngày bắt đầu"
                            rules={[
                              {
                                validator: async (_: unknown, value?: Dayjs) => {
                                  if (getFieldValue('roomId') && !value) {
                                    return Promise.reject(new Error('Ngày bắt đầu là bắt buộc khi đã chọn phòng'));
                                  }
                                  return Promise.resolve();
                                },
                              },
                            ]}
                          >
                            <DatePicker style={{ width: '100%' }} format="DD/MM/YYYY" />
                          </Form.Item>
                        )}
                      </Form.Item>
                    </Col>
                    <Col span={12}>
                      <Form.Item
                        name="endDate"
                        label="Ngày kết thúc"
                        dependencies={['startDate']}
                        rules={[
                          ({ getFieldValue }: { getFieldValue: (name: keyof TenantFormValues) => TenantFormValues[keyof TenantFormValues] }) => ({
                            validator(_: unknown, value?: Dayjs) {
                              const startDate = getFieldValue('startDate') as Dayjs | undefined;
                              if (!value || !startDate || !value.isBefore(startDate, 'day')) return Promise.resolve();
                              return Promise.reject(new Error('Ngày kết thúc phải lớn hơn hoặc bằng ngày bắt đầu'));
                            },
                          }),
                        ]}
                      >
                        <DatePicker style={{ width: '100%' }} format="DD/MM/YYYY" />
                      </Form.Item>
                    </Col>
                    <Col span={12}>
                      <Form.Item name="depositAmount" label="Tiền cọc" rules={[{ type: 'number', min: 0, message: 'Tiền cọc phải >= 0' }]}>
                        <InputNumber style={{ width: '100%' }} min={0} placeholder="VNĐ" />
                      </Form.Item>
                    </Col>
                    <Col span={12}>
                      <Form.Item name="rentPrice" label="Giá thuê" rules={[{ type: 'number', min: 0, message: 'Giá thuê phải >= 0' }]}>
                        <InputNumber style={{ width: '100%' }} min={0} placeholder="VNĐ/tháng" />
                      </Form.Item>
                    </Col>
                    <Col span={12}>
                      <Form.Item
                        name="occupantsCount"
                        label="Số người ở"
                        rules={[{ type: 'number', min: 1, message: 'Số người ở phải >= 1' }]}
                      >
                        <InputNumber style={{ width: '100%' }} min={1} placeholder="Nhập số lượng" />
                      </Form.Item>
                    </Col>
                  </Row>

                  <Form.List name="coTenants">
                    {(fields: FormListFieldData[], { add, remove }: FormListOperation) => (
                      <Space direction="vertical" size={12} style={{ width: '100%' }}>
                        {fields.map((field) => (
                          <Row gutter={12} key={field.key} align="middle">
                            <Col span={8}>
                              <Form.Item
                                {...field}
                                name={[field.name, 'fullName']}
                                label="Họ tên người ở cùng"
                                rules={[{ required: true, message: 'Vui lòng nhập họ tên người ở cùng' }]}
                              >
                                <Input placeholder="Nguyễn Văn B" />
                              </Form.Item>
                            </Col>
                            <Col span={7}>
                              <Form.Item {...field} name={[field.name, 'phone']} label="SĐT">
                                <Input placeholder="0xxxxxxxxx" maxLength={10} />
                              </Form.Item>
                            </Col>
                            <Col span={7}>
                              <Form.Item {...field} name={[field.name, 'identityNumber']} label="CCCD/CMND">
                                <Input placeholder="9 hoặc 12 số" maxLength={12} />
                              </Form.Item>
                            </Col>
                            <Col span={2}>
                              <Button danger onClick={() => remove(field.name)}>
                                {i18n.vi.actions.remove}
                              </Button>
                            </Col>
                          </Row>
                        ))}
                        <Button type="dashed" onClick={() => add({ fullName: '' })}>
                          {i18n.vi.actions.addCoTenant}
                        </Button>
                      </Space>
                    )}
                  </Form.List>
                </>
              ),
            },
            {
              key: 'emergency',
              label: i18n.vi.tabs.emergency,
              children: (
                <Row gutter={16}>
                  <Col span={12}>
                    <Form.Item name="emergencyName" label="Tên người liên hệ">
                      <Input placeholder="VD: Trần Thị C" />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item name="emergencyPhone" label="Số điện thoại liên hệ">
                      <Input placeholder="0xxxxxxxxx" maxLength={10} />
                    </Form.Item>
                  </Col>
                  <Col span={24}>
                    <Form.Item name="emergencyRelation" label="Mối quan hệ">
                      <Input placeholder="VD: Chị gái" />
                    </Form.Item>
                  </Col>
                </Row>
              ),
            },
            {
              key: 'attachment',
              label: i18n.vi.tabs.attachment,
              children: (
                <Row gutter={16}>
                  <Col span={12}>
                    <Form.Item label="Ảnh CCCD mặt trước" name="idFront" valuePropName="fileList" getValueFromEvent={uploadNormalizer}>
                      <Upload beforeUpload={() => false} maxCount={1} listType="picture-card">
                        + Upload
                      </Upload>
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item label="Ảnh CCCD mặt sau" name="idBack" valuePropName="fileList" getValueFromEvent={uploadNormalizer}>
                      <Upload beforeUpload={() => false} maxCount={1} listType="picture-card">
                        + Upload
                      </Upload>
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item label="Ảnh chân dung" name="portrait" valuePropName="fileList" getValueFromEvent={uploadNormalizer}>
                      <Upload beforeUpload={() => false} maxCount={1} listType="picture-card">
                        + Upload
                      </Upload>
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item
                      label="Scan hợp đồng"
                      name="contractScan"
                      valuePropName="fileList"
                      getValueFromEvent={uploadNormalizer}
                    >
                      <Upload beforeUpload={() => false} maxCount={1} listType="picture-card">
                        + Upload
                      </Upload>
                    </Form.Item>
                  </Col>
                  <Col span={24}>
                    <Form.Item name="note" label="Ghi chú">
                      <Input.TextArea rows={4} placeholder="Ghi chú thêm về người thuê" />
                    </Form.Item>
                  </Col>
                </Row>
              ),
            },
          ]}
        />
        </Form>
      </Spin>
    </Drawer>
  );
};

export default TenantFormDrawer;

export const TenantFormDrawerExample: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [mode, setMode] = useState<Mode>('CREATE');

  const initialValuesForUpdate: TenantFormInitialValues = {
    tenant: {
      id: 'TENANT-001',
      fullName: 'Nguyễn Văn A',
      phone: '0987654321',
      identityNumber: '079123456789',
      status: 'ACTIVE',
      gender: 'MALE',
      email: 'vana@example.com',
      dob: '1998-06-15T00:00:00.000Z',
    },
    contract: {
      roomId: 'R101',
      startDate: '2025-01-01T00:00:00.000Z',
      rentPrice: 3500000,
      depositAmount: 3500000,
      occupantsCount: 2,
      coTenants: [{ fullName: 'Trần Thị B', phone: '0912345678' }],
    },
    emergencyContact: {
      emergencyName: 'Nguyễn Thị C',
      emergencyPhone: '0901234567',
      emergencyRelation: 'Mẹ',
    },
  };

  const handleSubmit = async (payload: TenantFormPayload) => {
    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 800));
    console.log('Normalized payload:', payload);
    message.success(mode === 'CREATE' ? 'Tạo người thuê thành công' : 'Cập nhật người thuê thành công');
    setLoading(false);
    setOpen(false);
  };

  return (
    <Space>
      <Button
        type="primary"
        onClick={() => {
          setMode('CREATE');
          setOpen(true);
        }}
      >
        Mở form CREATE
      </Button>
      <Button
        onClick={() => {
          setMode('UPDATE');
          setOpen(true);
        }}
      >
        Mở form UPDATE
      </Button>
      <TenantFormDrawer
        open={open}
        mode={mode}
        loading={loading}
        initialValues={mode === 'UPDATE' ? initialValuesForUpdate : undefined}
        onSubmit={handleSubmit}
        onCancel={() => setOpen(false)}
      />
    </Space>
  );
};
