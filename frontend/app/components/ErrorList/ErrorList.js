import React from 'react';

class ErrorList extends React.Component {
    render() {
        if (!this.props.errors) {
            return false;
        }

        return (
            <ul>
                {this.props.errors.map((error, index) => {
                    return (
                        <li key={index} className="error">
                            {error}
                        </li>
                    );
                })}
            </ul>
        );
    }
}

ErrorList.propTypes = {
    errors: React.PropTypes.array,
};

export default ErrorList;
