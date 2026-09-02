# Eyeregulus

현대 점성학·수비학 블로그. Jekyll(minimal-mistakes) → **Astro** 로 이전한 버전.

## 개발

```sh
npm install
npm run dev      # http://localhost:4321
npm run build    # -> dist/
npm run preview  # 빌드 결과 미리보기
```

Node 20+ 필요. Ruby / Bundler 불필요.

## 구조

| 경로 | 내용 |
| --- | --- |
| `src/content/posts/*.md` | 글. 파일명(날짜 제외)이 그대로 URL slug. frontmatter: `title`, `date`, `categories`, `tags`, `pinned`, `feature_row?` |
| `src/content/pages/*.md` | 단독 페이지 (about, apps, review, reserve, privacy-*, terms-*) |
| `src/consts.ts` | 사이트 설정 · 네비 · 카테고리 한글↔슬러그 매핑 · 저자 정보 |
| `src/layouts/` | `BaseLayout`(공통 뼈대), `PostLayout`, `PageLayout`, `SplashPageLayout` |
| `src/components/` | Masthead, Footer, Modals(개인정보·약관), FeatureRow, ArchiveSingle, Sidebar 등 |
| `src/pages/[...path].astro` | 글 + 단독 페이지 라우팅 (URL 100% 보존) |
| `src/pages/categories/[slug].astro` | 카테고리 아카이브 |
| `src/pages/tags/index.astro` | 태그 아카이브 (`/tags/`) |
| `src/pages/feed.xml.ts` | RSS |
| `public/` | 정적 자산 (`assets/`, `CNAME`, `ads.txt`, 검색엔진 인증 파일 등) |

디자인은 기존 minimal-mistakes 컴파일된 CSS(`public/assets/css/main.css`)와 JS 번들을
그대로 재사용한다. 스타일을 바꾸려면 그 CSS를 교체하거나 페이지별 `<style>` 추가.

## URL 보존

기존 Jekyll permalink(`/:categories/:title/`)를 한글 카테고리 경로 그대로 유지한다.
예: `/현대점성학 초급/astrology_Basic_1/`. 카테고리 아카이브는 영문 슬러그
(`/categories/astrology-beginner/`). 매핑은 `src/consts.ts`의 `CATEGORY_MAP`.

## 배포

GitHub Pages + Actions (`.github/workflows/deploy.yml`).
저장소 Settings → Pages → Source = **GitHub Actions** 로 설정하면
`main` 푸시마다 빌드·배포된다. `public/CNAME` 이 커스텀 도메인을 유지한다.

## 이전 시 제거된 것

- giscus 댓글
- lunr / Algolia 검색
- Jekyll / Ruby / `_config.yml`
