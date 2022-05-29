import { Box, Button, TextField, Typography } from '@mui/material'
import React, { useState, useEffect} from 'react'
import ReactDOM from 'react-dom'
import axios from 'axios'
import { BodyProps } from './types/BodyProps'
import { EchoAPIResponse } from './types/EchoAPIResponse'

const EchoAPIResult : React.VFC<EchoAPIResponse> = (props) => {
    return (
        <Box sx={{mt: 2}}>
            <Typography>ResultMessages: {props.msg}</Typography>
        </Box>
    )
}

const Body: React.VFC<BodyProps> = (props) => {
    const [echoAPIResult, setEchoAPIResult] = useState<EchoAPIResponse>({msg: ""})
    const callEchoAPI = () => {
        const element: HTMLInputElement = document.getElementById('inputText') as HTMLInputElement

        const url: string = "http://localhost:9000/api/echo"
        const sendMsg: string = element.value
        axios.post(url, sendMsg)
            .then((res) => {
                const result: EchoAPIResponse = {
                    msg: res.data.msg
                }
                setEchoAPIResult(result)
            })
    }

    return (
        <>
            <h1>{props.featureTitle}</h1>
            <TextField id="inputText" label="message" variant="filled" inputProps={{maxLength: 20}} />
            <Button variant="outlined" onClick={callEchoAPI} sx={{ my: 1, ml: 2 }}>call!!!</Button>
            <EchoAPIResult msg={echoAPIResult.msg}/>
        </>
    )
}

export default Body

