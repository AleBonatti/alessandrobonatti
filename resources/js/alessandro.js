import tailwindConfigFile from "./../../tailwind.alessandro.config.js";
import resolveConfig from "tailwindcss/resolveConfig";
const tailwindConfig = resolveConfig(tailwindConfigFile);
window.tailwindConfig = tailwindConfig;
import "./app.js";
