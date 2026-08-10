import tailwindConfigFile from "./../../tailwind.carmen.config.js";
import resolveConfig from "tailwindcss/resolveConfig";
const tailwindConfig = resolveConfig(tailwindConfigFile);
window.tailwindConfig = tailwindConfig;
import "./app.js";
