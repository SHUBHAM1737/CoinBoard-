import { NeynarAPIClient } from "@neynar/nodejs-sdk";
import { sendTipOnChain } from "../../utils/sendTipOnChain";


const client = new NeynarAPIClient({ apiKey: process.env.NEYNAR_API_KEY });

export default async function handler(req, res) {
  try {
    if (req.method !== 'POST') {
      return res.status(405).json({ error: 'Method not allowed' });
    }

    const { untrustedData } = req.body;
    
    if (!untrustedData || !untrustedData.fid) {
      return res.status(400).json({ error: 'Invalid request data' });
    }

    if (!process.env.NEYNAR_API_KEY) {
      return res.status(500).json({ error: 'Neynar API key not configured' });
    }

    if (!process.env.RECEIVER_ADDRESS || !process.env.TOKEN_ADDRESS) {
      return res.status(500).json({ error: 'Receiver or token address not configured' });
    }

    const fid = untrustedData.fid;
    const userData = await client.lookupUserByFid(fid);
    
    if (!userData || !userData.custody_address) {
      return res.status(400).json({ error: 'Unable to fetch user data' });
    }

    const sender = userData.custody_address;
    const txHash = await sendTipOnChain(sender, process.env.RECEIVER_ADDRESS, process.env.TOKEN_ADDRESS, 1);

    res.setHeader("Content-Type", "text/html");
    res.send(`
      <html>
        <head>
          <meta property="og:title" content="✅ Tip Sent!" />
          <meta property="og:image" content="${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/images/success.png" />
          <meta property="fc:frame" content="vNext" />
          <meta property="fc:frame:image" content="${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/images/success.png" />
          <meta property="fc:frame:button:1" content="View TX" />
          <meta property="fc:frame:button:1:action" content="link" />
          <meta property="fc:frame:button:1:target" content="https://etherscan.io/tx/${txHash}" />
        </head>
      </html>
    `);
  } catch (error) {
    console.error('Tip processing error:', error);
    res.setHeader("Content-Type", "text/html");
    res.send(`
      <html>
        <head>
          <meta property="og:title" content="❌ Tip Failed" />
          <meta property="og:image" content="${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/images/error.png" />
          <meta property="fc:frame" content="vNext" />
          <meta property="fc:frame:image" content="${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/images/error.png" />
          <meta property="fc:frame:button:1" content="Try Again" />
          <meta property="fc:frame:post_url" content="${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/tip" />
        </head>
      </html>
    `);
  }
}