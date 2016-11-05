import React from 'react';

const LinkItem = ({ link }) => {
    return (
        <div className="LinkItem">
            <h3><a href={link.url}>{link.title}</a> <span>{link.url}</span></h3>

            <div className="LinkItem__Footer">
                <div className="LinkItem__Column">
                    <span className="LinkItem__Saved">0</span>
                    <p className="LinkItem__Tags">Tag</p>
                </div>
                <div className="LinkItem__Column">
                    <span className="LinkItem__Action">Share</span>
                    <span className="LinkItem__Action">Edit</span>
                    <span className="LinkItem__Action">Delete</span>
                    <span className="LinkItem__Date">Date</span>
                </div>
            </div>
        </div>
    );
};

LinkItem.propTypes = {
    link: React.PropTypes.object.isRequired,
};

export default LinkItem;
