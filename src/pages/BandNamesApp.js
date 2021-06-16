import React, { useContext } from 'react'
import {SocketContext} from '../context/SocketContext'

import { BandAdd } from '../components/BandAdd'
import { BandList } from '../components/BandList'
import { BandChar } from '../components/BandChar'




export const BandNamesApp = () => {

  const { online } = useContext( SocketContext );
  
  return (
    <div className="container">
      
      <div className="alert">
        <p>
          Estado del servidor:

          {
            online
              ? <span className="text-success"> Online</span>
              : <span className="text-danger"> Offline</span>
          }

        </p>
      </div>

      <h1>Nombres de Bandas App</h1>
      <hr />

      <div className="row">
          <div >
            <BandChar />
          </div>
      </div>

      <div className="row">
        
        <div className="col-8">
          <BandList />
        </div>

        <div className="col-4">
          <BandAdd />
        </div>

      </div>
    </div>
  )
}



