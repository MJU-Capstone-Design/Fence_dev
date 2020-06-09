# Fence_dev
🚧안전지킴이 지도 Fence 서비스 개발🚧


### 1. 프로젝트의 저장소를 내 컴퓨터로 clone

- clone은 다른 사람의 저장소를 내 컴퓨터로 복사해오는 것을 의미합니다.

```sh
git clone https://github.com/MJU-Capstone-Design/Fence_dev.git
```

### 2. 작업 branch 생성

- branch는 다른 사람과 작업 공간이 겹치는 것을 방지하는데 도움을 주는 기능입니다.
- **branch 꼭 만들어서 작업해주세요!!ㅠㅠ**

```sh
cd Fence_dev # clone해서 만들어진 폴더로 이동
git checkout -b 자기 영어 이름(내 브랜치 이름이 됨) # ex) git checkout -b yurim
```

### 3. npm install 받기

- 기본 환경으로 설정한 package들을 한번에 다운받을 수 있습니다.
```sh
npm install
```
- client 폴더로 들어가서 한번더 install 작업을 실행해주세요.
```sh
cd client
npm install
```

### 4. mysql 정보 입력하기

- 서버 폴더에가서 `config`폴더를 만들고 `config`폴더 안에 `database.js`파일을 생성하여 본인 mysql 정보를 입력해주세요.
```javascript
// database.js
module.exports = {
  host: "localhost",
  user: "<사용자 예) root>",
  password: "<비밀번호>",
  database: "<사용할 db 이름>",
};
```

### 5. server와 client 한번에 실행시키기

- server와 client 폴더가 따로 되어있어 원래는 server와 client를 각각 실행시켜주어야 하는 불편함이 있습니다.
- 이와같은 점을 해결하기 위해 `concurrently`라는 package를 다운받아 설정해두었습니다.

```sh
npm run dev
```
Fence 폴더에서 `npm run dev`를 실행하면 server와 client를 동시에 실행시킬 수 있습니다.

## 내가 한 코드 업로드

### 1. 터미널을 실행하고 clone을 해서 만들어졌던 폴더로 이동합니다.

### 2. 다음과 같이 입력해서 원격에 내가 푼 문제를 올리도록 합니다.

```sh
git add .
git commit -m "기능에 대한 간단한 설명"
git push origin 본인 브랜치 이름(본인 영어 이름)
# ex) git push origin yurim
```

