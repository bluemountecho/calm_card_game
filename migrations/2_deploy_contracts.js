var AngelAndDemonGame = artifacts.require("AngelAndDemonGame.sol");
var AngelAndDemonToken = artifacts.require("AngelAndDemonToken.sol");

module.exports = function(deployer) {
  // deployer.deploy(AngelAndDemonToken)
  // .then(() => {
  //   deployer.deploy(AngelAndDemonGame, AngelAndDemonToken.address);
  // })

  deployer.deploy(AngelAndDemonGame, "0x79cEcD2c185B46d49b4A2b1302519742436126c4");
};
