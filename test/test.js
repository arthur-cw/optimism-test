const { expect } = require("chai");

describe("Tester", function() {
  it("Should test", async function() {
    const Test = await ethers.getContractFactory("TransferTest");
    const test = await Test.deploy();
    //const test = await Test.deploy({ gasLimit: 30000000 });
    await test.deployed(); 

    [owner, other1, other2] = await ethers.getSigners();

    expect(await test.balance()).to.equal(0);
    
    console.log((await owner.getBalance()).toString());

    await owner.sendTransaction({to: test.address, value: 1000000000000});

    console.log((await owner.getBalance()).toString());
    
    console.log((await test.balance()).toString())
    w1 = await test.withdraw1(other1.address);
    w2 = await test.withdraw2(other1.address);
    //w1 = await test.withdraw1(other1.address, { gasLimit: 30000000 });
    //w2 = await test.withdraw2(other1.address, { gasLimit: 30000000 });
    await w1.wait();
    await w2.wait();
    console.log((await test.balance()).toString());  
  });
});
