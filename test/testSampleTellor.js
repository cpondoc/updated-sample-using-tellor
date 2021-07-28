const { expect } = require("chai");
const { ethers } = require("hardhat");
// const { contract } = require("usingtellor/contracts/TellorPlayground.sol:TellorPlayground")
const { abi, bytecode } = require("usingtellor/artifacts/contracts/TellorPlayground.sol/TellorPlayground.json")

describe("Tellor", function() {
  let sampleUsingTellor;
  let tellorOracle;

  // Set up Tellor Playground Oracle and SampleUsingTellor
  beforeEach(async function () {
    // let otherTellorOracle = await ethers.getContractFactory("contracts/TellorPlayground.sol:TellorPlayground")
    let TellorOracle = await ethers.getContractFactory(abi, bytecode);
    tellorOracle = await TellorOracle.deploy();
    await tellorOracle.deployed();

    let SampleUsingTellor = await ethers.getContractFactory("SampleUsingTellor");
    sampleUsingTellor = await SampleUsingTellor.deploy(tellorOracle.address);
    await sampleUsingTellor.deployed();
  });

  it("Update Price", async function() {
    const requestId = 1;
    const mockValue = "7000000";
    await tellorOracle.submitValue(requestId, mockValue);
    let retrievedVal = await sampleUsingTellor.readTellorValue(requestId);
    expect(retrievedVal).to.equal(mockValue);
  });
});
