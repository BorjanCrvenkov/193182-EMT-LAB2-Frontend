import axios from "../custom-axios/axios";

const LabService = {
    fetchBooks: () => {
        return axios.get("/books", {
            params: {
                size : 5,
                page : 2
            }
        });
    },

    fetchCategories: () => {
        return axios.get("/categories");
    },

    fetchAuthors: () => {
        return axios.get("/authors");
    },

    deleteBook: (id) => {
        return axios.delete(`/books/delete/${id}`)
    },

    addBook: (name, author, category, availableCopies) => {
        const book = {
            "name" : name,
            "author" : author,
            "category" : category,
            "availableCopies" : availableCopies
        }
        return axios.post("/books/add", book);
    },

    editBook: (id, name, author, category, availableCopies) => {
        const book = {
            "name" : name,
            "author" : author,
            "category" : category,
            "availableCopies" : availableCopies
        }
        return axios.put(`/books/edit/${id}`, book);
    },
    getBook: (id) => {
        return axios.get(`/books/${id}`);
    },
    markBookAsTaken: (id) => {
        console.log(id)
        return axios.get(`/books/markAsTaken/${id}`)
    }

}

export default LabService;