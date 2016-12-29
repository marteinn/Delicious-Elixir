import React from 'react';

const LinkItem = ({ link, onRequestEdit }) => {
    const handleShareClick = (e) => {
        e.preventDefault();

        onRequestEdit(link);
    }

    return (
        <div className="LinkItem">
            <h3 className="LinkItem__Title"><a href={link.url}>{link.title}</a> <span className="LinkItem__DomainTitle">{link.url}</span></h3>

            <div className="LinkItem__Footer">
                <div className="LinkItem__Column">
                    <span className="LinkItem__Saved">0</span>
                    <p className="LinkItem__Tags">Tag</p>
                </div>
                <div className="LinkItem__Column LinkItem__Column--Right">
                    <span className="LinkItem__Action">Share</span>
                    <a className="LinkItem__Action" href="#" onClick={handleShareClick}>Edit</a>
                    <span className="LinkItem__Action">Delete</span>
                    <span className="LinkItem__Date">Date</span>
                </div>
            </div>
        </div>
    );
};

LinkItem.propTypes = {
    link: React.PropTypes.object.isRequired,
    onRequestEdit: React.PropTypes.func.isRequired,
};

export default LinkItem;
