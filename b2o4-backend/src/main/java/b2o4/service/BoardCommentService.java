package b2o4.service;

import java.util.List;

import b2o4.dto.BoardComment;

public interface BoardCommentService {
	List<BoardComment> getBoardCommentByBoardNo();
}
