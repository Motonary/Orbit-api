# Orbit
A modern todo web application.
## Description
`Orbit` is a SPA with React.js and Ruby on Rails. You can put tasks on orbits as stars and delete them with wonderful animation so instinctively like the demo.
## Demo(Click this image if gif freezes!)
![Test](https://raw.githubusercontent.com/wiki/BuddiX/orbit-app/images/orbit-readme-trimmed.mov%E3%81%AE%E3%82%B3%E3%83%94%E3%83%BC.gif)

## Requirement
- ruby 2.5+
- Rails 5.2+
- React 16.3+
## Set up
### Build
```sh
# clone
$ git clone git@github.com:Motonary/Orbit-api.git
$ cd Orbit-api

# docker setup
$ docker-compose build
$ docker-compose up -d
$ docker-compose run --rm orbit-api bundle exec rails db:create rails db:migrate
```

### .env
You need to get environment variables from authors to contribute to this project.
At first create env file like this.
```sh
$ touch .env
```
and paste them.
```
AWS_ACCESS_KEY=######
AWS_ACCESS_SECRET_KEY=######
```

## Author
- [Yuki Shirota](https://github.com/rechtburg)
- [Taishi Murakami](https://github.com/bokusunny)
