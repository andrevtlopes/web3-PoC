// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
import { ethers } from "hardhat";

async function main() {
  // Hardhat always runs the compile task when running scripts with its command
  // line interface.
  //
  // If this script is run directly using `node` you may want to call compile
  // manually to make sure everything is compiled
  // await hre.run('compile');

  // We get the contract to deploy
  const BuyFamon = await ethers.getContractFactory("BuyFamon");
  const buyFamon = await BuyFamon.deploy(20, ethers.utils.parseEther("1.0"));
  
  const BuyToken = await ethers.getContractFactory("BuyToken");
  const buyToken = await BuyToken.deploy(ethers.utils.parseEther("40.0"), ethers.utils.parseEther("20.0"));

  await buyFamon.deployed();
  await buyToken.deployed();

  console.log("Buy Famon deployed to:", buyFamon.address);
  console.log("Buy Token deployed to:", buyToken.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
