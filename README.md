# BIRD Lab 공식 홈페이지

**Bio-Interactive Robot Design Lab @ KIST** 공식 웹사이트입니다.  
Next.js 기반으로 제작되었으며, 연구실 소개, 논문, 인원, 갤러리 등을 포함합니다.

---

## 개발 환경 시작

```bash
npm install      # 최초 1회만
npm run dev      # 개발 서버 실행
```

브라우저에서 [http://localhost:3000](http://localhost:3000) 접속

---

## 폴더 구조

```
my-lab-website/
├── public/              # 이미지, PDF 등 정적 파일
│   ├── people/          # 멤버 사진
│   ├── research/        # 연구 이미지
│   ├── covers/          # 저널 커버 이미지
│   ├── gallery/         # 갤러리 사진
│   └── pdf/             # 논문 PDF (직접 추가)
├── data/                # 사이트 콘텐츠 데이터 (JSON)
│   ├── lab.json         # 랩 기본 정보 (주소, 이메일 등)
│   ├── people.json      # 멤버 및 Alumni 정보
│   ├── publications.json# 논문 목록 및 저널 커버
│   ├── research.json    # 연구 분야
│   ├── news.json        # 뉴스 항목
│   ├── gallery.json     # 갤러리 이벤트
│   └── opportunities.json# 채용/지원 안내
└── src/
    ├── app/             # 페이지 (Next.js App Router)
    └── components/      # 재사용 컴포넌트
```

---

## 콘텐츠 수정 방법

모든 내용은 `data/` 폴더의 JSON 파일에서 수정합니다.

### 멤버 추가/수정 — `data/people.json`
```json
{
  "id": "hong-gildong",
  "name": "Gildong Hong",
  "role": "Graduate Student",
  "category": "phd",
  "photo": "/people/hong-gildong.jpg",
  "email": "gildong@kist.re.kr",
  "tagline": "한 줄 소개",
  "education": "석박통합과정, 재료공학, 서울대학교\n학사, 기계공학, 연세대학교",
  "researchInterests": "소프트 로봇 / 메타소재",
  "bio": ""
}
```
> `education` 필드에서 `\n`을 쓰면 줄바꿈됩니다.

### 논문 추가 — `data/publications.json`
```json
{
  "id": 27,
  "title": "논문 제목",
  "authors": "J. Byun, ...",
  "pi": "J. Byun",
  "venue": "Nature",
  "venueColor": "#c00000",
  "details": "1, 1-10 (2026)",
  "pdf": "/pdf/nature-2026.pdf",
  "year": 2026
}
```

### PDF 파일 추가
1. `public/pdf/` 폴더에 PDF 파일 복사
2. `publications.json`의 해당 논문 `"pdf"` 필드에 `"/pdf/파일명.pdf"` 입력

### 뉴스 추가 — `data/news.json`
```json
{ "id": 1, "text": "뉴스 내용을 여기에 입력합니다." }
```

---

## 배포 (Vercel 추천)

1. [GitHub](https://github.com)에 이 프로젝트를 push
2. [Vercel](https://vercel.com)에서 GitHub 계정으로 로그인
3. "Add New Project" → GitHub 레포 선택 → Deploy
4. 이후 `git push`하면 자동으로 재배포됩니다

```bash
git add .
git commit -m "내용 업데이트"
git push
```

---

## 주의사항

- `data/` 폴더의 JSON 파일 수정 시 **큰따옴표(`"`)와 쉼표(`,`)** 형식에 주의하세요. JSON 형식 오류 시 사이트가 동작하지 않습니다.
- 이미지 파일명에 **한글이나 공백**이 있으면 오류가 날 수 있습니다. 영문+숫자만 사용하세요.
- 멤버 사진은 **세로형(3:4 비율)** 이 가장 잘 맞습니다.
