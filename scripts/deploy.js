const hre = require("hardhat");

async function main() {
  const TodoList = await hre.ethers.getContractFactory("TodoList");
  const todoList = await TodoList.deploy();

  await todoList.deployed();

  console.log(`TodoList deployed to: ${todoList.address}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
