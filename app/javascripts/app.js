// Import the page's CSS. Webpack will know what to do with it.
import "../stylesheets/app.css";

// Import libraries we need.
import {default as Web3} from 'web3';
import {default as contract} from 'truffle-contract';

// Import our contract artifacts and turn them into usable abstractions.
import vimp_artefacts from '../../build/contracts/VimpRegistry.json';

// MetaCoin is our usable abstraction, which we'll use through the code below.
var VimpRegistry = contract(vimp_artefacts);

// The following code is simple to show off interacting with your contracts.
// As your needs grow you will likely need to change its form and structure.
// For application bootstrapping, check out window.addEventListener below.
var accounts;
var account;

window.App = {
    start: function () {
        VimpRegistry.setProvider(web3.currentProvider);

        // Get the initial account balance so it can be displayed.
        web3.eth.getAccounts(function (err, accs) {
            if (err != null) {
                alert("There was an error fetching your accounts.");
                return;
            }

            if (accs.length == 0) {
                alert("Couldn't get any accounts! Make sure your Ethereum client is configured correctly.");
                return;
            }

            accounts = accs;
            account = accounts[0];
        });
    },

    whoAmI: function () {
        console.log(VimpRegistry);
        var vimp;
        VimpRegistry.deployed().then(function(instance) {
            vimp = instance;
        });

        /*vimp.whoAmI.call({from:account[0]}).then(function (result) {
            var whoamiSpan = document.getElementById("whoami");
            whoamiSpan.innerHTML = result.valueOf();
        });*/
    }
};

window.addEventListener('load', function () {
    window.web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
    App.start();
});
