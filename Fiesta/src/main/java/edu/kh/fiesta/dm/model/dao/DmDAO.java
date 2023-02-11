package edu.kh.fiesta.dm.model.dao;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import edu.kh.fiesta.dm.model.vo.ChattingRoom;
import edu.kh.fiesta.dm.model.vo.Message;
import edu.kh.fiesta.member.model.vo.Member;

@Repository
public class DmDAO {

	@Autowired
	private SqlSessionTemplate sqlSession;

	
	/** 모달 받는 사람 회원 목록 비동기 조회
	 * @param memberNickname
	 * @return memberList
	 */
	public List<Member> selectMember(Map<String, Object> paramMap) {
		return sqlSession.selectList("dmMapper.selectMember", paramMap);
	}


	public int checkChattingNo(Map<String, Object> map) {
		return sqlSession.selectOne("dmMapper.checkChattingNo", map);
	}


	public int createChattingRoom(Map<String, Object> map) {
		int result = sqlSession.insert("dmMapper.createChattingRoom", map);
		int chattingNo = 0;
		if(result > 0) chattingNo = (int)map.get("chattingNo");
		return chattingNo;
	}


	public List<ChattingRoom> selectRoomList(int memberNo) {
		return sqlSession.selectList("dmMapper.selectRoomList", memberNo);
	}


	public int insertMessage(Message msg) {
		return sqlSession.insert("dmMapper.insertMessage", msg);
	}


	public List<Message> selectMessageList(int chattingNo) {
		return sqlSession.selectList("dmMapper.selectMessageList", chattingNo);
	}


	// 읽음 여부 비동기 조회
	public int updateReadFlag(Map<String, Object> paramMap) {
		
		int unreadCount = sqlSession.selectOne("dmMapper.selectUnreadCount", paramMap);
		
		int result = 0;
		
		// 읽지 않은 메시지 있을 때만 읽음 여부 변경
		// 읽지 않은 메세지 개수 조회
		if(unreadCount > 0) {
			result = sqlSession.update("dmMapper.updateReadFlag", paramMap);
		}
		
		return result;
	}


	public int selectNumber(String memberNickname) {
		return sqlSession.selectOne("dmMapper.selectNumber", memberNickname);
	}

 
	/** 채팅방 생성 시 프로필 정보 조회
	 * @param chattingNo
	 * @return profileList
	 */
	public Member selectTargetProfile(int targetNo) {
		return sqlSession.selectOne("dmMapper.selectTargetProfile", targetNo);
	}


	/** 채팅 내용 없는 채팅방 지우기
	 * @param chattingNo
	 * @return
	 */
	public int deleteRoom() {
		
		// 채팅방 메세지 개수 확인하기
		// 채팅방은 있지만 메세지는 없는 채팅방 번호
		List<Integer> targetChattingNoList = new ArrayList<>();
		
		targetChattingNoList = sqlSession.selectList("dmMapper.selectDeleteChattingNo");
		
		int result = 0;
		
		
		for(int chattingNo : (ArrayList<Integer>)targetChattingNoList) {
			result = sqlSession.delete("dmMapper.deleteRoom", chattingNo);
		}
		
			
		return result;
	}


	/** 새로운 채팅 알림
	 * @param loginMemberNo
	 * @return result
	 */
	public int newMessageNotice(int loginMemberNo) {
		return sqlSession.selectOne("dmMapper.newMessageNotice", loginMemberNo);
	}

	

}
