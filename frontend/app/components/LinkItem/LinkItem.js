import React from 'react';
import classNames from 'classnames';
import uri from 'urijs';
import { Link } from 'react-router';

class LinkItem extends React.Component {
    static defaultProps = {
        avatar: false,
        editable: false,
    };

    static propTypes = {
        link: React.PropTypes.object.isRequired,
        avatar: React.PropTypes.bool,
        editable: React.PropTypes.bool,
        onRequestEdit: React.PropTypes.func.isRequired,
        onRequestDelete: React.PropTypes.func.isRequired,
    };

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
        const { link, avatar, editable } = this.props;
        const domain = uri(link.url).domain();
        const insertedAt = link.inserted_at;
        const formattedInsertDate = new Date(insertedAt).toLocaleDateString();

        return (
            <div className="LinkItem">
                {avatar &&
                    <div className="LinkItem__Author">
                        <Link to={`/users/${link.user.username}`}>
                            <img className="UserHeader__AvatarImage" alt={`${link.user.username} avatar`} />
                        </Link>
                    </div>
                }

                <div className="LinkItem__Content">
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
                            {editable &&
                                <a className="LinkItem__Action" href="#" onClick={this.handleShareClick}>Edit</a>
                            }
                            {editable &&
                                <a className="LinkItem__Action" href="#" onClick={this.handleDeleteClick}>Delete</a>
                            }
                            <span className="LinkItem__Date">{formattedInsertDate}</span>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}


export default LinkItem;
