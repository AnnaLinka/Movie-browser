import React from 'react';
import './MovieCard.scss'

class MovieCard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            movieData: ""
        }
    }    

    componentDidMount() {
        let movieId = 680;
        const apiKey = "108459b0ab9ad26f10f6e031ebb6ac28";    
        const url = `https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}&language=en-US`
        
        console.log() 

        fetch(url)
        .then(response => response.json())
        .then(data => {
            console.log(data) 
            this.setState({
                movieData: data
            })
        }).catch(() => {
            console.log("error");
        });
    }

    render() {

        return (
            <section className="MovieCard__wrapper">
                <header className="Moviecard__header">
                    <span className="MovieCard__title">{this.state.movieData.title}</span>
                    <span className="MovieCard__year">{this.state.movieData.release_date}</span>
                </header>
                <img className="MovieCard__img" src="{this.state.movieData.poster_path}" alt=""/>
                <main className="MovieCard__main">
                    <div className="MovieCard__info">
                        <span className="MovieCard__infoText">thriller</span>
                        <span className="MovieCard__infoText">usa</span>
                    </div>
                    <div className="MovieCard__quote">{this.state.movieData.tagline}</div>
                    <div className="MovieCard__info">
                        <span className="MovieCard__infoText">{this.state.movieData.original_language}</span>
                        <span className="MovieCard__infoText">{this.state.movieData.vote_average}</span>
                    </div>
                    <div className="MovieCard__desc">{this.state.movieData.overview}</div>
                </main>              
            </section>
        )
    }
}   

export default MovieCard;