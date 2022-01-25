import React, { Component } from 'react';
import { Newsitem } from './Newsitem'
import defaultNewsImage from '../assets/default_news.jpg'
import PropTypes from 'prop-types';
import InfiniteScroll from 'react-infinite-scroll-component'

export class News extends Component {

    static defualtProps = {
        country: 'in',
        category: 'science'
    }
    api_key = "64ceff7513f74261a4c247fde3e26192"
    // url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.api_key}&pageSize=${this.props.pageSize}`

    static propTypes = {
        country: PropTypes.string.isRequired,
        category: PropTypes.string.isRequired,
    }

    constructor() {
        super();
        this.state = {
            articles: [],
            page: 1,
            maxPage: 1,
            loading: true
        };
    }

    render() {
        return (
            <div className='container-fluid'>
                <h2 className='m-4'> NewsChamp - Top {this.props.category} headlines</h2>
               {/*SPINNER REPLACED WITH LOADING BAR  */}
                {/* <div className="d-flex justify-content-center">
                    <div className={`spinner-border text-primary ${this.state.loading ? "" : "visually-hidden"}`} role="status"></div>
                </div> */}
                
                    <InfiniteScroll
                        dataLength={this.state.articles.length}
                        next={this.fetchMoreNews}
                        hasMore={this.state.page !== this.state.maxPage}
                        loader={
                            <div className='m-3'>
                                Loading ... <div className='spinner-border text-primary'></div>
                            </div>
                        }
                        style={{overflow:'hidden'}} >
                        <div className='row  justify-content-center'>
                            {this.state.articles?.map((elem, i) => {
                                return (
                                    // <div key={"articeldiv" + i} className='col-md-4 col-sm-6' >
                                        <Newsitem key={i} title={elem.title} description={elem.description} newsUrl={elem.url} imageUrl={elem.urlToImage ? elem.urlToImage : defaultNewsImage} updatedAt={elem.publishedAt} author={elem.author} source={elem?.source?.name} />
                                    // </div>
                                );
                            })}
                        </div>
                    </InfiniteScroll>
                


                {/* PREVIOUS/NEXT button replaced with infinite scrollbar */}
                {/* <div className="d-flex justify-content-between">
                    <button disabled={this.state.page <= 1} onClick={this.previousClick} className='btn btn-primary'>&larr; Prev</button>
                    <button disabled={this.state.page >= this.state.maxPage} className='btn btn-primary' onClick={this.nextClick}>Next &rarr;</button>
                </div> */}
            </div>);
    }

    fetchNews = async () => {
        this.props.onProgressChange(10)
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.api_key}&pageSize=${this.props.pageSize}&page=${this.state.page}`
        // this.url=this.url+`&page=${this.state.page}`
        let data = await fetch(url);
        this.props.onProgressChange(30)
        let parsedData = await data.json()
        this.props.onProgressChange(50)
        this.setState({ maxPage: Math.ceil(parsedData.totalResults / this.props.pageSize) })
        this.setState({ articles: parsedData.articles });
        this.props.onProgressChange(70)
        
        console.log("parsed Data", this.state.articles, this.state.page)
        this.setState({ loading: false })
        this.props.onProgressChange(100)

    }
    fetchMoreNews = async () => {
        this.setState({ loading: true })
        this.setState({ page: this.state.page + 1 });
        console.log("Inside fetchMore News", this.state.page)
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.api_key}&pageSize=${this.props.pageSize}&page=${this.state.page}`
        // this.url=this.url+`&page=${this.state.page}`
        let data = await fetch(url);
        let parsedData = await data.json();

        console.log("parsed data", this.state.page)
        this.setState({ articles: this.state.articles.concat(parsedData.articles) })
        this.setState({ loading: false })
    }

    // previousClick = async () => {
    //     console.log("Previous called")
    //     await this.fetchNews();
    //     this.setState({ page: this.state.page - 1 })
    // }
    // nextClick = async () => {
    //     console.log("Next called")
    //     await this.fetchNews();
    //     this.setState({ page: this.state.page + 1 })
    // }
    componentDidMount() {
        // setState can't be used without component mount
        this.fetchNews()
    }

}

export default News;
