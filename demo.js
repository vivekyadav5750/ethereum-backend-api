const axios = require('axios');

// Your Etherscan API Key
const apiKey = 'RQQAGD6QAGT7399EHRYPJRZUYKVZRUSGEG';

// Ethereum address to check
const ethereumAddress = '0x1234567890123456789012345678901234567890';

// Function to get ETH balance in USD
async function getEthBalance(address) {
    try {
        const balanceResponse = await axios.get(`https://api.etherscan.io/api?module=account&action=balance&address=${address}&tag=latest&apikey=${apiKey}`);
        const balanceInWei = parseInt(balanceResponse.data.result);
        const balanceInEth = balanceInWei / 10**18; // Convert from Wei to Ether

        // Get current ETH price in USD
        const priceResponse = await axios.get(`https://api.etherscan.io/api?module=stats&action=ethprice&apikey=${apiKey}`);
        const ethPriceInUsd = parseFloat(priceResponse.data.result.ethusd);

        // Calculate balance in USD
        const balanceInUsd = balanceInEth * ethPriceInUsd;

        return balanceInUsd;
    } catch (error) {
        console.error('Error fetching ETH balance:', error.message);
        return null;
    }
}

// Function to get transaction history
async function getTransactionHistory(address) {
    try {
        const response = await axios.get(`https://api.etherscan.io/api?module=account&action=txlist&address=${address}&startblock=0&endblock=99999999&sort=asc&apikey=${apiKey}`);
        return response.data.result;
    } catch (error) {
        console.error('Error fetching transaction history:', error.message);
        return [];
    }
}

// Main function to fetch balance and transaction history
async function main() {
    const balanceInUsd = await getEthBalance(ethereumAddress);
    if (balanceInUsd !== null) {
        console.log(`Balance of ${ethereumAddress}: ${balanceInUsd.toFixed(2)} USD`);
    }

    const transactions = await getTransactionHistory(ethereumAddress);
    console.log(`Transaction history of ${ethereumAddress}:`);
    transactions.forEach((tx, index) => {
        console.log(`${index + 1}. From: ${tx.from}, To: ${tx.to}, Value: ${tx.value} Wei, Time: ${new Date(tx.timeStamp * 1000)}`);
    });
}

// Run the main function
main();
