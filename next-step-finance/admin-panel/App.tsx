import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Layout, Menu } from 'antd';
import UsersPage from './pages/UsersPage';
import LoansPage from './pages/LoansPage';
import FundsPage from './pages/FundsPage';
import './App.css'; // Add styles

const { Header, Content } = Layout;

function App() {
  return (
    <Router>
      <Layout>
        <Header>
          <Menu theme="dark" mode="horizontal">
            <Menu.Item key="1"><Link to="/">Users</Link></Menu.Item>
            <Menu.Item key="2"><Link to="/loans">Loans</Link></Menu.Item>
            <Menu.Item key="3"><Link to="/funds">Funds</Link></Menu.Item>
          </Menu>
        </Header>
        <Content style={{ padding: '50px' }}>
          <Routes>
            <Route path="/" element={<UsersPage />} />
            <Route path="/loans" element={<LoansPage />} />
            <Route path="/funds" element={<FundsPage />} />
          </Routes>
        </Content>
      </Layout>
    </Router>
  );
}

export default App;