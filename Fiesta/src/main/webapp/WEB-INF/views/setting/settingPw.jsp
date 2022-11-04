<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>


<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>instagram</title>
    <link rel="stylesheet" href="../../resources/css/common-style.css" />
    <link rel="stylesheet" href="../../resources/css/settingPw-style.css">
    <script
      src="https://kit.fontawesome.com/591746f9e8.js"
      crossorigin="anonymous"
    ></script>
  </head>
  <body>
      <!-- 헤더 -->
      <header>
        <section id="header-section">
          <!-- 로고 -->
          <section class="logo-section">
            <a href="#"
              >Fiesta</a>
          </section>
          <!-- 검색창 -->
          <section class="search-section">
            <form action="#">
              <fieldset>
                <button id="search-glass">
                  <i class="fa-solid fa-magnifying-glass"></i>
                </button>
                <input
                  type="text"
                  name="search"
                  id="searchInput"
                  placeholder="검색"
                  autocapitalize="none"
                  autocomplete="off"
                />
                <button id="searchX"><i class="fa-solid fa-xmark"></i></button>
              </fieldset>
                
              </button>
            </form>
          </section>
          <!-- 메뉴 -->
          <nav id="nav-bar">
            <ul>
              <li>
                <a href="#"> <i class="fa-solid fa-house"></i></a>
              </li>
              <li>
                <a href="#">
                  <i class="fa-regular fa-paper-plane"></i>
                </a>
              </li>
              <li>
                <a href="#">
                  <i class="fa-regular fa-square-plus"></i>
                </a>
              </li>
              <li>
                <a href="#">
                  <i class="fa-regular fa-compass"></i>
                </a>
              </li>
              <li>
                <a href="#">
                  <i class="fa-regular fa-heart"></i>
                </a>
              </li>
              <li>
                <a href="#">
                  <i class="fa-regular fa-user"></i>
                </a>
              </li>
            </ul>
          </nav>
        </section>
      </header>

    <!-- 메인 섹션 -->
    <!-- main 태그 안쪽에 구현할 태그 작성해주시면 됩니다. -->
    <main>
        <section class="setting-content">
            
            <section class="left-side">
    
                <ul class="list-group">
                    <li><a href="../setting/setting(용환재).html">프로필 편집</a></li>
                    <li><a href="../setting/settingPw(용환재).html">비밀번호 변경</a></li>
                    <li><a href="../setting/setting3(용환재).html">개인정보 및 보안</a></li>
                </ul>
                
            </section>
    
            <section class="setting-main">
                <div class="top">
                    <aside class="menu-left">
                        <img src="../../resources/images/user.jpg" class="pro-img">
                    </aside> 
                    <h1 class="loginid">로그인아이디</h1>
                </div>
              <form action="#" id="changePwForm">
                <div class="pre-pw">
                    <aside class="menu-left">
                        이전 비밀번호
                    </aside>
                    <input type="password" id="currentPw">
                </div>
                <div class="new-pw">
                    <aside class="menu-left">
                        새 비밀번호
                    </aside>
                     <input type="password" id="newPw">
                </div>

                <div class="new-pw2">
                    <aside class="menu-left">
                        새 비밀번호 확인
                    </aside>
                    <input type="password" id="newPwConfirm">
                </div>
                <div class="ch-btn">
                    <aside class="menu-left">
                    </aside>
                    <button type="button" class="change-button">비밀번호 변경</button>                    
                </div>
                <div class="forget">
                    <aside class="menu-left">
                    </aside>
                    <a href="#">비밀번호를 잊으셨나요?</a>
                </div>
              </form>
                
                
            </section>
          </section>
    </main>
    <!-- 푸터 -->
    <footer>
      <p>
        Copyright &copy; KH Information Educational Institute A-Class SNS Team
      </p>
      <article>
        <a href="#">프로젝트 소개</a>
        <span>|</span>
        <a href="#">이용약관</a>
        <span>|</span>
        <a href="#">개인정보처리방침</a>
        <span>|</span>
        <a href="#">고객센터</a>
      </article>
    </footer>


    <script src="/resources/js/settingPw.js"></script>
  </body>
</html>
