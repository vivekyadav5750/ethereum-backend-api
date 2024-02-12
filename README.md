# Ethereum Explorer - Backend API

This project is a backend API built in Node.js for Ethereum exploration. It provides three APIs to interact with Ethereum:

## API Endpoints

1. **Get Ethereum Price**
   - **API endpoint**: `[/ethereum/price]` Access [here](https://ethereum-backend-api.onrender.com/api/ethereum/price).
   - **Method**: `GET`
   - **Description**: Retrieves the current price of Ethereum.

2. **Check Balance of Given Address**
   - **API endpoint**: `[/ethereum/balance/:address]` Access [here](https://ethereum-backend-api.onrender.com/api/ethereum/balance/0x1234567890123456789012345678901234567890).
   - **Method**: `GET`
   - **Description**: Retrieves the balance of the provided Ethereum address.

3. **Get Transactions of Given Address**
   - **API endpoint**: `[/ethereum/transactions/:address]` Access [here](https://ethereum-backend-api.onrender.com/api/ethereum/transactions/0x1234567890123456789012345678901234567890).
   - **Method**: `GET`
   - **Description**: Retrieves the transactions associated with the provided Ethereum address.

## Technologies Used
- **Node.js**: Backend JavaScript runtime environment.
- **Express**: Web application framework for Node.js.
- **Axios**: Promise-based HTTP client for making HTTP requests.

## Dependencies

- [Node](https://nodejs.org/docs/latest/api/): Backend JavaScript runtime environment.
- [Express](https://expressjs.com/): Fast, unopinionated, minimalist web framework for Node.js.
- [Axios](https://axios-http.com/): Promise based HTTP client for the browser and node.js.


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

## Live Demo

You can find a live demo of the Ethereum Explorer frontend using this backend API at [https://ethereum-frontend-react.onrender.com/](https://ethereum-frontend-react.onrender.com/).

## Contributing

Contributions are welcome! If you find any issues or would like to contribute enhancements, please feel free to open an issue or submit a pull request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.


