import React from 'react';

const MessageList = ({ errors, infos }) => {
    if (!errors) {
        return false;
    }

    return (
        <ul className="MessageList">
            {infos.map((error, index) => {
                return (
                    <li key={index} className="MessageList__Info">
                        {error}
                    </li>
                );
            })}

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
    infos: [],
};

MessageList.propTypes = {
    errors: React.PropTypes.array,
    infos: React.PropTypes.array,
};

export default MessageList;
