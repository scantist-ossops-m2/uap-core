'use strict'

var assert = require('assert')
var path = require('path')
var fs = require('fs')
var yaml = require('yamlparser')
var regexes = readYAML('../regexes.yaml')
var safe = require('safe-regex')

function readYAML (fileName) {
  var file = path.join(__dirname, fileName)
  var data = fs.readFileSync(file, 'utf8')
  return yaml.eval(data)
}

suite('regexes', function () {
  Object.keys(regexes).forEach(function (parser) {
    suite(parser, function () {
      regexes[parser].forEach(function(item) {
        test(item.regex, function () {
        // console.log(item.regex)
          assert.ok(safe(item.regex))
        })
      })
    })
  })

  test('should not backtrack HbbTV CUS', function () {
    testRedos('HbbTV/0.0.0 (;CUS:;' + Array(3500).fill(' ').join('') + 'z')
  })

  test('should not backtrack HbbTV', function () {
    testRedos('HbbTV/0.0.0 (;' + Array(3500).fill(' ').join('') + 'z')
  })

  test('should not backtrack HbbTV z', function () {
    testRedos('HbbTV/0.0.0 (;z;' + Array(3500).fill(' ').join('') + 'z')
  })
})
