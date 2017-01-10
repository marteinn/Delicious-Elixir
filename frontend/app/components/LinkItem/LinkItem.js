import React from 'react';
import classNames from 'classnames';
import uri from 'urijs';

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
        const domain = uri(link.url).domain();
        const insertedAt = link.inserted_at;
        const formattedInsertDate = new Date(insertedAt).toLocaleDateString();

        return (
            <div className="LinkItem">
                <h3 className="LinkItem__Title"><a className="LinkItem__TitleLink" href={link.url}>{link.title}</a> <span className="LinkItem__DomainTitle">{domain}</span></h3>

                <div className="LinkItem__Footer">
                    <div className="LinkItem__Column">
                        <span className="LinkItem__Saved">0</span>
                        <p className="LinkItem__Tags">
                            {link.tags.map((x) => <a className="LinkItem__Tag" href="#" key={x}>{x}</a>)}
                        </p>
                    </div>
                    <div className="LinkItem__Column LinkItem__Column--Right">
                        <span className="LinkItem__Action">Share</span>
                        <a className="LinkItem__Action" href="#" onClick={this.handleShareClick}>Edit</a>
                        <a className="LinkItem__Action" href="#" onClick={this.handleDeleteClick}>Delete</a>
                        <span className="LinkItem__Date">{formattedInsertDate}</span>
                    </div>
                </div>
            </div>
        );
    }
}

LinkItem.propTypes = {
    link: React.PropTypes.object.isRequired,
    onRequestEdit: React.PropTypes.func.isRequired,
    onRequestDelete: React.PropTypes.func.isRequired,
};

export default LinkItem;
