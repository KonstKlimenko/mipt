const sha256 = require('crypto-js/sha256');

var transaction = {
    POW:'',
    nonce: 0,
    type: 'transaction',
    tranId: 'alskjfoau234h',
    from_senderId: 'adfak343taet'
}

var tx = transaction;

var txStr = '';
var nonce = 0;
var target = 100000000;
var sha = target + 1;

while (sha > target){
    nonce ++;
    transaction['nonce'] = nonce;
    txStr = JSON.stringify(transaction);
    sha = parseInt(sha256(txStr),16)/(10000000000000000000000000000000000000000000000000000000000000000000);
    console.log('nonce: '+ nonce +'; sha256 : ' + sha);
}
