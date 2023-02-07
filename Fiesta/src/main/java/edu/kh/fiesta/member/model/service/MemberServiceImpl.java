package edu.kh.fiesta.member.model.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import edu.kh.fiesta.member.model.dao.MemberDAO;
import edu.kh.fiesta.member.model.vo.Member;

@Service
public class MemberServiceImpl implements MemberService{
	
	@Autowired
	private MemberDAO dao;
	
	// spring-security.xml�뿉�꽌 �벑濡앺븳 bean�쓣 �쓽議댁꽦 二쇱엯(DI)
	@Autowired
	private BCryptPasswordEncoder bcrypt;
	
	
	// 濡쒓렇�씤
	@Override
	public Member login(Member inputMember) {
		
//		System.out.println("�엯�젰�븳 鍮꾨�踰덊샇 : " + inputMember.getMemberPw());
//		System.out.println("�븫�샇�솕 鍮꾨�踰덊샇 : " + bcrypt.encode(inputMember.getMemberPw()));
		
		Member loginMember = dao.login(inputMember.getMemberEmail());
		
		if(loginMember != null) {
			
			if(bcrypt.matches(inputMember.getMemberPw(), loginMember.getMemberPw())) {
				loginMember.setMemberPw(null);
			} else {
				loginMember = null;
			}
		}
		return loginMember;
	}


	
	// �쉶�썝媛��엯
	@Transactional(rollbackFor = Exception.class)
	@Override
	public int signUp(Member inputMember) {
		
		String encPw = bcrypt.encode(inputMember.getMemberPw());
		inputMember.setMemberPw(encPw);
		
		int result = dao.signUp(inputMember);
		
		// �쉶�썝媛��엯�릺硫� �옄湲곗옄�떊 �뙏濡쒖슦
		if(result > 0) {
			
			// �쉶�썝踰덊샇 議고쉶
			int memberNo = dao.selectMemberNo(inputMember.getMemberEmail());
			
			// �옄湲곗옄�떊 �뙏濡쒖슦
			result = dao.followMyself(memberNo);
		}
		return result;
	}


	
	// �쉶�썝媛��엯_�씠硫붿씪 以묐났 泥댄겕
	@Override
	public int emailDupCheck(String memberEmail) {
		return dao.emailDupCheck(memberEmail);
	}



	// �쉶�썝媛��엯_�땳�꽕�엫 以묐났 泥댄겕 �꽌鍮꾩뒪
	@Override
	public int nicknameDupCheck(String memberNickname) {
		return dao.nicknameDupCheck(memberNickname);
	}


	// 怨꾩젙李얘린_鍮꾨�踰덊샇 �옱�꽕�젙
	@Override
	public int updatePw(String inputEmail, String memberPw) {
		
		String encPw = bcrypt.encode(memberPw);
		memberPw = encPw;
		
		Member member = new Member();
		member.setMemberEmail(inputEmail);
		member.setMemberPw(memberPw);
		
		System.out.println(member.getMemberEmail());
		
		return dao.updatePw(member);
	}
	
	
	@Override
	public List<String> selectProfileImageList() {
		return dao.selectProfileImageList();
	}

}
