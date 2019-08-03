import { ipfs } from "./ipfsConf";
const SHA1 = require('crypto-js/sha1');

getIpfsFileFromHash = async (ipfsHash) => {
  const files =  await ipfs.get(ipfsHash);
  return files.map(element => {
    return element.content.toString('utf8');
  });
}

addFileToIpfs = async (fileObject) => {
  const results = await ipfs.add(fileObject);
  return results[0].hash;
}

 verifyCode = async (codeIpfs, testcaseIpfs, hashAnswerIpfs) => {
  const testCases = await getIpfsFileFromHash(testcaseIpfs)[0].content.toString('utf8').split('\n').map(line => JSON.parse(line));
  const hashAnswer = await getIpfsFileFromHash(hashAnswerIpfs)[0].content.toString('utf8'); // hash of result
  const functionString = await getIpfsFileFromHash(codeIpfs)[0].content.toString('utf8');
  const evalFunction = eval(`(${functionString})`); // runnable function

  const result = testCases.map((testCase => evalFunction(...testCase)));
  return SHA1(JSON.stringify(result).toString() === hashAnswer;
} 
