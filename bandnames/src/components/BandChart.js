import React, { useContext, useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import { SocketContext } from '../context/SocketContext';

export const BandChart = () => {
  const chartRef = useRef(null);

  const { socket,  } = useContext( SocketContext );  
    
    useEffect(() => {
        socket.on('current-bands', (data) => {      
          crearGrafica( data );
        }); 
        return () => socket.off('current-bands');
    }, [socket])


  const crearGrafica = ( bands = [] ) => {
    const ctx = chartRef.current;
    if (ctx) {
      // Destruir el gráfico existente si existe
      if (ctx.chart) {
        ctx.chart.destroy();
      }

      // Crear un nuevo gráfico
      ctx.chart = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: bands.map( band => band.name ),
          datasets: [{
            label: '# of Votes',
            data: bands.map( band => band.votes ),
            borderWidth: 1
          }]
        },
        options: {
          animation: false,
          indexAxis: 'y',          
        }
      });
    }
  }

  

  return (
    <canvas ref={chartRef}></canvas>
  );
};

