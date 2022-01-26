import React, { Component, useEffect ,useState} from 'react';
import Newsitem from './Newsitem'
import defaultNewsImage from '../assets/default_news.jpg'
import PropTypes from 'prop-types';
import defualtProps from 'prop-types';
import InfiniteScroll from 'react-infinite-scroll-component'

// export class News extends Component {
const News = (props) => {
    // static defualtProps = {
    //     country: 'in',
    //     category: 'science'
    // }
    // // url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${this.api_key}&pageSize=${props.pageSize}`

    // static propTypes = {
    //     country: PropTypes.string.isRequired,
    //     category: PropTypes.string.isRequired,
    // }
    const [articles, setarticles] = useState([]);
    const [page, setpage] = useState(1);
    const [maxPage, setmaxPage] = useState(1);
    const [loading, setloading] = useState(true);

    // constructor() {
    //     super();
    //     this.state = {
    //         articles: [],
    //         page: 1,
    //         maxPage: 1,
    //         loading: true
    //     };
    // }
    
    const fetchNews = async () => {
        props.onProgressChange(10)
        let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&pageSize=${props.pageSize}&page=${page}`
        // this.url=this.url+`&page=${page}`
        let data = await fetch(url);
        props.onProgressChange(30)
        let parsedData = await data.json()
        props.onProgressChange(50)
        setmaxPage( Math.ceil(parsedData.totalResults / props.pageSize) )
        setarticles( parsedData.articles );
        props.onProgressChange(70)
    
        console.log("parsed Data", articles, page)
        setloading( false )
        props.onProgressChange(100)
    
    }
    // fetchMoreNews = async () => {
    //     this.setState({ loading: true })
    //     this.setState({ page: page + 1 });
    //     console.log("Inside fetchMore News", page)
    //     let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&pageSize=${props.pageSize}&page=${page}`
    //     // this.url=this.url+`&page=${page}`
    //     let data = await fetch(url);
    //     let parsedData = await data.json();
    
    //     console.log("parsed data", page)
    //     this.setState({ articles: articles.concat(parsedData.articles) })
    //     this.setState({ loading: false })
    // }
    const fetchMoreNews = async () => {
        setloading( true )
        console.log("Inside fetchMore News", page)
        let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&pageSize=${props.pageSize}&page=${page+1}`
        setpage(page + 1);
        // this.url=this.url+`&page=${page}`
        let data = await fetch(url);
        let parsedData = await data.json();
        
        console.log("parsed data", page)
        setarticles( articles.concat(parsedData.articles))
        setloading( false )
    }
    // render() {
        useEffect(() => {
                fetchNews();
        }, []);

        return (
        <div className='container-fluid'>
            <h2 className='m-4'> NewsChamp - Top {props.category} headlines</h2>
            {/*SPINNER REPLACED WITH LOADING BAR  */}
            <div className="d-flex justify-content-center">
                <div className={`spinner-border text-primary ${loading ? "" : "visually-hidden"}`} role="status"></div>
            </div>

            <InfiniteScroll
                dataLength={articles.length}
                next={fetchMoreNews}
                hasMore={page !== maxPage}
                loader={
                    <div className='m-3'>
                        Loading ... <div className='spinner-border text-primary'></div>
                    </div>
                }
                style={{ overflow: 'hidden' }} >
                <div className='row  justify-content-center'>
                    {articles?.map((elem, i) => {
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
                    <button disabled={page <= 1} onClick={this.previousClick} className='btn btn-primary'>&larr; Prev</button>
                    <button disabled={page >= maxPage} className='btn btn-primary' onClick={this.nextClick}>Next &rarr;</button>
                </div> */}
        </div>);
}


// previousClick = async () => {
//     console.log("Previous called")
//     await this.fetchNews();
//     this.setState({ page: page - 1 })
// }
// nextClick = async () => {
//     console.log("Next called")
//     await this.fetchNews();
//     this.setState({ page: page + 1 })
// }

// USE EFFECT hook is used in place of component did mount- after render
// componentDidMount() {
//     // setState can't be used without component mount
//     this.fetchNews()
// }


// }

News.defualtProps = {
    country: 'in',
    category: 'science'
}
// url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${this.api_key}&pageSize=${props.pageSize}`

News.propTypes = {
    country: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
}

export default News;