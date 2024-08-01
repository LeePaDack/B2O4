package b2o4.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import b2o4.dto.Board;
import b2o4.service.BoardService;

@RestController
@RequestMapping("/boards")
public class BoardController {
	@Autowired
	private BoardService boardService;
	
	@GetMapping
	public List<Board> boardMainSelect() {
		return boardService.boardMainSelect();
	}
	
	/*
	@PostMapping
	public void insertBoardPost(@RequestParam("boardTitle") String boardTitle, 
								@RequestParam("boardContent") String boardContent) {
		Board board = new Board();
		board.setBoardTitle(boardTitle);
		board.setBoardContent(boardContent);
		boardService.insertBoardPost(board);
	}
	*/
	@PostMapping
	public void insertBoardPost(@RequestBody Board board) {
		boardService.insertBoardPost(board);
	}
	
	@GetMapping("/boardContent/{boardNo}")
	public String getBoardById(Model model, @PathVariable int boardNo) {
		Board board = boardService.getBoardById(boardNo);
		model.addAttribute("board",board);
		
		return "boardContent";
	}
}
