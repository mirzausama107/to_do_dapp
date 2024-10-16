import hardhat from "hardhat";
import { expect } from "chai";

const { ethers } = hardhat;

describe("TodoList", function () {
  it("Should add a new task", async function () {
    const TodoList = await ethers.getContractFactory("TodoList");
    const todoList = await TodoList.deploy();
    await todoList.deployed();

    await todoList.addTask("Learn Solidity");
    const task = await todoList.tasks(1);
    expect(task.content).to.equal("Learn Solidity");
  });
});
