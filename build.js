var fs = require('fs'),
    path = require('path');
    jade = require('jade'),
    md = require('node-markdown'),
    Class = require('neko').Class;

var format = new require('fomatto').Formatter();


// Garden Generator -------------------------------------------------------------
// ------------------------------------------------------------------------------
var Garden = Class(function(options) {
    var languages = fs.readdirSync(options.dir);

    this.languages = {};
    this.options = options;
    this.options.language = this.json([this.options.dir, 'language.json'].join('/'));

    var that = this;
    languages.forEach(function(lang) {
        if (fs.statSync(that.options.dir + '/' + lang).isDirectory()) {
            that.log('Parsing language "{}"...', lang);
            that.lang = {
                id: lang,
                navigation: [],
                index: []
            };

            if (that.loadIndex()) {
                that.languages[lang] = that.lang;
                that.log('    Done.')

            } else {
                that.log('    Error: Could not find "index.json"!')
            }
        }
    });

    delete this.lang;
    this.log('');
    this.generateAll();

}, {
    log: function() {
        console.log(format.apply(null, arguments));
    },

    loadIndex: function() {
        var that = this;
        this.lang.index = this.json([this.options.dir,
                                     this.lang.id, 'index.json'].join('/'));

        if (this.lang.index === null) {
            return false;
        }

        that.lang.title = that.lang.index.langTitle;
        this.lang.navigation = [];
        this.lang.index.sections.forEach(function(section, i) {
            that.loadSection(section);
            that.lang.navigation.push({
                title: section.title,
                link: section.dir,
                articles: section.articles,
                parsed: section.parsed
            });
        });
        return true;
    },

    loadSection: function(section) {
        var files = fs.readdirSync(this.folder(section.dir));
        section.parsed = {};
        section.link = section.dir;

        var that = this;
        section.articles = section.articles || [];
        section.articles.concat('index').forEach(function(article, e) {
            if (files.indexOf(article + '.md') !== -1) {
                var parsed = that.parseArticle(that.md(section.dir, article));
                section.parsed[article] = parsed;
                if (section.articles.indexOf(article) !== -1) {
                    section.articles[e] = {
                        id: article,
                        link: section.link + '.' + article,
                        title: parsed.title,
                        parsed: parsed
                    };
                }
            }
        });
    },

    parseArticle: function(text) {
        var title = text.substring(0, text.indexOf('\n'));
        text = text.substring(title.length);
        title = md.Markdown(title.replace(/\#/g, '').trim());
        text = this.toMarkdown(text);

        var parts = text.split('<h3>');
        var subs = [];
        for(var i = 0, l = parts.length; i < l; i++) {
            var sub = parts[i];
            subs.push((i > 0 ? '<h3>' : '') + sub);
        }

        return {
            title: title.substring(3, title.length - 4),
            text: text,
            subs: subs
        };
    },

    toMarkdown: function(text) {
        text = md.Markdown(text).replace(/'/g,'&#39;');
        text = text.replace(/<blockquote>/g, '<aside>').
                    replace(/<\/blockquote>/g, '</aside>');

        return text.replace(/<aside>\s+<p><strong>ES5/g,
                            '<aside class="es5"><p><strong>ES5');
    },

    json: function(file) {
        try {
            return JSON.parse(fs.readFileSync(file).toString());

        } catch (err) {
            return null;
        }
    },

    md: function(section, article) {
        var file = [this.folder(section), article].join('/') + '.md';
        return fs.readFileSync(file).toString();
    },

    folder: function(section) {
        return [this.options.dir, this.lang.id, section].join('/');
    },

    render: function(language, template, out) {
        var lang = this.languages[language];
        if (lang) {
            this.log('Rendering "{}" to "{}"...', language, out);

            var languages = [];
            for(var i in this.languages) {
                if (this.languages.hasOwnProperty(i)) {
                    if (this.options.language.listed.indexOf(i) !== -1) {
                        languages.push(this.languages[i]);
                    }
                }
            }

            var options = {
                pathPrefix: this.options.pathPrefix,
                baseLanguage: this.options.language.default,
                language: language,
                languages: languages,
                title: lang.index.title,
                description: lang.index.description,
                navigation: lang.navigation,
                sections: lang.index.sections,
                top: lang.navigation[0]
            };

            var jadefile = fs.readFileSync(template);
            var jadetemplate = jade.compile (jadefile);
            var html = jadetemplate(options);
            fs.writeFileSync(out, html);
            this.log('    Done.');
        }
    },

    generateAll: function() {
        for(var i in this.languages) {
            if (this.languages.hasOwnProperty(i)) {
                this.generate(i);
            }
        }
    },

    generate: function(lang) {
        var that = this;

        var dir = [this.options.out];
        if (lang !== this.options.language.default) {
            dir.push(lang);
        }
        dir = dir.join('/');

        path.exists(dir, function(exists) {
            if (!exists) {
                fs.mkdirSync(dir, '777');
            }
            that.render(lang, that.options.template, dir + '/index.html');
        });
    }
});

exports.build = function (options) {
    options = options || {dir: 'doc', pathPrefix: 'JavaScript-Garden/', template: 'garden.jade', out: 'site'};
    new Garden(options);
}

exports.build();
