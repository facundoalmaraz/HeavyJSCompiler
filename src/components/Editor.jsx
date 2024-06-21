import React from "react";
import useCompiler from "../hooks/useCompiler";

const Editor = () => {
  const { codigoFuente, setCodigoFuente } = useCompiler();
  return (
    <div className="rounded-3xl col-span-2 bg-[#09090c] px-4 py-10">
      <h1 className="text-white text-2xl font-bold">
        Inserte codigo de HeavyJS aqui
      </h1>

      <textarea
        className="w-full h-3/4 bg-[#09090c] font-semibold text-yellow-600 p-2 mt-2 rounded-md "
        value={codigoFuente}
        onChange={(e) => setCodigoFuente(e.target.value)}
      ></textarea>
    </div>
  );
};

export default Editor;
