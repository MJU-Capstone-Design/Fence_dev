# Fence_dev
🚧안전지킴이 지도 Fence 서비스 개발🚧


### 1. 프로젝트의 저장소를 내 컴퓨터로 clone

- clone은 다른 사람의 저장소를 내 컴퓨터로 복사해오는 것을 의미합니다.

```sh
git clone https://github.com/MJU-Capstone-Design/Fence_dev.git
```

### 2. 작업 branch 생성

- branch는 다른 사람과 작업 공간이 겹치는 것을 방지하는데 도움을 주는 기능입니다.

```sh
cd Fence_dev # clone해서 만들어진 폴더로 이동
git checkout -b 자기 영어 이름(내 브랜치 이름이 됨) # ex) git checkout -b yurim
```

## 내가 한 코드 업로드

### 1. 터미널을 실행하고 clone을 해서 만들어졌던 폴더로 이동합니다.

### 2. 다음과 같이 입력해서 원격에 내가 푼 문제를 올리도록 합니다.

```sh
git add .
git commit -m "기능에 대한 간단한 설명"
git push origin 본인 브랜치 이름(본인 영어 이름)
# ex) git push origin yurim
```
