import React from 'react'
import { BandNamesApp } from './pages/BandNamesApp'
import { SocketProvider } from './context/SocketContext'

export const App = () => {
    return (
        <SocketProvider>
            <BandNamesApp />
        </SocketProvider>
    )
}
