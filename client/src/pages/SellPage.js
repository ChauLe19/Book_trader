import React, { useState } from "react"
import axios from "axios"
import { Button, FormControl, Grid, InputLabel, MenuItem, Select, StepIcon, TextField } from "@mui/material"
import { CloseRounded, MonetizationOn } from "@mui/icons-material"
import { server_url } from "../pages/global_vars";


function SellPage(props) {
    const ol_id = props.ol_id
    const imgHref = props.imgHref
    const [price, setPrice] = useState("")
    const [message, setMessage] = useState("")
    const [reload, setReload] = useState(false)
    const [condition, setCondition] = useState("New")
    // if (reload) return (<Redirect to="/user/sell" />)
    return (
        <div className="sell-page-modal">
            <button className="close-button" onClick={() => props.close()}><CloseRounded /></button>

            <form className="sell-form">
                <div style={{ fontSize: "1.2rem", fontWeight: "bold" }}>
                    {props.title}
                </div>
                <div>
                    By {props.author}
                </div>
                <div className="book-image" style={{
                    backgroundImage: `url(${props.imgHref})`,
                }}></div>
                <div style={{ margin: "1rem" }}>
                    <FormControl style={{ width: "50%" }}>

                        <Grid container spacing={1}>
                            <Grid item xs={6}>
                                <FormControl fullWidth>
                                    <InputLabel id="condition-label">Condition</InputLabel>
                                    <Select fullWidth
                                        labelId="condition-label"
                                        className="shelf-book"
                                        value={condition}
                                        onChange={(e) => setCondition(e.target.value)}
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
                            <Grid item xs={6}>

                                <TextField fullWidth id="price" label="Price" onChange={
                                    e => setPrice(e.target.value)
                                } required />
                            </Grid>
                        </Grid>
                    </FormControl>
                    {/* <input type="text" id="price" name="price" placeholder="Price" value={price} onChange={e => setPrice(e.target.value)} required /> */}
                </div>
                <div>
                    <Button variant="contained" color="primary" type="submit" style={{ backgroundColor: "#44bd32", width: "50%" }} onClick={e => {
                        e.preventDefault()

                        axios.post(`${server_url}/sellNewBook`, {
                            ol_id: props.ol_id,
                            price: parseFloat(price),
                            condition: condition
                        })
                            .then(() => window.location.reload())
                            .catch(err => { console.log(err.response.data); setMessage(err.response.data) })
                    }}><MonetizationOn /> &nbsp;Sell this book</Button>
                </div>
            </form >
        </div>
    )
}

export default SellPage