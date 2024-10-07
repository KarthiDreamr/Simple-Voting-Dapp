// contracts/Voting.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Voting {
    struct Proposal {
        string name;
        uint voteCount;
    }

    address public chairperson;
    mapping(address => bool) public voters;
    Proposal[] public proposals;

    event Voted(address indexed voter, uint proposalIndex);
    event VoterAuthorized(address indexed voter); // New Event

    constructor(string[] memory proposalNames) {
        chairperson = msg.sender;
        voters[chairperson] = true;

        for (uint i = 0; i < proposalNames.length; i++) {
            proposals.push(Proposal({
                name: proposalNames[i],
                voteCount: 0
            }));
        }
    }

    // Authorize a voter
    function authorize(address voter) public {
        require(msg.sender == chairperson, "Only chairperson can authorize voters.");
        voters[voter] = true;
        emit VoterAuthorized(voter); // Emit Event
    }

    // Cast a vote
    function vote(uint proposalIndex) public {
        require(voters[msg.sender], "Has no right to vote.");
        require(proposalIndex < proposals.length, "Invalid proposal index.");

        proposals[proposalIndex].voteCount += 1;
        emit Voted(msg.sender, proposalIndex);
    }

    // Get proposal details
    function getProposal(uint proposalIndex) public view returns (string memory, uint) {
        require(proposalIndex < proposals.length, "Invalid proposal index.");
        Proposal memory proposal = proposals[proposalIndex];
        return (proposal.name, proposal.voteCount);
    }

    // Get total number of proposals
    function getNumProposals() public view returns (uint) {
        return proposals.length;
    }
}
