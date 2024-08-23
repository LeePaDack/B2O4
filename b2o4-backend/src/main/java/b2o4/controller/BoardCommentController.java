package b2o4.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import b2o4.dto.BoardComment;
import b2o4.service.BoardCommentService;

@RestController
@RequestMapping("/boards/comment")
public class BoardCommentController {
	
	@Autowired
	private BoardCommentService boardCommentService;
	
	@GetMapping
	public List<BoardComment> getBoardCommentByBoardNo() {
		return boardCommentService.getBoardCommentByBoardNo();
	}
	
}
