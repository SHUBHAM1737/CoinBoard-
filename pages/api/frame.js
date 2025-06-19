export default function handler(req, res) {
  res.setHeader("Content-Type", "text/html");
  res.send(`
    <html>
      <head>
        <meta property="og:title" content="Tip Shubham with 1 USDC!" />
        <meta property="og:image" content="https://yourdomain.com/images/tip-preview.png" />
        <meta property="fc:frame" content="vNext" />
        <meta property="fc:frame:image" content="https://yourdomain.com/images/tip-preview.png" />
        <meta property="fc:frame:button:1" content="Send Tip" />
        <meta property="fc:frame:post_url" content="https://yourdomain.com/api/tip" />
      </head>
    </html>
  `);
}