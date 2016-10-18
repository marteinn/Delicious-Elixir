import React from 'react';
// import { Link } from 'react-router';

const MainLayout = ({ children }) => (
    <div>
        {children}
    </div>
);

MainLayout.propTypes = {
    children: React.PropTypes.object,
};

export default MainLayout;
