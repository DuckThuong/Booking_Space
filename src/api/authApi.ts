interface LoginResponse {
  accessToken: string;
  refreshToken: string;
  user: any;
  data: { description: string };
}

const compressImage = (file: File): Promise<File> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event) => {
      const img = new Image();
      img.src = event.target?.result as string;
      img.onload = () => {
        const canvas = document.createElement("canvas");
        const MAX_WIDTH = 800;
        const MAX_HEIGHT = 800;
        let width = img.width;
        let height = img.height;

        if (width > height) {
          if (width > MAX_WIDTH) {
            height *= MAX_WIDTH / width;
            width = MAX_WIDTH;
          }
        } else {
          if (height > MAX_HEIGHT) {
            width *= MAX_HEIGHT / height;
            height = MAX_HEIGHT;
          }
        }

        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext("2d");
        ctx?.drawImage(img, 0, 0, width, height);

        canvas.toBlob(
          (blob) => {
            if (blob) {
              const compressedFile = new File([blob], file.name, {
                type: "image/jpeg",
                lastModified: Date.now(),
              });
              resolve(compressedFile);
            } else {
              reject(new Error("Failed to compress image"));
            }
          },
          "image/jpeg",
          0.7
        );
      };
      img.onerror = () => reject(new Error("Failed to load image"));
    };
    reader.onerror = () => reject(new Error("Failed to read file"));
  });
};

export const convertImageToBase64 = async (file: File): Promise<string> => {
  try {
    // Compress image first
    const compressedFile = await compressImage(file);

    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(compressedFile);
      reader.onload = () => {
        if (typeof reader.result === "string") {
          resolve(reader.result);
        } else {
          reject(new Error("Failed to convert image to base64"));
        }
      };
      reader.onerror = (error) => reject(error);
    });
  } catch (error) {
    console.error("Error compressing image:", error);
    throw error;
  }
};

export const convertImagesToBase64 = async (
  images: File[]
): Promise<string[]> => {
  try {
    const base64Promises = images.map((file) => convertImageToBase64(file));
    return await Promise.all(base64Promises);
  } catch (error) {
    console.error("Error converting images to base64:", error);
    throw error;
  }
};
