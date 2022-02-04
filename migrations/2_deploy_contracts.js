var AngelAndDemonGame = artifacts.require("AngelAndDemonGame.sol");
var AngelAndDemonToken = artifacts.require("AngelAndDemonToken.sol");

module.exports = function(deployer) {
  deployer.deploy(AngelAndDemonToken)
  .then(() => {
    deployer.deploy(AngelAndDemonGame, AngelAndDemonToken.address);
  })
};
