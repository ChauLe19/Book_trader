import React, { Component } from "react"
import { fetchBookById, getAppropriateISBN } from "../fetchGGBooks"
import { Navigate } from "react-router-dom"
import axios from "axios"
import { Button, FormControl, Grid, InputLabel, MenuItem, Select, TextField } from "@mui/material"
import { Close, Delete, MonetizationOn } from "@mui/icons-material"
import { Fragment } from "react"
import { server_url } from "../pages/global_vars";



class BookshelfBox extends Component {
    constructor(props) {
        super(props)
        this.state = {
            imgHref: "",
            title: "",
            isbn: "",
            price: "",
            reload: false,
            active: false,
            condition: ''
        }
    }

    componentWillMount() {
        fetchBookById(this.props.ol_id)
            .then(({ covers, title, ol_id }) => this.setState({
                title,
                imgHref: covers && covers.length > 0 ? `http://covers.openlibrary.org/b/ID/${covers[0]}-M.jpg` : "https://islandpress.org/sites/default/files/default_book_cover_2015.jpg",
                ol_id
            }))
    }

    render() {
        if (this.state.reload) return (<Navigate to={this.props.inBookshelf ? "/my/book-shelf" : "/my/store-shelf"} />)
        return (
            <div className="col-3 horizontal-center">
                <div style={{ margin: "5px", padding: "2rem" }} >

                    <div className={`book${this.state.active ? " active" : ""}`}>
                        <div className="overlay">
                            <button className="close-button" onClick={() => {
                                this.setState({ active: false })
                            }}><Close /> </button>
                            <b style={{ fontSize: "1.2rem" }}>{this.state.title}</b>
                            {this.props.inBookshelf ?
                                <p>Created: {new Date(this.props.date).toLocaleDateString('en-us', { day: "numeric", year: "numeric", month: "short" })}</p>
                                :
                                <div>
                                    <div>Price: ${this.props.price}</div>
                                    <div>
                                        Condition: {this.props.condition}
                                    </div>
                                    <div>
                                        For sale: {new Date(this.props.date).toLocaleDateString('en-us', { day: "numeric", year: "numeric", month: "short" })}
                                    </div>


                                </div>
                            }
                            <div style={{ flexGrow: 1 }}></div>
                            {
                                this.props.inBookshelf &&
                                <Fragment>
                                    <FormControl style={{ margin: "0.25rem" }}>
                                        <Grid container spacing={1}>
                                            <Grid item xs={7}>
                                                <FormControl fullWidth>
                                                    <InputLabel id="condition-label">Condition</InputLabel>
                                                    <Select fullWidth
                                                        labelId="condition-label"
                                                        className="shelf-book"
                                                        value={this.state.condition}
                                                        onChange={(e) => this.setState({ condition: e.target.value })}
                                                        style={{
                                                            textAlign: "left"
                                                        }}
                                                        label="Condition"
                                                    >
                                                        <MenuItem value={"New"}>New</MenuItem>
                                                        <MenuItem value={"Like-new"}>Like-new</MenuItem>
                                                        <MenuItem value={"Very good"}>Very good</MenuItem>
                                                        <MenuItem value={"Good"}>Good</MenuItem>
                                                        <MenuItem value={"Fair"}>Fair</MenuItem>
                                                        <MenuItem value={"Poor"}>Poor</MenuItem>
                                                    </Select>
                                                </FormControl>
                                            </Grid>
                                            <Grid item xs={5}>
                                                <TextField id="price" label="Price"
                                                    inputProps={{
                                                        max: 999999.99, min: 0.0,
                                                        maxLength: 9
                                                    }}
                                                    onInput={(e) => {
                                                        if (isNaN(e.target.value)) {
                                                            e.target.value = e.target.value.slice(0, e.target.value.length - 1)
                                                        }
                                                        else if (parseFloat(e.target.value) > 999999.99) {
                                                            e.target.value = parseFloat(e.target.value).toString().slice(0, 6)
                                                        }
                                                    }}
                                                    onChange={
                                                        e => this.setState({ price: e.target.value })
                                                    } required />
                                            </Grid>
                                        </Grid>
                                    </FormControl>
                                </Fragment>
                            }

                            <Button className="sell-button" variant="contained" type="submit" style={{ margin: "0.25rem" }} onClick={() => {
                                axios.post(this.props.inBookshelf ? `${server_url}/book/${this.props.bookId}/sell` : `${server_url}/book/${this.props.bookId}/unsell`, {
                                    price: parseFloat(this.state.price),
                                    condition: this.state.condition
                                }, {
                                    headers: {
                                        "Access-Control-Allow-Origin": "*",
                                        "Content-Type": "application/json"
                                    }
                                }).then(data => this.setState({ reload: true }))
                            }}><MonetizationOn />&nbsp;{this.props.inBookshelf ? "Sell" : "Unsell"}</Button>

                            <Button className="delete-button" variant="contained" style={{ backgroundColor: "#c23616", margin: "0.25rem" }} onClick={() => {
                                axios.post(`${server_url}/book/${this.props.bookId}/delete`, {
                                }, {
                                    headers: {
                                        "Access-Control-Allow-Origin": "*",
                                        "Content-Type": "application/json"
                                    }
                                }).then(data => this.setState({ reload: true }))
                            }}><Delete /> &nbsp;Delete</Button>
                        </div>
                        <div className="corner" onClick={() => {
                            console.log("trigger")
                            this.setState({ active: true })
                        }}></div>
                        <img src={this.state.imgHref} style={{}} />
                    </div>
                </div>
            </div>
        )
    }
}

export default BookshelfBox