import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router';
import NotFound from '../pages/notFound/NoteFound';
import Login from '../pages/login/Login.container';
import CommonLayout from '../layouts/commonLayout/CommonLayout';
import Dashboard from '../pages/dashboard/Dashboard';
import AdminLayout from '../layouts/adminLayout/AdminLayout';
import Properties from '../pages/properties/Properties';
import PropertiesDetail from '../pages/properties/Detail';
import Room from '../pages/room/Room';
import Tenants from '../pages/tenants/Tenants';

const AppRouter: React.FC = () => {
  const isLoggedIn = () => !!localStorage.getItem('accessToken');
  return (
    <BrowserRouter>
      <Routes>
        {!isLoggedIn() ? (
          <Route
            path="*"
            element={
              <CommonLayout>
                <Login />
              </CommonLayout>
            }
          />
        ) : (
          <>
            <Route
              path="/"
              element={
                <CommonLayout>
                  <AdminLayout>
                    <Dashboard />
                  </AdminLayout>
                </CommonLayout>
              }
            />
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
        )}
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
