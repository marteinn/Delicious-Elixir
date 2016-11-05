import React from 'react';


class UserHeader extends React.Component {
    render() {
        const { user } = this.props;

        return (
            <div className="UserHeader">
                User header: { user.username }
            </div>
        );
    }
}

UserHeader.defaultProps = {
    user: null,
};

export default UserHeader;
