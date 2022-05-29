import React from 'react'
import ReactDOM from 'react-dom'
import { AppBar } from '@mui/material'
import { Toolbar } from '@mui/material'
import { Typography } from '@mui/material'
import { HeaderProps } from './types/HeaderProps'

const Header: React.VFC<HeaderProps> = (props) => {
    return (
        <AppBar position="static">
            <Toolbar>
                <Typography>
                   {props.appTitle}
                </Typography>
            </Toolbar>
        </AppBar>
    )
}

export default Header
