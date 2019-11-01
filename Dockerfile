FROM ruby:2.5.1

ENV LANG C.UTF-8

LABEL Name=orbit-api Version=0.0.1
EXPOSE 3000

RUN apt-get update -qq && \
    apt-get install -y build-essential \ 
                       libpq-dev \        
                       nodejs \
    && rm -rf /var/lib/apt/lists/*      

RUN mkdir /app

# throw errors if Gemfile has been modified since Gemfile.lock
# RUN bundle config --global frozen 1

WORKDIR /app
COPY . /app

# COPY Gemfile Gemfile.lock ./
RUN bundle install --no-deployment --verbose

CMD ["bash"]
