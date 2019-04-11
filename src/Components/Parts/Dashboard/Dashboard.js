import React, {Component} from 'react';
import {ethers} from 'ethers';
import Fire from '../../../Config/Fire';
import SimpleCrypto from "simple-crypto-js";
import Web3 from 'web3';
import ABI from './ContracctDet/ABI';
import AccountDet from './AccountDetails';
import ProgressSpiner from '../../Parts/ProgressSpinner';
import TokenSendDiag from "./Contracts/DashDiagz/TokenSendDiag";
import DepositTokensDiag from "./Contracts/DashDiagz/DepositTokensDiag";
import axios from "axios";
import EthereumTx from "ethereumjs-tx";


class Dashboard extends Component {


    constructor(props) {
        super(props);
        this.getMnemonic = this.getMnemonic.bind(this);
        this.openSendTokenDiag = this.openSendETHDiag.bind(this);
        this.makeDeposit = this.makeDeposit.bind(this);
        this.SendToken = this.SendToken.bind(this);
        this.state = {
            number: 1,
            userid: '',
            mnemonic: '',
            web3: '',
            weiBalance: 0,
            KenCoinBalance: 0,
            KencoinContract: '',
            isLoading: true,
            tokenopen: false,
            ETHopen: false,
        }


    }

    async getMnemonic() {
        const db = Fire.firestore();
        const userid = Fire.auth().currentUser.uid;
        this.setState({userid: userid});
        console.clear();
        console.log("the User");
        await db.collection("users").where('uid', '==', userid).get().then((snapshot) => {
            var docs = snapshot.docs;
            console.log(docs[0].data().mnemonic);
            this.setState({
                number: 2,
                mnemonic: docs[0].data().mnemonic
            })
        });

        console.log(this.state);
        this.decryptMnemo();
    }

    decryptMnemo(mnemonic) {
        const userid = Fire.auth().currentUser.uid;
        console.log(userid);
        var simplecrypto = new SimpleCrypto(userid + "");
        var decrypted = simplecrypto.decrypt(this.state.mnemonic);
        this.setState({
            mnemonicwords: decrypted
        });

        console.log(this.state);
        this.recreateWallet();
    }


    async recreateWallet() {
        var web3;
        var Wallet = ethers.Wallet.fromMnemonic(this.state.mnemonicwords);
        console.log(Wallet);
        this.setState({
            wallet: Wallet,
            address: Wallet.signingKey.address,
            prrivKey: Wallet.signingKey.privateKey,

        });

        console.clear();
        console.log(this.state);

        if (typeof web3 !== 'undefined') {
            web3 = new Web3(web3.currentProvider);
        } else {
            console.log("Not found");
            // set the provider you want from Web3.providers
            web3 = new Web3(new Web3.providers.HttpProvider("https://rinkeby.infura.io/v3/c5aa372b19484e00ad066119a24c646e"));
            console.log("Created");
            console.log(web3);
            this.setState({web3: web3})
        }


        web3.eth.defaultAccount = this.state.address;
        web3.eth.accounts[0] = this.state.address;
        console.log("Balance");
        var weiBalances = web3.toDecimal(web3.eth.getBalance(web3.eth.defaultAccount));
        var etherBalance = web3.fromWei(weiBalances, 'ether');
        this.setState({
            weiBalance: etherBalance
        });
        // console.log(etherBalance)

        var contractAddress = "0x068540764de212447eeaf9928cde4218fee204d7";
        var KenCoin = web3.eth.contract(ABI).at(contractAddress);
        console.log("Contract");
        console.log(KenCoin);
        var userBal = KenCoin.balanceOf(web3.eth.defaultAccount);
        // console.clear();
        console.log(etherBalance);
        console.log(userBal.c[0] / 10000);
        this.setState({
            KenCoinBalance: userBal.c[0] / 10000,
            KencoinContract: KenCoin
        });

        this.setState({web3: web3});

        // let nonce = web3.eth.getTransactionCount(web3.eth.defaultAccount)
        // console.log('The outgoing transaction count for your wallet address is: ${nonce}'.magenta)

        // let response = await axios.get(`https://ethgasstation.info/json/ethgasAPI.json`)
        // let prices = {
        //     low: response.data.safeLow / 10,
        //     medium: response.data.average / 10,
        //     high: response.data.fast / 10,
        //     highest: response.data.fastest / 10,
        // }

        // console.log(prices);


        // let details = {
        //     "to": contractAddress,
        //     "value": web3.toHex(web3.toWei(1, 'ether')),
        //     "gas": 250000,
        //     "gasPrice": prices.low * 1000000000, // converts the gwei price to wei
        //     "nonce": nonce,
        //     "chainId": 4 // EIP 155 chainId - mainnet: 1, rinkeby: 4
        // }

        // const transaction = new EthereumTx(details)
        // var privatekey = this.state.prrivKey;
        // privatekey = privatekey.substr(2)
        // console.log(privatekey);
        // var privKey = new Buffer(privatekey, 'hex');

        // transaction.sign(privKey)

        // const serializedTx = transaction.serialize()

        // web3.eth.sendRawTransaction('0x' + serializedTx.toString('hex'), function(err, hash) {
        //     if (!err)
        //         {
        //           console.log('Txn Sent and hash is '+hash);
        //         }
        //     else
        //         {
        //           console.error(err);
        //         }
        //   });
        console.clear();
        this.setState({isLoading: false});
        console.clear();
        console.log("The Final State");
        console.log(this.state)
    }


    async SendToken(userAddr, Amount) {
        let Web3js = this.state.web3;
        let addr = this.state.address;
        let privKey = this.state.prrivKey;
        let value = Web3js.toHex(Web3js.toWei(Amount, 'ether'))

        let contract = this.state.KencoinContract;

        // // contract.transfer(userAddr, value).send({
        // //     from: Web3js.eth.defaultAccount
        // // }).on('transactionHash', function(hash) {
        // //     console.log("Token send Hash "+ hash)
        // // });
        //
        // contract.transfer(userAddr, value).then((hash) =>{
        //     console.log(hash)
        // })


        let nonce = Web3js.eth.getTransactionCount(addr);
        var privateK = new Buffer(privKey.substr(2),"hex");

        var contractAddress = "0x068540764de212447eeaf9928cde4218fee204d7";
        let response = await axios.get(`https://ethgasstation.info/json/ethgasAPI.json`);
        let prices = {
            low: response.data.safeLow / 10,
            medium: response.data.average / 10,
            high: response.data.fast / 10,
            highest: response.data.fastest / 10,
        };

        var rawTrans = {
            "from": addr,
            "gasPrice": prices.high * 1000000000,
            "gasLimit": Web3js.toHex(210000),
            "to": contractAddress,
            "value": "0x0",
            "data": contract.transfer.getData(userAddr, value, {from: addr}),
            "nonce": Web3js.toHex(nonce),
            "chainId": 4
        }

        var Tx = new EthereumTx(rawTrans)

        Tx.sign(privateK)


        // Web3js.eth.sendSignedTransaction('0x' + Tx.serialize().toString('hex'))

        Web3js.eth.sendRawTransaction('0x' + Tx.serialize().toString('hex'), function (err, hash) {
            if (!err) {
                console.log('Txn Sent and hash is ' + hash);
            } else {
                console.error(err);
            }
        });

    }


    async makeDeposit(amount) {

        let web3 = this.state.web3;
        let nonce = web3.eth.getTransactionCount(web3.eth.defaultAccount);
        var contractAddress = "0x068540764de212447eeaf9928cde4218fee204d7";

        console.log(amount);

        let response = await axios.get(`https://ethgasstation.info/json/ethgasAPI.json`);
        let prices = {
            low: response.data.safeLow / 10,
            medium: response.data.average / 10,
            high: response.data.fast / 10,
            highest: response.data.fastest / 10,
        };

        console.log('The outgoing transaction count for your wallet address is:' + nonce);
        let details = {
            "to": contractAddress,
            "value": web3.toHex(web3.toWei(amount, 'ether')),
            "gas": 250000,
            "gasPrice": prices.high * 1000000000, // converts the gwei price to wei
            "nonce": nonce,
            "chainId": 4 // EIP 155 chainId - mainnet: 1, rinkeby: 4
        };


        const transaction = new EthereumTx(details);
        var privatekey = this.state.prrivKey;
        privatekey = privatekey.substr(2);
        console.log(privatekey);
        var privKey = new Buffer(privatekey, 'hex');

        transaction.sign(privKey);

        const serializedTx = transaction.serialize();

        web3.eth.sendRawTransaction('0x' + serializedTx.toString('hex'), function (err, hash) {
            if (!err) {
                console.log('Txn Sent and hash is ' + hash);
            } else {
                console.error(err);
            }
        });


    }


    componentDidMount() {
        this.getMnemonic()

    }

    openSendTokenDiag() {
        this.setState({tokenopen: true})
    }

    openSendETHDiag() {
        this.setState({ETHopen: true})
    }

    render() {
        return (
            <div>
                {this.state.isLoading
                    ?
                    <ProgressSpiner/>
                    :
                    <div>
                        <AccountDet info={this.state}/>
                        <div style={{display: "flex"}}>
                            <TokenSendDiag send={this.SendToken}/>
                            <DepositTokensDiag deposit={this.makeDeposit}/>
                        </div>
                    </div>
                }
            </div>
        )
    }


}

export default Dashboard;