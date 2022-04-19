import './App.css';
import React from "react";
import Books from '../Books/books';
import LabService from "../../repository/labRepository";
import {BrowserRouter as Router, Redirect, Route} from 'react-router-dom'
class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            books : []
        }
    }

    render() {
        return (
            <Router>
                <main>
                    <div className={"container"}>
                        <Route path={["/", "/books"]} exact render={() => <Books books={this.state.books}/>}/>
                    </div>
                </main>
            </Router>
        );
    }

    loadBooks = () =>{
        LabService.fetchBooks()
            .then((data) => {
                this.setState({
                    books: data.data
                });
            })
    }

    componentDidMount() {
        this.loadBooks();
    }

}

export default App;
