import React from "react";
import useCompiler from "../hooks/useCompiler";

const CodigoFinal = () => {
  const { codigoFinal } = useCompiler();
  

  return (
    <div className="rounded-3xl h-[600px] bg-[#09090c] px-4 py-10 ">
      <h1 className="text-white text-2xl font-bold">6. Codigo Final Generado en JS</h1>
      <div className="overflow-auto h-full py-10">
        <pre className="text-white text-xl font-bold">{codigoFinal}</pre>
      </div>
    </div>
  );
};

export default CodigoFinal;
