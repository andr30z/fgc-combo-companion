package com.fgc.combo.companion.controller;

import java.util.List;
import java.util.UUID;

import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.fgc.combo.companion.dto.CreateManyTagsDTO;
import com.fgc.combo.companion.dto.CreateTagDTO;
import com.fgc.combo.companion.dto.ManyTagsReponseDTO;
import com.fgc.combo.companion.dto.TagResponseDTO;
import com.fgc.combo.companion.mapper.TagMapper;
import com.fgc.combo.companion.service.TagService;

import jakarta.validation.constraints.NotEmpty;

@RequestMapping("/api/v1/tags")
@RestController
public class TagController {

  private TagService tagService;
  private TagMapper tagMapper;

  public TagController(TagService tagService, TagMapper tagMapper) {
    this.tagService = tagService;
    this.tagMapper = tagMapper;
  }

  @PostMapping
  public TagResponseDTO createTag(
    @Validated @RequestBody CreateTagDTO createTagDTO
  ) {
    return tagMapper.toDTO(tagService.createTag(createTagDTO));
  }

  @PostMapping("/combos/{comboId}")
  public ManyTagsReponseDTO createManyTagsForCombo(
    @PathVariable UUID comboId,
    @Validated @RequestBody CreateManyTagsDTO createManyTagsDTO
  ) {
    return tagMapper.toManyTagsReponseDTO(
      tagService.createManyTagsForCombo(comboId, createManyTagsDTO)
    );
  }

  @PostMapping("/playlists/{playlistId}")
  public ManyTagsReponseDTO createManyTagsForPlaylist(
    @PathVariable UUID playlistId,
    @RequestBody @Validated CreateManyTagsDTO createManyTagsDTO
  ) {
    return tagMapper.toManyTagsReponseDTO(
      tagService.createManyTagsForPlaylist(playlistId, createManyTagsDTO)
    );
  }

  @DeleteMapping("/combos/{comboId}")
  public boolean deleteTagsByComboId(
    @PathVariable UUID comboId,
    @Validated @NotEmpty @RequestParam(name = "tagId") List<Long> tagIds
  ) {
    return tagService.deleteTagsByComboId(comboId, tagIds);
  }

  @DeleteMapping("/playlists/{playlistId}")
  public boolean deleteTagsByPlaylistId(
    @PathVariable UUID playlistId,
    @Validated @NotEmpty @RequestParam(name = "tagId") List<Long> tagIds
  ) {
    return tagService.deleteTagsByPlaylistId(playlistId, tagIds);
  }
}
