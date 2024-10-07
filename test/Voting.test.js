// test/Voting.test.js

const Voting = artifacts.require("Voting");
const assert = require("assert");
const { BN, expectRevert, expectEvent } = require("@openzeppelin/test-helpers");

contract("Voting", (accounts) => {
  const chairperson = accounts[0];
  const voter1 = accounts[1];
  const voter2 = accounts[2];
  const unauthorizedVoter = accounts[3];
  const proposals = ["Fireball", "Invisibility", "Teleportation"];

  let votingInstance;

  beforeEach(async () => {
    votingInstance = await Voting.new(proposals, { from: chairperson });
  });

  describe("Deployment", () => {
    it("should set the correct chairperson", async () => {
      const contractChairperson = await votingInstance.chairperson();
      assert.strictEqual(contractChairperson, chairperson, "Chairperson mismatch");
    });

    it("should initialize proposals correctly", async () => {
      const numProposals = await votingInstance.getNumProposals();
      assert.strictEqual(numProposals.toNumber(), proposals.length, "Incorrect number of proposals");

      for (let i = 0; i < proposals.length; i++) {
        const proposal = await votingInstance.getProposal(i);
        assert.strictEqual(proposal[0], proposals[i], `Proposal name mismatch at index ${i}`);
        assert.strictEqual(proposal[1].toNumber(), 0, `Initial vote count should be 0 at index ${i}`);
      }
    });
  });

  describe("Voter Authorization", () => {
    it("chairperson can authorize voters", async () => {
      // Authorize voter1
      const receipt = await votingInstance.authorize(voter1, { from: chairperson });

      // Verify voter1 is authorized
      const isAuthorized = await votingInstance.voters(voter1);
      assert.strictEqual(isAuthorized, true, "Voter1 should be authorized");
    });

    it("non-chairperson cannot authorize voters", async () => {
      await expectRevert(
        votingInstance.authorize(voter1, { from: unauthorizedVoter }),
        "Only chairperson can authorize voters."
      );
    });
  });

  describe("Voting", () => {
    beforeEach(async () => {
      // Authorize voter1 and voter2
      await votingInstance.authorize(voter1, { from: chairperson });
      await votingInstance.authorize(voter2, { from: chairperson });
    });

    it("authorized voters can cast votes", async () => {
      const proposalIndex = 1; // Invisibility
      const receipt = await votingInstance.vote(proposalIndex, { from: voter1 });

      // Check if the vote count increased
      const proposal = await votingInstance.getProposal(proposalIndex);
      assert.strictEqual(proposal[1].toNumber(), 1, "Vote count should be 1 after voting");

      // Check emitted Voted event
      expectEvent(receipt, "Voted", {
        voter: voter1,
        proposalIndex: new BN(proposalIndex),
      });
    });

    it("unauthorized voters cannot cast votes", async () => {
      const proposalIndex = 0; // Fireball
      await expectRevert(
        votingInstance.vote(proposalIndex, { from: unauthorizedVoter }),
        "Has no right to vote."
      );
    });

    it("voters cannot vote for invalid proposal index", async () => {
      const invalidProposalIndex = proposals.length; // Out of bounds
      await expectRevert(
        votingInstance.vote(invalidProposalIndex, { from: voter1 }),
        "Invalid proposal index."
      );
    });
  });

  describe("Proposal Retrieval", () => {
    it("should retrieve correct proposal details", async () => {
      for (let i = 0; i < proposals.length; i++) {
        const proposal = await votingInstance.getProposal(i);
        assert.strictEqual(proposal[0], proposals[i], `Proposal name mismatch at index ${i}`);
        assert.strictEqual(proposal[1].toNumber(), 0, `Initial vote count should be 0 at index ${i}`);
      }
    });
  });
});
