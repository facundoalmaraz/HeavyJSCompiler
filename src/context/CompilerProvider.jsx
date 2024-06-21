import { useState, useEffect, createContext } from "react";

const CompilerContext = createContext();

const CompilerProvider = ({ children }) => {
  const [codigoFuente, setCodigoFuente] = useState(`
    DarkSymphony primerPrograma {
      WhisperOfThoughts 'Este es un programa de ejemplo';
      BattleCry 'Hola, mundo!';
      frost numero = 10;
      frost numeroa = 20;
      OdinWill numero < numeroa {
        BattleCry 'El número es menor';
      } HelheimFate {
        BattleCry 'El número es mayor';
      }
  
      RideWithTheGodOurSide (i = 0; i < 10; i++) {
        BattleCry 'Hola, mundo!';
      }
    }
  `);
  const [tokens, setTokens] = useState([]);
  const [nodos, setNodos] = useState([]);
  const [errores, setErrores] = useState([]);
  const [codigoIntermedio, setCodigoIntermedio] = useState("");
  const [codigoOptimizado, setCodigoOptimizado] = useState("");
  const [codigoMaquina, setCodigoMaquina] = useState("");
  const [codigoFinal, setCodigoFinal] = useState("");
  const [ejecucion, setEjecucion] = useState("");

  //paso 1: Analizador Lexico
  function tokenizar(codigoFuente) {
    const tokens = [];
    const regex =
      /\b(DarkSymphony|WhisperOfThoughts|BattleCry|frost|sword|OdinWill|HelheimFate|RideWithTheGodOurSide|EternalLoop|WitchCastsSpell)\b|'[^']*'|[0-9]+|\b[a-zA-Z_][a-zA-Z0-9_]*\b|[{}();=<>+]/g;
    let match;
    while ((match = regex.exec(codigoFuente)) !== null) {
      if (match[1]) {
        tokens.push({ type: "keyword", value: match[1] });
      } else if (match[0][0] === "'") {
        tokens.push({ type: "literal", value: match[0].slice(1, -1) });
      } else if (match[0].match(/[0-9]+/)) {
        tokens.push({ type: "number", value: parseInt(match[0]) });
      } else if (match[0].match(/[a-zA-Z_][a-zA-Z0-9_]*/)) {
        tokens.push({ type: "identifier", value: match[0] });
      } else if (match[0].match(/[{}();=<>+]/)) {
        tokens.push({ type: "symbol", value: match[0] });
      }
    }
    return tokens;
  }

  //paso 2: Analizador Sintactico
  function analizar(tokens) {
    const nodos = [];
    let i = 0;

    function expect(type, value = null) {
      if (
        i < tokens.length &&
        tokens[i].type === type &&
        (value === null || tokens[i].value === value)
      ) {
        return tokens[i++];
      } else {
        throw new Error(
          `Expected ${type} ${value ? value : ""}, but got ${
            tokens[i] ? tokens[i].type + " " + tokens[i].value : "end of input"
          }`
        );
      }
    }

    function parseExpression() {
      let left = expect("identifier").value;
      if (i < tokens.length && tokens[i].type === "symbol") {
        const operator = tokens[i].value;
        i++;
        if (operator === "+" || operator === "-") {
          if (
            i < tokens.length &&
            tokens[i].type === "symbol" &&
            tokens[i].value === operator
          ) {
            i++;
            return {
              type: "UnaryExpression",
              operator: operator + operator,
              argument: left,
            };
          } else {
            throw new Error(`Unexpected token: ${tokens[i].type}`);
          }
        } else {
          const right =
            tokens[i].type === "identifier" || tokens[i].type === "number"
              ? expect(tokens[i].type).value
              : null;
          return { type: "BinaryExpression", operator, left, right };
        }
      } else {
        return { type: "Identifier", name: left };
      }
    }

    function parseBlock() {
      const body = [];
      expect("symbol", "{");
      while (
        i < tokens.length &&
        !(tokens[i].type === "symbol" && tokens[i].value === "}")
      ) {
        const statement = parseStatement();
        if (statement) body.push(statement);
      }
      expect("symbol", "}");
      return body;
    }

    function parseStatement() {
      if (tokens[i].type === "keyword") {
        switch (tokens[i].value) {
          case "WhisperOfThoughts":
            return parseComment();
          case "BattleCry":
            return parseMessage();
          case "frost":
          case "sword":
            return parseVariableDeclaration();
          case "OdinWill":
            return parseIfStatement();
          case "RideWithTheGodOurSide":
            return parseForLoop();
          case "EternalLoop":
            return parseWhileLoop();
          case "WitchCastsSpell":
            return parseFunctionDeclaration();
          default:
            throw new Error(`Unexpected keyword: ${tokens[i].value}`);
        }
      } else if (tokens[i].type === "symbol" && tokens[i].value === ";") {
        i++;
        return null; // ignore semicolons
      } else {
        throw new Error(`Unexpected token: ${tokens[i].type}`);
      }
    }

    function parseComment() {
      expect("keyword", "WhisperOfThoughts");
      const value = expect("literal").value;
      return { type: "Comment", value };
    }

    function parseMessage() {
      expect("keyword", "BattleCry");
      const argument = expect("literal").value;
      return { type: "Message", argument };
    }

    function parseVariableDeclaration() {
      const kind = expect("keyword").value;
      const identifier = expect("identifier").value;
      expect("symbol", "=");
      const init = expect("number").value;
      return {
        type: "VariableDeclaration",
        kind,
        identifier: { type: "Identifier", value: identifier },
        init: { type: "Literal", value: init },
      };
    }

    function parseIfStatement() {
      expect("keyword", "OdinWill");
      const test = parseExpression();
      const consequent = parseBlock();
      let alternate = null;
      if (
        tokens[i] &&
        tokens[i].type === "keyword" &&
        tokens[i].value === "HelheimFate"
      ) {
        expect("keyword", "HelheimFate");
        alternate = parseBlock();
      }
      return { type: "IfStatement", test, consequent, alternate };
    }

    function parseForLoop() {
      expect("keyword", "RideWithTheGodOurSide");
      expect("symbol", "(");
      const init = parseExpression();
      expect("symbol", ";");
      const test = parseExpression();
      expect("symbol", ";");
      const update = parseExpression();
      expect("symbol", ")");
      const body = parseBlock();
      return { type: "ForStatement", init, test, update, body };
    }

    function parseWhileLoop() {
      expect("keyword", "EternalLoop");
      expect("symbol", "(");
      const test = parseExpression();
      expect("symbol", ")");
      const body = parseBlock();
      return { type: "WhileStatement", test, body };
    }

    function parseFunctionDeclaration() {
      expect("keyword", "WitchCastsSpell");
      const name = expect("identifier").value;
      expect("symbol", "(");
      const params = [];
      while (tokens[i].type !== "symbol" || tokens[i].value !== ")") {
        params.push(expect("identifier").value);
        if (tokens[i].type === "symbol" && tokens[i].value === ",") {
          expect("symbol", ",");
        }
      }
      expect("symbol", ")");
      const body = parseBlock();
      return { type: "FunctionDeclaration", name, params, body };
    }

    while (i < tokens.length) {
      if (tokens[i].type === "keyword" && tokens[i].value === "DarkSymphony") {
        i++;
        const name = expect("identifier").value;
        const body = parseBlock();
        const nodoPrograma = { type: "Program", name, body };
        nodos.push(nodoPrograma);
      } else {
        i++;
      }
    }

    return nodos;
  }

  //paso 3: Analizador Semantico
  function Analisissemantico(ast) {
    const variables = new Map();
    const funciones = new Map();
    const errores = [];

    function declararVariable(kind, identifier) {
      if (variables.has(identifier)) {
        errores.push(`Error: La variable ${identifier} ya ha sido declarada`);
      } else {
        variables.set(identifier, kind);
      }
    }

    function declararFuncion(identifier) {
      if (funciones.has(identifier)) {
        errores.push(`Error: La función ${identifier} ya ha sido declarada`);
      } else {
        funciones.set(identifier, true);
      }
    }

    function comprobarVariable(identifier) {
      if (!variables.has(identifier)) {
        errores.push(`Error: La variable ${identifier} no ha sido declarada`);
      }
    }

    function analizarNodo(nodo) {
      if (nodo.type === "Program") {
        declararFuncion(nodo.name);
        nodo.body.forEach(analizarNodo);
      } else if (nodo.type === "VariableDeclaration") {
        declararVariable(nodo.kind, nodo.identifier.value);
        if (nodo.init) {
          analizarNodo(nodo.init);
        }
      } else if (nodo.type === "IfStatement") {
        analizarNodo(nodo.test);
        nodo.consequent.forEach(analizarNodo);
        nodo.alternate.forEach(analizarNodo);
      } else if (
        nodo.type === "ForStatement" ||
        nodo.type === "WhileStatement"
      ) {
        nodo.body.forEach(analizarNodo);
      } else if (nodo.type === "FunctionDeclaration") {
        declararFuncion(nodo.name);
        nodo.params.forEach(analizarNodo);
        nodo.body.forEach(analizarNodo);
      } else if (nodo.type === "Identifier") {
        comprobarVariable(nodo.value);
      } else if (nodo.type === "Message") {
        if (nodo.argument.type === "Identifier") {
          comprobarVariable(nodo.argument.value);
        }
      }
    }

    ast.forEach(analizarNodo);
    return errores;
  }

  //paso 4: Codigo Intermedio
  function generarCodigoIntermedio(ast) {
    const instrucciones = [];

    function generarInstruccion(nodo) {
      if (nodo.type === "Program") {
        instrucciones.push(`programa ${nodo.name}`);
        nodo.body.forEach(generarInstruccion);
        instrucciones.push("fin programa");
      } else if (nodo.type === "Comment") {
        instrucciones.push(`comentario '${nodo.value}'`);
      } else if (nodo.type === "Message") {
        instrucciones.push(`mensaje '${nodo.argument}'`);
      } else if (nodo.type === "VariableDeclaration") {
        if (nodo.init) {
          instrucciones.push(
            `variable ${nodo.kind} ${nodo.identifier.value} = ${nodo.init.value}`
          );
        } else {
          instrucciones.push(`variable ${nodo.kind} ${nodo.identifier.value}`);
        }
      } else if (nodo.type === "IfStatement") {
        instrucciones.push(
          `si ${nodo.test.left} ${nodo.test.operator} ${nodo.test.right}`
        );
        nodo.consequent.forEach(generarInstruccion);
        if (nodo.alternate && nodo.alternate.length > 0) {
          instrucciones.push("sino");
          nodo.alternate.forEach(generarInstruccion);
        }
        instrucciones.push("fin si");
      } else if (nodo.type === "ForStatement") {
        const init = `${nodo.init.left} ${nodo.init.operator} ${nodo.init.right}`;
        const test = `${nodo.test.left} ${nodo.test.operator} ${nodo.test.right}`;
        const update = `${nodo.update.left} ${nodo.update.operator} ${nodo.update.right}`;
        instrucciones.push(
          `bucle RideWithTheGodOurSide (${init}; ${test}; ${update})`
        );
        nodo.body.forEach(generarInstruccion);
        instrucciones.push("fin bucle");
      } else if (nodo.type === "WhileStatement") {
        const test = `${nodo.test.left} ${nodo.test.operator} ${nodo.test.right}`;
        instrucciones.push(`bucle EternalLoop (${test})`);
        nodo.body.forEach(generarInstruccion);
        instrucciones.push("fin bucle");
      } else if (nodo.type === "FunctionDeclaration") {
        const params = nodo.params.join(", ");
        instrucciones.push(`funcion ${nodo.name}(${params})`);
        nodo.body.forEach(generarInstruccion);
        instrucciones.push("fin funcion");
      }
    }

    ast.forEach(generarInstruccion);
    return instrucciones.join("\n");
  }

  //paso 5: Optimizador de Codigo Intermedio
  function optimizarCodigoIntermedio(codigoIntermedio) {
    const instrucciones = codigoIntermedio.split("\n");
    const optimizado = [];

    instrucciones.forEach((instr) => {
      const partes = instr.split(" ");
      if (partes[0] !== "comentario") {
        optimizado.push(instr);
      }
    });

    return optimizado.join("\n");
  }

  //paso 6: Generador de Codigo Maquina
  function generarCodigoMaquina(codigoIntermedio) {
    const instrucciones = codigoIntermedio.split("\n");
    const codigoMaquina = [];

    instrucciones.forEach((instr) => {
      const partes = instr.split(" ");

      switch (partes[0]) {
        case "programa":
          codigoMaquina.push(`INICIAR PROGRAMA ${partes[1]}`);
          break;
        case "fin":
          if (partes[1] === "programa") {
            codigoMaquina.push(`FINALIZAR PROGRAMA`);
          } else if (partes[1] === "si") {
            codigoMaquina.push(`FIN SI`);
          } else if (partes[1] === "bucle") {
            codigoMaquina.push(`FIN BUCLE`);
          } else if (partes[1] === "funcion") {
            codigoMaquina.push(`FIN FUNCION`);
          }
          break;
        case "mensaje":
          codigoMaquina.push(`MOSTRAR MENSAJE ${partes.slice(1).join(" ")}`);
          break;
        case "variable":
          if (partes.length === 5) {
            codigoMaquina.push(
              `DECLARAR VARIABLE ${partes[2]} DE TIPO ${partes[1]} CON VALOR ${partes[4]}`
            );
          } else {
            codigoMaquina.push(
              `DECLARAR VARIABLE ${partes[2]} DE TIPO ${partes[1]}`
            );
          }
          break;
        case "si":
          codigoMaquina.push(`SI ${partes.slice(1).join(" ")}`);
          break;
        case "sino":
          codigoMaquina.push(`SINO`);
          break;
        case "bucle":
          codigoMaquina.push(
            `INICIAR BUCLE ${partes[1]} CON PARAMETROS ${partes
              .slice(2)
              .join(" ")}`
          );
          break;
        case "funcion":
          codigoMaquina.push(
            `DECLARAR FUNCION ${partes[1]} CON PARAMETROS ${partes
              .slice(2)
              .join(" ")}`
          );
          break;
        default:
          break;
      }
    });

    return codigoMaquina.join("\n");
  }

  function generacionCodigoFinal(codigoMaquina) {
    const lineasCodigoMaquina = codigoMaquina.split("\n");
    let codigoFinal = "";

    lineasCodigoMaquina.forEach((linea) => {
      const partes = linea.split(" ");

      switch (partes[0]) {
        case "INICIAR":
          if (partes[1] === "PROGRAMA") {
            codigoFinal += `// Inicio del programa ${partes[2]}\n`;
          } else if (partes[1] === "BUCLE") {
            const parametros = partes
              .slice(4)
              .join(" ")
              .replace(/,/g, " ")
              .replace("(", "")
              .replace(")", "");
            codigoFinal += `for (${parametros}) {\n`;
          }
          break;
        case "FINALIZAR":
          if (partes[1] === "PROGRAMA") {
            codigoFinal += `// Fin del programa\n`;
          } else if (
            partes[1] === "BUCLE" ||
            partes[1] === "SI" ||
            partes[1] === "FUNCION"
          ) {
            codigoFinal += `}\n`;
          }
          break;
        case "MOSTRAR":
          codigoFinal += `console.log(${partes.slice(2).join(" ")});\n`;
          break;
        case "DECLARAR":
          if (partes[1] === "VARIABLE") {
            if (partes.length === 7) {
              codigoFinal += `let ${partes[3]} = ${partes[6]};\n`;
            } else {
              codigoFinal += `let ${partes[3]};\n`;
            }
          } else if (partes[1] === "FUNCION") {
            const parametros = partes
              .slice(5)
              .join(" ")
              .replace(/[()]/g, "")
              .replace(/,/g, ", ");
            codigoFinal += `function ${partes[3]}(${parametros}) {\n`;
          }
          break;
        case "SI":
          codigoFinal += `if (${partes.slice(1).join(" ")}) {\n`;
          break;
        case "SINO":
          codigoFinal += `} else {\n`;
          break;
        case "FIN":
          if (
            partes[1] === "FUNCION" ||
            partes[1] === "SI" ||
            partes[1] === "BUCLE"
          ) {
            codigoFinal += `}\n`;
          }
          break;
        default:
          break;
      }
    });

    return codigoFinal;
  }

  function ejecutarCodigo(codigoFinal) {
    try {
      eval(codigoFinal);
    } catch (e) {
      console.error("Error al ejecutar el código:", e);
    }
  }

  useEffect(() => {
    const newTokens = tokenizar(codigoFuente);
    setTokens(newTokens);
  }, [codigoFuente]);

  useEffect(() => {
    if (tokens.length > 0) {
      const newNodos = analizar(tokens);
      setNodos(newNodos);
    }
  }, [tokens]);

  useEffect(() => {
    if (nodos.length > 0) {
      const newErrores = Analisissemantico(nodos);
      setErrores(newErrores);
    }
  }, [nodos]);

  useEffect(() => {
    if (nodos.length > 0) {
      const newCodigoIntermedio = generarCodigoIntermedio(nodos);
      setCodigoIntermedio(newCodigoIntermedio);
    }
  }, [nodos]);

  useEffect(() => {
    if (codigoIntermedio) {
      const newCodigoOptimizado = optimizarCodigoIntermedio(codigoIntermedio);
      setCodigoOptimizado(newCodigoOptimizado);
    }
  }, [codigoIntermedio]);

  useEffect(() => {
    if (codigoOptimizado) {
      const newCodigoMaquina = generarCodigoMaquina(codigoOptimizado);
      setCodigoMaquina(newCodigoMaquina);
    }
  }, [codigoOptimizado]);

  useEffect(() => {
    if (codigoMaquina) {
      const newCodigoFinal = generacionCodigoFinal(codigoMaquina);
      setCodigoFinal(newCodigoFinal);
    }
  }, [codigoMaquina]);


useEffect(() => {
setEjecucion(ejecutarCodigo(codigoFinal));

}, [codigoFinal]);



  

  return (
    <CompilerContext.Provider
      value={{
        codigoFuente,
        setCodigoFuente,
        tokens,
        nodos,
        errores,
        codigoIntermedio,
        codigoOptimizado,
        codigoMaquina,
        codigoFinal,
        ejecucion,
      }}
    >
      {children}
    </CompilerContext.Provider>
  );
};

export { CompilerProvider };
export default CompilerContext;
