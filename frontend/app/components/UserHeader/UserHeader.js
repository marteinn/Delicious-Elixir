import React from 'react';


class UserHeader extends React.Component {
    render() {
        const { user } = this.props;
        const { stats } = user;

        return (
            <div className="UserHeader">
                <div className="UserHeader__Content">
                    <div className="UserHeader__Avatar">
                        <img className="UserHeader__AvatarImage" alt={`${user.username} avatar`} />
                    </div>
                    <div className="UserHeader__Description">
                        <div className="UserHeader__DescriptionTop">
                            <h2 className="UserHeader__DescriptionUsername">{user.username}</h2>
                            <p className="UserHeader__DescriptionInfo">{'Description'}</p>
                            <a className="UserHeader__DescriptionUrl" href="#">{'example.com'}</a>
                        </div>
                        <div className="UserHeader__DescriptionBottom">
                            <ul className="UserHeader__Stats">
                                <li className="UserHeader__StatItem"><strong>{stats.link_count}</strong> links</li>
                                <li className="UserHeader__StatItem"><strong>15</strong> following</li>
                                <li className="UserHeader__StatItem"><strong>5</strong> followers</li>
                                <li className="UserHeader__StatItem"><strong>2</strong> subscriptions</li>
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
