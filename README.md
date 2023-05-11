# 発表内容
## title 
テストファーストで考えるReactのコンポーネント設計

## summary
テストのしやすさからReactのコンポーネント設計を考えてみる
フロントエンドのコンポーネント設計の難しさ
- 全部コンポーネント
- 再利用性？
- 詰め込みすぎる
- どこに何を置くのか？

テストから考えることでコンポーネントの責務を明らかにしてみる
- function test 
- component test
- hooks test
- union test

## index
### 自己紹介
- 名前
- 写真
- 技術
- プロジェクト
- 趣味

### 話すこと
#### 関数とコンポーネントを分割する
純粋な値の演算とコンポーネントのレンダリングを分ける
コンポーネントを純粋に保つ

#### stateとコンポーネントを分割する
custom hookを使いテストを書く、状態の変化を保証する
コンポーネントを純粋に保つ

#### 結合する
組み合わせなければならない
状態を管理する特殊なコンポーネントを考える(container component)
フロントでの動作確認とする(e2eはFlaky)

#### 他にテストするならば
ビジュアルリグレッションテスト
コンポーネント単位で簡単にテスト
e2eテスト
結合テストでカバーできるかも？
