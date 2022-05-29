import React from 'react'
import {StrictMode} from 'react'
import {createRoot, Root} from 'react-dom/client'
import Header from './Header'
import {Body, Elms} from './Body'

const elms: Elms = {
    h1Elm: "aaa",
    h2Elm: [
        "aaa",
        "bbb",
    ]
}

const App: React.VFC = () => {
    return (
        <>
            <Header title="hoge"/>
            <Body elm={elms} />
        </>
    )
}

const container: HTMLElement = document.getElementById("content")!
const root: Root = createRoot(container)
root.render(
    <StrictMode>
        <App />
    </StrictMode>
)
