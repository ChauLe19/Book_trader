import React from "react"
import { Link, Outlet } from "react-router-dom"
import { ArrowBackIos, ArrowForwardIos } from "@mui/icons-material"

function MyShelves() {
    // const match = useMatch()
    // console.log(match)
    return (
        <div>

            <ul className="inline-list shelf-nav" style={{ paddingLeft: "0px", alignItems: "center" }}>
                <li>

                    <Link to={`/my/book-shelf`}><ArrowBackIos />&nbsp;My Bookshelf</Link>
                </li>
                <li style={{ fontSize: "2rem" }}>My Shelves</li>
                <li>

                    <Link to={`/my/store-shelf`}>My Storeshelf&nbsp;<ArrowForwardIos /></Link>
                </li>
            </ul>
            <Outlet/>
        </div>
    )
}

export default MyShelves