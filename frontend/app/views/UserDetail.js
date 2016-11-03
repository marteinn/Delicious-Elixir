import React from 'react';
import { connect } from 'react-redux';
import { fetchLinks } from '../actions/link';


class UserDetail extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        const { dispatch } = this.props;

        dispatch(fetchLinks());
    }

    render() {
        const { currentUser, links } = this.props;

        links.map((link) => console.log(link));

        return (
            <div>
                <h1>1 Hello</h1>
                {links.map((link, index) => {
                    return (<li key={index}><a href={ link.url}>{ link.title }</a></li>)
                })}
            </div>

        );
    }
}

const mapStateToProps = state => {
    return {
        currentUser: state.session.currentUser,
        links: state.link.links,
    };
};

export default connect(mapStateToProps)(UserDetail);
