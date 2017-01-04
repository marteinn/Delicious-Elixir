import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import LinkItem from '../LinkItem/LinkItem';


class LinkList extends React.Component {
    static defaultProps = {
        links: [],
    }

    state = {
        useLeaveTransition: true,
    }

    componentWillReceiveProps(nextProps) {
        const { links } = this.props;
        const { links: newLinks } = nextProps;
        const listDiff = Math.abs(links.length-newLinks.length);

        this.setState({
            useLeaveTransition: listDiff < 2,
        });
    }

    render() {
        const { links, onRequestEdit, onRequestDelete } = this.props;
        const { useLeaveTransition } = this.state;
        const items = links.map((link, index) => (
            <LinkItem
                key={link.id}
                link={link}
                onRequestEdit={onRequestEdit}
                onRequestDelete={onRequestDelete}
            />
        ));

        return (
            <div className="LinkList">
                <ReactCSSTransitionGroup
                    transitionAppear={false}
                    transitionEnter={false}
                    transitionLeave={useLeaveTransition}
                    transitionLeaveTimeout={useLeaveTransition ? 600 : 0}
                    transitionName={{
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
