import React, { useEffect, useState } from "react"
import BookshelfBox from "../components/BookshelfBox"
// import InfiniteScroll from "react-infinite-scroller"
import axios from "axios"
import { server_url } from "../pages/global_vars";

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
        return () => {setShelf([])}
    }, [])

    return (
        // <div className="row">
        //     {data[whichShelf].isNotEmpty && (
        //         <button
        //             onClick={() => {

        //                 fetchMore({
        //                     variables: {
        //                         cursorId: data[whichShelf].cursorId,
        //                     },
        //                     updateQuery: (prev, { fetchMoreResult, ...rest }) => {
        //                         if (!fetchMoreResult) return prev;
        //                         // console.log(fetchMoreResult)
        //                         const data = {
        //                             ...fetchMoreResult,
        //                         };
        //                         data[whichShelf] = {
        //                             ...(fetchMoreResult.myBookShelf || fetchMoreResult.myStoreShelf),
        //                             results: [
        //                                 ...(prev.myBookShelf || prev.myStoreShelf).results,
        //                                 ...(fetchMoreResult.myBookShelf || fetchMoreResult.myStoreShelf).results,
        //                             ],
        //                         }

        //                         return data
        //                     },
        //                 })
        //             }
        //             }
        //         >
        //             Load More
        //         </button>
        //     ) || (
        //             <p>This is the end</p>
        //         )
        //     }
        // </div>

        // <div className="row">
        <div className="row" style={{margin: "auto", width: "90%"}}>
            {
                shelf.map(book =>
                    <BookshelfBox key={book.book_id} inBookshelf={inBookshelf} bookId={book.book_id} date={book.date_created || book.date_for_sale} price={book.price} ol_id={book.ol_id} condition={book.book_condition} />
                )}
        </div>
    )
}

export default ShelfPage