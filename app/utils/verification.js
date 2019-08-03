import { getPendingSubmission, verifyResults } from './web3ContractMethods';
import { verifyCode } from './ipfsMethods';

function sleep (time) {
  return new Promise((resolve) => setTimeout(resolve, time));
}

export async function submissionVerification() {
  console.log('Beginning Verification');
  try {
    const pendingSubmission = await getPendingSubmission();
    console.log(pendingSubmission);
    const result = await verifyCode(
      pendingSubmission.codeIpfs,
      pendingSubmission.testcaseIpfs,
      pendingSubmission.hashAnswerIpfs
    );
    console.log(result);
    await verifyResults(pendingSubmission.subId, result);
  } catch (err) {
    console.log(err);
  }

  sleep(2000).then(() => {
    submissionVerification();
  });
}
