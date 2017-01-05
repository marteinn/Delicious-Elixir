import React from 'react';

const MessageList = ({ errors }) => {
    if (!errors) {
        return false;
    }

    return (
        <ul className="MessageList">
            {errors.map((error, index) => {
                return (
                    <li key={index} className="MessageList__Error">
                        {error}
                    </li>
                );
            })}
        </ul>
    );
};

MessageList.defaultProps = {
    errors: [],
};

MessageList.propTypes = {
    errors: React.PropTypes.array,
};

export default MessageList;
