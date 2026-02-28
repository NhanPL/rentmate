import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  Dialog,
  MenuItem,
  Select,
  TextField,
  Typography,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { getInfoRentalTenantById } from '../../../api/tenant';
import { getAllApartments } from '../../../api/apartment';

interface RentalFormProps {
  open: boolean;
  onClose: () => void;
  tenantId: string;
}

interface Building {
  id: string;
  name: string;
}

interface Room {
  id: string;
  roomNumber: string;
  price: number;
  area: number;
  buildingId: string;
  status: string;
}

interface FormData {
  building: string;
  room: string;
  tenantName: string;
  tenantCardId: string;
  tenantPhone: string;
}

export const RentalForm: React.FC<RentalFormProps> = ({ open, onClose, tenantId }) => {
  const { control, handleSubmit, watch, setValue } = useForm<FormData>({
    defaultValues: {
      building: '',
      room: '',
      tenantName: '',
      tenantCardId: '',
      tenantPhone: '',
    },
  });

  const [buildings, setBuildings] = useState<Building[]>([]);
  const [rooms, setRooms] = useState<Room[]>([]);
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const watchBuilding = watch('building');
  const watchRoom = watch('room');

  useEffect(() => {
    const fetchInfoTentant = async () => {
      try {
        setLoading(true);
        const data = await getInfoRentalTenantById(tenantId);
        setValue('tenantName', data.name);
        setValue('tenantCardId', data.cardId);
        setValue('tenantPhone', data.phone);
        setError(null);
      } catch {
        setError('Không thể tải thông tin người thuê');
      } finally {
        setLoading(false);
      }
    };

    const fetchBuildings = async () => {
      try {
        setLoading(true);
        const data = await getAllApartments();
        setBuildings(data);
        setError(null);
      } catch {
        setError('Không thể tải thông tin người thuê');
      } finally {
        setLoading(false);
      }
    };
    if (tenantId) {
      fetchInfoTentant();
      fetchBuildings();
    }
  }, [tenantId]);

  useEffect(() => {
    if (watchRoom) {
      const room = rooms.find((r) => r.id === watchRoom);
      setSelectedRoom(room || null);
    }
  }, [watchRoom, rooms]);

  const handleBuildingChange = async (buildingId: string) => {
    try {
      setLoading(true);
      // const data = await rentalService.getRoomsByBuilding(buildingId);
      // setRooms(data);
      setValue('room', '');
      setSelectedRoom(null);
      setError(null);
    } catch {
      setError('Không thể tải danh sách phòng');
    } finally {
      setLoading(false);
    }
  };

  const onFinish = async (data: FormData) => {
    try {
      setSubmitting(true);
      setError(null);
      console.log('Rental Data:', data);
    } catch {
      setError('Có lỗi khi thuê phòng');
    } finally {
      setSubmitting(false);
    }
  };

  console.log(buildings);

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          maxHeight: '90vh',
          flexWrap: 'nowrap',
          padding: '32px',
          paddingTop: '0px',
        }}
      >
        {error && (
          <Alert severity="error" className="mb-4">
            {error}
          </Alert>
        )}

        <form onSubmit={handleSubmit(onFinish)} className="space-y-6">
          {/* Thông tin người thuê */}
          <div className="space-y-3">
            <Typography variant="h6" className="font-semibold">
              Thông tin người thuê
            </Typography>

            <Controller
              name="tenantName"
              control={control}
              rules={{ required: 'Vui lòng nhập tên' }}
              render={({ field }) => (
                <TextField {...field} fullWidth label="Tên người thuê" size="small" className="bg-gray-50" />
              )}
            />

            <Controller
              name="tenantCardId"
              control={control}
              rules={{ required: 'Vui lòng nhập CCCD' }}
              render={({ field }) => (
                <TextField {...field} fullWidth label="CCCD" size="small" className="bg-gray-50" />
              )}
            />

            <Controller
              name="tenantPhone"
              control={control}
              rules={{ required: 'Vui lòng nhập số điện thoại' }}
              render={({ field }) => (
                <TextField {...field} fullWidth label="Số điện thoại" size="small" className="bg-gray-50" />
              )}
            />
          </div>

          {/* Chọn tòa nhà */}
          <div>
            <Controller
              name="building"
              control={control}
              rules={{ required: 'Vui lòng chọn tòa nhà' }}
              render={({ field }) => (
                <Select
                  {...field}
                  fullWidth
                  displayEmpty
                  onChange={(e) => {
                    field.onChange(e);
                    handleBuildingChange(e.target.value);
                  }}
                  disabled={loading}
                  renderValue={(value) => value || 'Chọn tòa nhà'}
                  className="bg-white"
                >
                  <MenuItem value="" disabled>
                    Chọn tòa nhà
                  </MenuItem>
                  {buildings &&
                    buildings.map((building) => (
                      <MenuItem key={building.id} value={building.id}>
                        {building.name}
                      </MenuItem>
                    ))}
                </Select>
              )}
            />
          </div>

          {/* Chọn phòng */}
          <div>
            <Controller
              name="room"
              control={control}
              rules={{ required: 'Vui lòng chọn phòng' }}
              render={({ field }) => (
                <Select
                  {...field}
                  fullWidth
                  displayEmpty
                  disabled={!watchBuilding || loading}
                  renderValue={(value) => {
                    if (!value) return 'Chọn phòng';
                    const room = rooms.find((r) => r.id === value);
                    return room ? `${room.roomNumber} - ${room.price.toLocaleString('vi-VN')}đ/tháng` : '';
                  }}
                  className="bg-white"
                >
                  <MenuItem value="" disabled>
                    Chọn phòng
                  </MenuItem>
                  {rooms.map((room) => (
                    <MenuItem key={room.id} value={room.id}>
                      {room.roomNumber} - {room.price.toLocaleString('vi-VN')}đ/tháng
                    </MenuItem>
                  ))}
                </Select>
              )}
            />
          </div>

          {/* Hiển thị thông tin phòng đã chọn */}
          {selectedRoom && (
            <Card className="bg-gradient-to-r from-blue-50 to-cyan-50 border border-blue-200">
              <CardContent className="space-y-2">
                <Typography variant="h6" className="font-semibold text-blue-900">
                  Thông tin phòng
                </Typography>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Typography variant="caption" className="text-gray-600">
                      Phòng số
                    </Typography>
                    <Typography variant="body2" className="font-medium">
                      {selectedRoom.roomNumber}
                    </Typography>
                  </div>

                  <div>
                    <Typography variant="caption" className="text-gray-600">
                      Giá
                    </Typography>
                    <Typography variant="body2" className="font-medium text-green-600">
                      {selectedRoom.price.toLocaleString('vi-VN')}đ/tháng
                    </Typography>
                  </div>

                  <div>
                    <Typography variant="caption" className="text-gray-600">
                      Diện tích
                    </Typography>
                    <Typography variant="body2" className="font-medium">
                      {selectedRoom.area}m²
                    </Typography>
                  </div>

                  <div>
                    <Typography variant="caption" className="text-gray-600">
                      Trạng thái
                    </Typography>
                    <Typography
                      variant="body2"
                      className={`font-medium ${
                        selectedRoom.status === 'available' ? 'text-green-600' : 'text-red-600'
                      }`}
                    >
                      {selectedRoom.status === 'available' ? 'Còn trống' : 'Đã cho thuê'}
                    </Typography>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            disabled={submitting || loading}
            className="py-2"
          >
            {submitting ? (
              <>
                <CircularProgress size={20} className="mr-2" />
                Đang xử lý...
              </>
            ) : (
              'Xác nhận thuê phòng'
            )}
          </Button>
        </form>
      </Box>
    </Dialog>
  );
};
