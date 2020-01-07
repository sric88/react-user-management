import React from 'react';

const Layout: React.FC = (props: any) => {
    return (
        <React.Fragment>
            <div>Toolbar, Backdrop</div>
            <main>
                {props.children}
            </main>
        </React.Fragment>
    )
}

export default Layout;