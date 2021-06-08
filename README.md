# 아마 여기 선배 IT을지도?

> 졸업생, 재학생이 현재 다니고 있는 회사 위치정보와 학생들이 어디에 주로 분포해 있는지 확인할 수 있는 사이트 입니다.

<br />

### 본인 등록 방법

<br />

#### 방법 - 1

1. 해당 저장소를 `fork` 해주세요!
2. `src/data/db.json`파일의 가장 하단부분에 본인의 정보를 입력해주세요!
3. 해당 저장소로 `PR`을 보내주세요.
4. 확인 후 PR이 병합되며 반영될 거예요!

<br />

#### 방법 - 2

1. [FaceBook Messenger](https://www.facebook.com/profile.php?id=100008939477392)를 통해 (`db.json`의 내용을 전달해주세요.)
2. 확인 후 반영될 거에요!

<br />

## db.json 설명

> 아래에 [db.json(example)](<#db.json-(example)>)도 있어요!

```json
{
  "name": "이름 (필수, string)",
  "generation": "기수 (필수, number)",
  "profileImg": "프로필 이미지 (선택 - 빈 문자열, Github 이슈와 같은 방법을 통해 호스팅 된 이미지의 URL이 등록되어야 합니다.)",
  "tagImg": "회사 이름을 태그 이미지로 나타낼 수 있습니다. (선택 - 빈 문자열, Github 이슈와 같은 방법을 통해 호스팅 된 이미지의택URL이 등록되어야 합니다.)",
  "explanation": "간단한 한줄 소개 (필수, string)",
  "companyName": "회사 이름 (필수, string)",
  "companyLocation": "회사 주소(필수 - 도로명 주소, string)",
  "position": "직무 (필수 - 하단의 position-type을 보고 작성해주세요. ,string)"

```

## position-type

> 혹시 다른 직군 추가를 원하시면 [이슈](https://github.com/SoonGwan/daesogoMap/issues/new)를 남겨주세요!

```typescript
  | "FrontEnd"
  | "BackEnd"
  | "Android"
  | "iOS"
  | "Window"
  | "Embedded"
  | "Design"
  | "QA"
  | "CTO"
  | "CEO"
```

## db.json (example)

```json
{
  "name": "권순관",
  "generation": 4,
  "profileImg": "https://avatars.githubusercontent.com/u/48983361?v=4",
  "explanation": "세상에 도움이 되는 개발자가 될래",
  "tagImg": "",
  "companyName": "대구소프트웨어고등학교",
  "companyLocation": "대구광역시 달성군 구지면 창리로11길 93",
  "position": "FrontEnd"
}
```
