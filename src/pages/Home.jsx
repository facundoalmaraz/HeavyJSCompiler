import React from "react";
import Editor from "../components/Editor";
import AnalizadorLexico from "../components/AnalizadorLexico";
import AnalizadorSintactico from "../components/AnalizadorSintactico";
import AnalizadorSemantico from "../components/AnalizadorSemantico";
import CodigoIntermedio from "../components/CodigoIntermedio";
import CodigoOptimizado from "../components/CodigoOptimizado";
import CodigoMaquina from "../components/CodigoMaquina";
import CodigoFinal from "../components/CodigoFinal";

const Home = () => {
  return (
    <div className="p-4">
      <h1 className="text-3xl text-white text-center justify-center font-bold flex items-center gap-3">
        <span>HeavyJS: A Very Heavy Death Metal Compiler</span>
        <img
          src="/logoheavyJS.png"
          alt=""
          className=" w-[100px] h-[100px]"
        />
      </h1>

      <div className="grid grid-cols-3 h-screen mt-5 gap-4 container mx-auto">
        <Editor />
        <AnalizadorLexico />
        <AnalizadorSintactico />
        <AnalizadorSemantico />
        <CodigoIntermedio />
        <CodigoOptimizado />
        <CodigoMaquina />
        <CodigoFinal />
      </div>
    </div>
  );
};

export default Home;
