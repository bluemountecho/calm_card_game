var AngelAndDemonGame = artifacts.require("AngelAndDemonGame.sol");
var AngelAndDemonToken = artifacts.require("AngelAndDemonToken.sol");

module.exports = function(deployer) {
  deployer.deploy(AngelAndDemonToken)
  .then(() => {
    deployer.deploy(AngelAndDemonGame, AngelAndDemonToken.address);
  })

  // deployer.deploy(AngelAndDemonGame, "0x79cEcD2c185B46d49b4A2b1302519742436126c4");
  // deployer.deploy(AngelAndDemonGame, "0x8c15c754EDcD5FB4b0ab72E2D2637BAd8b84E981");  
};
