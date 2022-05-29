import React from 'react'
import {StrictMode} from 'react'
import {createRoot, Root} from 'react-dom/client'
import Header from './Header'
import Body from './Body'

const App: React.VFC = () => {
    return (
        <>
            <Header appTitle="Sample Application"/>
            <Body featureTitle="echoAPI calling"/>
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
