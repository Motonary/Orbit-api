# OrbitApp
A modern todo web application.
## Description
`Orbit` is a SPA with React.js and Ruby on Rails. You can put tasks on orbits as stars and delete them with wonderful animation so instinctively like the demo.
## Demo
![Test](https://raw.githubusercontent.com/wiki/BuddiX/orbit-app/images/orbit-readme-trimmed.mov%E3%81%AE%E3%82%B3%E3%83%94%E3%83%BC.gif)   
**Click this image if gif freezes!**

## Requirement
- ruby 2.5+
- Rails 5.2+
- React 16.3+
## Set up
```sh
# clone
$ git clone git@github.com:BuddiX/orbit-app.git
$ cd orbit-app
# install npm
$ cd frontend ; npm install 
$ cd -
# create db
$ rails db:migrate
$ rails db:seed
# build js and set up localhost
$ foreman start
```
## Author
- [Yuki Shirota](https://github.com/rechtburg)
- [Taishi Murakami](https://github.com/bokusunny)
