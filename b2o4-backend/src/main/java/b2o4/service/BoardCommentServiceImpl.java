package b2o4.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import b2o4.dto.BoardComment;
import b2o4.mapper.BoardCommentMapper;

@Service
public class BoardCommentServiceImpl implements BoardCommentService {
	@Autowired
	private BoardCommentMapper boardCommentMapper;

	@Override
	public List<BoardComment> getBoardCommentByBoardNo() {
		return boardCommentMapper.getBoardCommentByBoardNo();
	}
}
