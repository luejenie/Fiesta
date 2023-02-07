package edu.kh.fiesta.member.model.service;

import java.util.List;

import edu.kh.fiesta.member.model.vo.Member;

public interface MemberService {

	/** 濡쒓렇�씤 �꽌鍮꾩뒪
	 * @param inputMember
	 * @return loginMember
	 */
	Member login(Member inputMember);

	/** �쉶�썝媛��엯 �꽌鍮꾩뒪
	 * @param inputMember
	 * @return result
	 */
	int signUp(Member inputMember);
	
	
	/** �쉶�썝媛��엯_�씠硫붿씪 以묐났 泥댄겕 �꽌鍮꾩뒪
	 * @param memberEmail
	 * @return result
	 */
	int emailDupCheck(String memberEmail);

	
	/** �쉶�썝媛��엯_�땳�꽕�엫 以묐났 泥댄겕 �꽌鍮꾩뒪
	 * @param memberNickname
	 * @return result
	 */
	int nicknameDupCheck(String memberNickname);
	
	

	/** 怨꾩젙李얘린_鍮꾨�踰덊샇 �옱�꽕�젙
	 * @param memberEmail
	 * @return result
	 */
	int updatePw(String inputEmail, String memberPw);

	/** 프로필 이미지 목록 조회
	 * @return
	 */
	List<String> selectProfileImageList();
	

}
