#!/usr/bin/python3

import subprocess
import shutil
import os

files = [x.strip() for x in open('nav.md').readlines() if x.strip() != '' ]

def to_markdown(data):
    with open('md.tmp', 'wb') as f:
        f.write(data.encode('utf-8'))

    html = subprocess.getoutput('./tools/Markdown.pl md.tmp')
    return html


page_title = 'JavaScript Garden'
doc_html = '' 
nav_html = '<h1>Gardening Topics</h1><div id="navbox">'
for f in files:
    md = open('%s.md' % f).read()                             
    title = md.split('\n')[0]
    html = to_markdown(md[len(title):])

    if f == 'index':
        title = title.strip('#').strip().replace('`', '')
        doc_html += '<h1>%s</h1>%s' % (title, html)

    else:
        title = title.strip('#').strip()
        id = title.replace(' ', '-').lower().replace('`', '')
        doc_html += to_markdown('### %s [^](#top)' % title).replace('h3>', 'h3 id="%s" class="section">' % id)
        doc_html += '<div class="sub">%s</div>' % html

        nav_html += to_markdown('[%s](#%s)' % (title, id))

nav_html += '</div>'

template = open('template/template.html').read()

foot_html = to_markdown(open('footer.md').read())

if not os.path.exists('html'):
    os.mkdir('html')

with open('index.html', 'wb') as f:
    f.write(template.format(title = page_title,
                            nav = nav_html,
                            body = doc_html,
                            footer = foot_html).encode('utf-8'))

shutil.copyfile('template/garden.css', 'garden.css')
os.unlink('md.tmp')

