import React from 'react';
import './App.scss';

import Layout from './components/Layout/Layout';
import UserManagement from './containers/UserManagement/UserManagement';

const App: React.FC = () => {
  return (
    <div >
      <Layout>
        <UserManagement />
      </Layout>
    </div>
  );
}

export default App;
