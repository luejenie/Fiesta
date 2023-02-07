package edu.kh.fiesta.member.model.dao;

import java.util.List;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import edu.kh.fiesta.member.model.vo.Member;

@Repository
public class MemberDAO {

	@Autowired
	private SqlSessionTemplate sqlSession;

	/** 濡쒓렇�씤 DAO
	 * @param memberEmail
	 * @return loginMember
	 */
	public Member login(String memberEmail) {
		return sqlSession.selectOne("memberMapper.login", memberEmail);
	}

	
	/** �쉶�썝媛��엯 DAO
	 * @param inputMember
	 * @return result
	 */
	public int signUp(Member inputMember) {
		// �쉶�썝媛��엯
		int result = sqlSession.insert("memberMapper.signUp", inputMember);
		
		System.out.println(inputMember);
		
		if(result > 0) {
			// 怨듦컻�뿬遺� �꽕�젙�뿉 �쉶�썝踰덊샇 �궫�엯
			result = sqlSession.insert("memberMapper.insertUserPubPriFl", inputMember);
		}
		
		return result; 
	}
	
	
	
	/** �쉶�썝媛��엯_�씠硫붿씪 以묐났 泥댄겕 DAO
	 * @param memberEmail
	 * @return result
	 */
	public int emailDupCheck(String memberEmail) {
		return sqlSession.selectOne("memberMapper.emailDupCheck", memberEmail);
	}

	

	/** �쉶�썝媛��엯_�땳�꽕�엫 以묐났 泥댄겕 �꽌鍮꾩뒪 DAO
	 * @param memberNickname
	 * @return result
	 */
	public int nicknameDupCheck(String memberNickname) {
		return sqlSession.selectOne("memberMapper.nicknameDupCheck", memberNickname);
	}


	/** 怨꾩젙李얘린_ 鍮꾨�踰덊샇 �옱�꽕�젙 DAO
	 * @param memberEmail
	 * @param memberPw
	 * @return result
	 */
	public int updatePw(Member member) {
		return sqlSession.update("memberMapper.updatePw", member);
	}


	/** �옄湲곗옄�떊 �뙏濡쒖슦_ �쉶�썝踰덊샇 議고쉶
	 * @param memberEmail
	 * @return memberNo
	 */
	public int selectMemberNo(String memberEmail) {
		return sqlSession.selectOne("memberMapper.selectMemberNo", memberEmail);
	}


	
	
	/** �옄湲곗옄�떊 �뙏濡쒖슦_媛��엯 �떆 �옄湲� �옄�떊 �뙏濡쒖슦 DAO
	 * @param memberNo
	 * @return result
	 */
	public int followMyself(int memberNo) {
		return sqlSession.insert("memberMapper.followMyself", memberNo);
	}


	public List<String> selectProfileImageList() {
		return sqlSession.selectList("memberMapper.selectProfileImageList");
	}
	
}
