import React, { useMemo, useEffect, useState } from 'react'
import { io } from "socket.io-client";

export const useSocket = ( serverPath ) => {

    //constante que me servira para poder escuchar el puerto del back-end
    const socket = useMemo( () => io( serverPath, {
        transports: ['websocket']
    }), [ serverPath ]);

    const [online, setOnline] = useState(false);
    
    //efecto para detectar el soceket conectado
    useEffect(() => {    
        setOnline( socket.connected )
    }, [socket])
    
    //efecto para setiar online la aplicacion cuando se levante
    useEffect(() => {
        socket.on('connect', () => { 
            setOnline(true);
        })
    }, [socket])
    
    //efecto para setiar offline la aplicacion cuando se caiga
    useEffect(() => {
        socket.on('disconnect', () => { 
            setOnline(false);
        })
    }, [socket])

    return {
        socket,
        online
    }
}

//'http://localhost:8080'