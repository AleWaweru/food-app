import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import uniqid from 'uniqid';

export async function POST(req) {
  const data = await req.formData();

  if (data.get('file')) {
    const file = data.get('file');

    const s3Client = new S3Client({
      region: 'us-east-1',
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY,
        secretAccessKey: process.env.AWS_SECRET_KEY,
      },
    });

    const ext = file.name.split('.').slice(-1)[0];
    const newFileName = uniqid() + '.' + ext;

    const chunks = [];
    for await (const chunk of file.stream()) {
      chunks.push(chunk);
    }

    const buffer = Buffer.concat(chunks);
    const bucket = 'alex-food-ordering';

    try {
      await s3Client.send(new PutObjectCommand({
        Bucket: bucket,
        Key: newFileName, // Use 'Key' instead of 'key'
        ACL: 'public-read',
        ContentType: file.type,
        Body: buffer,
      }));

      const link = 'https://' + bucket + '.s3.amazonaws.com/' + newFileName;

      console.log('File uploaded successfully. Link:', link);

      return Response.json(link);
    } catch (error) {
      console.error('Error uploading file to S3:', error);
      return Response.json({ error: 'File upload failed.' }, { status: 500 });
    }
  }

  return Response.json(true);
}
