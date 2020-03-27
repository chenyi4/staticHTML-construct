var UglifyJS = require("uglify-es");
var fs = require("fs");

var conFig = {
    enterFile: './../src/main/resources/static/js/',
    outFile: 'files'
}

var fileNames = [
  "cover.js",
  "customize.js",
  "customizeInit.js",
  "customizeJqgridId.js",
  "customizeSave.js",
  "deviceDateTime.js",
  "formcheck.js",
  "jsplumbAttach.js",
  "jsplumbCustomize.js",
  "language.js",
  "viewapilist.js"
];

deleteDist();

var code = {}
fs.readdirSync(conFig.enterFile).map((file) => {
  console.log(fileNames.indexOf(file));
  if(fileNames.indexOf(file) >= 0){
      if(file.indexOf('js') >= 0){
          var content = fs.readFile(conFig.enterFile+file,'utf-8', function (err,data) { 
              code = {};
              code[file] = data;
              Uglify(code)
          });
      }
    }
});

function deleteDist(){
    fs.readdirSync(conFig.outFile).map((file) => {
        fs.unlink(conFig.outFile+`/${file}`,(err) => {
          if (err) {
            console.log(err);
          } else {
            console.log('delete ok');
          }
        });
      });
}

function Uglify(code) {
    var options = {
        mangle: {
            toplevel: false, //不混淆全局的变量名
        },
        unsafe_math: true,
        nameCache: {}
    };
    for(var codeI in code){
        var true_code = code[codeI];
        var result = UglifyJS.minify(true_code, options);
        var outFileName = codeI.replace('.js', '.min.js');
        fs.writeFile(conFig.outFile+'/'+outFileName, result.code,  function(err) {
    
        });
    }
}



