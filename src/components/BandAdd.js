import React, { useContext, useState } from 'react'
import { SocketContext } from '../context/SocketContext';

export const BandAdd = () => {



    //State para manejar el input
    const [value, setValue] = useState('');
    //Implementamos el context
    const { socket } = useContext( SocketContext );

    //Funcion de submit que añade nueva banda
    const onSubmit = e => {
        e.preventDefault();

        if( value.trim().length > 0 ){
            //Añade la banda
            socket.emit('new-band', { name:value });
            //Resetea el input
            setValue('');
        }
    }

    return (
        <>

            <h3>Agregar Banda</h3>

            <form onSubmit={ onSubmit }>
                <input 
                    className="form-control"
                    placeholder="Nuevo nombre de banda"
                    value={ value }
                    onChange={ (e) => setValue( e.target.value )}
                />


            </form>

        </>
    )
}
