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

UserHeader.propTypes = {
    user: React.PropTypes.object.isRequired,
};

export default UserHeader;
