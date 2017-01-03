import React from 'react';
import classNames from 'classnames';

class LinkItem extends React.Component {
    handleShareClick = (e) => {
        const { link, onRequestEdit } = this.props;

        e.preventDefault();

        onRequestEdit(link);
    }

    handleDeleteClick = (e) => {
        const { link, onRequestDelete } = this.props;

        e.preventDefault();

        onRequestDelete(link);
    }

    render() {
        const { link } = this.props;

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
                        <a className="LinkItem__Action" href="#" onClick={this.handleShareClick}>Edit</a>
                        <a className="LinkItem__Action" href="#" onClick={this.handleDeleteClick}>Delete</a>
                        <span className="LinkItem__Date">Date</span>
                    </div>
                </div>
            </div>
        );
    };
};

LinkItem.propTypes = {
    link: React.PropTypes.object.isRequired,
    onRequestEdit: React.PropTypes.func.isRequired,
};

export default LinkItem;
