import React from "react";
import useCompiler from "../hooks/useCompiler";

const AnalizadorSemantico = () => {
  const { errores } = useCompiler();
  return (
    <>
      <div className="rounded-3xl  h-[600px] bg-[#09090c] px-4 py-10 ">
        <h1 className="text-white text-2xl font-bold">
          3. Analizador Semantico
        </h1>
        <div className="overflow-auto h-full py-10">
          <p className="text-white text-xl font-bold">
            {" "}
            {errores.length === 0
              ? "No hay errores semanticos en el codigo"
              : errores.map((error, index) => (
                    <p key={index} className="text-red-500">
                        {error}
                    </p>
                    ))}

            </p>


        </div>
      </div>
    </>
  );
};

export default AnalizadorSemantico;
