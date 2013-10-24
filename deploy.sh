set -e
diffs=`git diff --name-status HEAD`
if [[ "" != $diffs ]]; then
  echo "Can't deploy, unsaved changes:"
  echo $diffs
  exit
fi
git checkout gh-pages
git reset --hard master
echo "Starting build"
node build.js
echo "Build complete"
rm -rf `ls -d * | grep -vP 'site|node_modules' | xargs`
echo "Cleaned out directory"
mv site/* .
rm -rf site
git add . -A
git commit -m 'latest'
echo "Commit created"
git push --force mine gh-pages
echo "Deployed to github"
git checkout master
	

