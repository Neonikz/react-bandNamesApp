import React, { useContext, useEffect, useState } from 'react'
import { SocketContext } from '../context/SocketContext';

export const BandList = () => {

    //Seteamos el state para las bandas
    const [bands, setBands] = useState([]);
    //Implementamos el socket
    const { socket } = useContext( SocketContext );

    //Effect que esta pendiente de la data que entra
    useEffect(() => {
        //Trae las bandas
        socket.on('current-bands', ( bands ) => {
            setBands( bands );
        });
        //Desmonta el socket
        return () => socket.off('current-bands');
    }, [ socket ])

    //Funcion para cambiar el name de la banda en el input
    const changeName = ( event, id ) => {

        const newName = event.target.value;

        setBands( bands => bands.map( band => {
            if( band.id === id ){
                band.name = newName;
            }

            return band;
        }));

    }

    //Cuando se pierde el foco se emite al socket que cambia el nombre de la banda
    const onLostFocus = ( id, name ) => socket.emit('change-name', { id, name });

    //Funcion para aumentar voto en el backend
    const vote = id => {
      socket.emit('vote-band', id);
    }

    //Funcion para borrar una banda
    const removeBand = id => {
        socket.emit('remove-band', id);
    }


    // Funcion que crea rows de bandas nuevas
    const createRows = () => {
        return(

            bands.map( ( band ) => (
                <tr key={band.id}>
                    <td>
                        <button 
                            className="btn btn-primary"
                            onClick={ () => vote( band.id ) }    
                        > +1 </button>
                    </td>
                    <td>
                        <input
                            className="form-control"
                            value={ band.name }
                            onChange={ ( event ) => changeName( event, band.id ) }
                            onBlur={ () => onLostFocus( band.id, band.name ) }
                        />
                    </td>
                    <td><h3> { band.votes } </h3></td>
                    <td>
                        <button 
                            className="btn btn-danger"
                            onClick={ () => removeBand( band.id ) }
                        >
                            Borrar
                        </button>
                    </td>
                </tr>     
            ))

        );
    }

    return (
        <>
            <table className="table table-strippped">
                <thead>
                    <tr>
                        <th></th>
                        <th>Nombre</th>
                        <th>Votos</th>
                        <th>Borrar</th>
                    </tr>
                </thead>

                <tbody>
                    { createRows() }
                </tbody>
            </table>  
        </>
    )
}
