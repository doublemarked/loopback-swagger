// Copyright IBM Corp. 2015,2016. All Rights Reserved.
// Node module: loopback-swagger
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT

var expect = require('chai').expect;
var V2Generator = require('../../lib/codegen/generator-v2');

var petStoreV2Spec = require('../../example/pet-store-2.0.json');
var pet2 = require('./pet-expanded.json');
var note = require('./note.json');
var generator = new V2Generator();

describe('Swagger spec v2 generator', function() {
  it('generates remote methods', function() {
    var code = generator.generateRemoteMethods(petStoreV2Spec,
      { modelName: 'Store' });
    expect(code.Store).to.be.string;
  });

  it('generates remote methods', function() {
    var code = generator.generateRemoteMethods(pet2,
      { modelName: 'Pet' }).Pet;
    expect(code).contain('Pet.findPets = function(tags, limit, callback)');
    expect(code).contain('Pet.remoteMethod(\'findPets\'');
    expect(code).contain('Pet.findPetByIdId = function(id, callback)');
    expect(code).contain('Pet.remoteMethod(\'findPetByIdId\'');
    expect(code).contain('Pet.deletePet = function(id, callback)');
    expect(code).contain('Pet.remoteMethod(\'deletePet\'');
    expect(code).contain('Pet.create = function(pet, callback)');
    expect(code).contain('Pet.remoteMethod(\'create\'');
  });

  it('generates remote methods with tags', function() {
    var code = generator.generateRemoteMethods(note, {});
    expect(Object.keys(code)).eql(['User', 'Note']);
  });

  it('transform operations', function() {
    var operations = generator.getOperations(petStoreV2Spec);
    expect(operations).to.have.property('/user/createWithList');
    expect(operations['/user/createWithList']).to.have.property('post');
    var op = operations['/user/createWithList']['post'];
    expect(op.operationId).to.eql('createUsersWithListInput');
  });
});
