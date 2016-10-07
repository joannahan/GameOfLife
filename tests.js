(function() {
  mocha.setup("bdd");
  var assert = chai.assert;
  //            [[1,1,1,1,0], 
  //             [1,0,0,1,0], 
  //             [0,0,1,0,1], 
  //             [0,1,0,0,0], 
  //             [1,1,0,0,1]];
  describe("Basic Test Cases", function(){

    describe("1. Testing getSize", function(){
      var conway = Conway(5);
      var conway2 = Conway(100);
      var conway3 = Conway(0);
      it("Grid size", function(){
        assert.equal(conway.getSize(), 5);
        assert.equal(conway2.getSize(), 100);
        assert.equal(conway3.getSize(), 0);
      });
    });

    describe("2. Testing getNeighbors", function(){
      var conway = Conway(5);
      conway.init(true);
      conway.updateAllStates();
      it("Number of neighbors", function(){
        assert.equal(conway.getNeighbors(0,0), 2);
        assert.equal(conway.getNeighbors(4,4), 0);
        assert.equal(conway.getNeighbors(1,1), 5);
        assert.equal(conway.getNeighbors(3,2), 3);
      });
    });

    describe("3. Testing isAlive", function(){
      var conway = Conway(5);
      conway.init(true);
      conway.updateAllStates();
      it("Alive", function(){
        assert.equal(conway.isAlive(2,2), 1);
        assert.equal(conway.isAlive(1,1), 0);
      });
    });    
  //            [[1,1,1,1,0], 
  //             [1,0,0,1,0], 
  //             [0,0,1,0,1], 
  //             [0,1,0,0,0], 
  //             [1,1,0,0,1]];
    describe("4. Testing cellStatus", function(){
      var conway = Conway(5);
      conway.init(true);
      conway.updateAllStates();
      it("Cell Status", function(){
        assert.deepEqual(conway.getCellStatus(2,2), [false,false,false]);
        assert.deepEqual(conway.getCellStatus(0,4), [false,false,false]);
      });
    });  

    describe("5. Testing random board size is consistent", function(){
      var conway = Conway(10);
      conway.init(false);
      conway.updateAllStates();
      it("Random Board Size", function(){
        assert.equal(conway.getSize(), 10);
      });
    }); 
  });
  mocha.run();
})()


