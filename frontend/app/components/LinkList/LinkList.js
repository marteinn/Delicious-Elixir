import React from 'react';


class LinkList extends React.Component {
    render() {
        const { links } = this.props;

        return (
            <div className="LinkList">
                {links.map((link, index) => {
                    return (
                        <li key={index}><a href={ link.url}>{ link.title }</a></li>
                    )
                })}
            </div>
        )

        //return (
            //<div className="LinkList">
                //<p>Link list</p>
            //</div>
        //);
    }
}

export default LinkList;
