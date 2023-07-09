import {
  S3Client,
  PutObjectCommand,
  PutObjectCommandInput,
} from "@aws-sdk/client-s3";

export const s3Upload = async (files: Express.Multer.File[] | undefined) => {
  if (!files) {
    throw new Error("No files provided");
  }
  const s3client = new S3Client({
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
    },
    region: process.env.AWS_REGION!,
  });

  const params = files.map((file) => ({
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: Date.now() + `_${file.originalname}`,
    Body: file.buffer,
    ContentType: file.mimetype,
    acl: "public-read",
  }));

  return await Promise.all(
    params.map((param: PutObjectCommandInput) =>
      s3client.send(new PutObjectCommand(param))
    )
  );
};
