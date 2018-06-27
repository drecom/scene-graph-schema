(function(){
  var fs   = require('fs');
  var path = require('path');
  var JsonSchema = require('jsonschema');

  var validator = new JsonSchema.Validator();

  var baseSchemaFile = 'Schema.json';

  var rootDir        = __dirname;
  var definitionsDir = path.join(rootDir, 'definitions');

  var entities = fs.readdirSync(definitionsDir);
  var schemaPattern = /\.json$/;
  for (var i = 0; i < entities.length; i++) {
    var entity = entities[i];
    if (schemaPattern.test(entity)) {
      var json = fs.readFileSync(path.join(definitionsDir, entity));
      validator.addSchema(JSON.parse(json));
    }
  }

  var schemaJson = fs.readFileSync(path.join(rootDir, baseSchemaFile));
  var schema     = JSON.parse(schemaJson);

  module.exports = {
    validate: function validate(sceneDto) {
      return validator.validate(sceneDto, schema);
    }
  };
}());
