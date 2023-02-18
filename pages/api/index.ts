import type { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "./auth/[...nextauth]";
import { matchEmail } from "../../src/libs/matchEmail";

const KJUR = require("jsrsasign");

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getServerSession(req, res, authOptions);
  if (!process.env.ALLOW_EMAIL_DOMAIN) {
    throw new Error("ALLOW_EMAIL_DOMAIN is not set");
  }
  const [, error] = matchEmail(
    session?.user?.email,
    process.env.ALLOW_EMAIL_DOMAIN
  );
  if (error) {
    res.status(401).json({ error });
    return;
  }

  const iat = Math.round(new Date().getTime() / 1000) - 30;
  const exp = iat + 60 * 60 * 2;

  const oHeader = { alg: "HS256", typ: "JWT" };

  const oPayload = {
    sdkKey: process.env.NEXT_PUBLIC_ZOOM_SDK_KEY,
    mn: req.body.meetingNumber,
    role: req.body.role,
    iat: iat,
    exp: exp,
    appKey: process.env.NEXT_PUBLIC_ZOOM_SDK_KEY,
    tokenExp: iat + 60 * 60 * 2,
  };

  const sHeader = JSON.stringify(oHeader);
  const sPayload = JSON.stringify(oPayload);
  const signature = KJUR.jws.JWS.sign(
    "HS256",
    sHeader,
    sPayload,
    process.env.ZOOM_SDK_SECRET
  );

  res.json({
    signature: signature,
  });
}
