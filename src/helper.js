const fs = require("fs");
const crypto = require("crypto");
const basePath = "../../files/plain/dayX.txt";
const baseTarget = "../../files/encrypted/";

function encryptInputFile(day) {
  const file = fs.readFileSync(basePath.replace("X", day), {
    encoding: "utf8",
  });
  const algorithm = "aes-256-cbc";
  const key = crypto.scryptSync(getPw(), "salt", 32);
  const iv = crypto.randomBytes(16);
  const cipher = crypto.createCipheriv(algorithm, key, iv);

  let encrypted = cipher.update(file, "utf8", "hex");
  encrypted += cipher.final("hex");
  const result = iv.toString("hex") + ":" + encrypted;
  fs.writeFileSync(baseTarget + "/day" + day + ".bonbonn", result);
}

function getPw(){
    const pw = fs.readFileSync("../../pw", { encoding: "utf8" });
    return pw;
}

function decryptInputFile(day) {
  const encrypted = fs.readFileSync(baseTarget + "day" + day + ".bonbonn", {
    encoding: "utf8",
  });
  const [ivHex, encryptedHex] = encrypted.split(":");
  const algorithm = "aes-256-cbc";


  const key = crypto.scryptSync(getPw(), "salt", 32);
  const iv = Buffer.from(ivHex, "hex");
  const decipher = crypto.createDecipheriv(algorithm, key, iv);

  let decrypted = decipher.update(encryptedHex, "hex", "utf8");
  decrypted += decipher.final("utf8");
  fs.writeFileSync(basePath.replace("X", day), decrypted)

  return decrypted;
}

function getInputFile(day){
    return decryptInputFile(day);
}

module.exports = {
  getInputFile: getInputFile,
  encryptInputFile: encryptInputFile,
};
