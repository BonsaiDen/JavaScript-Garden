var fs = require("fs");
var _ = require("lodash");
var jade = require('jade');
var md = require("marked");

function main(opts) {
  loadLanguages(opts.languagesDir)
  .sort(function(a,b) {
    return a.id > b.id ? 1 : -1
  })
  .forEach(function(lang,_,languages) {
    outputLanguage(lang,languages,opts);
  });
}

function loadLanguages(path) {
  var index = readJson(path + "/language.json");
  var availableListedLanguages = _.intersection(index.listed,fs.readdirSync(path));
  return availableListedLanguages.reduce(function(all,lang) {
    var langPath = path + "/" + lang;
    if(!fs.statSync(langPath).isDirectory()) return all;
    var data = _.extend(loadLanguage(langPath),{id: lang});
    return all.concat(data);
  },[]);
}

function loadLanguage(path) {
  var index = readJson(path + '/index.json');
  var language = _.extend(index,{
    sections: index.sections.map(function(section) {
      return _.extend(section,{
        link: section.dir,
        isIntro: section.dir == "intro",
        articles: section.articles.map(function(article) {
          return _.extend({
            link: section.dir + "." + article
          },loadArticle(path + "/" + section.dir + "/" + article + ".md"));
        })
      })
    })
  });
  language.navigation = language.sections;
  return language;
}

function loadArticle(path) {
  var text = fs.readFileSync(path,"utf8");
  var title = text.substring(0, text.indexOf('\n'));
  text = text.substring(title.length);
  title = md(title.replace(/\#/g, '').trim());
  var titleText = title.substring(3, title.length - 5);
  text = processArticleBody(text);

  var parts = text.split('<h3>');
  var subs = parts.map(function(sub,i) {
    return (i > 0 ? '<h3>' : '') + sub;
  });

  return {
    title: titleText,
    text: text,
    subs: subs
  };
}

function processArticleBody(text) {
  text = md(text).replace(/'/g,'&#39;');
  text = text.replace(/<blockquote>/g, '<aside>').
              replace(/<\/blockquote>/g, '</aside>');

  return text.replace(/<aside>\s+<p><strong>ES5/g,
                      '<aside class="es5"><p><strong>ES5');
}

function readJson(path) {
  return JSON.parse(fs.readFileSync(path,"utf-8"));
}

function outputLanguage(lang,languages,opts) {
  var langBase = lang.id == opts.baseLanguage ? "/" : "/" + lang.id;
  fs.mkdir(opts.outDir + langBase,function(err) {
    if(err && err.code != "EEXIST") {
      console.error("Couldn't make dir " + opts.outDir + ": " + err);
      process.exit(1);
    }
    var out = opts.outDir + langBase + "/index.html";
    var perLangOpts = _.extend({out: out,languages: languages},opts);
    writeTemplate(perLangOpts,lang);
  })
}

function writeTemplate(options,language) {
  var templateData = _.extend({language: language.id},language,options);

  var jadefile = fs.readFileSync(options.template);
  var jadetemplate = jade.compile(jadefile,{compileDebug: false,debug: false});
  var html = jadetemplate(templateData);
  fs.writeFileSync(options.out, html);
}

exports.build = function (opts) {
  opts = _.defaults(opts || {},{ languagesDir: "doc", baseLanguage: "en", template: 'garden.jade', pathPrefix: 'JavaScript-Garden/', outDir: "site" });
  return main(opts);
}

exports.build();
