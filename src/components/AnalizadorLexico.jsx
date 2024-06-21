import React from "react";
import useCompiler from "../hooks/useCompiler";

const AnalizadorLexico = () => {
  const { tokens } = useCompiler();

  console.log(tokens);
  return (
    <>
      <div className="rounded-3xl  h-[600px] bg-[#09090c] px-4 py-10 ">
        <h1 className="text-white text-2xl font-bold">1. Analizador Lexico</h1>
        <div className="overflow-auto h-full py-10">

        <table className="table-auto text-white">
          <thead>
            <tr>
              <th className="px-4 py-2">Token</th>
              <th className="px-4 py-2">Tipo</th>
            </tr>
          </thead>
          <tbody>
            {tokens.map((token, index) => (
                <tr key={index}>
                <td className="border px-4 py-2">{token.value}</td>
                <td className="border px-4 py-2">{token.type}</td>
              </tr>
            ))}
          </tbody>
        </table>
            </div>
      </div>
    </>
  );
};

export default AnalizadorLexico;
