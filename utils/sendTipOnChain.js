import { ethers } from "ethers";

export async function sendTipOnChain(sender, receiver, tokenAddress, amount) {
  if (!process.env.RPC_URL || !process.env.PRIVATE_KEY) {
    throw new Error('RPC_URL or PRIVATE_KEY not configured');
  }

  if (!receiver || !tokenAddress || !amount) {
    throw new Error('Missing required parameters: receiver, tokenAddress, or amount');
  }

  try {
    const provider = new ethers.JsonRpcProvider(process.env.RPC_URL);
    const signer = new ethers.Wallet(process.env.PRIVATE_KEY, provider);

    const abi = ["function transfer(address, uint256) external returns (bool)"];
    const token = new ethers.Contract(tokenAddress, abi, signer);
    
    const parsedAmount = ethers.parseUnits(amount.toString(), 6);
    const tx = await token.transfer(receiver, parsedAmount);
    
    await tx.wait();
    return tx.hash;
  } catch (error) {
    console.error('Blockchain transaction error:', error);
    throw new Error(`Transaction failed: ${error.message}`);
  }
}