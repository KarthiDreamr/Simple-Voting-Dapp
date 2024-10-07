// migrations/2_deploy_voting.js
const Voting = artifacts.require("Voting");

module.exports = function (deployer) {
  const proposals = ["Fireball", "Invisibility", "Teleportation"];
  deployer.deploy(Voting, proposals);
};