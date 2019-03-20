import React from 'react';
import './Search.scss'
import MovieCard from '../MovieCard/MovieCard.jsx';
import Discover from '../Discover/Discover.jsx';

class Search extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            text: "",
            title: "",
            moviesArray: [],
            movieId: null   
        }
    }

    handle = (e) => {
        this.setState({
            text: e.target.value,    
        }, this.getData)
    }

    getData = () => {
        let movieTitle = this.state.text;
        const apiKey = "108459b0ab9ad26f10f6e031ebb6ac28";
        let url = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&language=en-US&query=${movieTitle}&page=1&include_adult=false`
        fetch(url)
        .then(response => response.json())
        .then(data => {
            this.setState({
                moviesArray: data.results,
            })
        })
    }

    showMovie = (id) => {
        this.setState ({
            movieId: id,
            moviesArray: []
        })
    }

    close = () => {
        document.querySelector('.Search__input').focus();
        this.setState({
            text: ""
        })
    }

    render() {
        return (
            <div className="Search">
                <div className="Search__wrapper">
                    <div className="Search__inputWrapper">
                        <input className="Search__input" value={this.state.text} autoFocus="true" onChange={this.handle} onClick={this.focusSearch} type="text"/>
                        <figure  className="Search__closeIcon" onClick={this.close}>X</figure>
                    </div>
                        <ul className="Search__list" style={{display:this.state.listVisibility}}>
                        {this.state.moviesArray.map((elem, index) => {
                                return (
                                    <li className="Search__elem" key={elem.id} onClick={ ()=> this.showMovie(elem.id)} >
                                        <img className="Search__movieImg" src={`https://image.tmdb.org/t/p/w500${elem.poster_path}`} />
                                        <span className="Search__movieTitle"> {elem.title}</span>
                                        <span className="Search__prodYear"> {elem.release_date.slice(0, 4)}</span>
                                    </li>
                                )
                            })}
                        </ul>
                    </div>                
                {this.state.movieId != null ? <MovieCard id={this.state.movieId}/> : <Discover />}  
            </div>
        )
    }
}   

export default Search;