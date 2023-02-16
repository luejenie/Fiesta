package edu.kh.fiesta.board.model.service;

import java.io.IOException;
import java.util.List;

import org.springframework.web.multipart.MultipartFile;

import edu.kh.fiesta.main.model.vo.Board;
import edu.kh.fiesta.main.model.vo.BoardImg;

public interface BoardService {

	/** 寃뚯떆湲� �궫�엯
	 * @param board
	 * @param fileList
	 * @param webPath
	 * @param folderPath
	 * @param imgAccessibilityList 
	 * @return boardNo
	 * @throws IOException 
	 */
	int boardWrite(Board board, List<MultipartFile> fileList, String webPath,
			String folderPath) throws IOException;

	Board selectOneBoard(int boardNo);

	int boardUpdate(Board board);

	/** 게시글 이미지 목록 조회
	 * @return
	 */
	List<String> selectImageList();

	
	
	
	/** 게시글 번호에 이미지가 있는지 확인
	 * @param boardNo
	 * @return result
	 */
	int checkImage(int boardNo);
	

	/** 게시글 수정_사진 삭제
	 * @param imgNo
	 * @return
	 */
	int deleteBoardImage(int boardNo, int imgOrder);



}
