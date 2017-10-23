var VimpRegistry = artifacts.require("./VimpRegistry.sol");

contract('VimpRegistry', function (accounts) {

    var contractAddress;

    it("should accept addition of issuers", function () {
        var issuerName = 'Allianz';
        var vimp;

        VimpRegistry.deployed().then(function(instance) {
            vimp = instance;
            contractAddress = instance.address;
            return vimp.addIssuer(issuerName, {from: accounts[0]});
        }).then(function () {
            return vimp.getIssuer.call(accounts[0]);
        }).then(function (saved) {
            assert.equal(saved, issuerName, "The issuer name is not saved correctly");
        });
    });

    it("should permit the issuer to create a insurance contract and the end customer pay for it", function () {

    });

});
