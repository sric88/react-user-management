import React from 'react';
import UserManagement from '../../containers/UserManagement/UserManagement';
import '../../assets/Layout.scss';

const Layout: React.FC = (props: any) => {
    return (
        <React.Fragment>
            <main>
                <UserManagement />
            </main>
        </React.Fragment>
    )
}

export default Layout;