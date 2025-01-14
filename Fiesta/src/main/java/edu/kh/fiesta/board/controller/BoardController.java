package edu.kh.fiesta.board.controller;

import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.SessionAttribute;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import com.google.gson.Gson;

import edu.kh.fiesta.board.model.service.BoardService;
import edu.kh.fiesta.common.Util;
import edu.kh.fiesta.main.model.vo.Board;
import edu.kh.fiesta.main.model.vo.BoardImg;
import edu.kh.fiesta.member.model.vo.Member;

@Controller
public class BoardController {
	@Autowired
	private BoardService service;
	
	@PostMapping("/write")
	public String boardWrite(
			@SessionAttribute(value="loginMember") Member loginMember, // 로그인 멤버 번호 받아올거
			RedirectAttributes ra,
			HttpSession session, // 파일 어느위치 저장할지 경로 지정때 필요
			@RequestParam(value="newPostFile") List<MultipartFile> fileList,// 이미지 n개 받아오기
			Board board,
			@RequestHeader("referer") String referer// 이미지 n개 받아오기
			) throws IOException {
				
		
		// 로그인한 회원 번호 board 객체에 세팅
		board.setMemberNo(loginMember.getMemberNo());
		
		
		// 업로드된 파일 웹접근경로, 서버내부 경로
		String webPath = "/resources/images/board/"; // 웹 접근 경로
		String folderPath = session.getServletContext().getRealPath(webPath); // 서버 접근 경로
		
		// 게시글 삽입
		int boardNo = service.boardWrite(board, fileList, webPath, folderPath);
		
		String path = null;
		if(boardNo > 0) {
			System.out.println("게시물 작성 성공");
			path = referer;
					/// /board/1/2003 (상세주회 요청 주소)
		}else {
			System.out.println("게시물 작성 실패");
			path = referer;
		}
		return "redirect:"+path;
	}
	
	// 게시글 수정하기 클릭 후, 게시글 조회하기
	@GetMapping("/selectOneBoard")
	@ResponseBody
	public String selectOneBoard(int boardNo, Model model) {
		
		// 게시글 조회
		Board board = service.selectOneBoard(boardNo);
		
		// 게시글 번호로 이미지가 있는지 확인
		int count = service.checkImage(boardNo);
		
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("board", board);
		map.put("count", count);
		
		
		// 개행문자 처리 해제
		board.setBoardContent(Util.newLineClear(board.getBoardContent())); 
		
		// 해시태그 처리 해제
		board.setBoardContent(Util.hashTagClearForUpdate(board.getBoardContent()));
		
//		System.out.println(boardCon);
//		 model.addAttribute("board", board);
		return new Gson().toJson(map);
	}
	
	
	
	// 게시글 수정
	@PostMapping("/boardUpdate")
	public String boardUpdate(Board board,@RequestHeader("referer") String referer) throws IOException { 
		
		int result = service.boardUpdate(board);
		
		String path = null;
		if(result > 0) {
			System.out.println("게시물 수정 성공");
			path = referer;
					/// /board/1/2003 (상세주회 요청 주소)
		}else {
			System.out.println("게시물 작성 실패");
			path =referer;
		}
		return "redirect:"+path;
	}
	
	
	// 게시글 수정_사진 삭제
	@GetMapping("/deleteBoardImage")
	@ResponseBody
	public int deleteBoardImage(int boardNo, int imgOrder) {
		int result = service.deleteBoardImage(boardNo, imgOrder);
		return result; 
	}
	
	
	
}
