package b2o4.service;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import b2o4.dto.GalleryBoard;
import b2o4.mapper.GalleryMapper;

@Service
public class GalleryServiceImpl implements GalleryService{
	@Autowired
	private GalleryMapper galleryMapper;
	
	@Override
	public int GalleryUpload(String GBPostTitle, String GBPostContent, MultipartFile file) {
		String fileName = file.getOriginalFilename();
		String uploadDir = "C:/Users/user1/Final-Project/B2O4/b2o4-backend/src/main/resources/Images/galleryBoard/";
		

		try {
			Path path = Paths.get(uploadDir + fileName);
			
			Files.createDirectories(path.getParent());
			file.transferTo(path.toFile());
			
			GalleryBoard gb = new GalleryBoard();
			gb.setGBPostTitle(GBPostTitle);
			gb.setGBPostContent(GBPostContent);
			gb.setGBImages(fileName);
			
			return galleryMapper.GalleryUpload(gb);
			
		} catch(IOException e) {
			e.printStackTrace();
			return -1;
		}	
		
	}
	
	// 갤러기 게시판 보기
	public List<GalleryBoard> AllGalleryBoard(){
		return galleryMapper.AllGalleryBoard();
	}

}
