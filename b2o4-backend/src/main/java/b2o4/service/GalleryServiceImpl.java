package b2o4.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import b2o4.dto.GalleryBoard;
import b2o4.mapper.GalleryMapper;

@Service
public class GalleryServiceImpl implements GalleryService{
	@Autowired
	private GalleryMapper galleryMapper;
	
	@Override
	public int GalleryUpload(GalleryBoard galleryBoard) {
		return galleryMapper.GalleryUpload(galleryBoard);
	}
	
	// 갤러기 게시판 보기
	public List<GalleryBoard> AllGalleryBoard(){
		return galleryMapper.AllGalleryBoard();
	}

}
