import React from 'react';
import EditProfileForm from '../../components/EditProfileForm';
import ChangePasswordForm from '../../components/ChangePasswordForm';

class Settings extends React.Component {
    static defaultProps = {
    };

    render() {
        return (
            <div className="Settings">
                Settings

                <div className="Settings__Content">
                    <EditProfileForm />
                    <ChangePasswordForm />
                </div>
            </div>
        );
    }
}

export default Settings;
