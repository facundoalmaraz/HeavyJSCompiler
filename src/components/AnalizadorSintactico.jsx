import React from "react";
import { Chart } from "react-google-charts";
import useCompiler from "../hooks/useCompiler";

const transformNodesToWordTreeData = (nodes, path = []) => {
  let result = [];
  nodes.forEach(node => {
    let currentPath = [...path, node.type];
    if (node.name) currentPath.push(`name:${node.name}`);
    if (node.value) currentPath.push(`value:${node.value}`);
    if (node.kind) currentPath.push(`kind:${node.kind}`);
    
    result.push(currentPath.join(' '));

    if (node.body) {
      result = result.concat(transformNodesToWordTreeData(node.body, currentPath));
    }

    if (node.argument) {
      let argumentPath = [...currentPath, node.argument.type];
      if (node.argument.value) argumentPath.push(`value:${node.argument.value}`);
      result.push(argumentPath.join(' '));
    }

    if (node.identifier) {
      let identifierPath = [...currentPath, node.identifier.type];
      if (node.identifier.value) identifierPath.push(`value:${node.identifier.value}`);
      result.push(identifierPath.join(' '));
    }

    if (node.init) {
      let initPath = [...currentPath, node.init.type];
      if (node.init.value) initPath.push(`value:${node.init.value}`);
      result.push(initPath.join(' '));
    }

    if (node.test) {
      let testPath = [...currentPath, node.test.type];
      if (node.test.value) testPath.push(`value:${node.test.value}`);
      result.push(testPath.join(' '));
    }

    if (node.consequent) {
      result = result.concat(transformNodesToWordTreeData(node.consequent, currentPath));
    }

    if (node.alternate) {
      result = result.concat(transformNodesToWordTreeData(node.alternate, currentPath));
    }

    if (node.params) {
      result = result.concat(transformNodesToWordTreeData(node.params, currentPath));
    }
  });
  return result;
};

const AnalizadorSintactico = () => {
  const { nodos } = useCompiler();

  if (!nodos || nodos.length === 0) {
    return (
      <div className="rounded-3xl col-span-3 bg-[#09090c] px-4 py-10 ">
        <h1 className="text-white text-2xl font-bold">2. Analizador Sintactico</h1>
        <div className="overflow-auto h-full py-10">
          <div className="text-white">Cargando...</div>
        </div>
      </div>
    );
  }

  const transformedData = transformNodesToWordTreeData(nodos);
  const data = [['Phrases'], ...transformedData.map(item => [item])];

  const options = {
    wordtree: {
      format: "implicit",
      word: "Program",
    },
  };

  return (
    <div className="rounded-3xl col-span-3 bg-[#09090c] px-4 py-10 ">
      <h1 className="text-white text-2xl font-bold">2. Analizador Sintactico</h1>
      <div className="overflow-auto h-full py-10">
        <Chart
          width={"100%"}
          height={"500px"}
          chartType="WordTree"
          loader={<div>Loading Chart</div>}
          data={data}
          options={options}
        />
      </div>
    </div>
  );
};

export default AnalizadorSintactico;
