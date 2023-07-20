import React, { useEffect } from "react"
import { Link, Navigate, Outlet, useLocation } from "react-router-dom"
import { ArrowBackIos, ArrowForwardIos } from "@mui/icons-material"

function MyShelves() {
    const location = useLocation()
    return (
        !localStorage.getItem('token') ?
            <Navigate to={"/"} /> :
            <div>
                <ul className="inline-list shelf-nav" style={{ paddingLeft: "0px", alignItems: "center" }}>
                    <li>

                        <Link to={`/my/book-shelf`}><ArrowBackIos />&nbsp;My Bookshelf</Link>
                    </li>
                    <li style={{ fontSize: "2rem" }}>{location.pathname === "/my/book-shelf" ? "My Bookshelf" : "My Storeshelf"}</li>
                    <li>
                        <Link to={`/my/store-shelf`}>My Storeshelf&nbsp;<ArrowForwardIos /></Link>
                    </li>
                </ul>
                <Outlet />
            </div>
    )
}

export default MyShelves