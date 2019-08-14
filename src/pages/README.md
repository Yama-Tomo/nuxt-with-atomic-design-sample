## pages

Atomic design でいう pagesにあたります

### coding guide

- 振る舞い
  - 初期描画のハンドリングのみを行います
    - 必要なデータの取得，vuex storeの準備
  - vuexのアクションをディスパッチをしてもOkです

- UI
  - マークアップは templatesの描画のみ，スタイルは定義しません
  
