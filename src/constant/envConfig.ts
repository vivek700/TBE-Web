const MONGODB_URI = process.env.MONGODB_URI as string;
const GOOGLE_AUTH_CLIENT_ID = process.env
  .NEXT_PUBLIC_GOOGLE_AUTH_CLIENT_ID as string;
const GOOGLE_AUTH_CLIENT_SECRET = process.env
  .NEXT_PUBLIC_GOOGLE_AUTH_CLIENT_SECRET as string;

export { MONGODB_URI, GOOGLE_AUTH_CLIENT_ID, GOOGLE_AUTH_CLIENT_SECRET };
