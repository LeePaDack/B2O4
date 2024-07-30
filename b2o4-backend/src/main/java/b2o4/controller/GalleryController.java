package b2o4.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import b2o4.dto.GalleryBoard;
import b2o4.service.GalleryService;

@RestController
@RequestMapping("/gallery")
public class GalleryController {
	@Autowired
	private GalleryService galleryService;
	
	@PostMapping
	public int GalleryUpload(@RequestParam("GBPostTitle") String GBPostTitle,
							@RequestParam("GBPostContent") String GBPostContent,
							@RequestParam("GBImages") MultipartFile file
			) {
		return galleryService.GalleryUpload(GBPostTitle, GBPostContent, file);
	}
	
	@GetMapping
	public List<GalleryBoard> AllGalleryBoard(){
		return galleryService.AllGalleryBoard();
	}
	

}
