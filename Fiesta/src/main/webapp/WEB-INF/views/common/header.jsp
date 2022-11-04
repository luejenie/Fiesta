<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>

<!-- 헤더 -->
     <header>
      <section id="header-section">
        <!-- 로고 -->
        <section class="logo-section">
          <a href="../../views/main(신보경).html"
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
              <a href="#" id="searchBtn">
                <i class="fa-solid fa-magnifying-glass"></i>
              </a>
            </li>
            <li>
              <a href="/"> <i class="fa-solid fa-house"></i></a>
            </li>
            <li>
              <a href="common/dm(용환재).html">
                <i class="fa-regular fa-paper-plane"></i>
              </a>
            </li>
            <li>
              <a href="common/newpost-file(윤주영).html">
                <i class="fa-regular fa-square-plus"></i>
              </a>
            </li>
            <li>
              <a href="common/popularfeed(신아민) .html">
                <i class="fa-regular fa-compass"></i>
              </a>
            </li>
            <li>
              <a href="#">
                <i class="fa-regular fa-bell"></i>
              </a>
            </li>
            <li>
              <a href="common/myfeed(신아민).html">
                <i class="fa-regular fa-user"></i>
              </a>
            </li>
          </ul>
        </nav>
      </section>
    </header>
    <section class="toggle-search-section">
      <form action="#">
        <fieldset>
          <input
          type="text"
          name="search"
          id="searchInput"
          placeholder="검색"
          autocapitalize="none"
          autocomplete="off"
          />
          <button id="search-glass">
            <i class="fa-solid fa-magnifying-glass"></i>
          </button>
        </fieldset>
          
        </button>
      </form>
    </section>