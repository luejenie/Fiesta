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

## 5. 트러블 슈팅

<details>
<summary><b>5.1. 브라우저 자동완성과 로그인 화면의 충돌 문제</b></summary>
<div markdown="1">

<br>
  
  **문제 상황**
  - 아이디, 비밀번호에 focus가 적용되면 label이 위로 올라가게 만들었으나, 자동완성에 적용이 되지 않았다.
  - 브라우저 자동완성으로 인해 자동완성된 아이디/비밀번호 값과 label이 겹쳐 보이는 문제 발생했다.
 
 <br>
 
 ![](https://user-images.githubusercontent.com/110653573/224921351-27af883a-dfab-4f06-856d-ec3d02857a01.png)

<br>

  **여러 방법을 써봤으나 해결되지 않았다.**
  1) 브라우저 자동완성을 끌 수 없음.
  2) autofocus를 이용했으나 아이디 또는 비밀번호 중 하나에만 적용되었다. (jsp에 직접)
  3) setTimeout()을 통해 시간 간격을 두고 아이디, 비밀번호에 focus()를 적용해 봤으나 해결되지 않음.
  4) 클릭 이벤트가 발생하면 적용되는 것을 확인하고 body에 클릭 이벤트를 적용해 보았으나 해결되지 않음.
  
<br>
  
  **해결 방법**
  - **readonly**를 사용하여 해결하였다.
  - 자동완성이 아이디, 비밀번호에 보이지 않도록 만들었다.
  - (jsp) 아이디, 비밀번호에 readonly를 적용하였다.
  - (js) 로드될 때, 아이디의 readonly 속성을 지우고, 아무 숫자나 썼다가 지운 다음, 포커스를 맞추게 하였다.
  - (js) 비밀번호에 포커스가 가면 비밀번호의 readonly가 제거되는 방법을 사용하였다.
  -  ※ 아이디, 비밀번호를 로드와 동시에 readonly를 제거하면 기존의 문제가 발생
  
<br>
  
**jsp**
  
```jsp
<div class="login-area">
  <input type="text" name="memberEmail"  id="memberEmail" value="" 
      maxlength="50" autocomplete="off" required readonly> 
  <label for="memberEmail">이메일</label>
</div>


<div class="login-area">
  <input type="password" name="memberPw" id="memberPw" value="" 
      maxlength="30" required readonly>           
  <label for="memberPw">비밀번호</label>
</div>

```

<br>
  
**js**
  
```javascript
document.addEventListener("DOMContentLoaded", function(){
    memberEmail.removeAttribute("readonly");
    memberEmail.value = "123";
    memberEmail.value = "";
    memberEmail.focus();
})


memberPw.addEventListener("focus", function(){
    memberPw.removeAttribute("readonly");
})
```

<br> 
  
**해결 화면** <br>
![](https://user-images.githubusercontent.com/110653573/224922778-67408077-439b-4b90-9a74-5f7eb4f7b979.png)


</div>
</details>


<!--

</br>

## 6. 그 외 트러블 슈팅

[추천 멤버 선정 기준 수정](https://github.com/FiestaUpdate/Fiesta/blob/main/troubleshooting/%EC%B6%94%EC%B2%9C%20%EB%A9%A4%EB%B2%84%20%EC%84%A0%EC%A0%95%20%EA%B8%B0%EC%A4%80.md)

</br>

## 6. 회고 / 느낀점
>프로젝트 개발 회고 글:


-->
