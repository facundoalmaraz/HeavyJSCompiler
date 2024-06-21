import { useContext } from "react";
import CompilerContext from "../context/CompilerProvider";

const useCompiler = () => {
  return useContext(CompilerContext);
};

export default useCompiler;
