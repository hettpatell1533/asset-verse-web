import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AppProvider } from "./contexts/AppContext";
import { AuthGuard, GuestGuard } from "./middleware/authMiddleware";
import { Layout } from "./components/layout/Layout";
import { Dashboard } from "./pages/Dashboard";
import { Sites } from "./pages/Sites";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import NotFound from "./pages/NotFound";
import "./i18n/config";
import { Location } from "./pages/Location";
import { RolesAndRights } from "./pages/RolesAndRights";
import  Department  from "./pages/Department";
import { Assets } from "./pages/Assets";
import { Employee } from "./pages/Employee";
import CompanySetup from "./pages/CompanySetup";
import PositionRoutes from "./routes/positionRoutes";
import CategoryRoutes from "./routes/categoryRoutes";
import SubCategoryRoutes from "./routes/subcategoryRoutes";
import HelpSupport from "./pages/HelpSupport";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AppProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* Public Routes */}
            <Route
              path="/login"
              element={
                <GuestGuard>
                  <Login />
                </GuestGuard>
              }
            />
            <Route
              path="/register"
              element={
                <GuestGuard>
                  <Register />
                </GuestGuard>
              }
            />

            {/* Protected Routes */}

            <Route
              path="/company-setup"
              element={
                <CompanySetup />
              }
            />
            <Route
              path="/dashboard"
              element={
                <Layout>
                  <Dashboard />
                </Layout>
              }
            />
            <Route
              path="/sites"
              element={
                <Layout>
                  <Sites />
                </Layout>
              }
            />
            <Route
              path="/employee"
              element={
                <Layout>
                  <Employee />
                </Layout>
              }
            />
            <Route
              path="/category/*"
              element={
                <Layout>
                  <CategoryRoutes />
                </Layout>
              }
            />
            <Route
              path="/locations"
              element={
                <Layout>
                  <Location />
                </Layout>
              }
            />
            <Route
              path="/department"
              element={
                <Layout>
                  <Department />
                </Layout>
              }
            />
            <Route
              path="/position/*"
              element={
                <Layout>
                  <PositionRoutes />
                </Layout>
              }
            />
            <Route
              path="/rolesandrights"
              element={
                <Layout>
                  <RolesAndRights />
                </Layout>
              }
            />
            <Route
              path="/subcategory/*"
              element={
                <Layout>
                  <SubCategoryRoutes />
                </Layout>
              }
            />
            <Route
              path="/assets"
              element={
                <Layout>
                  <Assets />
                </Layout>
              }
            />
            <Route
              path="/help-support"
              element={
                <Layout>
                  <HelpSupport />
                </Layout>
              }
            />

            {/* Redirects */}
            <Route path="/" element={<Navigate to="/dashboard" replace />} />

            {/* 404 */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AppProvider>
  </QueryClientProvider>
);

export default App;