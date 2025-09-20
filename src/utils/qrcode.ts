import qr from "qrcode"

export async function qrCode(url:string){
    try{
        return await qr.toDataURL(url)
    }
    catch(err){
        console.log("Error" , err);
        return null;
    }
}