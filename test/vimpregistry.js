var VimpRegistry = artifacts.require("./VimpRegistry.sol");

contract('VimpRegistry', function (accounts) {

    var contractAddress;
    var issuerName = 'Allianz';
    var vimp;
    var issuerAccount = accounts[0];
    var clientAccount = accounts[1];
    var dataHash = "0x12345";
    var value2pay = 1000000;

    it("should accept addition of issuers", function () {
        VimpRegistry.deployed().then(function(instance) {
            vimp = instance;
            contractAddress = instance.address;
            return vimp.addIssuer(issuerName, {from: issuerAccount});
        }).then(function () {
            return vimp.getIssuer.call(issuerAccount);
        }).then(function (saved) {
            assert.equal(saved, issuerName, "The issuer name is not saved correctly");
        });
    });

    it("should permit the issuer to create a insurance contract and the customer should pay for it", function () {
        console.log(issuerAccount);
        web3.eth.getBalance(issuerAccount).then(function (result) {
            console.log(result);
        });
        VimpRegistry.deployed().then(function(instance) {
            vimp = instance;
            //return vimp.createInsurance(dataHash, clientAccount, value2pay, {from: issuerAccount});
        }).then(function () {
            //return vimp.methods.payInsurance(dataHash).send({from: clientAccount, value:value2pay});
        }).then(function () {
            // console.log(issuerAccountBalance + " " + web3.eth.getBalance(issuerAccount));
        });
    });

});
