import { ethers } from "ethers";

export async function sendTipOnChain(sender, receiver, tokenAddress, amount) {
  const provider = new ethers.JsonRpcProvider(process.env.RPC_URL);
  const signer = new ethers.Wallet(process.env.PRIVATE_KEY, provider);

  const abi = ["function transferFrom(address, address, uint256) external returns (bool)"];
  const token = new ethers.Contract(tokenAddress, abi, signer);
  const tx = await token.transferFrom(sender, receiver, ethers.parseUnits(amount.toString(), 6));
  await tx.wait();
  return tx.hash;
}