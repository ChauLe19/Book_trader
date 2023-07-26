import { SearchRounded, ShoppingBasket, ShoppingCart } from '@mui/icons-material';
import React, { Component } from 'react'
import { Button, InputAdornment } from '@mui/material';

class SearchBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchType: "isbn"
        }
    }


    render() {
        return (
            <form id="search-form" action="/search" method="GET" style={{display: "grid", gridTemplateColumns: "1fr 5fr 1fr"}}>
                <select name="searchType" style={{}}>
                    <option value="q">All</option>
                    <option value="title">Title</option>
                    <option value="isbn">ISBN</option>
                    <option value="author">Author</option>
                </select>
                <input className="search-bar" name="search-key" type="text" placeholder="Search" required />
                <Button className='search-button theme-button' type='submit' variant='contained' color="primary" > <SearchRounded color='white' htmlColor='white' /></Button>
            </form>
        )
    }
}

export default SearchBar