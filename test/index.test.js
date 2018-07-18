var sceneGraphSchema = require('../');
var assert = require('power-assert');

describe('scene-graph-schema', () => {
  describe('validateSchema', () => {
    it ('should validate root node', () => {
      assert.strictEqual(sceneGraphSchema.validateSchema({}).errors.length, 1);
      assert.strictEqual(sceneGraphSchema.validateSchema({'scene':[]}).errors.length, 0);
    });
    it ('should validate scene children', () => {
      assert.notStrictEqual(sceneGraphSchema.validateSchema({'scene':[{}]}).errors.length, 0);
      assert.strictEqual(sceneGraphSchema.validateSchema({
        'scene':[{
          "id":"",
          "name":"",
          "constructorName":"",
          "transform":{"x":0,"y":0}
        }]
      }).errors.length, 0);
    });
  });
  describe('validateHierarchy', () => {
    it ('should validate parent', () => {
      assert.strictEqual(sceneGraphSchema.validateHierarchy({
        'scene':[{
          "id":"Parent",
          "constructorName":"",
          "transform": { "children":["Child"] }
        },
        {
          "id":"Child",
          "constructorName":"",
          "transform": { "parent":"Parent" }
        }]
      }), true);
      assert.strictEqual(sceneGraphSchema.validateHierarchy({
        'scene':[{
          "id":"Parent",
          "transform": { "children":["Child"] }
        },
        {
          "id":"Child",
          "transform": {}
        }]
      }), false);
    });
    it ('should validate children', () => {
      assert.strictEqual(sceneGraphSchema.validateHierarchy({
        'scene':[{
          "id":"Parent",
          "transform": { "children":["Child"] }
        },
        {
          "id":"Child",
          "transform": { "parent":"Parent" }
        }]
      }), true);
      assert.strictEqual(sceneGraphSchema.validateHierarchy({
        'scene':[{
          "id":"Parent",
          "transform": {}
        },
        {
          "id":"Child",
          "transform": { "parent":"Parent" }
        }]
      }), false);
    });
  });
})
