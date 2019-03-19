import React from 'react';
import './Search.scss'
import MovieCard from '../MovieCard/MovieCard.jsx';

class Search extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            text: "",
            title: "",
            moviesArray: [],
            movieId: null        }
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

    // getFocus = () => {           
    //     document.getElementById("Search__input").focus();
    // }

    // componentDidMount() { //tu może być już wartośc poczatkowa z getData
    //     // let movieTitle = this.state.text;
    //     let movieTitle = "Pulp Fic";
    //     const apiKey = "108459b0ab9ad26f10f6e031ebb6ac28";
    //     let url = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&language=en-US&query=${movieTitle}&page=1&include_adult=false`
    //     fetch(url)
    //     .then(response => response.json())
    //     .then(data => {
    //         console.log(data.results)
    //         this.setState({
    //             moviesArray: data.results,
    //             // title: data.results[0].title
    //         })
    //     })
    // }

    showMovie = (id) => {
        const list = document.querySelector('.Search__list');
        list.style.display="none";
        console.log(id)
        // let movieInfo = movieArray.results.map((element) => {
        //     return element })
        this.setState({
            movieId: id,
            // movieArray: movieInfo
        })
    }

    render() {

        return (
            <div className="Search">
                <input className="Search__input" value={this.state.text} autoFocus="true" onChange={this.handle} type="text"/>
                {/* <h1>{this.state.text}</h1> */}
                <ul className="Search__list">
                    {this.state.moviesArray.map((elem, index) => {
                        return (
                            <li className="Search__elem" key={elem.id} onClick={ ()=> this.showMovie(elem.id)} >
                                <img className="Search__movieImg" src="{elem.poster_path}" />
                                <span className="Search__movieTitle"> {elem.title}</span>
                                <span className="Search__prodYear"> {elem.release_date.slice(0, 4)}</span>
                            </li>
                        )
                    })}
                    {/* {this.state.movieId != null ? <span>aaa</span> : null}                         */}
                </ul>
                {this.state.movieId != null ? <MovieCard /> : null}                        
            </div>
        )
    }
}   

export default Search;