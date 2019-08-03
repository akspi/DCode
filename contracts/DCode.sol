pragma solidity >=0.4.22 <0.6.0;

contract DCode {

  struct Problem {
    string problemIpfs;
    string testcaseIpfs;
    string hashAnswerIpfs;
  }

  struct Entry {
    uint submissionId;
    string codeIpfs;
    uint contestId;
    uint problemIndex;
    uint correctCount;
    uint wrongCount;
    address submitterAddress;
    uint256 timestamp;
  }

  struct ContestDetails {
    Problem[] problemSetIpfs;
    address contestCreator;
    string contestName;
    mapping(address => bool) registeredUsers;
    uint registrationCount;
  }

  struct ContestStatus {
    Entry[] resolvedSubmissionList;
  }

  uint contestId;
  uint submissionId;

  uint queueStart = 1;
  uint queueEnd = 0;
  mapping(uint => Entry) pendingSubmissionQueue;

  mapping(address => uint[]) contestOwnerMap;
  mapping(uint => ContestDetails) contestDetailsMap;
  mapping(uint => ContestStatus) contestStatusMap;

  function getOngoingContest() public view returns (uint) {
    return contestId;
  }

  function getContestDetails(uint _contestId) public view returns (
    string memory contestName,
    uint registraionCount,
    uint problemCount,
    address creatorAddress) {

    require(contestId >= _contestId, "Invalid contest Id");
    return (
      contestDetailsMap[_contestId].contestName,
      contestDetailsMap[_contestId].registrationCount,
      contestDetailsMap[_contestId].problemSetIpfs.length,
      contestDetailsMap[_contestId].contestCreator
    );
  }

  function addContest(string memory _contestName) public returns (uint) {
    contestId += 1;
    contestOwnerMap[msg.sender].push(contestId);
    contestDetailsMap[contestId].contestName = _contestName;
    contestDetailsMap[contestId].contestCreator = msg.sender;
    return contestId;
  }

  function registerUser(uint _contestId) public {
    require(contestId >= _contestId, "Invalid contest Id");
    require(contestDetailsMap[_contestId].registeredUsers[msg.sender] == false, "Already registered");
    contestDetailsMap[_contestId].registrationCount += 1;
    contestDetailsMap[_contestId].registeredUsers[msg.sender] = true;
  }

  function addQuestion(uint _contestId, string memory _problemIpfs, string memory _testcaseIpfs, string memory _hashAnswerIpfs) public {
    require(contestDetailsMap[_contestId].contestCreator == msg.sender, "You can only add questions to contest that you create");
    Problem memory newProblem = Problem({
      problemIpfs: _problemIpfs,
      testcaseIpfs: _testcaseIpfs,
      hashAnswerIpfs: _hashAnswerIpfs
    });
    contestDetailsMap[_contestId].problemSetIpfs.push(newProblem);
  }

  function getCreatorContestIds() public view returns (uint[] memory) {
    return contestOwnerMap[msg.sender];
  }

  function getProblemDetails(uint _contestId, uint _problemIndex) public view returns (string memory) {
    require(contestId >= _contestId, "Invalid contest id");
    require(contestDetailsMap[_contestId].problemSetIpfs.length > _problemIndex, "Invalid problem index");
    Problem memory fetchedProblem = contestDetailsMap[_contestId].problemSetIpfs[_problemIndex];
    return fetchedProblem.problemIpfs;
  }

  function submitEntry(uint _contestId, string memory _codeIpfs, uint _problemIndex) public {
    require(contestId >= _contestId, "Invalid contest id");
    require(contestDetailsMap[_contestId].problemSetIpfs.length >= _problemIndex, "Invalid problem index");

    submissionId += 1;

    Entry memory newEntry = Entry({
      submissionId: submissionId,
      codeIpfs: _codeIpfs,
      correctCount: 0,
      wrongCount: 0,
      contestId: _contestId,
      problemIndex: _problemIndex,
      submitterAddress: msg.sender,
      timestamp: block.number
    });
    queueEnd += 1;
    pendingSubmissionQueue[queueEnd] = newEntry;
  }

  function getPendingSubmission() public view returns (uint, string memory, string memory, string memory) {
    require(queueEnd >= queueStart, "Submission queue empty");
    require(pendingSubmissionQueue[queueStart].submitterAddress != msg.sender, "Cannot verify your own submission. Please wait");
    Entry memory pendingEntry = pendingSubmissionQueue[queueStart];
    Problem memory problem = contestDetailsMap[pendingEntry.contestId].problemSetIpfs[pendingEntry.problemIndex];
    return (pendingEntry.submissionId, pendingEntry.codeIpfs, problem.testcaseIpfs, problem.hashAnswerIpfs);
  }

  function verifyResults(uint _submissionId, bool isCorrect) public {
    require(submissionId >= _submissionId, "Invalid Submission Id");
    require(pendingSubmissionQueue[queueStart].submissionId == _submissionId, "Submission has already been processed");
    if (isCorrect)
      pendingSubmissionQueue[queueStart].correctCount += 1;
    else
      pendingSubmissionQueue[queueStart].wrongCount += 1;
    if ((pendingSubmissionQueue[queueStart].correctCount + pendingSubmissionQueue[queueStart].wrongCount) >= 5) {
      uint _contestId = pendingSubmissionQueue[queueStart].contestId;
      contestStatusMap[_contestId].resolvedSubmissionList.push(pendingSubmissionQueue[queueStart]);
      delete pendingSubmissionQueue[queueStart];
    }
  }
}
