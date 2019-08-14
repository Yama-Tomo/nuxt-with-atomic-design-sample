<h2 align="center">nuxt-with-atomic-design-sample</h2>

### Getting started

```bash
$ docker-compose up -d 
```

- production mode 

```bash
$ docker-compose -f docker-compose.yml -f docker-compose.prod.yml \
  -p $(basename `pwd`)-prod up -d
```

### Atomic design とディレクトリの対応表

詳細は各READMEを参照


|  type  |  directory  |
| ---- |  ---- |
|  atoms  |  <ul><li>[src/components/atoms](./src/components/atoms/README.md)</li></ul> |
|  molecules  |  <ul><li>[src/components/molecules](./src/components/molecules/README.md)</li></ul>  |
|  organisms  |  <ul><li>[src/components/organisms](./src/components/organisms/README.md)</li></ul>  |
|  templates  |  <ul><li>[src/components/templates](./src/components/templates/README.md)</li><li>[src/layouts](./src/layouts/README.md)</li></ul>  |
|  pages  |  <ul><li>[src/pages](./src/pages/README.md)</li></ul>  |



