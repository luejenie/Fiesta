<!-- ![header](https://capsule-render.vercel.app/api?type=Waving&color=timeGradient&height=250&section=header&text=Fiesta&fontSize=60&animation=twinkling&fontColor=ffffff&fontAlign=80) -->



<!--<p>"일상을 축제로 만드는 소셜 미디어"<br></p>-->

<br>

<div align="center">
<img src="https://user-images.githubusercontent.com/110653573/222792284-7e729513-31e9-47ae-a644-ddfd4860a845.png" width="20%" />
</div>

<br>
<br>

# :pushpin: Fiesta
>**인스타그램을 벤치마킹한 SNS 프로젝트**<br>
>**[Fiesta 바로가기](http://146.56.188.235:8080/)**

</br>
</br>

## 1. 프로젝트 소개
- **제작 기간** : 2022년 10월 18일 ~ 12월 10일
- **참여 인원** : 5인 팀 프로젝트
- **프로젝트 개요**
  - 인스타그램을 벤치마킹한 SNS 프로젝트
  - 타임라인, 채팅, 탐색(해시태그, 팔로우) 등 SNS에 최적화된 기능 제공
- **담당 기능**
  - 전체 프로젝트 기획 및 개발 참여
  - 로그인, 회원가입, 비밀번호 재설정 등 회원 관련 기능
    - bcrypt를 활용하여 비밀번호 암호화
    - ajax를 활용하여 아이디/닉네임 중복검사, 유효성 검사
    - 이메일 인증
  - 검색 기능 및 AJAX를 활용한 검색 결과 페이지 조회
    - 웹, 태블릿, 모바일별 미디어 쿼리 적용
  - 계정, 해시태그 팔로우 기능


<br>
<br>

- **프로젝트 구조**
![](https://user-images.githubusercontent.com/110653573/221127291-cec3ff02-76a7-4de3-a5e0-59ac00119050.png)

<br>
<br>

## 2. 사용 기술
<div align="center">
  
### **Back-end**
<img src="https://img.shields.io/badge/Java 11-007396?style=for-the-badge&logo=java&logoColor=white"> 
  <img src="https://img.shields.io/badge/Spring 5.3.14-6DB33F?style=for-the-badge&logo=spring&logoColor=white">
  <img src="https://img.shields.io/badge/Oracle 21C-F80000?style=for-the-badge&logo=oracle&logoColor=white">
  <br>
  <img src="https://img.shields.io/badge/Apache Tomcat 9.0-F8DC75?style=for-the-badge&logo=apachetomcat&logoColor=white">
    <img src="https://img.shields.io/badge/Apache Maven-C71A36?style=for-the-badge&logo=ApacheMaven&logoColor=white">
    <img src="https://img.shields.io/badge/Spring Sequrity-6DB33F?style=for-the-badge&logo=SpringSecurity&logoColor=white">

### **Front-end**
  <img src="https://img.shields.io/badge/html5-E34F26?style=for-the-badge&logo=html5&logoColor=white"> 
  <img src="https://img.shields.io/badge/css-1572B6?style=for-the-badge&logo=css3&logoColor=white"> 
  <img src="https://img.shields.io/badge/javascript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black"> 

</div>

<br>
<br>

## 3. ERD 설계

<img src="/SNS 프로젝트.png">


<br>
<br>

## 4. 핵심 기능


<details>
<summary><b>로그인, 회원가입, 비밀번호 재설정 등 회원 관련 기능</b></summary>
<div markdown="1">
  
![](https://user-images.githubusercontent.com/110653573/224913433-c3fa8065-3d46-4c70-80b3-54e4059557df.png)
  
  - bcrypt를 활용하여 비밀번호 암호화
  - ajax를 활용하여 아이디/닉네임 중복검사, 유효성 검사
  - 이메일 인증
  
  [▶ Controller](https://github.com/luejenie/Fiesta/blob/main/Fiesta/src/main/java/edu/kh/fiesta/member/controller/MemberController.java) <br>
  [▶ Service](https://github.com/luejenie/Fiesta/blob/main/Fiesta/src/main/java/edu/kh/fiesta/member/model/service/MemberServiceImpl.java) <br>
  [▶ DAO](https://github.com/luejenie/Fiesta/blob/main/Fiesta/src/main/java/edu/kh/fiesta/member/model/dao/MemberDAO.java) <br>
  
  
  <br>
  
  ---

</div>
</details>

<br>

<details>
<summary><b>검색 기능 및 검색 결과 페이지 조회</b></summary>
<div markdown="1">

 ![](https://user-images.githubusercontent.com/110653573/224917925-53c17246-4c3b-41da-8cd3-ac710cbfb760.png)
 
 <br>
 
  - AJAX를 활용하여 검색 기능, 검색 결과 페이지 구현
  - 관련 계정, 인기 게시글, 최근 게시글 조회
  
  [▶ Controller](https://github.com/luejenie/Fiesta/blob/main/Fiesta/src/main/java/edu/kh/fiesta/search/controller/SearchController.java) <br>
  [▶ Service](https://github.com/luejenie/Fiesta/blob/main/Fiesta/src/main/java/edu/kh/fiesta/search/model/service/SearchServiceImpl.java) <br>
  [▶ DAO](https://github.com/luejenie/Fiesta/blob/main/Fiesta/src/main/java/edu/kh/fiesta/search/model/dao/SearchDAO.java) <br>
  
  
  <br>
  
  ---

</div>
</details>

<br>

<details>
<summary><b>계정, 해시태그 팔로우</b></summary>
<div markdown="1">

![](https://user-images.githubusercontent.com/110653573/224918401-456eecd9-6223-4fc1-a1c2-28babb227f12.png)
  
  - AJAX를 활용하여 실시간 팔로우, 언팔로우 가능
  
  [▶ Controller](https://github.com/luejenie/Fiesta/blob/main/Fiesta/src/main/java/edu/kh/fiesta/follow/controller/FollowController.java) <br>
  [▶ Service](https://github.com/luejenie/Fiesta/blob/main/Fiesta/src/main/java/edu/kh/fiesta/follow/model/service/FollowServiceImpl.java) <br>
  [▶ DAO](https://github.com/luejenie/Fiesta/blob/main/Fiesta/src/main/java/edu/kh/fiesta/follow/model/dao/FollowDAO.java) <br>
  
  
  <br>
  
  ---

</div>
</details>

</br></br>


</br></br>

<!--
## 5. 핵심 트러블 슈팅
### 5.1. 컨텐츠 필터와 페이징 처리 문제
- 저는 이 서비스가 페이스북이나 인스타그램 처럼 가볍게, 자주 사용되길 바라는 마음으로 개발했습니다.  
때문에 페이징 처리도 무한 스크롤을 적용했습니다.

- 하지만 [무한스크롤, 페이징 혹은 “더보기” 버튼? 어떤 걸 써야할까](https://cyberx.tistory.com/82) 라는 글을 읽고 무한 스크롤의 단점들을 알게 되었고,  
다양한 기준(카테고리, 사용자, 등록일, 인기도)의 게시물 필터 기능을 넣어서 이를 보완하고자 했습니다.

- 그런데 게시물이 필터링 된 상태에서 무한 스크롤이 동작하면,  
필터링 된 게시물들만 DB에 요청해야 하기 때문에 아래의 **기존 코드** 처럼 각 필터별로 다른 Query를 날려야 했습니다.

<details>
<summary><b>기존 코드</b></summary>
<div markdown="1">

~~~java
/**
 * 게시물 Top10 (기준: 댓글 수 + 좋아요 수)
 * @return 인기순 상위 10개 게시물
 */
public Page<PostResponseDto> listTopTen() {

    PageRequest pageRequest = PageRequest.of(0, 10, Sort.Direction.DESC, "rankPoint", "likeCnt");
    return postRepository.findAll(pageRequest).map(PostResponseDto::new);
}

/**
 * 게시물 필터 (Tag Name)
 * @param tagName 게시물 박스에서 클릭한 태그 이름
 * @param pageable 페이징 처리를 위한 객체
 * @return 해당 태그가 포함된 게시물 목록
 */
public Page<PostResponseDto> listFilteredByTagName(String tagName, Pageable pageable) {

    return postRepository.findAllByTagName(tagName, pageable).map(PostResponseDto::new);
}

// ... 게시물 필터 (Member) 생략 

/**
 * 게시물 필터 (Date)
 * @param createdDate 게시물 박스에서 클릭한 날짜
 * @return 해당 날짜에 등록된 게시물 목록
 */
public List<PostResponseDto> listFilteredByDate(String createdDate) {

    // 등록일 00시부터 24시까지
    LocalDateTime start = LocalDateTime.of(LocalDate.parse(createdDate), LocalTime.MIN);
    LocalDateTime end = LocalDateTime.of(LocalDate.parse(createdDate), LocalTime.MAX);

    return postRepository
                    .findAllByCreatedAtBetween(start, end)
                    .stream()
                    .map(PostResponseDto::new)
                    .collect(Collectors.toList());
    }
~~~

</div>
</details>

- 이 때 카테고리(tag)로 게시물을 필터링 하는 경우,  
각 게시물은 최대 3개까지의 카테고리(tag)를 가질 수 있어 해당 카테고리를 포함하는 모든 게시물을 질의해야 했기 때문에  
- 아래 **개선된 코드**와 같이 QueryDSL을 사용하여 다소 복잡한 Query를 작성하면서도 페이징 처리를 할 수 있었습니다.

<details>
<summary><b>개선된 코드</b></summary>
<div markdown="1">

~~~java
/**
 * 게시물 필터 (Tag Name)
 */
@Override
public Page<Post> findAllByTagName(String tagName, Pageable pageable) {

    QueryResults<Post> results = queryFactory
            .selectFrom(post)
            .innerJoin(postTag)
                .on(post.idx.eq(postTag.post.idx))
            .innerJoin(tag)
                .on(tag.idx.eq(postTag.tag.idx))
            .where(tag.name.eq(tagName))
            .orderBy(post.idx.desc())
                .limit(pageable.getPageSize())
                .offset(pageable.getOffset())
            .fetchResults();

    return new PageImpl<>(results.getResults(), pageable, results.getTotal());
}
~~~

</div>
</details>



</br>

## 6. 그 외 트러블 슈팅

[추천 멤버 선정 기준 수정](https://github.com/FiestaUpdate/Fiesta/blob/main/troubleshooting/%EC%B6%94%EC%B2%9C%20%EB%A9%A4%EB%B2%84%20%EC%84%A0%EC%A0%95%20%EA%B8%B0%EC%A4%80.md)

</br>

## 6. 회고 / 느낀점
>프로젝트 개발 회고 글:


-->
