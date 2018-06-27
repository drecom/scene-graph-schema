var fs   = require('fs');
var path = require('path');
var JsonSchema = require('jsonschema');

var validator = new JsonSchema.Validator();

var rootDir        = path.resolve(path.join(__dirname, '..'));
var exampleDir     = __dirname;
var definitionsDir = path.join(rootDir, 'definitions');

LoadSchemaDefinitions: {
  var entities = fs.readdirSync(definitionsDir);
  var schemaPattern = /\.json$/;
  for (var i = 0; i < entities.length; i++) {
    var entity = entities[i];
    if (schemaPattern.test(entity)) {
      var json = fs.readFileSync(path.join(definitionsDir, entity));
      validator.addSchema(JSON.parse(json));
    }
  }
}

var validResult, invalidResult;
TestDto: {
  var schema  = fs.readFileSync(path.join(rootDir, 'Schema.json'));
  var valid   = fs.readFileSync(path.join(exampleDir, 'valid_example.json'));
  var invalid = fs.readFileSync(path.join(exampleDir, 'invalid_example.json'));

  var schemaJson  = JSON.parse(schema);
  var validJson   = JSON.parse(valid);
  var invalidJson = JSON.parse(invalid);

  validResult   = validator.validate(validJson, schemaJson);
  invalidResult = validator.validate(invalidJson, schemaJson);
}

Report: {
  var logLines = [];
  logLines.push("valid schema should not have any error");
  logLines.push("error count : " + validResult.errors.length);
  logLines.push("\n");
  logLines.push("invalid schema errors");
  for (var i = 0; i < invalidResult.errors.length; i++) {
    logLines.push(invalidResult.errors[i].stack);
  }

  console.log(logLines.join("\n"));
}
