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
                // <AuthGuard>
                // <Layout>
                <CompanySetup />
                // </Layout>
                // </AuthGuard>
              }
            />
            <Route
              path="/dashboard"
              element={
                // <AuthGuard>
                <Layout>
                  <Dashboard />
                </Layout>
                // </AuthGuard>
              }
            />
            <Route
              path="/sites"
              element={
                // <AuthGuard>
                <Layout>
                  <Sites />
                </Layout>
                // </AuthGuard>
              }
            />
            <Route
              path="/employee"
              element={
                <AuthGuard>
                <Layout>
                  <Employee />
                </Layout>
               </AuthGuard>
              }
            />
            <Route
              path="/category/*"
              element={
                <AuthGuard>
                <Layout>
                  <CategoryRoutes />
                </Layout>
                 </AuthGuard>
              }
            />
            <Route
              path="/locations"
              element={
                // <AuthGuard>
                <Layout>
                  <Location />
                </Layout>
                // </AuthGuard>
              }
            />
            <Route
              path="/department"
              element={
                // <AuthGuard>
                <Layout>
                  <Department />
                </Layout>
                // </AuthGuard>
              }
            />
            <Route
              path="/position/*"
              element={
                // <AuthGuard>
                <Layout>
                  <PositionRoutes />
                </Layout>
                // </AuthGuard>
              }
            />
            <Route
              path="/rolesandrights"
              element={
                // <AuthGuard>
                <Layout>
                  <RolesAndRights />
                </Layout>
                // </AuthGuard>
              }
            />
            <Route
              path="/subcategory/*"
              element={
                <AuthGuard>
                <Layout>
                  <SubCategoryRoutes />
                </Layout>
               </AuthGuard>
              }
            />
            <Route
              path="/assets"
              element={
                // <AuthGuard>
                <Layout>
                  <Assets />
                </Layout>
                // </AuthGuard>
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