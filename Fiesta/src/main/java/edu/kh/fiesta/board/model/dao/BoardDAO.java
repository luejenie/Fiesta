package edu.kh.fiesta.board.model.dao;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import edu.kh.fiesta.main.model.vo.Board;
import edu.kh.fiesta.main.model.vo.BoardImg;

@Repository
public class BoardDAO {

	@Autowired
	private SqlSessionTemplate sqlSession;

	/** 게시글 작성하기
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

	
	
	/** 게시글 번호에 이미지 있는지 확인
	 * @param boardNo
	 * @return result
	 */
	public int checkImage(int boardNo) {
		return sqlSession.selectOne("boardMapper.checkImage", boardNo);
	}

	
	/** 게시글 수정하기_사진 삭제
	 * @param boardNo
	 * @param imgNo
	 * @return result
	 */
	public int deleteBoardImage(int boardNo, int imgOrder) {
		Map<String, Object> paramMap = new HashMap<String, Object>();
		paramMap.put("boardNo", boardNo);
		paramMap.put("imgOrder", imgOrder);
		return sqlSession.delete("boardMapper.deleteBoardImage", paramMap);
	}
}
