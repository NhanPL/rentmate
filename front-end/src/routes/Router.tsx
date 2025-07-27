import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router';
import NotFound from '../pages/notFound/NoteFound';
import Login from '../pages/login/Login.container';
import CommonLayout from '../layouts/commonLayout/CommonLayout';
import Dashboard from '../pages/dashboard/Dashboard';
import AdminLayout from '../layouts/adminLayout/AdminLayout';
import Properties from '../pages/properties/Properties';
import PropertiesDetail from '../pages/properties/Detail';
import Room from '../pages/room/Room';
import Tenants from '../pages/tenants/Tenants';
import { useSelector } from 'react-redux';
import { AuthState } from '../types';

const AppRouter: React.FC = () => {
  const { token } = useSelector((state: { auth: AuthState }) => state.auth);

  const renderPublicRoutes = () => {
    return (
      <>
        <Route
          path="/"
          element={
            <CommonLayout>
              <Login />
            </CommonLayout>
          }
        />
        <Route path="/*" element={<Navigate to="/" replace />} />
      </>
    );
  };

  const renderPrivateRoutes = () => {
    return (
      <>
        <Route path="/" element={<Navigate to={'/dashboard'} replace />} />
        <Route
          path="/dashboard"
          element={
            <CommonLayout>
              <AdminLayout>
                <Dashboard />
              </AdminLayout>
            </CommonLayout>
          }
          handle={{ title: 'Quản lý phòng' }}
        />
        <Route
          path="/properties"
          element={
            <CommonLayout>
              <AdminLayout>
                <Properties />
              </AdminLayout>
            </CommonLayout>
          }
        />
        <Route
          path="/properties/:id"
          element={
            <CommonLayout>
              <AdminLayout>
                <PropertiesDetail />
              </AdminLayout>
            </CommonLayout>
          }
        />
        <Route
          path="/properties/:id/rooms/:idRoom"
          element={
            <CommonLayout>
              <AdminLayout>
                <Room />
              </AdminLayout>
            </CommonLayout>
          }
        />
        <Route
          path="/tenants"
          element={
            <CommonLayout>
              <AdminLayout>
                <Tenants />
              </AdminLayout>
            </CommonLayout>
          }
        />
        <Route
          path="/reports"
          element={
            <CommonLayout>
              <AdminLayout>
                <Dashboard />
              </AdminLayout>
            </CommonLayout>
          }
        />
        <Route path="/*" element={<NotFound />} />
      </>
    );
  };

  return (
    <BrowserRouter>
      <Routes>{token ? renderPrivateRoutes() : renderPublicRoutes()}</Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
