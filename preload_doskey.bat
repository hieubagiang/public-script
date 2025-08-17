@echo off
:: Git aliases
doskey gpf=git push -f $*
doskey gp=git push $*
doskey gpo=git push origin $*
doskey gc=git commit -m $*
doskey gs=git status
doskey gf=git fetch
doskey ga=git add .
doskey gca=git commit --amend $*
doskey grc=git rebase --continue $*
doskey grba=git rebase -i --autosquash $*

:: Flutter / Dart / Makefile aliases
doskey fb=fvm dart run build_runner build --delete-conflicting-outputs
doskey fbw=fvm dart run build_runner watch --delete-conflicting-outputs
doskey f=fvm flutter $*
doskey fpg=f pub get
doskey fc=f clean
doskey fpa=f pub add $*
doskey fg=make gen
doskey ml=make lang
