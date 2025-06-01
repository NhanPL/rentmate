import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router';
import NotFound from '../pages/notFound/NoteFound';
import Login from '../pages/login/Login.container';
import Test from '../pages/test/Test';
import CommonLayout from '../layouts/commonLayout/CommonLayout';
import Dashboard from '../pages/dashboard/Dashboard';
import AdminLayout from '../layouts/adminLayout/AdminLayout';
import Properties from '../pages/properties/Properties';

const AppRouter: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <CommonLayout>
              <Login />
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
          path="/tenants"
          element={
            <CommonLayout>
              <AdminLayout>
                <Dashboard />
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
        <Route
          path="/test"
          element={
            <CommonLayout>
              <Test />
            </CommonLayout>
          }
        />
        <Route path="/*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
