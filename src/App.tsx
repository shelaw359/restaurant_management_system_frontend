// src/App.tsx

import { Routes, Route, Navigate } from 'react-router-dom';
import { ProtectedRoute } from './routes/ProtectedRoute';
import { PublicRoute } from './routes/PublicRoute';
import { RoleBasedRoute } from './routes/RoleBasedRoute';
import { MainLayout } from './components/layout/MainLayout';
import { UserRole } from './types/auth.types';

// Pages
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import StaffPage from './pages/StaffPage';
const MenuPage = () => <div className="text-white">Menu Page</div>;
const OrdersPage = () => <div className="text-white">Orders Page</div>;
const TablesPage = () => <div className="text-white">Tables Page</div>;
const InventoryPage = () => <div className="text-white">Inventory Page</div>;
const ReservationsPage = () => <div className="text-white">Reservations Page</div>;
const PaymentsPage = () => <div className="text-white">Payments Page</div>;
const KitchenPage = () => <div className="text-white">Kitchen Page</div>;
const SettingsPage = () => <div className="text-white">Settings Page</div>;

function App() {
  return (
    <Routes>
      {/* Public Routes - Only accessible when NOT logged in */}
      <Route element={<PublicRoute />}>
        <Route path="/login" element={<LoginPage />} />
      </Route>

      {/* Protected Routes with Layout - Require authentication */}
      <Route element={<ProtectedRoute />}>
        <Route element={<MainLayout />}>
          {/* Dashboard - All authenticated users */}
          <Route path="/dashboard" element={<DashboardPage />} />

          {/* Admin/Owner Only Routes */}
          <Route element={<RoleBasedRoute allowedRoles={[UserRole.ADMIN, UserRole.OWNER]} />}>
            <Route path="/staff" element={<StaffPage />} />
            <Route path="/settings" element={<SettingsPage />} />
          </Route>

          {/* Manager+ Routes */}
          <Route element={<RoleBasedRoute allowedRoles={[UserRole.ADMIN, UserRole.OWNER, UserRole.MANAGER]} />}>
            <Route path="/menu" element={<MenuPage />} />
            <Route path="/inventory" element={<InventoryPage />} />
            <Route path="/reservations" element={<ReservationsPage />} />
            <Route path="/payments" element={<PaymentsPage />} />
          </Route>

          {/* Orders - Most roles */}
          <Route element={<RoleBasedRoute allowedRoles={[UserRole.ADMIN, UserRole.OWNER, UserRole.MANAGER, UserRole.WAITER, UserRole.CHEF]} />}>
            <Route path="/orders" element={<OrdersPage />} />
          </Route>

          {/* Tables - Waiter+ */}
          <Route element={<RoleBasedRoute allowedRoles={[UserRole.WAITER, UserRole.MANAGER, UserRole.ADMIN, UserRole.OWNER]} />}>
            <Route path="/tables" element={<TablesPage />} />
          </Route>

          {/* Kitchen - Chef */}
          <Route element={<RoleBasedRoute allowedRoles={[UserRole.CHEF]} />}>
            <Route path="/kitchen" element={<KitchenPage />} />
          </Route>
        </Route>
      </Route>

      {/* Default redirect */}
      <Route path="/" element={<Navigate to="/dashboard" replace />} />
      
      {/* 404 Not Found */}
      <Route path="*" element={
        <div className="min-h-screen flex items-center justify-center bg-slate-950">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-white mb-2">404</h1>
            <p className="text-slate-400">Page not found</p>
          </div>
        </div>
      } />
    </Routes>
  );
}

export default App;