const hre = require("hardhat");

async function main() {
 
  const RobotPuckNFT = await hre.ethers.getContractFactory("RobotPuckNFT");
  const robotPuckNFT = await RobotPuckNFT.deploy();

  await robotPuckNFT.deployed();

  console.log(
    `robotPuckNFT deployed to ${robotPuckNFT.address}`
  );
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
