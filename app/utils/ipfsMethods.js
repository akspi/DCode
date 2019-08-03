import { ipfs } from "./ipfsConf";
const SHA1 = require('crypto-js/sha1');

async function getIpfsFileFromHash(ipfsHash) {
  const files =  await ipfs.get(ipfsHash);
  return files.map(element => {
    return element.content.toString('utf8');
  });
}

async function addFileToIpfs(fileObject) {
  const results = await ipfs.add(fileObject);
  return results[0].hash;
}

export const verifyCode = async (codeIpfs, testcaseIpfs, hashAnswerIpfs) => {
  const testCaseFile = await getIpfsFileFromHash(testcaseIpfs);
  const testCases = testCaseFile[0].split('\n').map(line => JSON.parse(line));

  const hashAnswerFile = await getIpfsFileFromHash(hashAnswerIpfs);
  const hashAnswer = hashAnswerFile[0]; // hash of result

  const functionString = await getIpfsFileFromHash(codeIpfs);
  const evalFunction = eval(`(${functionString})`); // runnable function

  const result = testCases.map((testCase => evalFunction(...testCase)));
  return SHA1(JSON.stringify(result)).toString() === hashAnswer;
} 
