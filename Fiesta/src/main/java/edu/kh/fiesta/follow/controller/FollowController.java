package edu.kh.fiesta.follow.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.SessionAttribute;

import edu.kh.fiesta.follow.model.service.FollowService;
import edu.kh.fiesta.member.model.vo.Member;

@Controller
public class FollowController {

	@Autowired
	private FollowService service;
	
	
	/*
		해시태그 팔로우   -> 데이터베이스 다시 확인 (F_TO_TARGET_NO)
		팔로우 되어 있는지 확인 -> 안되어있으면 해시태그 넣고 result >0  -> 팔로우 테이블에 넣기
	                   -> 되어 있으면 -> 팔로우 취소 
	 */
	
	
	// 해시태그 팔로우 여부 조회
	@GetMapping("/followHashtagCheck")
	@ResponseBody
	public int followHashtagCheck(@SessionAttribute(value = "loginMember") Member loginMember, 
									String searchInput) {
		
		int result = 0;
		
		if(loginMember != null) {
			
			Map<String, Object> map = new HashMap<String, Object>();
			map.put("searchInput", searchInput);
			map.put("memberNo", loginMember.getMemberNo());
			
			result = service.followHashtagCheck(map);
		}
		
		return result;
	}
	

	// 해시태그 팔로우
	@GetMapping("/followHashtag")
	@ResponseBody
	public int followHashtag(@SessionAttribute(value = "loginMember") Member loginMember, 
								String searchInput,
								@RequestHeader(value="referer") String referer) {
		
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("searchInput", searchInput);
		map.put("memberNo", loginMember.getMemberNo());
		
		int result = service.followHashtag(map);
		
		return result;
	}

	
	// 해시태그 언팔로우
	@GetMapping("/unfollowHashtag")
	@ResponseBody
	public int unfollowHashtag(@SessionAttribute(value = "loginMember") Member loginMember, String searchInput) {
		
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("searchInput", searchInput);
		map.put("memberNo", loginMember.getMemberNo());
		
		int result = service.unfollowHashtag(map);
		
		return result;
	}
	
}