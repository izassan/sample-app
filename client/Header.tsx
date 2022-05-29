import React from 'react'
import ReactDOM from 'react-dom'
import { AppBar } from '@mui/material'
import { Toolbar } from '@mui/material'
import { Typography } from '@mui/material'


type Props = {
    title: string
}
const Header: React.VFC<Props> = (props) => {
    return (
        <AppBar position="static">
            <Toolbar>
                <Typography>
                    {props.title}
                </Typography>
            </Toolbar>
        </AppBar>
    )
}

export default Header
