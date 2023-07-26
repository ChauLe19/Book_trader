import React, { Component } from "react"
import { Navigate } from "react-router-dom"
import { fetchBookById, getAppropriateISBN } from "../fetchGGBooks"
import DateDiff from "date-diff"
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Button, Chip } from "@mui/material";
import { ShoppingCart } from "@mui/icons-material";

// async function fetchBookData(volumeId){
//     return await fetch(`https://www.googleapis.com/books/v1/volumes/${volumeId}`)
//         .then(res => res.json())
//         .then(data => {if(data.error) throw data.error.message; return data})
//         .catch(err => {console.log(err); return false})
// }



class FeedBox extends Component {
    constructor(props) {
        super(props)
        this.state = {
            imgHref: "",
            title: "",
            subtitle: "",
            error: "",
            reloadFeed: false
        }
    }

    getDatePosted(date) {
        const now = new Date();
        const diff = new DateDiff(now, date)
        const allUnits = [diff.years, diff.months, diff.weeks, diff.days, diff.hours, diff.minutes, diff.seconds];
        const allUnitsName = ["yr.", "mos.", "w", "d", "h", "min", "s"];
        for (let i = 0; i < allUnits.length; i++) {
            const diff = allUnits[i]();
            const name = allUnitsName[i];
            if (diff >= 1) {
                return `${Math.floor(diff)}${name} ago`
            }
        }
        return "0 seconds ago";
    }

    componentWillMount() {
        console.log(this.props)
        fetchBookById(this.props.ol_id)
            .then(({ title, description, covers, author }) =>
                this.setState({
                    title,
                    subtitle: "",
                    author,
                    imgHref: covers && covers.length > 0 ? `http://covers.openlibrary.org/b/ID/${covers[0]}-M.jpg` : "https://islandpress.org/sites/default/files/default_book_cover_2015.jpg",
                    ol_id: this.props.ol_id,
                })
            )
    }

    render() {
        if (this.state.reloadFeed) return (<Navigate to="/my/book-shelf" />)
        return (
            <div className="col feed-box">
                <p className="posting-info">
                    <div><AccountCircleIcon /> {this.props.sellerUsername} </div>{this.getDatePosted(new Date(this.props.dateForSale))}
                </p>
                <div className="book-image" style={{
                    backgroundImage: `url(${this.state.imgHref})`,
                }} >
                </div>
                <div>
                    <b style={{ fontSize: "1.2rem", color: "rgb(25, 42, 86)" }}>{this.state.title}<br /> {this.state.subtitle}</b>
                    <span style={{ color: "rgb(25, 42, 86)" }}>By {this.state.author}</span>
                </div>
                <div style={{ color: "#192A5691" }}>
                    Condition: {this.props.condition}
                </div>
                <div className="spacer"></div>
                <div className="price" style={{}}>
                    ${this.props.price}
                </div>
                <div style={{ display: "flex", justifyContent: "center" }}>

                    <Button className="buy-button" variant="contained" color="secondary" onClick={() => {
                        this.props.buyBook(this.props.bookId).then((data) => {
                            console.log(data);
                            this.setState({
                                reloadFeed: true
                            })
                        }
                        ).catch(err => alert(err.response.status == 401 ? "Please log in to continue." : err.response.data.error))
                    }}>
                        <ShoppingCart />&nbsp;Buy now
                    </Button>
                </div>
            </div>
        )
    }
}

export default FeedBox