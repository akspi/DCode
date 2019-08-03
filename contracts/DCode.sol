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
    mapping(address => uint) registeredUsers;
    uint registrationCount;
    uint problemCount;
  }

  struct ContestStatus {
    Entry[] resolvedSubmissionList;
    uint resolvedCount;
  }

  uint contestId;
  uint submissionId;

  uint public queueStart = 1;
  uint public queueEnd = 0;
  mapping(uint => Entry) public pendingSubmissionQueue;

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
    address creatorAddress,
    uint isUserRegistered) {

    require(contestId >= _contestId, "Invalid contest Id");
    return (
      contestDetailsMap[_contestId].contestName,
      contestDetailsMap[_contestId].registrationCount,
      contestDetailsMap[_contestId].problemSetIpfs.length,
      contestDetailsMap[_contestId].contestCreator,
      contestDetailsMap[_contestId].registeredUsers[msg.sender]
    );
  }

  function addContest(string memory _contestName) public returns (uint) {
    contestOwnerMap[msg.sender].push(contestId);
    contestDetailsMap[contestId].contestName = _contestName;
    contestDetailsMap[contestId].contestCreator = msg.sender;
    contestId += 1;
    return contestId;
  }

  function registerUser(uint _contestId) public {
    require(contestId >= _contestId, "Invalid contest Id");
    require(contestDetailsMap[_contestId].registeredUsers[msg.sender] == 0, "Already registered");
    contestDetailsMap[_contestId].registrationCount += 1;
    contestDetailsMap[_contestId].registeredUsers[msg.sender] = 1;
  }

  function addQuestion(uint _contestId, string memory _problemIpfs, string memory _testcaseIpfs, string memory _hashAnswerIpfs) public {
    require(contestDetailsMap[_contestId].contestCreator == msg.sender, "You can only add questions to contest that you create");
    Problem memory newProblem = Problem({
      problemIpfs: _problemIpfs,
      testcaseIpfs: _testcaseIpfs,
      hashAnswerIpfs: _hashAnswerIpfs
    });
    contestDetailsMap[_contestId].problemSetIpfs.push(newProblem);
    contestDetailsMap[_contestId].problemCount += 1;
  }

  function getQuestionCount(uint _contestId) public view returns (uint) {
    require(contestId >= _contestId, "Invalid Contest Id");
    return contestDetailsMap[_contestId].problemCount;
  }

  function getCreatorContestIds() public view returns (uint[] memory) {
    return contestOwnerMap[msg.sender];
  }

  function getProblemDetails(uint _contestId, uint _problemIndex) public view returns (string memory problemIpfs) {
    require(contestId >= _contestId, "Invalid contest id");
    require(contestDetailsMap[_contestId].problemSetIpfs.length > _problemIndex, "Invalid problem index");
    Problem memory fetchedProblem = contestDetailsMap[_contestId].problemSetIpfs[_problemIndex];
    return fetchedProblem.problemIpfs;
  }

  function submitEntry(uint _contestId, string memory _codeIpfs, uint _problemIndex) public {
    require(contestId > _contestId, "Invalid contest id");
    require(contestDetailsMap[_contestId].problemSetIpfs.length >= _problemIndex, "Invalid problem index");

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
    pendingSubmissionQueue[queueEnd] = newEntry;
    submissionId += 1;
    queueEnd += 1;
  }

  function getPendingSubmission() public view returns (
    uint subId,
    string memory codeIpfs,
    string memory testcaseIpfs,
    string memory hashAnswerIpfs) {
    require(queueEnd >= queueStart, "Submission queue empty");
    require(pendingSubmissionQueue[queueStart-1].submitterAddress != msg.sender, "Cannot verify your own submission. Please wait");
    Entry memory pendingEntry = pendingSubmissionQueue[queueStart-1];
    Problem memory problem = contestDetailsMap[pendingEntry.contestId].problemSetIpfs[pendingEntry.problemIndex];
    return (pendingEntry.submissionId, pendingEntry.codeIpfs, problem.testcaseIpfs, problem.hashAnswerIpfs);
  }

  function verifyResults(uint _submissionId, bool isCorrect) public {
    require(submissionId >= _submissionId, "Invalid Submission Id");
    require(pendingSubmissionQueue[queueStart-1].submissionId == _submissionId, "Submission has already been processed");
    if (isCorrect)
      pendingSubmissionQueue[queueStart-1].correctCount += 1;
    else
      pendingSubmissionQueue[queueStart-1].wrongCount += 1;
    if ((pendingSubmissionQueue[queueStart-1].correctCount + pendingSubmissionQueue[queueStart-1].wrongCount) >= 3) {
      uint _contestId = pendingSubmissionQueue[queueStart-1].contestId;
      contestStatusMap[_contestId].resolvedSubmissionList.push(pendingSubmissionQueue[queueStart-1]);
      contestStatusMap[_contestId].resolvedCount += 1;
      delete pendingSubmissionQueue[queueStart-1];
      queueStart += 1;
    }
  }

  function getResolvedSubmission(uint _contestId) public view returns (uint arrayCount, uint[] memory piArray, uint[] memory rsArray){
    require(contestId > _contestId, "Invalid contest id");
    uint[] memory problemIndexArray = new uint[](20); // TODO: Fix
    uint[] memory resultArray = new uint[](20);
    uint count = 0;
    for(uint i = 0; i < contestStatusMap[_contestId].resolvedSubmissionList.length; i += 1) {
      Entry memory entry = contestStatusMap[_contestId].resolvedSubmissionList[i];
      if (entry.submitterAddress == msg.sender) {
        problemIndexArray[count] = entry.problemIndex;
        uint result = (entry.correctCount > entry.wrongCount)? 1: 0;
        resultArray[count] = result;
        count += 1;
      }
    }
    return (count, problemIndexArray, resultArray);
  }

  function getResolvedCount(uint _contestId) public view returns (uint) {
    require(contestId > _contestId, "Invalid contest id");
    return contestStatusMap[_contestId].resolvedCount;
  }

  function() external payable {}
}
