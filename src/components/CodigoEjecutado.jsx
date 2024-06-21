import React from 'react'
import useCompiler from '../hooks/useCompiler'

const CodigoEjecutado = () => {
    const { ejecucion } = useCompiler();
    console.log(ejecucion);

    


  return (
    <div className="rounded-3xl h-[600px] bg-[#09090c] px-4 py-10 ">
    <h1 className="text-white text-2xl font-bold">6. Codigo Final Generado en JS</h1>
    <div className="overflow-auto h-full py-10">
       
    </div>
    </div>
    
  )
}

export default CodigoEjecutado