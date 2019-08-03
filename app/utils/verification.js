import { getPendingSubmission } from './web3ContractMethods';
import { verifyCode } from './ipfsMethods';

export async function submissionVerification() {
  console.log("Beginning Verification");
  try {
    const pendingSubmission  = await getPendingSubmission();
    const result = await verifyCode(
      pendingSubmission.codeIpfs,
      pendingSubmission.testcaseIpfs,
      pendingSubmission.hashAnswerIpfs
    );
    await verifyResults(pendingSubmission.subId, result);
  } catch (err) {
    console.log(err);
  }
}
