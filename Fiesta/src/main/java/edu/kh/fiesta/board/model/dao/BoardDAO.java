package edu.kh.fiesta.board.model.dao;

import java.util.List;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import edu.kh.fiesta.main.model.vo.Board;
import edu.kh.fiesta.main.model.vo.BoardImg;

@Repository
public class BoardDAO {

	@Autowired
	private SqlSessionTemplate sqlSession;

	/** 寃뚯떆湲� �궫�엯
	 * @param board
	 * @return boardNo
	 */
	public int boardWrite(Board board) {
		int result = sqlSession.insert("boardMapper.boardWrite", board);
		
		if(result > 0) result = board.getBoardNo();
		return result;
	}

	/** 寃뚯떆湲� 泥⑤� �씠誘몄� �궫�엯(由ъ뒪�듃 �삎�떇)
	 * @param boardImgList
	 * @return result (insert�맂 �뻾�쓽 媛쒖닔)
	 */
	public int insertBoardImageList(List<BoardImg> boardImgList) {
		return sqlSession.insert("boardMapper.insertBoardImageList", boardImgList);
	}

	public Board selectOneBoard(int boardNo) {
		return sqlSession.selectOne("boardMapper.selectOneBoard", boardNo);
	}

	public int boardUpdate(Board board) {
		return sqlSession.update("boardMapper.boardUpdate", board);
	}

	public List<String> selectImageList() {
		return sqlSession.selectList("boardMapper.selectBoardImageList");
	}
}
