import React, { useContext, useState } from 'react'
import { useSocket } from '../hooks/useSocket';
import { SocketContext } from '../context/SocketContext';

export const BandAdd = () => {

  const [ valor, setValor ] = useState('');
  const { socket } = useContext( SocketContext );

  const onSubmit = ( event ) => {
    event.preventDefault();

    if( valor.trim().length > 0){
      socket.emit('crear-banda', { nombre: valor });
    }
  }

  return (
    <>
        <h3>Agregar Banda</h3>
        <form onSubmit={ onSubmit }>
            <input
                className='form-control'
                placeholder='nuevo nombre de banda'
                value={ valor }
                onChange={(e)=>setValor( e.target.value )}                
            />
        </form>
    </>
  )
}
