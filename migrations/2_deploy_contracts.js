var AngelAndDemonGame = artifacts.require("AngelAndDemonGame.sol");
var AngelAndDemonToken = artifacts.require("AngelAndDemonToken.sol");
var GodsNLegends = artifacts.require("GodsNLegends.sol");

module.exports = function(deployer) {
  // deployer.deploy(AngelAndDemonToken)
  // .then(() => {
  //   deployer.deploy(AngelAndDemonGame, AngelAndDemonToken.address);
  // })

  // deployer.deploy(AngelAndDemonGame, "0x79cEcD2c185B46d49b4A2b1302519742436126c4");
  // deployer.deploy(AngelAndDemonGame, "0x5290d93EAE20439B3b54E68893049Ef5358305fC");
  deployer.deploy(GodsNLegends, "0x97BDE2489441FBF4BFC42712784ab95C4dA210C1")
};
