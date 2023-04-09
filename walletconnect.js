// Get the connect button element
const connectButton = document.getElementById('connect-button');

// Add a click event listener to the button
connectButton.addEventListener('click', async () => {
  // Initialize the WalletConnect provider
  const provider = new WalletConnectProvider.default({
    rpc: {
      1: 'https://mainnet.infura.io/v3/your-project-id',
      100: 'https://rpc.pulsechain.com/'
    }
  });

  // Enable the provider
  await provider.enable();

  // Create a new web3 instance using the provider
  const web3 = new Web3(provider);

  // Use web3 to interact with the blockchain
  // ...

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
