import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AppProvider } from "./contexts/AppContext";
import { AuthGuard, GuestGuard } from "./middleware/authMiddleware";
import { Layout } from "./components/layout/Layout";
import { Dashboard } from "./pages/Dashboard";
import { Assets } from "./pages/Assets";
import { Login } from "./pages/Login";
import NotFound from "./pages/NotFound";
import "./i18n/config";

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
            
            {/* Protected Routes */}
            <Route 
              path="/dashboard" 
              element={
                <AuthGuard>
                  <Layout>
                    <Dashboard />
                  </Layout>
                </AuthGuard>
              } 
            />
            <Route 
              path="/assets" 
              element={
                <AuthGuard>
                  <Layout>
                    <Assets />
                  </Layout>
                </AuthGuard>
              } 
            />
            <Route 
              path="/inventory" 
              element={
                <AuthGuard>
                  <Layout>
                    <div className="text-center py-20">
                      <h1 className="text-2xl font-bold">Inventory Page</h1>
                      <p className="text-muted-foreground">Coming soon...</p>
                    </div>
                  </Layout>
                </AuthGuard>
              } 
            />
            <Route 
              path="/maintenance" 
              element={
                <AuthGuard>
                  <Layout>
                    <div className="text-center py-20">
                      <h1 className="text-2xl font-bold">Maintenance Page</h1>
                      <p className="text-muted-foreground">Coming soon...</p>
                    </div>
                  </Layout>
                </AuthGuard>
              } 
            />
            <Route 
              path="/categories" 
              element={
                <AuthGuard>
                  <Layout>
                    <div className="text-center py-20">
                      <h1 className="text-2xl font-bold">Categories Page</h1>
                      <p className="text-muted-foreground">Coming soon...</p>
                    </div>
                  </Layout>
                </AuthGuard>
              } 
            />
            <Route 
              path="/locations" 
              element={
                <AuthGuard>
                  <Layout>
                    <div className="text-center py-20">
                      <h1 className="text-2xl font-bold">Locations Page</h1>
                      <p className="text-muted-foreground">Coming soon...</p>
                    </div>
                  </Layout>
                </AuthGuard>
              } 
            />
            <Route 
              path="/users" 
              element={
                <AuthGuard>
                  <Layout>
                    <div className="text-center py-20">
                      <h1 className="text-2xl font-bold">Users Page</h1>
                      <p className="text-muted-foreground">Coming soon...</p>
                    </div>
                  </Layout>
                </AuthGuard>
              } 
            />
            <Route 
              path="/reports" 
              element={
                <AuthGuard>
                  <Layout>
                    <div className="text-center py-20">
                      <h1 className="text-2xl font-bold">Reports Page</h1>
                      <p className="text-muted-foreground">Coming soon...</p>
                    </div>
                  </Layout>
                </AuthGuard>
              } 
            />
            <Route 
              path="/settings" 
              element={
                <AuthGuard>
                  <Layout>
                    <div className="text-center py-20">
                      <h1 className="text-2xl font-bold">Settings Page</h1>
                      <p className="text-muted-foreground">Coming soon...</p>
                    </div>
                  </Layout>
                </AuthGuard>
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
