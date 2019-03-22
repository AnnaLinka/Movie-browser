import React from 'react';
import './MovieCard.scss'

class MovieCard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            movieData: null,
            dynamic: this.props.id
        }
    }   
    
    getData = () => {
        let movieId = this.props.id;
        const apiKey = "108459b0ab9ad26f10f6e031ebb6ac28";    
        const url = `https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}&language=en-US`
   
        fetch(url)
        .then(response => response.json())
        .then(data => {
                this.setState({
                    movieData: data
                })
        }).catch(() => {
            console.log("error");
        });        
    }

    componentDidMount() {
        this.getData();
    }
    
    static getDerivedStateFromProps(nextProps, prevState) { 
        if (nextProps.id !== prevState.dynamic) { 
            return { dynamic: nextProps.id }; 
        } else return null;
    }
    componentDidUpdate(prevProps, prevState) { 
        prevProps.id !== this.props.id ? this.getData() : null; 
    }

    render() {
        if (this.state.movieData == null) {
            return (
                <div className="MovieCard__loaderWrapper"><img className="MovieCard__loader" src="../../assets/logo spinner.gif" alt=""/></div>
            )
        } else {
            return (
                <section className="MovieCard__wrapper">
                    <header className="MovieCard__header">
                        <span className="MovieCard__title">{this.state.movieData.title}</span>
                        <span className="MovieCard__year">{this.state.movieData.release_date.substring(0, 4)}</span>
                    </header> 
                    <img className="MovieCard__img" src={`https://image.tmdb.org/t/p/w500${this.state.movieData.poster_path}`} alt=""/>
                    <main className="MovieCard__main">
                        <div className="MovieCard__info">
                            <div className="MovieCard__infoBlock">
                                <span className="MovieCard__infoLabel">Genre</span>
                                <span className="MovieCard__infoText">{this.state.movieData.genres[0].name != undefined ? this.state.movieData.genres[0].name : this.state.movieData.genre_ids[0] }</span>
                            </div>
                            <div className="MovieCard__infoBlock">
                                <span className="MovieCard__infoLabel MovieCard__infoLabel--right">Rate</span>
                                <span className="MovieCard__infoText MovieCard__infoText--right">{this.state.movieData.vote_average}/10</span>
                            </div>
                        </div>
                        <div className="MovieCard__quote">{this.state.movieData.tagline}</div>
                        
                        <div className="MovieCard__infoData">
                            <div className="MovieCard__infoBlock">
                                <span className="MovieCard__infoLabel">Language</span>
                                <span className="MovieCard__infoText">{this.state.movieData.original_language}</span>
                            </div>
                            <div className="MovieCard__infoBlock">
                                <span className="MovieCard__infoLabel MovieCard__infoLabel--right">Production</span>
                                <span className="MovieCard__infoText MovieCard__infoText--right">{this.state.movieData.production_countries[0].name != undefined ? this.state.movieData.production_countries[0].name : "n/a"}</span> 
                            </div>
                        </div>                        
                        <div className="MovieCard__desc">
                            <p>{this.state.movieData.overview}</p>
                        </div>
                    </main>              
                </section>
            )
        }
    }
}   

export default MovieCard;