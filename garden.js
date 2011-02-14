var fs = require('fs');
var jade = require('jade');
var md = require('node-markdown');
var Class = require('neko').Class;


// Garden Generator -------------------------------------------------------------
// ------------------------------------------------------------------------------
var Garden = Class(function(options) {
    this.options = options;
    this.index = this.json(this.options.dir + '/index.json');
    this.loadIndex();

}, {
    loadIndex: function() {
        var that = this;
        this.navigation = [];
        this.index.sections.forEach(function(section, i) {
            that.loadSection(section);
            that.navigation.push({
                title: section.title,
                link: section.dir,
                articles: section.articles
            });
        });
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

        var parts = text.split('###');
        var subs = [];
        for(var i = 0, l = parts.length; i < l; i++) {
            var sub = parts[i];
            subs.push(this.toMarkdown((i > 0 ? '###' : '') + sub));
        }

        return {
            title: title.substring(3, title.length - 4),
            text: this.toMarkdown(text),
            subs: subs
        };
    },

    toMarkdown: function(text) {
        text = md.Markdown(text).replace(/'/g,'&#39;');
        return text.replace(/<blockquote>/g, '<aside>').
                    replace(/<\/blockquote>/g, '</aside>');
    },

    json: function(file) {
        return JSON.parse(fs.readFileSync(file).toString());
    },

    md: function(section, article) {
        var file = [this.folder(section), article].join('/') + '.md';
        return fs.readFileSync(file).toString();
    },

    folder: function(section) {
        return [this.options.dir, section].join('/');
    },

    render: function(template, out) {
        var options = {
            title: this.index.title,
            description: this.index.description,
            navigation: this.navigation,
            sections: this.index.sections,
            top: this.navigation[0]
        };

        jade.renderFile(template, {locals: options}, function(err, html){
            if (err) throw err;
            fs.writeFileSync(out, html);
        });
    }
});

new Garden({dir: 'doc'}).render('garden.jade', 'site/index.html');

