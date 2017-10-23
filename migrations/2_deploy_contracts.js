var VimpRegistry = artifacts.require("./VimpRegistry.sol")

module.exports = function(deployer) {
  deployer.deploy(VimpRegistry);
};
