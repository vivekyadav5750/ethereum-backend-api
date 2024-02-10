const axios = require('axios');
const Address = require('../models/model'); // Add the missing import for the Address model

// Your Etherscan API Key
const apiKey = 'RQQAGD6QAGT7399EHRYPJRZUYKVZRUSGEG';
exports.getAddressDetails = async (req, res) => {
    try{
        const address = req.params.address;
        console.log("Address : ",address);

        // 1. Balance of Ethereum address
        const balanceResponse = await axios.get(`https://api.etherscan.io/api?module=account&action=balance&address=${address}&tag=latest&apikey=${apiKey}`);
        const balanceInWei = parseInt(balanceResponse.data.result);
        const balanceInEth = balanceInWei / 10**18;
        console.log("balance : ",balanceInEth);

        // 2. Get current ETH price in USD
        // const priceResponse = await axios.get(`https://api.etherscan.io/api?module=stats&action=ethprice&apikey=${apiKey}`);
        // const ethPriceInUsd = parseFloat(priceResponse.data.result.ethusd);

        // OR 
        const response = await axios.get('https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd');
        const ethPriceInUsd = response.data.ethereum.usd;
        console.log("Price in usd : ",ethPriceInUsd);

        // 3. Calculate balance in USD
        const balanceInUsd = balanceInEth * ethPriceInUsd;
        console.log("balance in usd : ",balanceInUsd);

        // 4. balance in 2 decimal
        const balanceInUsd2Decimal = balanceInUsd.toFixed(2);
        console.log("balance in usd 2 decimal : ",balanceInUsd2Decimal);

        // 5. Fetch Ethereum transactions of given address
        const transactionsResponse = await axios.get(`https://api.etherscan.io/api?module=account&action=txlist&address=${address}&startblock=0&endblock=99999999&sort=asc&apikey=${apiKey}`);
        const transactions = transactionsResponse.data.result;
        console.log("Transactions : ",transactions);

        // res.json({ success: true, address, balanceInEth });
        return res.json({ success: true, address, balanceInUsd2Decimal, transactions });

    }
    catch(error){
        console.error('Error fetching ETH balance:', error.message);
        res.status(500).json({ success: false, message: 'Error fetching address details' });
    }
}

exports.getEthereumPrice = async (req, res) => {
    try {
        const response = await axios.get('https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd');
        const ethereumPrice = response.data.ethereum.usd;
        res.json({ success: true, ethereumPrice });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Error fetching Ethereum price' });
    }
};
