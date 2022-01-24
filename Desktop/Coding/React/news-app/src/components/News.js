import React, { Component } from 'react';
import { Newsitem } from './Newsitem'
import defaultNewsImage from '../assets/default_news.jpg'
import PropTypes from 'prop-types';

export class News extends Component {

    static defualtProps={
        country: 'in',
        category: 'science'
    }
    api_key="64ceff7513f74261a4c247fde3e26192"
   
    static propTypes={
        country: PropTypes.string.isRequired,
        category: PropTypes.string.isRequired,
    }

    constructor(props) {
        super(props);
        this.state = {
            articles: [],
            page: 1,
            maxPage: 1,
            loading: false
        };
    }

    render() {
        return (
            <div className='container'>
                <h2> NewsChamp - Top headlines</h2>
                <div className="d-flex justify-content-center">
                    <div className={`spinner-border text-primary ${this.state.loading?"":"visually-hidden"}`} role="status">
                    </div>
                </div>
                <div className='row d-flex'>
                    {!this.state.loading && this.state.articles?.map((elem,i) => {
                        // console.log("article", elem)
                        return (
                            <div className='col-md-4 col-sm-6 justify-content-evenly' >
                                <Newsitem key={i} title={elem.title} description={elem.description} newsUrl={elem.url} imageUrl={elem.urlToImage?elem.urlToImage:defaultNewsImage} updatedAt={elem.publishedAt} author={elem.author} source={elem.source.name}/>
                            </div>
                        );
                    })}
                </div>
                <div className="d-flex justify-content-between">
                    <button disabled={this.state.page <= 1} onClick={this.previousClick} className='btn btn-primary'>&larr; Prev</button>
                    <button disabled={this.state.page >= this.state.maxPage} className='btn btn-primary' onClick={this.nextClick}>Next &rarr;</button>
                </div>
            </div>);
    }

    async fetchNews() {
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.api_key}&page=${this.state.page}`
        this.setState({loading:true})
        
        let data = await fetch(url);
        let parsedData = await data.json()
        this.setState({ maxPage: Math.ceil(parsedData.totalResults / 20) })
        this.setState({ articles: parsedData.articles });
        
        console.log("parsed Data", this.state.articles, this.state.page)
        this.setState({loading:false})

    }
    previousClick = async () => {
        console.log("Previous called")
        await this.fetchNews();
        this.setState({ page: this.state.page - 1 })
    }
    nextClick = async () => {
        console.log("Next called")
        await this.fetchNews();
        this.setState({ page: this.state.page + 1 })
    }
    componentDidMount() {
        // setState can't be used without component mount
        this.fetchNews()
    }

}

export default News;
