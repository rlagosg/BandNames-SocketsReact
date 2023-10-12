import React, { useState, useEffect, useContext } from 'react'
import { SocketContext } from '../context/SocketContext';

export const BandList = () => {

    const { socket } = useContext( SocketContext );
    const [bands, setBands] = useState([]);
    
    useEffect(() => {
        socket.on('current-bands', (data) => {      
            setBands( data );
        }); 
        return () => socket.off('current-bands');
    }, [socket])

        
    const cambioNombre = ( event, id) => { 
        const nuevoNombre = event.target.value;
        
        setBands( bands => bands.map( band =>{
            if ( band.id === id ) {
                band.name = nuevoNombre;
            }
            return band;
        }));
    }

    const onPerdioFoco = (id, nombre) => {                
        socket.emit('cambiar-nombre-banda', { id, nombre }); 
    }

    const votar = ( id ) => {    
        socket.emit('votar-banda', id);
    }

    const borrar = ( id ) => {
        socket.emit('borrar-banda', id);
    }

    const crearRows = () => { 
        return (
            bands.map( band => (
                <tr key={ band.id }>
                    <td>
                        <button className='btn btn-primary'
                        onClick={ () => votar( band.id )}
                        > +1 </button>
                    </td>

                    <td>
                        <input className='form-control'
                        value={band.name}
                        onChange={ (event) => cambioNombre( event, band.id ) }
                        onBlur={ () => onPerdioFoco( band.id, band.name )}
                        /> 
                    </td>
                    <td> <h3> {band.votes} </h3> </td>
                    <td>
                        <button className='btn btn-danger'   
                        onClick={ () => borrar( band.id )}                     
                        > Borrar</button>
                    </td>
                </tr>
            ))            
        );
     }

  return (
    <>
        <h3>Bandas Actuales</h3>
        {/* tabla */}
        <table className='table table-stripped'>
        <thead>
            <tr> {/* nombre de columnas */}
                <th></th>
                <th>Nombre</th>
                <th>Votos</th>
                <th>Borrar</th>
            </tr>
        </thead>           
            <tbody>
                {crearRows()}
            </tbody>
        </table>
    </>
  )
}
