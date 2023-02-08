package edu.kh.fiesta.notification.dao;

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

	public Board selectBoard(int targetNo) {
		return sqlSession.selectOne("boardMapper.selectBoard", targetNo);
	}

	public Comment selectComment(int targetNo) {
		return sqlSession.selectOne("commentMapper.selectComment", targetNo);
	}

	public int insertNotification(Notification notification) {
		return sqlSession.insert("notificationMapper.insertNotification", notification);
	}


}
