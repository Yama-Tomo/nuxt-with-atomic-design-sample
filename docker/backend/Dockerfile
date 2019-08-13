FROM ruby:2.6.3-alpine

WORKDIR /app

RUN apk add --no-cache --virtual .build-deps ruby-dev libc-dev musl-dev g++ make sqlite-dev tzdata \
    && rm -rf /var/lib/apt/lists/* \
              /var/cache/apk/* \
              /usr/share/man \
              /app/* \
              /tmp/*

CMD ["sh", "-c", "bundle install && bundle exec rails db:migrate && bundle exec rake db:seed && bundle exec rails s -b 0.0.0.0"]
