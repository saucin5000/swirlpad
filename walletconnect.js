// Get the connect button element
const connectButton = document.getElementById('connect-button');

// disconnect button

const disconnectButton = document.createElement("button");
disconnectButton.classList.add(connectButton.classList.split(' '));
disconnectButton.style.display = 'none';
connectButton.parent.appendChild(disconnectButton);

disconnectButton.addEventListener("click", () => {
  connectButton.textContent = "Wallet Connect";
  disconnectButton.style.display = 'none';
});

// Get the balance elements
const ethBalanceElement = document.getElementById('eth-balance');
const pulseBalanceElement = document.getElementById('pulse-balance');
const walletAddressElement = document.getElementById('wallet-address');

 // Unpkg imports
const Web3Modal = window.Web3Modal.default;
const WalletConnectProvider = window.WalletConnectProvider.default;

// Initialize the Web3Modal instance
const web3Modal = new Web3Modal({
  cacheProvider: true,
  providerOptions: {
    walletconnect: {
      package: WalletConnectProvider,
      options: {
        rpc: {
          1: 'https://mainnet.infura.io/v3/your-project-id',
          100: 'https://rpc.pulsechain.com/'
        }
      }
    }
  }
});


// Add a click event listener to the button
connectButton.addEventListener('click', async () => {
  // Initialize the WalletConnect provider
  const provider = await web3Modal.connect();


  // Create a new web3 instance using the provider
  const web3 = new Web3(provider);

  // Use web3 to interact with the blockchain

  // Get the connected wallet address
  const accounts = await web3.eth.getAccounts();
  const address = accounts[0];
  connectButton.textContent = address.substring(0,4) + '...' + address.substring(address.length - 5, address.length - 1);

  // Get the Ethereum balance of the connected wallet
  const ethBalance = await web3.eth.getBalance(address);
  //ethBalanceElement.textContent = parseFloat(web3.utils.fromWei(ethBalance, 'ether')).toFixed(2);

  // Get the Pulse balance of the connected wallet
  const pulseContractAddress = '0x7c41e0668a3a38d3b8c830c1fca4fc6f06fba17d';
  const pulseContract = new web3.eth.Contract(ERC20ABI, pulseContractAddress);
  const pulseBalance = await pulseContract.methods.balanceOf(address).call();
  //pulseBalanceElement.textContent = web3.utils.fromWei(pulseBalance, 'ether');
 
   disconnectButton.style.display = 'block';

  // Close the modal
  document.querySelector('.modal').classList.remove('is-active');
});

// Get the modal element
const modal = document.querySelector('.modal');



// Open the modal when the connect button is clicked
connectButton.addEventListener('click', () => {
  // Open the modal
  modal.classList.add('is-active');
});

function closeModal() {
const modalClose = modal.querySelector('.modal-close');

if (modalClose) {

  // Add a click event listener to the modal close button
  modalClose.addEventListener('click', () => {
    // Close the modal
    modal.classList.remove('is-active');
  });
}
}


// Ethereum ERC20 ABI
const ERC20ABI = [
  {
    "inputs": [],
    "name": "decimals",
    "outputs": [
      {
        "internalType": "uint8",
        "name": "",
        "type": "uint8"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_owner",
        "type": "address"
      }
    ],
    "name": "balanceOf",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "balance",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  }
];
