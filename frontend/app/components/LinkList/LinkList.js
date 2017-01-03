import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import LinkItem from '../LinkItem/LinkItem';


class LinkList extends React.Component {
    static defaultProps = {
        links: [],
    }

    render() {
        const { links, onRequestEdit, onRequestDelete } = this.props;
        const items = links.map((link, index) => (
            <LinkItem key={link.id} link={link} onRequestEdit={onRequestEdit} onRequestDelete={onRequestDelete} />
        ));

        return (
            <div className="LinkList">
            <ReactCSSTransitionGroup
                transitionAppear={false}
                transitionEnter={false}
                transitionLeave={true}
                transitionLeaveTimeout={600}
                transitionName={ {
                    leave: 'LinkItem--Leave',
                    leaveActive: 'LinkItem--LeaveActive',
                }}
            >
                {items}
                </ReactCSSTransitionGroup>
            </div>
        );
    }
}


LinkList.propTypes = {
    links: React.PropTypes.array.isRequired,
    onRequestEdit: React.PropTypes.func.isRequired,
    onRequestDelete: React.PropTypes.func.isRequired,
};

export default LinkList;
