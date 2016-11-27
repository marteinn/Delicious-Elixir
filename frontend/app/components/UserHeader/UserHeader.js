import React from 'react';


class UserHeader extends React.Component {
    render() {
        const { user } = this.props;

        return (
            <div className="UserHeader">
                <div className="UserHeader__Content">
                    <div className="UserHeader__Avatar">
                        <img className="UserHeader__AvatarImage" />
                    </div>
                    <div className="UserHeader__Description">
                        <div className="UserHeader__DescriptionTop">
                            <h2 className="UserHeader__DescriptionUsername">{user.username}</h2>
                            <span className="UserHeader__Info">{'Description'}</span>
                        </div>
                        <div className="UserHeader__DescriptionBottom">
                            <ul className="UserHeader__Stats">
                                <li><strong>4332</strong> Links</li>
                            </ul>
                            <div className="UserHeader__Dates">
                                Joined on...
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
