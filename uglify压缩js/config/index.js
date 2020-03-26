var UglifyJS = require("uglify-es");
var fs = require("fs");

var conFig = {
    enterFile: 'files/',
    outFile: './dist'
}


deleteDist();

var code = {}
fs.readdirSync('files').map((file) => {
    console.log(file);
    var content = fs.readFile(conFig.enterFile+file,'utf-8', function (err,data) { 
        code = {};
        code[file] = data;
        Uglify(code)
     });
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
            toplevel: true,
        },
        nameCache: {}
    };
    for(var codeI in code){
        var true_code = code[codeI];
        var result = UglifyJS.minify(true_code, options);
        fs.writeFile(conFig.outFile+'/'+codeI, result.code,  function(err) {
    
        });
    }
}



