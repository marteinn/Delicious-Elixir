import React from 'react';
import LinkItem from '../LinkItem/LinkItem';


class LinkList extends React.Component {
    render() {
        const { links } = this.props;

        return (
            <div className="LinkList">
                {links.map((link, index) => {
                    return (
                        <LinkItem key={index} link={link} />
                    );
                })}
            </div>
        );
    }
}


LinkList.propTypes = {
    links: React.PropTypes.array.isRequired,
};

export default LinkList;
