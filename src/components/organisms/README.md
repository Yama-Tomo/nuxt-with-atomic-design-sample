## organisms

Atomic design でいう organismsにあたります

### directory structure

```
src/components/organisms/
  |-- ecosystems
  |   `-- Foo.vue
  |-- individuals
  |   |-- index
  |   |   `-- Hoge.vue
  |   `-- timeline
  |       `-- Foo.vue
  `-- shared
      |-- Foo.vue
      `-- Hoge.vue
```

- ecosystems
  - 振る舞いだけを実装している container componentを配置するディレクトリです
  
- shared
  - ここがorganismsのメインのディレクトリです
  - ※ TODO: shared配下のディレクトリの細分化の規約を決める
  
- individuals  
  - UIの設計上 shared配下にあるコンポーネントを使うことが出来ない例外のケースのためのコンポーネントを配置するディレクトリです
  - individuals以下のディレクトリはpages配下と同じ構成にします
  - このディレクトリのコンポーネントの実装は例外として捉え，UIデザイナーと意識を合わせなるべくこのディレクトリを太らせることがないようにすることが重要です 

### coding guide

- 共通
  - 振る舞い
    - vuexのアクションをディスパッチをしてもOkです. ただしそのアクションの作用が自コンポーネントで完結しない場合はemitで上流コンポーネントに渡すようにします
    - emitでイベントを渡してばかりしてしまうと templatesに責務が偏ってしまうのでバランスに注意します

  - UI
    - 管理下の atoms, moleculesのスタイルやレイアウトのマークアップをします
  
- ecosystems
  - UI
    - scoped slotを提供し presentational componentが自由にUIを構築できるように実装します
    - マークアップは scoped slotの描画のみ，スタイルは定義しません
    
- shared
  - 振る舞い
    - なるべく presentational componentとして実装し, 振る舞いはecosystems配下のコンポーネントへ切り出せないかを検討します
   
- individuals  
  - そのページ専用のコンポネートであるため，その画面のtemplates以外のコンポーネントから依存させてはいけません
    - individuals同士の依存もNGです
    - ecosystems配下のコンポーネントを利用できる場合は利用します．利用できない場合は ecosystems配下に切り出すのではなくそのまま1つのコンポーネントとして実装します
    
    
    
