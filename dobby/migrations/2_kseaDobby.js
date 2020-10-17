const KSEADobby = artifacts.require("KSEADobby");

module.exports = function(deployer) {
  deployer.deploy(KSEADobby, "0x623C01A67a62B57C0ADD645a709990f8b0f74204");
};
