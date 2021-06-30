package com.launchacademy.reviews.controllers;

import java.io.File;
import java.io.IOException;
import org.apache.commons.io.FileUtils;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(value = "/public/images")
public class ImageEndPoint {

  private static String IMG_DIR =
      System.getProperty("user.dir") + "/src/main/frontend/public/images/";

  @GetMapping(value = "/{fileName}", produces = MediaType.IMAGE_JPEG_VALUE)
  public ResponseEntity<byte[]> getImage(@PathVariable String fileName) {
    byte[] image = new byte[0];
    String path = IMG_DIR + fileName;
    try {
      image = FileUtils.readFileToByteArray(new File(path));
    } catch (IOException ioe) {
      ioe.printStackTrace();
      System.out.println("Failed to find file: " + path);
      throw new ImageNotFoundException();

    }
    return ResponseEntity.ok().contentType(MediaType.IMAGE_JPEG).body(image);
  }

  @ResponseStatus(code = HttpStatus.NOT_FOUND, reason = "Image Not Found")
  public class ImageNotFoundException extends RuntimeException {

  }

}




