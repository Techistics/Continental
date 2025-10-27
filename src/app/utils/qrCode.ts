import QRCode from "qrcode";

/**
 * Generate a QR code as a Data URL from any text or URL.
 * @param text - The text or link to encode in the QR code.
 * @returns Promise<string> - A base64 data URL of the generated QR code.
 */
export async function qrCode(text: string): Promise<string> {
  try {
    const qr = await QRCode.toDataURL(text);
    return qr;
  } catch (err) {
    console.error("QR generation failed:", err);
    throw new Error("Failed to generate QR code");
  }
}
