import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import LoginPage from "../features/auth/pages/LoginPage";
import DashboardLayout from "../features/dashboard/components/dashboardLayout";

import DashboardPage from "../features/dashboard/pages/dashboardPage";
import ProductsPage from "../features/products/pages/ProductPages";
import TeamPage from "../features/team/pages/TeamPage";

import ProtectedRoute from "../shared/components/ProtectedRoute";

export default function AppRouter() {
    return (
        <BrowserRouter>

            <Routes>

                {/* PUBLIC ROUTE */}
                <Route path="/" element={<LoginPage />} />

                {/* PROTECTED APP */}
                <Route element={<ProtectedRoute />}>

                    <Route path="/" element={<DashboardLayout />}>

                        <Route path="Dashboard" element={<DashboardPage />} />
                        <Route path="products" element={<ProductsPage />} />
                        <Route path="team" element={<TeamPage />} />

                    </Route>

                </Route>

                {/* FALLBACK */}
                <Route path="*" element={<Navigate to="/dashboard" replace />} />

            </Routes>

        </BrowserRouter>
    );
}