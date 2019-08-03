import { getPendingSubmission, verifyResults } from './web3ContractMethods';
import { verifyCode } from './ipfsMethods';

export async function submissionVerification() {
  console.log("Beginning Verification");
  try {
    const pendingSubmission  = await getPendingSubmission();
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
}
