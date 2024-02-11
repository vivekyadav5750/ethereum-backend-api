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

        const extractedData = [];

        // Iterate over each transaction object and extract required fields
        transactions.forEach(transaction => {
        const { hash, from, to, value, timeStamp } = transaction;
        time = new Date(timeStamp * 1000);
        old_time = new Date(timeStamp * 1000);
        new_time = new Date()
        const differenceInMilliseconds = Math.abs(new_time.getTime() - old_time.getTime());

        // Convert milliseconds to days and hours
        const millisecondsInDay = 1000 * 60 * 60 * 24;
        const days = Math.floor(differenceInMilliseconds / millisecondsInDay);
        const hours = Math.floor((differenceInMilliseconds % millisecondsInDay) / (1000 * 60 * 60));

        // Output the result
        console.log(`${days} days and ${hours} hours`);
        time = `${days} days  ${hours} hours`;
        extractedData.push({ hash, from, to, value, time });
        });

        // console.log(extractedData);

        return res.json({ success: true, address, balance:balanceInUsd2Decimal, transactions:extractedData });

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
