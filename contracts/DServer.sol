pragma solidity >=0.4.22 <0.6.0;

contract DServer {
  struct Job {
    string functionIpfs;
    string dataIpfs;
  }

  struct Merge {
    uint nodeA;
    uint nodeB;
    uint votesFor;
    uint votesAgainst;
    uint totalVoters;
  }

  struct MiniNode {
    uint nodeID;
    address[] memberArray;

    mapping(uint => Job) jobQueue;
    uint queueStart;
    uint queueEnd;

    mapping(uint => Merge) mergeQueue;
    uint mergeStart;
    uint mergeEnd;
  }

  function getUserNodeID() public view returns (uint nodeID) {
    return globalMembershipMap[msg.sender];
  }

  function getMiniNode(uint nodeA) public view returns (
    uint nodeId,
    address[] memory memberArray,
    uint queueStart,
    uint queueEnd,
    uint mergeStart,
    uint mergeEnd) {
    MiniNode memory miniNodeA = globalMiniNodeMap[nodeA];
    return (miniNodeA.nodeID, miniNodeA.memberArray, miniNodeA.queueStart, miniNodeA.queueEnd, miniNodeA.mergeStart, miniNodeA.mergeEnd);
  }

  mapping(uint => MiniNode) public globalMiniNodeMap; // nodeID to node
  mapping(address => uint) public globalMembershipMap; //user address to which nodeID they belong
  // mapping(uint => Merge) public globalMergeMap;
  uint public globalNodeIDCount = 1;

  function createMiniNode() public {
    require(globalMembershipMap[msg.sender] == 0, "Quit other MiniNodes before creating a MiniNode");
    address[] memory tempArray = new address[](1);
    tempArray[0] = msg.sender;

    MiniNode memory newMiniNode = MiniNode({
      nodeID: globalNodeIDCount,
      memberArray: tempArray,
      queueStart: 2,
      queueEnd: 1,
      mergeStart: 2,
      mergeEnd: 1
    });

    globalMiniNodeMap[globalNodeIDCount] = newMiniNode;
    globalMembershipMap[msg.sender] = globalNodeIDCount;
    globalNodeIDCount += 1;
  }

  function quitMiniNode() public {
    globalMembershipMap[msg.sender] = 0;
  }

  function proposeMerge(uint nodeB) public {
    require(globalMembershipMap[msg.sender] != 0, "Cannot propose merge unless you belong to a group");
    require(globalMembershipMap[msg.sender] != nodeB, "Cannot propose to merge your own branch with itself");
    uint nodeA = globalMembershipMap[msg.sender];
    MiniNode storage miniNodeA = globalMiniNodeMap[nodeA];
    MiniNode storage miniNodeB = globalMiniNodeMap[nodeB];

    Merge memory proposedMerge1 = Merge({
      nodeA: nodeA, // 2
      nodeB: nodeB, // 1 and I pick nodeB
      votesFor: 1,
      votesAgainst: 0,
      totalVoters: miniNodeA.memberArray.length + miniNodeB.memberArray.length
    });

    Merge memory proposedMerge2 = Merge({
      nodeA: nodeB, // 2
      nodeB: nodeA, // 1 and I pick nodeB
      votesFor: 1,
      votesAgainst: 0,
      totalVoters: miniNodeA.memberArray.length + miniNodeB.memberArray.length
    });

    miniNodeA.mergeQueue[miniNodeA.mergeEnd] = proposedMerge1;
    miniNodeA.mergeEnd += 1;
    miniNodeB.mergeQueue[miniNodeB.mergeEnd] = proposedMerge2;
    miniNodeB.mergeEnd += 1;
  }

  function voteForMerge(uint mergeIndex, bool isUp) public {
    require(globalMembershipMap[msg.sender] != 0, "Cannot propose merge unless you belong to that group");
    uint nodeA = globalMembershipMap[msg.sender];
    MiniNode storage miniNodeA = globalMiniNodeMap[nodeA];
    if (isUp)
      miniNodeA.mergeQueue[mergeIndex].votesFor += 1;
    else
      miniNodeA.mergeQueue[mergeIndex].votesAgainst += 1;

    if (miniNodeA.mergeQueue[mergeIndex].votesFor > miniNodeA.mergeQueue[mergeIndex].totalVoters / 2)
      mergeGroup(miniNodeA.mergeQueue[mergeIndex].nodeA, miniNodeA.mergeQueue[mergeIndex].nodeB);
  }

  function getMergeOffers() public view returns (uint[] memory){
    uint nodeA = globalMembershipMap[msg.sender];
    MiniNode storage miniNodeA = globalMiniNodeMap[nodeA];
    uint[] memory ret = new uint[](1);
    uint count = 0;
    for(uint i = miniNodeA.mergeStart - 1; i < miniNodeA.mergeEnd; i += 1) {
      ret[count] = miniNodeA.mergeQueue[i].nodeB;
      count += 1;
    }
    return ret;
  }

  function mergeGroup(uint nodeA, uint nodeB) public {
    MiniNode memory MiniNodeA = globalMiniNodeMap[nodeA];
    MiniNode memory MiniNodeB = globalMiniNodeMap[nodeB];

    address[] memory tempArray = new address[](2);

    uint count = 0;
    for(uint i = 0; i < MiniNodeA.memberArray.length; i += 1) {
      tempArray[count] = MiniNodeA.memberArray[i];
      globalMembershipMap[MiniNodeA.memberArray[i]] = globalNodeIDCount;
      count += 1;
    }
    for(uint i = 0; i < MiniNodeB.memberArray.length; i += 1) {
      tempArray[count] = MiniNodeB.memberArray[i];
      globalMembershipMap[MiniNodeB.memberArray[i]] = globalNodeIDCount;
      count += 1;
    }

    MiniNode memory newMiniNode = MiniNode({
      nodeID: globalNodeIDCount,
      memberArray: tempArray,
      queueStart: 2,
      queueEnd: 1,
      mergeStart: 2,
      mergeEnd: 1
    });

    delete globalMiniNodeMap[nodeA];
    delete globalMiniNodeMap[nodeB];

    globalMiniNodeMap[globalNodeIDCount] = newMiniNode;
    globalNodeIDCount += 1;
  }
}