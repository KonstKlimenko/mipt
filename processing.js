const crypto = require('crypto')
const sha256 = require('crypto-js/sha256');
var nonce = 0;
var target = 1000000;

let transactionPool = [];
exports.createTx = (_msg, _senderId) =>{
    var msg = _msg;
    var msgArr = msg.trim().split(' ');
    if(msgArr[0]=='pay')
    {
            var tranId = crypto.randomBytes(8);

            var nonce = 0;
            var hashcash = target + 1;
            
            var transaction = {
                POW:'',
                nonce: '',
                type: 'transaction',
                tranId: tranId.toString(),
                from:_senderId.toString(),
                to: msgArr[1].toString(),
                amount: msgArr[2].toString()
            }
/*
            while(hashcash > target)
            {
                nonce++;
                hashcash = mySha256(transaction, nonce);
            }
*/
            transaction.POW = 72839;
            transaction.nonce = 99238;

            msg = JSON.stringify(transaction);
    }
    return msg;
}

function mySha256(_tx, _nonce){
    var tx = _tx;
    tx.POW = '';
    tx.nonce = _nonce;
    var txStr = JSON.stringify(tx);
    sha = parseInt(sha256(txStr),16)/(10000000000000000000000000000000000000000000000000000000000000000000);
    console.log('nonce: '+ tx.nonce +'; sha256 : ' + sha);

    return sha;
}

exports.onReceive = (_msg) =>{
    var msg = JSON.parse(_msg);

    if(msg['type']=='transaction'){
        var tx = msg;
        //add some validation logic

        if(tx.POW < target && tx.POW == mySha256(tx, tx.nonce) )
        {
            console.log('--- Valid transaction ---');
        }else{
            console.log('--- Bad transaction ---');
        }
    }
}

function createBlock(_transactionPool){
    //some logic that creates Block
    
    //return: send this block to peers
}
