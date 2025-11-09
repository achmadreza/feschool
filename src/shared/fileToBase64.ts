export function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file); // Reads the file as a Data URL

    reader.onload = () => {
      // The result will be a Data URL (e.g., "data:image/png;base64,iVBORw0KGgo...")
      // You might want to extract just the Base64 part if needed
      const base64String = reader.result as string;
      resolve(base64String);
    };

    reader.onerror = (error) => {
      reject(error);
    };
  });
}
