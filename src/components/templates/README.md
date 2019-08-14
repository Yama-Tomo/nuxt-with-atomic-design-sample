## templates

Atomic design でいう templatesにあたります

### coding guide

- 振る舞い
  - 初期描画以外のイベントハンドリングは全てここで行います
    - 主に配下にあるorganisms同士を横断するイベントのハンドリングをします
  - vuexのアクションをディスパッチをしてもOkです

- UI
  - 管理下の organisms, atoms, moleculesのスタイルやレイアウトのマークアップをします
  
