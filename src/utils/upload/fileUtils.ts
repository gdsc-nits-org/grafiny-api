export function generateUniqueFilename(originalFilename: string): string {
  const fileExtension = originalFilename.split(".").pop();
  const uniqueFilename = `${Date.now()}.${fileExtension}`;
  return uniqueFilename;
}
export function validateFileType(file: Express.Multer.File): boolean {
  const allowedTypes = ["image/jpeg", "image/png"];
  return allowedTypes.includes(file.mimetype);
}
