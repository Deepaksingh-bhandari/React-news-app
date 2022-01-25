import React, { Component } from 'react';

export class Newsitem extends Component {
    static defualtProps = {
        title: 'Default News Title',
        Description: 'Default News Descriptioin',
        author: 'Unknown'
    }
    convertDate(dt) {
        let todayDate = new Date();
        let msDiff = todayDate.getTime() - dt.getTime();

        let sec = msDiff / 1000;
        let min = sec / 60;
        let hour = min / 60;
        let days = hour / 24

        if (min < 2) {
            return (`Just now`)
        }
        else if (min >= 2 && min < 60) {
            return (min.toFixed(0) + ` minutes ago`)

        }
        else if (hour >= 1 && hour < 24) {
            return (hour.toFixed(0) + ` hours ago`)
        }
        else
            return (days.toFixed(0) + ` day(s) ago`)

    }
    render() {
        let { title, description, imageUrl, newsUrl, updatedAt, author, source } = this.props;
        return (
            <div className="card mx-3 my-3 col-md-3 col-sm-6" >
                <img style={{ pointerEvents: 'cursor' }} src={imageUrl} className="card-img-top rounded-3" alt="news" />
                <div className="card-body">
                    <h5 className="card-title">{title}</h5>
                    <p className="card-text">{description}</p>
                    {/* <div className="clearfix">
                    <small className="text-muted float-end"> -By {author ? author : 'unknown'} </small>
                    </div> */}
                    <p className="card-text"><small className="text-info">Source: {source}</small></p>
                    <a href={newsUrl} target="_blank" className="btn btn-sm btn-outline-primary">Check Detailed News</a>
                    <div className="card-footer m-2 text-muted">
                    {this.convertDate(new Date(updatedAt))}
                    </div>
                </div>
            </div>);
    }
}

export default Newsitem;
