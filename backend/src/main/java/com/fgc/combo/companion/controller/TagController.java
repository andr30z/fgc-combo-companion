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

import com.fgc.combo.companion.dto.CreateManyTagsDto;
import com.fgc.combo.companion.dto.CreateTagDto;
import com.fgc.combo.companion.dto.ManyTagsReponseDto;
import com.fgc.combo.companion.dto.TagResponseDto;
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
  public TagResponseDto createTag(
    @Validated @RequestBody CreateTagDto createTagDTO
  ) {
    return tagMapper.toDto(tagService.createTag(createTagDTO));
  }

  @PostMapping("/combos/{comboId}")
  public ManyTagsReponseDto createManyTagsForCombo(
    @PathVariable UUID comboId,
    @Validated @RequestBody CreateManyTagsDto createManyTagsDTO
  ) {
    return tagMapper.toManyTagsReponseDto(
      tagService.createManyTagsForCombo(comboId, createManyTagsDTO)
    );
  }

  @PostMapping("/playlists/{playlistId}")
  public ManyTagsReponseDto createManyTagsForPlaylist(
    @PathVariable UUID playlistId,
    @RequestBody @Validated CreateManyTagsDto createManyTagsDTO
  ) {
    return tagMapper.toManyTagsReponseDto(
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
