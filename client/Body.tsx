import { Button, TextField } from '@mui/material'
import React from 'react'
import ReactDOM from 'react-dom'


type Props = {
    elm: Elms
}

export type Elms = {
    h1Elm: string
    h2Elm: Array<string>
}

const print_text = () => {
    const element: HTMLInputElement = document.getElementById('inputText') as HTMLInputElement
    const inputText: string = element.value
    console.log(inputText)
    alert(inputText)
}

export const Body: React.VFC<Props> = (props) => {
    const h2elms: Array<string> = props.elm.h2Elm
    return (
        <>
            <h1>{props.elm.h1Elm}</h1>
            {h2elms.map((elm, i) => <li key={i}>{elm}</li>)}
            <TextField id="inputText" label="inputText" variant="filled"/>
            <Button variant="outlined" onClick={print_text}>btnTest</Button>
        </>
    )
}
