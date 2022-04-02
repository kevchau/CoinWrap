/*
    Mock CoinCap API 
*/

exports.passRequestPath = (path) => {
    
    if (path == '/assets/bitcoin') {
        return new Promise((resolve) => {
            resolve({"data":{"id":"bitcoin","rank":"1","symbol":"BTC","name":"Bitcoin","supply":"19000237.0000000000000000","maxSupply":"21000000.0000000000000000","marketCapUsd":"891735307552.9858831796883212","volumeUsd24Hr":"18769905146.3016932596934620","priceUsd":"46932.8518140582079676","changePercent24Hr":"2.7882042247560015","vwap24Hr":"45554.0161098479517894","explorer":"https://blockchain.info/"},"timestamp":1648861288294})
        });
    } else if (path == '/assets/litecoin') {
        return new Promise((resolve) => {
            resolve({"data":{"id":"litecoin","rank":"21","symbol":"LTC","name":"Litecoin","supply":"69975481.2779146400000000","maxSupply":"84000000.0000000000000000","marketCapUsd":"8880805757.1306300113248456","volumeUsd24Hr":"353679142.3079855153989943","priceUsd":"126.9131072047881959","changePercent24Hr":"1.6695834724422290","vwap24Hr":"123.5499458084808250","explorer":"http://explorer.litecoin.net/chain/Litecoin"},"timestamp":1648861303175})
        });
    } else if (path == '/assets/dogecoin') {
        return new Promise((resolve) => {
            resolve({"data":{"id":"dogecoin","rank":"12","symbol":"DOGE","name":"Dogecoin","supply":"132670764299.8940900000000000","maxSupply":null,"marketCapUsd":"18948050809.0659978515125328","volumeUsd24Hr":"459537673.5875741813635078","priceUsd":"0.1428200923470607","changePercent24Hr":"2.8756589782774989","vwap24Hr":"0.1382313029754215","explorer":"http://dogechain.info/chain/Dogecoin"},"timestamp":1648862229583})
        });
    } else if(path == '/rates/dogecoin') {
        return new Promise((resolve) => {
            resolve({"data":{"id":"dogecoin","symbol":"DOGE","currencySymbol":null,"type":"crypto","rateUsd":"0.5"},"timestamp":1648860783305})
        });
    }

};