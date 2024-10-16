import React, { useState, useEffect, useCallback } from "react";
import { BrowserProvider, Contract } from "ethers";
import TodoListABI from "./contracts/TodoList.json";

const contractAddress = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512";

function App() {
  const [account, setAccount] = useState(null);
  const [tasks, setTasks] = useState([]);

  // Use useCallback to avoid re-creating the function on each render.
  const connectWallet = useCallback(async () => {
    if (window.ethereum) {
      try {
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        setAccount(accounts[0]);
        await loadTasks();
      } catch (error) {
        console.error("User denied wallet access", error);
      }
    } else {
      alert("MetaMask is not installed!");
    }
  }, []);

  async function loadTasks() {
    const provider = new BrowserProvider(window.ethereum); // Use BrowserProvider for v6
    const contract = new Contract(contractAddress, TodoListABI.abi, provider);

    const taskCount = await contract.taskCount();
    const loadedTasks = [];

    for (let i = 1; i <= taskCount; i++) {
      const task = await contract.tasks(i);
      loadedTasks.push(task);
    }
    setTasks(loadedTasks);
  }

  // Use connectWallet in useEffect and avoid unnecessary re-renders.
  useEffect(() => {
    connectWallet();
  }, [connectWallet]);

  return (
    <div>
      <h1>Todo List dApp</h1>
      <p>Connected Account: {account}</p>
      <button onClick={connectWallet}>Connect Wallet</button>
      <ul>
        {tasks.map((task, index) => (
          <li key={index}>{task.content}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
