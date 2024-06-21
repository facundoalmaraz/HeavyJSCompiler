import { useState, useEffect, createContext } from "react";

const CompilerContext = createContext();

const CompilerProvider = ({ children }) => {
  const [codigoFuente, setCodigoFuente] = useState(`
  DarkSymphony primerPrograma {
  WhisperOfThoughts 'Este es un programa de ejemplo';
  BattleCry 'Hola, mundo!';
  }
    `);
  const [tokens, setTokens] = useState([]);
  const [nodos, setNodos] = useState([]);
  const [errores, setErrores] = useState([]);
  const [codigoIntermedio, setCodigoIntermedio] = useState("");
  const [codigoOptimizado, setCodigoOptimizado] = useState("");
  const [codigoMaquina, setCodigoMaquina] = useState("");
  const [codigoFinal, setCodigoFinal] = useState("");


//   const codigoFuente = `
// DarkSymphony primerPrograma {

// WhisperOfThoughts 'Este es un programa de ejemplo';
// BattleCry 'Hola, mundo!';

// frost numero = 10;

// sword numero2 = 20;

// OdinWill numero < numero2 {
//   BattleCry 'El número es menor';
// } HelheimFate {
//   BattleCry 'El número es mayor';
// }

// RideWithTheGodOurSide (i = 0; i < 10; i++) {
//   BattleCry 'Iteración ' + i;
// }

// EternalLoop (i > 20) {
//   BattleCry 'Iteración ' + i;
// }

// WitchCastsSpell suma(a, b) {
//   BattleCry a + b;
// }

// }
// `;
  // const codigoFuente = `
  // DarkSymphony primerPrograma {

  // WhisperOfThoughts 'Este es un programa de ejemplo';
  // BattleCry 'Hola, mundo!';

  // frost numero = 10;

  // sword numero2 = 20;

  // OdinWill numero < numero2 {
  //   BattleCry 'El número es menor';
  // } HelheimFate {
  //   BattleCry 'El número es mayor';
  // }

  // RideWithTheGodOurSide (i = 0; i < 10; i++) {
  //   BattleCry 'Iteración ' + i;
  // }

  // EternalLoop (i > 20) {
  //   BattleCry 'Iteración ' + i;
  // }

  // WitchCastsSpell suma(a, b) {
  //   BattleCry a + b;
  // }

  // }
  // `;

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

    while (i < tokens.length) {
      if (tokens[i].type === "keyword" && tokens[i].value === "DarkSymphony") {
        const nodoPrograma = {
          type: "Program",
          name: tokens[++i].value,
          body: [],
        };
        i++;

        while (
          i < tokens.length &&
          !(tokens[i].type === "symbol" && tokens[i].value === "}")
        ) {
          if (
            tokens[i].type === "keyword" &&
            tokens[i].value === "WhisperOfThoughts"
          ) {
            i++;
            const nodoComentario = { type: "Comment", value: tokens[i].value };
            nodoPrograma.body.push(nodoComentario);
          } else if (
            tokens[i].type === "keyword" &&
            tokens[i].value === "BattleCry"
          ) {
            i++;
            const nodoMensaje = { type: "Message", argument: tokens[i] };
            nodoPrograma.body.push(nodoMensaje);
          } else if (
            tokens[i].type === "keyword" &&
            (tokens[i].value === "frost" || tokens[i].value === "sword")
          ) {
            const kind = tokens[i].value;
            i++;
            const identifier = tokens[i].value;
            let init = null;
            i++;
            if (tokens[i].type === "symbol" && tokens[i].value === "=") {
              i++;
              init = tokens[i];
              i++;
            }
            const nodoVariable = {
              type: "VariableDeclaration",
              kind,
              identifier: { type: "Identifier", value: identifier },
              init,
            };
            nodoPrograma.body.push(nodoVariable);
          } else if (
            tokens[i].type === "keyword" &&
            tokens[i].value === "OdinWill"
          ) {
            i++;
            const test = tokens[i];
            i++;
            const consequent = [];
            while (
              i < tokens.length &&
              !(
                tokens[i].type === "keyword" &&
                tokens[i].value === "HelheimFate"
              )
            ) {
              consequent.push(tokens[i]);
              i++;
            }
            i++;
            const alternate = [];
            while (
              i < tokens.length &&
              !(tokens[i].type === "symbol" && tokens[i].value === "}")
            ) {
              alternate.push(tokens[i]);
              i++;
            }
            const nodoIf = { type: "IfStatement", test, consequent, alternate };
            nodoPrograma.body.push(nodoIf);
          } else if (
            tokens[i].type === "keyword" &&
            tokens[i].value === "RideWithTheGodOurSide"
          ) {
            i++;
            const params = [];
            while (tokens[i].type !== "symbol" || tokens[i].value !== ")") {
              params.push(tokens[i]);
              i++;
            }
            i++;
            const body = [];
            while (
              i < tokens.length &&
              !(tokens[i].type === "symbol" && tokens[i].value === "}")
            ) {
              body.push(tokens[i]);
              i++;
            }
            const nodoBucle = {
              type: "LoopStatement",
              kind: "RideWithTheGodOurSide",
              params,
              body,
            };
            nodoPrograma.body.push(nodoBucle);
          } else if (
            tokens[i].type === "keyword" &&
            tokens[i].value === "EternalLoop"
          ) {
            i++;
            const params = [];
            while (tokens[i].type !== "symbol" || tokens[i].value !== ")") {
              params.push(tokens[i]);
              i++;
            }
            i++;
            const body = [];
            while (
              i < tokens.length &&
              !(tokens[i].type === "symbol" && tokens[i].value === "}")
            ) {
              body.push(tokens[i]);
              i++;
            }
            const nodoBucle = {
              type: "LoopStatement",
              kind: "EternalLoop",
              params,
              body,
            };
            nodoPrograma.body.push(nodoBucle);
          } else if (
            tokens[i].type === "keyword" &&
            tokens[i].value === "WitchCastsSpell"
          ) {
            i++;
            const identifier = tokens[i].value;
            i++;
            const params = [];
            while (tokens[i].type !== "symbol" || tokens[i].value !== ")") {
              params.push(tokens[i]);
              i++;
            }
            i++;
            const body = [];
            while (
              i < tokens.length &&
              !(tokens[i].type === "symbol" && tokens[i].value === "}")
            ) {
              body.push(tokens[i]);
              i++;
            }
            const nodoFuncion = {
              type: "FunctionDeclaration",
              name: identifier,
              params,
              body,
            };
            nodoPrograma.body.push(nodoFuncion);
          }
          i++;
        }
        nodos.push(nodoPrograma);
      }
      i++;
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
      } else if (nodo.type === "LoopStatement") {
        nodo.params.forEach(analizarNodo);
        nodo.body.forEach(analizarNodo);
      } else if (nodo.type === "FunctionDeclaration") {
        declararFuncion(nodo.name);
        nodo.params.forEach(analizarNodo);
        nodo.body.forEach(analizarNodo);
      } else if (nodo.type === "Identifier") {
        comprobarVariable(nodo.value);
      } else if (nodo.type === "Message") {
        if (nodo.argument.type === "identifier") {
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
        instrucciones.push(`comentario ${nodo.value}`);
      } else if (nodo.type === "Message") {
        instrucciones.push(`mensaje '${nodo.argument.value}'`);
      } else if (nodo.type === "VariableDeclaration") {
        if (nodo.init) {
          instrucciones.push(
            `variable ${nodo.kind} ${nodo.identifier.value} = ${nodo.init.value}`
          );
        } else {
          instrucciones.push(`variable ${nodo.kind} ${nodo.identifier.value}`);
        }
      } else if (nodo.type === "IfStatement") {
        instrucciones.push(`si ${nodo.test.value}`);
        nodo.consequent.forEach(generarInstruccion);
        if (nodo.alternate.length > 0) {
          instrucciones.push("sino");
          nodo.alternate.forEach(generarInstruccion);
        }
        instrucciones.push("fin si");
      } else if (nodo.type === "LoopStatement") {
        instrucciones.push(
          `bucle ${nodo.kind} (${nodo.params.map((p) => p.value).join(" ")})`
        );
        nodo.body.forEach(generarInstruccion);
        instrucciones.push("fin bucle");
      } else if (nodo.type === "FunctionDeclaration") {
        instrucciones.push(
          `funcion ${nodo.name}(${nodo.params.map((p) => p.value).join(", ")})`
        );
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
    setTokens(tokenizar(codigoFuente));
  }, [codigoFuente]);

  useEffect(() => {
    setNodos(analizar(tokens));
  }, [tokens]);

  useEffect(() => {
    setErrores(Analisissemantico(nodos));
  }, [nodos]);

  useEffect(() => {
    setCodigoIntermedio(generarCodigoIntermedio(nodos));
  }, [nodos]);

  useEffect(() => {
    setCodigoOptimizado(optimizarCodigoIntermedio(codigoIntermedio));
  }, [codigoIntermedio]);

  useEffect(() => {
    setCodigoMaquina(generarCodigoMaquina(codigoIntermedio));
  }, [codigoIntermedio]);

  useEffect(() => {
    setCodigoFinal(generacionCodigoFinal(codigoMaquina));
  }, [codigoMaquina]);

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
      }}
    >
      {children}
    </CompilerContext.Provider>
  );
};

export { CompilerProvider };
export default CompilerContext;
