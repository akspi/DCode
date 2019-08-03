import { ipfs } from './ipfsConf';

const SHA1 = require('crypto-js/sha1');

export async function getIpfsFileFromHash(ipfsHash) {
  const files = await ipfs.get(ipfsHash);
  const JSONfile = files[0].content.toString();
  return JSON.parse(JSONfile);
}

export async function addFileToIpfs(fileString) {
  fileString = JSON.stringify(fileString);
  const bufferedString = await Buffer.from(fileString);
  const results = await ipfs.add(bufferedString);
  return results[0].hash;
}

export const verifyCode = async (codeIpfs, testcaseIpfs, hashAnswerIpfs) => {
  const testCaseFile = await getIpfsFileFromHash(testcaseIpfs);
  const testCases = testCaseFile.split('\n').map((line) => JSON.parse(line));

  const hashAnswerFile = await getIpfsFileFromHash(hashAnswerIpfs);
  let hashAnswer = hashAnswerFile.split('\n');
  hashAnswer = hashAnswer.map((answer) => parseInt(answer, 10));

  const functionString = await getIpfsFileFromHash(codeIpfs);
  const evalFunction = eval(`(${functionString})`); // runnable function

  const result = testCases.map(((testCase) => evalFunction(...testCase)));
  console.log(hashAnswer, result);
  // eslint-disable-next-line consistent-return
  let flag = true;
  hashAnswer.forEach((answer, index) => {
    if (answer != result[index]) flag = false;
  });
  return flag;
};
