import React from "react";
import useCompiler from "../hooks/useCompiler";

const CodigoMaquina = () => {
  const { codigoMaquina } = useCompiler();
  console.log(codigoMaquina);

  return (
    <div className="rounded-3xl h-[600px] bg-[#09090c] px-4 py-10 ">
      <h1 className="text-white text-2xl font-bold">
        6. Codigo Maquina
      </h1>
      <div className="overflow-auto h-full py-10">
        <pre className="text-white text-xl font-bold">{codigoMaquina}</pre>
      </div>
    </div>
  );
};

export default CodigoMaquina;
