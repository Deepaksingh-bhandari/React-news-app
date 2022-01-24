import React, { Component } from 'react';

export class Newsitem extends Component {
    static defualtProps={
        title: 'Default News Title',
        Description: 'Default News Descriptioin',
        author:'Unknown'
    }

    render() {
        let {title,description,imageUrl,newsUrl,updatedAt,author,source}=this.props;
        return( 
            <div className="card" >
                <img style={{pointerEvents:'cursor'}} src={imageUrl} className="card-img-top rounded-3" alt="news" />
                    <div className="card-body">
                        <h5 className="card-title">{title}</h5>
                        <p className="card-text">{description}</p>
                        <p class="card-text"><small class="text-muted">By {author?author:'unknown'} on {new Date(updatedAt).toUTCString()}</small></p>
                        <p class="card-text"><small class="text-muted">Source: {source}</small></p>
                        <a href={newsUrl} target="_blank" className="btn btn-sm btn-outline-primary">Check Detailed News</a>
                    </div>
            </div>);
    }
}

export default Newsitem;
