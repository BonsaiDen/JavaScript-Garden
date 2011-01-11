#!/usr/bin/python3
import subprocess
import shutil
import os

def create_index():
    articles = []

    page = {}
    doc = create_navigation('doc/index')

    # Page & Navigation
    page['title'] = doc['title']
    page['navigation'] = doc['navigation']
    page['description'] = 'Guide to JavaScript\'s Quirks and Flaws'

    # Intro
    intro = to_content('doc/%s' % doc['articles'][0])
    page['intro'] = create_article(doc['articles'][0], intro[0], intro[2])

    # Articles
    for a in doc['articles'][1:]:
        content = to_content('doc/%s' % a)
        articles.append(create_article(a, content[0], content[2], top = doc['articles'][0]))

    page['articles'] = '\n\n'.join(articles)

    # Create HTML
    template = open('html/template.html').read()
    with open('html/index.html', 'wb') as f:
        f.write(template.format(**page).encode('utf-8'))


def create_navigation(file):
    content = to_content(file)

    articles = []
    links = content[1].split('\n')
    for l in links:
        articles.append(l.split('#')[1].strip(')'))

    return {
        'articles': articles,
        'title': content[0],
        'navigation': content[2]
    }


def create_article(link, title, html, top = None):
    if top is not None:
        title = to_markdown('### %s [^](#%s)' % (title, top)).replace('<h3>', '<h3 id="%s">' % link)

    else:
        title = to_markdown('# %s' % title).replace('<h1>', '<h1 id="%s">' % link)

    return '<article><header>%s</header>\n%s</article>' % (title, html)


def to_content(file):
    markdown = open('%s.md' % file).read()
    title = markdown.split('\n')[0]
    content = markdown[len(title):].strip()
    html = to_markdown(content)
    title = title.strip('#').strip()
    return (title, content, html)


def to_markdown(data):
    with open('md.tmp', 'wb') as f:
        f.write(data.encode('utf-8'))

    html = subprocess.getoutput('./tools/Markdown.pl md.tmp')
    os.unlink('md.tmp')
    return html


if __name__ == '__main__':
    create_index()

