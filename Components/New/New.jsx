import React from 'react';
import '../Discover/Discover.scss'
import Slider from "react-slick";
import MovieCard from '../MovieCard/MovieCard.jsx';

class New extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            discoverMovies: [],
            movieId: "",
            errorInfo: ""
        }
    }

    showMovie = (id) => {
        console.log("showMovie fun " + id, )
        this.setState ({
            movieId: id
        })
    }

    componentDidMount() {
        const apiKey = "108459b0ab9ad26f10f6e031ebb6ac28";  
        const url =`https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&language=en-US&sort_by=release_date.asc&include_adult=false&include_video=false&page=1&primary_release_date.gte=2019-03-30&year=2019`
        
        fetch(url)
        .then(response => response.json())
        .then(data => {
            console.log(data.results) 
            this.setState({
                discoverMovies: data.results
            })
        }).catch(() => {
            console.log("error");
            this.setState ({
                errorInfo: "We can't find the movie you're looking for :("
            })
        });        
    }

    hideSlider = () => {
       document.querySelector('.Discover__wrapper').style.display="none";
       document.querySelector('.New__wrapper').style.display="none";
    }

    render() {
        let settings = {
            infinite: true,
            autoplay: true,
            // autoplaySpeed: 2000,
            responsive: [
              {
                  breakpoint: 2048,
                  settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    speed: 2500,
                    autoplaySpeed: 2500
                  }
                },
              {
                breakpoint: 1024,
                settings: {
                  slidesToShow: 3,
                  slidesToScroll: 3,
                  speed: 2500,
                  autoplaySpeed: 2500
                }
              },
              {
                breakpoint: 769,
                settings: {
                  slidesToShow: 2,
                  slidesToScroll: 2,
                  speed: 2500
                }
              },
              {
                breakpoint: 480,
                settings: {
                  slidesToShow: 1,
                  slidesToScroll: 1,
                  speed: 1500,
                  centerMode: true,
                }
              }
            ]
          };
        return (
            <div>
                <div className="Discover__wrapper New__wrapper">
                    <p className="Discover__title">Coming soon</p>
                    <div className="Discover__slider">
                        <Slider {...settings}>
                            {this.state.discoverMovies.map((elem, index) => {
                                return (
                                    <div className="Discover__element" key={elem.id} onClick={ ()=> this.showMovie(elem.id)} >
                                        <img onClick={this.hideSlider} className="Discover__movieImg" src={`https://image.tmdb.org/t/p/w500${elem.poster_path}`} />
                                    </div>
                                )
                            })}
                        </Slider>
                    </div>
                </div>
                {this.state.movieId !== "" ? <MovieCard id={this.state.movieId}/> : <div></div>}  
            </div>
        );
      }
}   

export default New;