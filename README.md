# Ethereum Explorer - Backend API

This project is a backend API built in Node.js for Ethereum exploration. It provides three APIs to interact with Ethereum:

1. **Get Ethereum Price**
   - API endpoint: `[/ethereum/price](https://ethereum-backend-api.onrender.com/api/ethereum/price)`
   - Description: Retrieves the current price of Ethereum.

2. **Check Balance of Given Address**
   - API endpoint: `[/ethereum/balance/:address](https://ethereum-backend-api.onrender.com/api/ethereum/balance/0x1234567890123456789012345678901234567890)`
   - Description: Retrieves the balance of the provided Ethereum address.

3. **Get Transactions of Given Address**
   - API endpoint: `[/ethereum/transactions/:address](https://ethereum-backend-api.onrender.com/api/ethereum/transactions/0x1234567890123456789012345678901234567890)`
   - Description: Retrieves the transactions associated with the provided Ethereum address.

## Technologies Used
- **Node.js**: Backend JavaScript runtime environment.
- **Express**: Web application framework for Node.js.
- **Axios**: Promise-based HTTP client for making HTTP requests.

## Setup Instructions
1. Clone the repository to your local machine.
   ```bash
   git clone https://github.com/vivekyadav5750/ethereum-backend-api.git

2. Install dependencies using npm.
    ```bash
    cd ethereum-backend-api
    npm install
    ```
3. Run the server
    ```bash
    node app.js
    ```
Access the APIs using the provided endpoints.



