import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Main, Login, OrderForm, ViewOrders} from '../components';

const AppRouter = (props) => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/login" element={<Login />} />
        <Route path="/order" element={<OrderForm />} />
        <Route path="/view-orders" element={<ViewOrders />} />
      </Routes>
    </Router>
  );
}

export default AppRouter;
