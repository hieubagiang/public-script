@echo off
doskey gpf=git push -f $*
doskey gp=git push $*
doskey gc=git commit -m $1
doskey gs=git status
doskey gf=git fetch
doskey ga=git add .
doskey fb=fvm flutter packages pub run build_runner build --delete-conflicting-outputs
doskey f=fvm flutter $*
doskey fpa=fvm flutter pub add $*
doskey fpg=fvm flutter pub get
doskey fclr=fvm flutter clean
