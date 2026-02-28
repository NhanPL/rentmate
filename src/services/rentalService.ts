import React, { useState, useEffect } from "react";
import { Form, Select, Button, Card, Spin, message } from "antd";
import type { FormInstance } from "antd";
import { rentalService } from "../services/rentalService";

interface RentalFormProps {
  tenantId: string;
  tenantName: string;
  tenantEmail: string;
  tenantPhone: string;
  onSuccess?: () => void;
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

export const RentalForm: React.FC<RentalFormProps> = ({
  tenantId,
  tenantName,
  tenantEmail,
  tenantPhone,
  onSuccess,
}) => {
  const [form] = Form.useForm();
  const [buildings, setBuildings] = useState<Building[]>([]);
  const [rooms, setRooms] = useState<Room[]>([]);
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetchBuildings();
  }, []);

  const fetchBuildings = async () => {
    try {
      setLoading(true);
      const data = await rentalService.getBuildings();
      setBuildings(data);
    } catch (error) {
      message.error("Không thể tải danh sách tòa nhà");
    } finally {
      setLoading(false);
    }
  };

  const handleBuildingChange = async (buildingId: string) => {
    try {
      setLoading(true);
      const data = await rentalService.getRoomsByBuilding(buildingId);
      setRooms(data);
      setSelectedRoom(null);
      form.setFieldValue("room", undefined);
    } catch (error) {
      message.error("Không thể tải danh sách phòng");
    } finally {
      setLoading(false);
    }
  };

  const handleRoomChange = (roomId: string) => {
    const room = rooms.find((r) => r.id === roomId);
    setSelectedRoom(room || null);
  };

  const onFinish = async (values: any) => {
    try {
      setSubmitting(true);
      await rentalService.createRental({
        tenantId,
        roomId: values.room,
        buildingId: values.building,
      });
      message.success("Thuê phòng thành công");
      form.resetFields();
      setSelectedRoom(null);
      onSuccess?.();
    } catch (error) {
      message.error("Có lỗi khi thuê phòng");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Spin spinning={loading}>
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        autoComplete="off"
      >
        {/* Thông tin người thuê (read-only) */}
        <Form.Item label="Tên người thuê">
          <div
            style={{
              padding: "8px 12px",
              background: "#f5f5f5",
              borderRadius: "4px",
            }}
          >
            {tenantName}
          </div>
        </Form.Item>

        <Form.Item label="Email">
          <div
            style={{
              padding: "8px 12px",
              background: "#f5f5f5",
              borderRadius: "4px",
            }}
          >
            {tenantEmail}
          </div>
        </Form.Item>

        <Form.Item label="Số điện thoại">
          <div
            style={{
              padding: "8px 12px",
              background: "#f5f5f5",
              borderRadius: "4px",
            }}
          >
            {tenantPhone}
          </div>
        </Form.Item>

        {/* Chọn tòa nhà */}
        <Form.Item
          name="building"
          label="Chọn tòa nhà"
          rules={[{ required: true, message: "Vui lòng chọn tòa nhà" }]}
        >
          <Select
            placeholder="Chọn tòa nhà"
            onChange={handleBuildingChange}
            options={buildings.map((b) => ({ label: b.name, value: b.id }))}
          />
        </Form.Item>

        {/* Chọn phòng */}
        <Form.Item
          name="room"
          label="Chọn phòng"
          rules={[{ required: true, message: "Vui lòng chọn phòng" }]}
        >
          <Select
            placeholder="Chọn phòng"
            onChange={handleRoomChange}
            options={rooms.map((r) => ({
              label: `${r.roomNumber} - ${r.price.toLocaleString(
                "vi-VN"
              )}đ/tháng`,
              value: r.id,
            }))}
          />
        </Form.Item>

        {/* Hiển thị thông tin phòng đã chọn */}
        {selectedRoom && (
          <Card style={{ marginBottom: "20px", background: "#f0f2f5" }}>
            <p>
              <strong>Phòng số:</strong> {selectedRoom.roomNumber}
            </p>
            <p>
              <strong>Giá:</strong> {selectedRoom.price.toLocaleString("vi-VN")}
              đ/tháng
            </p>
            <p>
              <strong>Diện tích:</strong> {selectedRoom.area}m²
            </p>
            <p>
              <strong>Trạng thái:</strong>{" "}
              {selectedRoom.status === "available"
                ? "Còn trống"
                : "Đã cho thuê"}
            </p>
          </Card>
        )}

        <Form.Item>
          <Button type="primary" htmlType="submit" block loading={submitting}>
            Xác nhận thuê phòng
          </Button>
        </Form.Item>
      </Form>
    </Spin>
  );
};
