import { NeynarAPIClient } from "@neynar/nodejs-sdk";
import { sendTipOnChain } from "../../utils/sendTipOnChain";


const client = new NeynarAPIClient(process.env.NEYNAR_API_KEY);

export default async function handler(req, res) {
  const { untrustedData } = req.body;

  const fid = untrustedData.fid;
  const userData = await client.lookupUserByFid(fid);
  const sender = userData.custody_address;

  const txHash = await sendTipOnChain(sender, process.env.RECEIVER_ADDRESS, process.env.TOKEN_ADDRESS, 1);

  res.setHeader("Content-Type", "text/html");
  res.send(`
    <html>
      <head>
        <meta property="og:title" content="✅ Tip Sent!" />
        <meta property="og:image" content="https://yourdomain.com/images/success.png" />
        <meta property="fc:frame" content="vNext" />
        <meta property="fc:frame:image" content="https://yourdomain.com/images/success.png" />
        <meta property="fc:frame:button:1" content="View TX" />
        <meta property="fc:frame:button:1:action" content="link" />
        <meta property="fc:frame:button:1:target" content="https://etherscan.io/tx/${txHash}" />
      </head>
    </html>
  `);
}