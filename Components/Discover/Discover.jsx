import React from 'react';
import './Discover.scss'
import Slider from "react-slick";

class Discover extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            discoverMovies: []
        }
    }

    showMovie = (id) => {
        console.log("showMovie fun " + id)
        this.setState ({
            movieId: id,
            // listVisibility: "none"
            // moviesArray: []
        })
    }

    componentDidMount() {
        const apiKey = "108459b0ab9ad26f10f6e031ebb6ac28";    
        const url = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&language=en&sort_by=popularity.desc&include_adult=false&include_video=false&page=1`
        
        fetch(url)
        .then(response => response.json())
        .then(data => {
            console.log(data.results) 
            this.setState({
                discoverMovies: data.results
            })
        }).catch(() => {
            console.log("error");
        });        
    }

    render() {
        let settings = {
          infinite: true,
          speed: 500,
          slidesToShow: 1,
          slidesToScroll: 1,
          centerMode: true
        };
        return (
            <div className="Discover__wrapper">
                <p className="Discover__title">Discover</p>
                <div className="Discover__slider">
                    <Slider {...settings}>
                        {this.state.discoverMovies.map((elem, index) => {
                            return (
                                <div className="Discover__element" key={elem.id} onClick={ ()=> this.showMovie(elem.id)} >
                                    <img className="Discover__movieImg" src={`https://image.tmdb.org/t/p/w500${elem.poster_path}`} />
                                </div>
                            )
                        })}
                    </Slider>
                </div>
            </div>
        );
      }
}   

export default Discover;