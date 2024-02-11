const axios = require('axios');
const Address = require('../models/model'); // Add the missing import for the Address model
const config = require('../../config/config');

// Your Etherscan API Key
const apiKey = config.apiKey;
exports.getAddressBalance = async (req, res) => {
    try{
        const address = req.params.address;

        // 1. Balance of Ethereum address
        const balanceResponse = await axios.get(`https://api.etherscan.io/api?module=account&action=balance&address=${address}&tag=latest&apikey=${apiKey}`);
        const balanceInWei = parseInt(balanceResponse.data.result);
        const balanceInEth = balanceInWei / 10**18;

        // 2. Get current ETH price in USD
        // const priceResponse = await axios.get(`https://api.etherscan.io/api?module=stats&action=ethprice&apikey=${apiKey}`);
        // const ethPriceInUsd = parseFloat(priceResponse.data.result.ethusd);

        // OR 
        const response = await axios.get('https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd');
        const ethPriceInUsd = response.data.ethereum.usd;

        // 3. Calculate balance in USD
        const balanceInUsd = balanceInEth * ethPriceInUsd;

        // 4. balance in 2 decimal
        const balanceInUsd2Decimal = balanceInUsd.toFixed(2);

        return res.json({ success: true, address, balance:balanceInUsd2Decimal });

    }
    catch(error){
        console.error('Error fetching ETH balance:', error.message);
        res.status(500).json({ success: false, message: 'Error fetching address balance' });
    }
}

exports.getTransactionDeatils = async (req, res) => {
    try{
        const address = req.params.address;
    
        // 1. Fetch Ethereum transactions of given address
        const transactionsResponse = await axios.get(`https://api.etherscan.io/api?module=account&action=txlist&address=${address}&startblock=0&endblock=99999999&sort=asc&apikey=${apiKey}`);
        const transactions = transactionsResponse.data.result;

        const extractedData = [];

        // 2.Iterate over each transaction object and extract required fields
        transactions.forEach(transaction => {
        const { hash, from, to, value, timeStamp } = transaction;
        time = new Date(timeStamp * 1000);
        old_time = new Date(timeStamp * 1000);
        new_time = new Date()
        const differenceInMilliseconds = Math.abs(new_time.getTime() - old_time.getTime());

        // 3.Convert milliseconds to days and hours
        const millisecondsInDay = 1000 * 60 * 60 * 24;
        const days = Math.floor(differenceInMilliseconds / millisecondsInDay);
        const hours = Math.floor((differenceInMilliseconds % millisecondsInDay) / (1000 * 60 * 60));

        // 4.Output the result
        time = `${days} days  ${hours} hours`;
        extractedData.push({ hash, from, to, value, time });
        });

        return res.json({ success: true, address, transactions:extractedData });

    }
    catch(error){
        console.error('Error fetching ETH Transaction:', error.message);
        res.status(500).json({ success: false, message: 'Error fetching address Transaction' });
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
