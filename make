#!/usr/bin/python
import markdown
import shutil
import os
import sys
import subprocess

def create_index():
    print 'Generating index...'
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
    template = open('html/template.html').read().decode('utf-8')
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
        title = to_markdown('## %s [#top](#%s)' % (title, top)).replace('<h2>', '<h2 id="%s">' % link)

    else:
        title = to_markdown('# %s' % title).replace('<h1>', '<h1 id="%s">' % link)

    return '<article><section><header>%s</header>\n%s</article>' % (title, html)


def to_content(file):
    md = open('%s.md' % file).read().decode('utf-8')
    title = md.split('\n')[0]
    content = md[len(title):].strip()
    html = to_markdown(content)

    html = html.replace('<blockquote>', '<aside>').replace('</blockquote>', '</aside>')
    html = '</section><section><h3>'.join(html.split('<h3>')) + '</section>'
    html = html.replace('<h3>', '<header><h3>').replace('</h3>', '</h3></header>')
    title = title.strip('#').strip()
    return (title, content, html)


def to_markdown(text):
    return markdown.markdown(text, ['abbr'])


def merge_pages():
    if get_branch() != 'master':
        print 'ERROR: Not on master'
        return 1

    git = subprocess.Popen(['git', 'status'], stdout=subprocess.PIPE)
    result = git.communicate()[0].strip().split('\n')
    if not result[-1].startswith('nothing to commit'):
        print 'ERROR: Please commit to master first'
        return 1

    else:
        if os.path.exists('build'):
            shutil.rmtree('build')

        if not os.path.exists('build'):
            print 'Copying files...'
            os.mkdir('build')
            shutil.copytree('html/css', 'build/css')
            shutil.copytree('html/js', 'build/js')
            shutil.copyfile('html/index.html', 'build/index.html')
            print 'Files copied sucessfully'

            git = subprocess.Popen(['git', 'checkout', 'gh-pages'],
                                    stdout=subprocess.PIPE)

            print get_branch()
            if get_branch() != 'gh-pages':
                print 'ERROR: Failed to switch to gh-pages'
                return 1

            status = merge_git()
            git = subprocess.Popen(['git', 'checkout', 'master'],
                                    stdout=subprocess.PIPE)

            if git.communicate()[0].strip() == 'Aborting':
                print 'ERROR: Automatic commit failed. Please commit to gh-pages manually'
                return 1

            else:
                return status

        else:
            print 'ERROR: Failed to remove old build directory'
            return 1

    return 0


def merge_git():
    if os.path.exists('build'):
        if os.path.exists('css'):
            shutil.rmtree('css')

        if os.path.exists('js'):
            shutil.rmtree('js')

        shutil.copytree('build/css', 'css')
        shutil.copytree('build/js', 'js')
        shutil.copyfile('build/index.html', 'index.html')
        shutil.rmtree('build')
        return 0

    else:
        print 'ERROR: build directory missing'
        return 1


def merge():
    print 'Merging into pages...'
    if merge_pages() == 1:
        print 'Merge aborted.'

    else:
        print 'Merge successful'
    
def get_branch():
    git = subprocess.Popen(['git', 'branch'], stdout=subprocess.PIPE)
    branches = git.communicate()[0].strip().split('\n')
    for i in branches:
        if i.startswith('*'):
            return i[1:].strip()

    return None

if __name__ == '__main__':
    if len(sys.argv) > 1:
        if sys.argv[1] == 'pages':
            merge()

        elif sys.argv[1] == 'all':
            create_index()
            merge()

    else:
        create_index()
    
