package b2o4.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import b2o4.dto.Board;

@Mapper
public interface BoardMapper {
	List<Board> boardMainSelect();
}
