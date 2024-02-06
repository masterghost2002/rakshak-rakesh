import Cryptr from "cryptr";
import config from "../config/config";
const saltSecret:string = config?.saltSecret || 'thisIsASecret';
const cryptr = new Cryptr(saltSecret, { encoding: 'base64', pbkdf2Iterations: 10000, saltLength: 10 });
export default cryptr;