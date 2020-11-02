const KSEAuction = artifacts.require("KSEAuction");
const KSEAToken = artifacts.require("KSEAToken");
const KSEAirdrop = artifacts.require("KSEAirdrop");
module.exports = function(deployer) {
    deployer.then(function() {
        return deployer.deploy(KSEAToken, 10000, "KSEA DOBBY Token", "DOBBY");
      }).then(function() {
        return deployer.deploy(KSEAuction, 120, KSEAToken.address);
      }).then(function () {
        return deployer.deploy(KSEAirdrop, KSEAToken.address)
      });
};
