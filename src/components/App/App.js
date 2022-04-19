import './App.css';
import React from "react";
import Books from '../Books/BookList/books';
import LabService from "../../repository/labRepository";
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import Categories from '../Categories/categories'
import Header from '../Header/header'
import BookAdd from '../Books/BookAdd/bookAdd'
import Authors from '../Authors/AuthorList/authors'
import BookEdit from '../Books/BookEdit/bookEdit'

class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            books : [],
            categories: [],
            authors: [],
            selectedBook: {}
        }
    }

    render() {
        return (
            <Router>
                <Header/>
                <main>
                    <div className={"container"}>
                        <Routes>
                            <Route path={"/books/add"} element={<BookAdd authors={this.state.authors} categories={this.state.categories} onAddBook={this.addBook}/>}/>
                            <Route path={"/books/edit/:id"} element={<BookEdit authors={this.state.authors} categories={this.state.categories} onEditBook={this.editBook} book={this.state.selectedBook}/>}/>
                            <Route path={"/books"} element={<Books books={this.state.books} onDelete={this.deleteBook} onEdit={this.getBook} onMark={this.markBookAsTaken}/>}/>
                            <Route path={"/"} element={<Books books={this.state.books} onDelete={this.deleteBook} onEdit={this.getBook} onMark={this.markBookAsTaken}/>}/>
                            <Route path={"/categories"} element={<Categories categories={this.state.categories}/>}/>
                            <Route path={"/authors"} element={<Authors authors={this.state.authors}/>}/>
                        </Routes>

                    </div>
                </main>
            </Router>
        );
    }

    componentDidMount() {
        this.loadBooks();
        this.loadCategories();
        this.loadAuthors();
    }

    loadBooks = () =>{
        LabService.fetchBooks()
            .then((data) => {
                this.setState({
                    books: data.data
                });
            })
    }

    loadCategories = () =>{
        LabService.fetchCategories()
            .then((data) => {
                this.setState({
                    categories: data.data
                });
            })
    }

    loadAuthors = () => {
        LabService.fetchAuthors()
            .then((data) => {
                this.setState({
                    authors: data.data
                });
            })
    }

    deleteBook = (id) => {
        LabService.deleteBook(id)
            .then(() => {
                this.loadBooks();
            })
    }

    addBook = (name, author, category, availableCopies) => {
        LabService.addBook(name, author, category, availableCopies)
            .then(() => {
                this.loadBooks()
            });
    }

    getBook = (id) => {
        LabService.getBook(id)
            .then((data)=>{
                this.setState({
                    selectedBook: data.data
                })
            })
    }

    editBook = (id, name, author, category, availableCopies) => {
        LabService.editBook(id, name, author, category, availableCopies)
            .then(() => {
                this.loadBooks()
            })
    }

    markBookAsTaken = (id) => {
        LabService.markBookAsTaken(id)
            .then(() => {
                this.loadBooks();
            })
    }

}

export default App;
