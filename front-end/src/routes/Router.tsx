import React from 'react';
import { useSelector } from 'react-redux';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router';
import AdminLayout from '../layouts/adminLayout/AdminLayout';
import CommonLayout from '../layouts/commonLayout/CommonLayout';
import Apartments from '../pages/apartments/Apartments';
import ApartmentsDetail from '../pages/apartments/Detail';
import Dashboard from '../pages/dashboard/Dashboard';
import Login from '../pages/login/Login.container';
import NotFound from '../pages/notFound/NoteFound';
import Room from '../pages/room/Room';
import Tenants from '../pages/tenants/Tenants';
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
          path="/apartments"
          element={
            <CommonLayout>
              <AdminLayout>
                <Apartments />
              </AdminLayout>
            </CommonLayout>
          }
        />
        <Route
          path="/apartments/:id"
          element={
            <CommonLayout>
              <AdminLayout>
                <ApartmentsDetail />
              </AdminLayout>
            </CommonLayout>
          }
        />
        <Route
          path="/apartments/:id/rooms/:idRoom"
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
