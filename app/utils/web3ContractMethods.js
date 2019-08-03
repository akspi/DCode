import Web3 from 'web3';
import { DCodeInstance } from './web3Conf';

const web3 = new Web3(Web3.givenProvider);

window.addEventListener('load', async () => {
  if (window.ethereum) {
    window.web3 = new Web3(ethereum);
    try {
      await ethereum.enable();
    } catch (error) {
      console.log(error);
    }
  } else if (window.web3) {
    window.web3 = new Web3(web3.currentProvider);
  }
});

const getSendParams = async () => {
  const accountIds = await web3.eth.getAccounts();
  return {
    from: accountIds[0],
  };
};

export async function getOngoingContest() {
  return DCodeInstance.methods.getOngoingContest().call();
}

export async function getQuestionCount(_contestId) {
  return DCodeInstance.methods.getQuestionCount(_contestId).call(await getSendParams());
}

export async function getContestDetails(contestId) {
  return DCodeInstance.methods.getContestDetails(contestId).call(await getSendParams());
}

export async function addContest(contestName) {
  return DCodeInstance.methods.addContest(contestName).send(await getSendParams());
}

export async function registerUser(contestId) {
  return DCodeInstance.methods.registerUser(contestId).send(await getSendParams());
}

export async function addQuestion(contestId, problemIpfs, testcaseIpfs, hashAnswerIpfs) {
  return DCodeInstance.methods.addQuestion(contestId, problemIpfs, testcaseIpfs, hashAnswerIpfs).send(await getSendParams());
}

export async function getCreatorContestIds() {
  return DCodeInstance.methods.getCreatorContestIds().call(await getSendParams());
}

export async function getProblemDetails(contestId, problemIndex) {
  return DCodeInstance.methods.getProblemDetails(contestId, problemIndex).call(await getSendParams());
}

export async function submitEntry(contestId, codeIpfs, problemIndex) {
  return DCodeInstance.methods.submitEntry(contestId, codeIpfs, problemIndex).send((await getSendParams()));
}

export async function getPendingSubmission() {
  return DCodeInstance.methods.getPendingSubmission().call(await getSendParams());
}

export async function verifyResults(submissionId, isCorrect) {
  return DCodeInstance.methods.verifyResults(submissionId, isCorrect).send(await getSendParams());
}
