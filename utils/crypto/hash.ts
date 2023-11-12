import crypto from "crypto";

export const cryptoEncode = async (password: string) => {
    const salt = await crypto.randomBytes(16);
    const hashBuffer = await crypto.scryptSync(password, salt, 64);
    const saltBase64 = salt.toString("base64");
    const hashBase64 = hashBuffer.toString("base64");

    return `${saltBase64}.${hashBase64}`;
}
export const cryptoDecode = async (password: string, encoded: string) => {
    const [saltBase64, hashBase64] = encoded.split(".");
    const salt = Buffer.from(saltBase64, "base64");
    const hashBuffer = await crypto.scryptSync(password, salt, 64);
    const isPasswordValid = await crypto.timingSafeEqual(
      Buffer.from(hashBase64, "base64"),
      hashBuffer
    );
  
    return isPasswordValid;
};
  
  
  
  
  
  