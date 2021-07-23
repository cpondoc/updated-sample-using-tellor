const { expect } = require("chai");

describe("Tellor", function() {
  it("Check that usingTellor works", async function() {
    
    // Set up TellorPlayground
    const TellorPlayground = await ethers.getContractFactory("TellorPlayground");
    const tellorPlayground = await TellorPlayground.deploy();
    await tellorPlayground.deployed();

    // Set up SampleUsingTellor
    const playgroundAddress = tellorPlayground.address;
    const SampleUsingTellor = await ethers.getContractFactory("SampleUsingTellor");
    const sampleUsingTellor = await SampleUsingTellor.deploy(playgroundAddress);
    await sampleUsingTellor.deployed();

    // Submit random value
    const requestId = 1;
    const mockValue = "7000000";
    await tellorPlayground.submitValue(requestId, mockValue);
    
    // Get value?
    const value = await sampleUsingTellor.readTellorValue(1);
    console.log(value);
  });
});
