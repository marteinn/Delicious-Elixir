import React from 'react';
import LinkItem from '../LinkItem/LinkItem';


class LinkList extends React.Component {
    static defaultProps = {
        links: [],
    }

    render() {
        const { links, onRequestEdit } = this.props;

        return (
            <div className="LinkList">
                {links.map((link, index) => {
                    return (
                        <LinkItem key={index} link={link} onRequestEdit={onRequestEdit} />
                    );
                })}
            </div>
        );
    }
}


LinkList.propTypes = {
    links: React.PropTypes.array.isRequired,
    onRequestEdit: React.PropTypes.func.isRequired,
};

export default LinkList;
