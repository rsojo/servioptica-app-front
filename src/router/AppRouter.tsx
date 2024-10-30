// src/router/AppRouter.tsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Dashboard, Home, Login } from "../components/pages";
import Layout from "../components/layout";
import NotFound from "../components/pages/NotFound";
import DashboardAdmin from "../components/pages/DashboardAdmin";
import OrderTracking from "../components/pages/OrderTracking";
import SearchOrderTracking from "../components/pages/SearchOrderTracking";
import HomeAdmin from "../components/pages/HomeAdmin";
import DashboardPromo from "../components/pages/DashboardPromo";
import { Faq } from "../components/pages/faq";
import PreLogin from "../components/pages/PreLogin";

const AppRouter: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/home-admin" element={<HomeAdmin />} />
          <Route path="/pre-login" element={<PreLogin />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/dashboard-promo" element={<DashboardPromo />} />
          <Route path="/dashboard-admin" element={<DashboardAdmin />} />
          <Route path="/order-tracking/:id" element={<OrderTracking />} />
          <Route path="/search-order-tracking" element={<SearchOrderTracking />} />
          <Route path="/faq" element={<Faq />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default AppRouter;
