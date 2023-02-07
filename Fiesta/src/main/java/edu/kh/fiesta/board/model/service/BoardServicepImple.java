package edu.kh.fiesta.board.model.service;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import edu.kh.fiesta.board.model.dao.BoardDAO;
import edu.kh.fiesta.common.Util;
import edu.kh.fiesta.main.model.vo.Board;
import edu.kh.fiesta.main.model.vo.BoardImg;


@Service
public class BoardServicepImple implements BoardService{

	@Autowired
	private BoardDAO dao;

	// 寃뚯떆湲� �궫�엯
	@Transactional(rollbackFor = Exception.class) // 紐⑤뱺 �삁�쇅 諛쒖깮 �떆 濡ㅻ갚
	@Override
	public int boardWrite(Board board, List<MultipartFile> fileList, String webPath, String folderPath) throws IOException {
		
		// 寃뚯떆湲� �궫�엯
		board.setBoardContent(Util.XSSHandling(board.getBoardContent())); // XSS 諛⑹� 泥섎━
		
		board.setBoardContent(Util.hashTagHandling(board.getBoardContent())); // �빐�떆�깭�겕 媛먯떥湲�
		
		board.setBoardContent(Util.mentionHandling(board.getBoardContent())); // a�깭洹� 媛먯떥湲�
		
		board.setBoardContent(Util.newLineHandling(board.getBoardContent())); // 媛쒗뻾臾몄옄 泥섎━
		
		
		int boardNo = dao.boardWrite(board);
		
		// �씠誘몄� �궫�엯
		if(boardNo > 0) {
			List<BoardImg> boardImgList = new ArrayList<BoardImg>();
			List<String> imgChangeNameList = new ArrayList<String>();
			// �뾽濡쒕뱶�맂 �뙆�씪 遺꾨쪟 �옉�뾽
			for(int i=0; i < fileList.size(); i++) {
				if(fileList.get(i).getSize() > 0) { // �뙆�씪�씠 �엳�뒗吏� �솗�씤
					BoardImg img = new BoardImg(); // boardImg 媛앹껜 �깮�꽦
					img.setImgAddress(webPath);
					
//					 String reName = Util.fileRename(�썝蹂명뙆�씪紐�);
					String reName = Util.fileRename(fileList.get(i).getOriginalFilename());
					img.setImgChangeName(reName);
					imgChangeNameList.add(reName); // 蹂�寃� �뙆�씪紐� 由ъ뒪�듃 異붽�
					
					img.setImgOriginalName(fileList.get(i).getOriginalFilename()); // �썝蹂� �뙆�씪紐�
					img.setBoardNo(boardNo); // 泥⑤� 寃뚯떆湲� 踰덊샇
					img.setImgOrder(i); // �씠誘몄� �닚�꽌
					
					boardImgList.add(img);
				}
			}
			if(!boardImgList.isEmpty()) { // �뾽濡쒕뱶 
				int result = dao.insertBoardImageList(boardImgList);
				
				if(result == boardImgList.size()){
					for(int i=0; i < boardImgList.size(); i++) {
						int index = boardImgList.get(i).getImgOrder(); // �닚�꽌 �뼸�뼱�샂
						
						fileList.get(index).transferTo(new File(folderPath + imgChangeNameList.get(i)));
					}
				}
				
			}
		}
		return boardNo;
	}

	
	@Override
	public Board selectOneBoard(int boardNo) {
		
		return dao.selectOneBoard(boardNo);
	}
	
	
	@Override
	public int boardUpdate(Board board) {
		board.setBoardContent(Util.XSSHandling(board.getBoardContent())); // XSS 諛⑹� 泥섎━
		
		board.setBoardContent(Util.hashTagHandling(board.getBoardContent())); // �빐�떆�깭�겕 媛먯떥湲�
		
		board.setBoardContent(Util.mentionHandling(board.getBoardContent())); // a�깭洹� 媛먯떥湲�
		
		board.setBoardContent(Util.newLineHandling(board.getBoardContent())); // 媛쒗뻾臾몄옄 泥섎━
		return dao.boardUpdate(board);
	}
	
	@Override
	public List<String> selectImageList() {
		return dao.selectImageList();
	}


}
