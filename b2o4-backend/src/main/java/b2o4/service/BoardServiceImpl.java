package b2o4.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import b2o4.dto.Board;
import b2o4.mapper.BoardMapper;

@Service
public class BoardServiceImpl implements BoardService{
	@Autowired
	private BoardMapper boardMapper;
	
	@Override
	public List<Board> boardMainSelect() {
		return boardMapper.boardMainSelect();
	}
}
