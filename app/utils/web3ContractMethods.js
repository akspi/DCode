import { DCodeInstance } from './web3Conf';

const getSendParams = async () => {
  const accountIds = await web3.eth.getAccounts();
  return {
    from: accountIds[0],
  };
};

export async function getOngoingContest() {
  return DCodeInstance.methods.getOngoingContest().call();
}

export async function getContestDetails(contestId) {
  return DCodeInstance.methods.getContestDetails(contestId).call();
}

export async function addContest(contestName) {
  return DCodeInstance.methods.addContest(contestName).send(await getSendParams());
}

export async function registerUser(contestId) {
  return DCodeInstance.methods.registerUser(contestId).send(await getSendParams());
}

export async function addQuestion(contestId, problemIpfs, testcaseIpfs, hashAnswerIpfs) {
  return DCodeInstance.methods.addQuestion(contestId, problemIpfs, testcaseIpfs, hashAnswerIpfs).send(getSendParams());
}

async function getCreatorContestIds() {
  return DCodeInstance.methods.getCreatorContestIds().call();
}

async function getProblemDetails(contestId, problemIndex) {
  return DCodeInstance.methods.getProblemDetails(contestId, problemIndex).call();
}

async function submitEntry(contestId, codeIpfs, problemIndex) {
  return DCodeInstance.methods.submitEntry(contestId, codeIpfs, problemIndex).send(getSendParams());
}

async function getPendingSubmission() {
  return DCodeInstance.methods.getPendingSubmission().call();
}

async function verifyResults(submissionId, isCorrect) {
  return DCodeInstance.methods.verifyResults(submissionId, isCorrect).send(getSendParams());
}
