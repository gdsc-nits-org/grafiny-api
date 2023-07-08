import { S3Client, DeleteObjectCommand } from "@aws-sdk/client-s3";

export const deleteFiles = async (fileKeys: string[]) => {
  const s3Client = new S3Client({
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
    },
    region: process.env.AWS_REGION!,
  });

  const deleteCommands = fileKeys.map((key) => ({
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: key,
  }));

  return Promise.all(
    deleteCommands.map((command) =>
      s3Client.send(new DeleteObjectCommand(command))
    )
  );
};
