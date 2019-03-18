import React from 'react';
import ReactDOM from 'react-dom';

document.addEventListener('DOMContentLoaded', function(){

    class Search extends React.Component {
        constructor(props) {
            super(props);
            this.state = {
                text: "",
                title: "",
                moviesArray: []
            }
        }

        handle = (e) => {
            this.setState({
                text: e.target.value,
            })
        }

        componentDidMount() {
            // let movieTitle = this.state.text;
            let movieTitle = "Pulp Fic";
            const apiKey = "108459b0ab9ad26f10f6e031ebb6ac28";
            let url = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&language=en-US&query=${movieTitle}&page=1&include_adult=false`;
            fetch(url)
            .then( response => response.json())
            .then(data => {
                let array = [];
                console.log(array)
                this.setState({
                    moviesArray: array.push(data.results),
                    title: data.results[0].title
                })
            })
        }

        render() {

            return (
                <div>
                    <input value={this.state.text} onChange={this.handle} type="text"/>
                    <h1>{this.state.text}</h1>
                    <h2>{this.state.title}</h2>
                    <h3>{this.state.moviesArray}</h3>
                    <ul>
                        {/* {this.state.moviesArray.map((elem) => {
                            return <li>{elem.title}</li>
                        })} */}
                    </ul>
                </div>
            )
        }
    }   

    class App extends React.Component {
        render() {
            return (
                <div>
                    <Search />
                </div>
            )
        }
    }

    ReactDOM.render(
        <App/>,
        document.getElementById('app')
    );
});
