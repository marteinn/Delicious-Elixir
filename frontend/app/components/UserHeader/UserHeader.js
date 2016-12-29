import React from 'react';


class UserHeader extends React.Component {
    render() {
        const { user } = this.props;

        return (
            <div className="UserHeader">
                <div className="UserHeader__Content">
                    <div className="UserHeader__Avatar">
                        <img className="UserHeader__AvatarImage" alt={`${user.username} avatar`} />
                    </div>
                    <div className="UserHeader__Description">
                        <div className="UserHeader__DescriptionTop">
                            <h2 className="UserHeader__DescriptionUsername">{user.username}</h2>
                            <span className="UserHeader__Info">{'Description'}</span>
                        </div>
                        <div className="UserHeader__DescriptionBottom">
                            <ul className="UserHeader__Stats">
                                <li className="UserHeader__StatItem"><strong>20</strong> Links</li>
                                <li className="UserHeader__StatItem"><strong>15</strong> Following</li>
                                <li className="UserHeader__StatItem"><strong>5</strong> Followers</li>
                                <li className="UserHeader__StatItem"><strong>2</strong> Subscriptions</li>
                            </ul>
                            <div className="UserHeader__Joined">
                                Joined on {user.inserted_at.substr(0, 10)}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

UserHeader.propTypes = {
    user: React.PropTypes.object.isRequired,
};

export default UserHeader;
