var sceneGraphSchema = require('../');
var assert = require('power-assert');

describe('scene-graph-schema', () => {
  describe('validateSchema', () => {
    it ('should validate root node', () => {
      assert.strictEqual(sceneGraphSchema.validateSchema({'scene':[]}).errors.length, 1);
      assert.strictEqual(sceneGraphSchema.validateSchema({'scene':[], 'metadata':{
        "width":640,
        "height":1136,
        "positiveCoord": {
          "xRight": true,
          "yDown":  false
        }
      }}).errors.length, 0);
    });
    it ('should validate scene children', () => {
      assert.notStrictEqual(sceneGraphSchema.validateSchema({'scene':[{}]}).errors.length, 0);
      assert.strictEqual(sceneGraphSchema.validateSchema({
        "metadata":{
          "width":640,
          "height":1136,
          "positiveCoord": {
            "xRight": true,
            "yDown":  false
          }
        },
        'scene':[{
          "id":"",
          "name":"",
          "constructorName":"",
          "transform":{
            "x":0,
            "y":0,
            "anchor": {
              "x": 0,
              "y": 0
            }
          }
        }]
      }).errors.length, 0);
    });
  });
  describe('validateHierarchy', () => {
    it ('should validate parent', () => {
      assert.strictEqual(sceneGraphSchema.validateHierarchy({
        "metadata":{
          "width":640,
          "height":1136,
          "positiveCoord": {
            "xRight": true,
            "yDown":  false
          }
        },
        'scene':[{
          "id":"Parent",
          "constructorName":"",
          "transform": {
            "x":0,
            "y":0,
            "anchor": {
              "x": 0,
              "y": 0
            },
            "children":["Child"]
          }
        },
        {
          "id":"Child",
          "constructorName":"",
          "transform": {
            "x":0,
            "y":0,
            "anchor": {
              "x": 0,
              "y": 0
            },
            "parent":"Parent"
          }
        }]
      }), true);
      assert.strictEqual(sceneGraphSchema.validateHierarchy({
        "metadata":{
          "width":640,
          "height":1136,
          "positiveCoord": {
            "xRight": true,
            "yDown":  false
          }
        },
        'scene':[{
          "id":"Parent",
          "transform": {
            "x":0,
            "y":0,
            "anchor": {
              "x": 0,
              "y": 0
            },
            "children":["Child"]
          }
        },
        {
          "id":"Child",
          "transform": {
            "x":0,
            "y":0,
            "anchor": {
              "x": 0,
              "y": 0
            }
          }
        }]
      }), false);
    });
    it ('should validate children', () => {
      assert.strictEqual(sceneGraphSchema.validateHierarchy({
        "metadata":{
          "width":640,
          "height":1136,
          "positiveCoord": {
            "xRight": true,
            "yDown":  false
          }
        },
        'scene':[{
          "id":"Parent",
          "transform": {
            "x":0,
            "y":0,
            "anchor": {
              "x": 0,
              "y": 0
            },
            "children":["Child"]
          }
        },
        {
          "id":"Child",
          "transform": {
            "x":0,
            "y":0,
            "anchor": {
              "x": 0,
              "y": 0
            },
            "parent":"Parent"
          }
        }]
      }), true);
      assert.strictEqual(sceneGraphSchema.validateHierarchy({
        "metadata":{
          "width":640,
          "height":1136,
          "positiveCoord": {
            "xRight": true,
            "yDown":  false
          }
        },
        'scene':[{
          "id":"Parent",
          "transform": {
            "x":0,
            "y":0,
            "anchor": {
              "x": 0,
              "y": 0
            }
          }
        },
        {
          "id":"Child",
          "transform": {
            "x":0,
            "y":0,
            "anchor": {
              "x": 0,
              "y": 0
            },
            "parent":"Parent"
          }
        }]
      }), false);
    });
  });
})
