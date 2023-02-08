package edu.kh.fiesta.notification.dao;

import java.util.List;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import edu.kh.fiesta.main.model.vo.Board;
import edu.kh.fiesta.main.model.vo.Comment;
import edu.kh.fiesta.notification.model.vo.Notification;

@Repository
public class NotificationDAO {
	
	@Autowired
	SqlSessionTemplate sqlSession;

	/** 게시글 정보 조회
	 * @param targetNo
	 * @return
	 */
	public Board selectBoard(int targetNo) {
		return sqlSession.selectOne("boardMapper.selectBoard", targetNo);
	}

	/** 댓글 정보 조회
	 * @param targetNo
	 * @return
	 */
	public Comment selectComment(int targetNo) {
		return sqlSession.selectOne("commentMapper.selectComment", targetNo);
	}

	/** 알림 DB에 저장
	 * @param notification
	 * @return
	 */
	public int insertNotification(Notification notification) {
		return sqlSession.insert("notificationMapper.insertNotification", notification);
	}

	/** 알림 목록 조회
	 * @param memberNo
	 * @return
	 */
	public List<Notification> selectNotificationList(int memberNo) {
		return sqlSession.selectList("notificationMapper.selectNotificationList", memberNo);
	}

	/** 읽지않은 알림 수 조회
	 * @param memberNo
	 * @return
	 */
	public int countNotification(int memberNo) {
		return sqlSession.selectOne("notificationMapper.countNotification", memberNo);
	}

	/** 알림 읽음 처리
	 * @param notificationNo
	 * @return
	 */
	public int changeNotificationStatus(int notificationNo) {
		return sqlSession.update("notificationMapper.changeNotificationStatus", notificationNo);
	}


}
