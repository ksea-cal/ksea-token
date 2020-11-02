const KSEAuction = artifacts.require("KSEAuction");
const KSEAToken = artifacts.require("KSEAToken");
module.exports = function(deployer) {
    deployer.then(function() {
        return deployer.deploy(KSEAToken, 10000, "KSEA DOBBY Token", "DOBBY");
      }).then(function() {
        return deployer.deploy(KSEAuction, KSEAToken.address);
    });
};