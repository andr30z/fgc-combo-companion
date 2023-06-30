package com.fgc.combo.companion.service.impl;

import com.fgc.combo.companion.dto.CreateManyTagsDTO;
import com.fgc.combo.companion.dto.CreateTagDTO;
import com.fgc.combo.companion.exception.BadRequestException;
import com.fgc.combo.companion.model.Combo;
import com.fgc.combo.companion.model.Playlist;
import com.fgc.combo.companion.model.Tag;
import com.fgc.combo.companion.repository.TagRepository;
import com.fgc.combo.companion.service.ComboService;
import com.fgc.combo.companion.service.PlaylistService;
import com.fgc.combo.companion.service.TagService;

import jakarta.transaction.Transactional;

import java.util.List;
import java.util.UUID;

import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;

@Service
public class TagServiceImpl implements TagService {

  private TagRepository tagRepository;
  private ComboService comboService;
  private PlaylistService playlistService;

  public TagServiceImpl(
    TagRepository tagRepository,
    ComboService comboService,
    PlaylistService playlistService
  ) {
    this.tagRepository = tagRepository;
    this.comboService = comboService;
    this.playlistService = playlistService;
  }

  @Override
  public Tag createTag(CreateTagDTO createTagDTO) {
    UUID comboId = createTagDTO.getComboId();
    UUID playlistId = createTagDTO.getPlaylistId();
    if (comboId == null && playlistId == null) throw new BadRequestException(
      "Combo or playlist id is required"
    );

    Tag tag = buildTag(createTagDTO);
    Object tagRelation = getRelation(comboId, playlistId);
    setTagRelation(tag, tagRelation);
    return this.tagRepository.save(tag);
  }

  @Override
  @Transactional
  public boolean deleteTagsByComboId(UUID comboId, List<Long> tagIds) {
    this.tagRepository.deleteTagsByCombo(
        tagIds,
        this.comboService.getByIdAndCurrentUser(comboId)
      );

    return true;
  }

  @Override
  @Transactional
  public boolean deleteTagsByPlaylistId(UUID playlistId, List<Long> tagIds) {
    this.tagRepository.deleteTagsByPlaylist(
        tagIds,
        this.playlistService.getByIdAndCurrentUser(playlistId)
      );
    return true;
  }

  @Override
  public List<Tag> createManyTagsForCombo(
    UUID comboId,
    CreateManyTagsDTO createManyTagsDTO
  ) {
    Combo combo = this.comboService.getByIdAndCurrentUser(comboId);
    List<Tag> tags = this.createManyTags(createManyTagsDTO, combo);

    combo.getTags().addAll(tags);
    this.comboService.saveCombo(combo);
    return tags;
  }

  @Override
  public List<Tag> createManyTagsForPlaylist(
    UUID playlistId,
    CreateManyTagsDTO createManyTagsDTO
  ) {
    Playlist playlist = this.playlistService.getByIdAndCurrentUser(playlistId);
    List<Tag> tags = this.createManyTags(createManyTagsDTO, playlist);

    playlist.getTags().addAll(tags);
    this.playlistService.savePlaylist(playlist);
    return tags;
  }

  private List<Tag> createManyTags(
    CreateManyTagsDTO createManyTagsDTO,
    Object tagRelation
  ) {
    return this.tagRepository.saveAll(
        createManyTagsDTO
          .getTags()
          .stream()
          .map(tagDTO -> {
            Tag tag = this.buildTag(tagDTO);
            this.setTagRelation(tag, tagRelation);
            return tag;
          })
          .toList()
      );
  }

  private Object getRelation(UUID comboId, UUID playlistId) {
    Object tagRelation;
    if (comboId == null) {
      return this.comboService.getByIdAndCurrentUser(comboId);
    } else {
      tagRelation = this.playlistService.getByIdAndCurrentUser(playlistId);
    }
    return tagRelation;
  }

  private void setTagRelation(Tag tag, Object relation) {
    if (relation instanceof Combo) {
      tag.setCombo((Combo) relation);
    } else if (relation instanceof Playlist) {
      tag.setPlaylist((Playlist) relation);
    }
  }

  private Tag buildTag(Object createTagDTO) {
    Tag tag = new Tag();
    BeanUtils.copyProperties(createTagDTO, tag);
    return tag;
  }
}
