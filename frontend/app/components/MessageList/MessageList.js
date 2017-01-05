import React from 'react';

class MessageList extends React.Component {
    render() {
        if (!this.props.errors) {
            return false;
        }

        return (
            <ul className="MessageList">
                {this.props.errors.map((error, index) => {
                    return (
                        <li key={index} className="MessageList__Error">
                            {error}
                        </li>
                    );
                })}
            </ul>
        );
    }
}

MessageList.propTypes = {
    errors: React.PropTypes.array,
};

export default MessageList;
