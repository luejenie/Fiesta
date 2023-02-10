package edu.kh.fiesta.dm.model.service;

import java.util.List;
import java.util.Map;

import edu.kh.fiesta.dm.model.vo.ChattingRoom;
import edu.kh.fiesta.dm.model.vo.Message;
import edu.kh.fiesta.member.model.vo.Member;

public interface DmService {

	/** 모달 받는 사람 회원 목록 비동기 조회
	 * @param memberNickname
	 * @return memberList
	 */
	List<Member> selectMember(Map<String, Object> paramMap);

	int checkChattingNo(Map<String, Object> map);

	int createChattingRoom(Map<String, Object> map);

	List<ChattingRoom> selectRoomList(int memberNo);

	int insertMessage(Message msg);

	List<Message> selectMessageList(int chattingNo);

	int updateReadFlag(Map<String, Object> paramMap);

	int selectNumber(String memberNickname);

	
	
	/** 채팅방 생성 시 프로필 정보 조회
	 * @param targetNo
	 * @param loginMemberNo
	 * @return profileList
	 */
	Member selectTargetProfile(int targetNo);

	/** 채팅방 나가기(채팅방 지우기)
	 * @param chattingNo
	 * @return 
	 */
	int deleteRoom(int chattingNo);

	/** 새로운 채팅 알림
	 * @param loginMemberNo
	 * @return result
	 */
	int newMessageNotice(int loginMemberNo);


	
}
