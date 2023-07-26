import React, { useEffect, useState } from "react"
import BookshelfBox from "../components/BookshelfBox"
// import InfiniteScroll from "react-infinite-scroller"
import axios from "axios"
import { server_url } from "../pages/global_vars";
import InboxIcon from '@mui/icons-material/Inbox';

function ShelfPage({ inBookshelf }) {
    // const inBookshelf = props.inBookshelf
    // console.log(inBookshelf)
    const shelfQueryLink = inBookshelf ? `${server_url}/my/bookshelf` : `${server_url}/my/storeshelf`
    const [shelf, setShelf] = useState([])

    useEffect(() => {
        const loadShelf = () => {
            axios.get(shelfQueryLink)
                .then(data => data.data)
                .then(data => setShelf(data))
        }
        loadShelf()
        return () => { setShelf([]) }
    }, [])

    return (
        <div className="row" style={{ margin: "auto", width: "90%" }}>
            {
                shelf.length > 0 ? shelf.map(book =>
                    <BookshelfBox key={book.book_id} inBookshelf={inBookshelf} bookId={book.book_id} date={book.date_created || book.date_for_sale} price={book.price} ol_id={book.ol_id} condition={book.book_condition} />
                ) :
                    <div style={{textAlign: "center", color: "#192A5690"}}>
                        <InboxIcon style={{fontSize: "300px"}} />
                        <p>There are no books on this shelf.</p>
                    </div>
            }
        </div>
    )
}

export default ShelfPage