## layouts

Atomic design でいう templatesにあたります

### coding guide

- 配下の templates でできない画面全体のレイアウト（ヘッダー，フッター，サイドバー etc..) などのスタイルの調整や振る舞いだけを実装します

- 振る舞い
  - 初期描画以外のイベントハンドリングは全てここで行います
    - 主に配下にあるorganisms同士を横断するイベントのハンドリングをします
  - vuexのアクションをディスパッチをしてもOkです

- UI
  - 管理下の organisms, atoms, moleculesのスタイルやレイアウトのマークアップをします
  
