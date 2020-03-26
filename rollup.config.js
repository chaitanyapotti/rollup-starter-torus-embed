import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import json from "@rollup/plugin-json";
import nodebns from "rollup-plugin-node-builtins";
import nodeglob from "rollup-plugin-node-globals";
import babel from "rollup-plugin-babel";
import { terser } from "rollup-plugin-terser";

// `npm run build` -> `production` is true
// `npm run dev` -> `production` is false
const production = !process.env.ROLLUP_WATCH;

export default {
  input: "src/main.js",
  output: {
    file: "public/bundle.js",
    format: "iife", // immediately-invoked function expression — suitable for <script> tags
    sourcemap: true,
    intro: "const global = window;"
  },
  external: id => id.indexOf("@babel/runtime") === 0,
  plugins: [
    nodebns(),
    nodeglob(),
    json(),
    resolve({
      preferBuiltins: false,
	  browser: true
    }),
    babel({
      //   exclude: "node_modules/**",
	  runtimeHelpers: true,
	  externalHelpers: true
    }),
    resolve({
      preferBuiltins: false,
      browser: true
    }), // tells Rollup how to find date-fns in node_modules
    commonjs(), // converts date-fns to ES modules
    production && terser() // minify, but only in production
  ]
};
