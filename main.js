import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const main = async (__filename, __dirname) => {
};

main(__filename, __dirname).catch(console.error);
