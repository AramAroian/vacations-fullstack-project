import { v4 as uuid } from "uuid";
import { UploadedFile } from "express-fileupload";
import path from "path"
import fsPromises from "fs/promises"

const imagesFolder = path.join(__dirname, "..", "1-assets", "images")

function getImagePath(imageName: string): string {
    return imagesFolder + "/" + imageName;
}

async function saveImage(image: UploadedFile): Promise<string> {

    const fileExt = image.name.substring(image.name.lastIndexOf("."));
    const fileName = uuid() + fileExt;
    const absolutePath = getImagePath(fileName);
    await image.mv(absolutePath);
    return fileName;
}

async function updateImage(newImage: UploadedFile, existingImgName: string): Promise<string> {

    await deleteImage(existingImgName)
    const fileName = await saveImage(newImage);
    return fileName;
}

async function deleteImage(imageName: string): Promise<void> {
    try {
        if (!imageName) return;
        const absolutePath = getImagePath(imageName);
        await fsPromises.unlink(absolutePath);
    }
    catch (err) {
        console.error(err.message)

    }
}

export default {
    getImagePath,
    updateImage,
    saveImage,
    deleteImage
};