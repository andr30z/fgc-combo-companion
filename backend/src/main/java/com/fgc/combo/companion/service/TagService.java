package com.fgc.combo.companion.service;

import com.fgc.combo.companion.dto.CreateManyTagsDto;
import com.fgc.combo.companion.dto.CreateTagDto;
import com.fgc.combo.companion.model.Tag;
import java.util.List;
import java.util.UUID;

public interface TagService {
  Tag createTag(CreateTagDto createTagDTO);
  List<Tag> createManyTagsForCombo(
    UUID comboId,
    CreateManyTagsDto createManyTagsDTO
  );
  List<Tag> createManyTagsForPlaylist(
    UUID playlistId,
    CreateManyTagsDto createManyTagsDTO
  );
  boolean deleteTagsByPlaylistId(UUID playlistId, List<Long> tagIds);
  boolean deleteTagsByComboId(UUID comboId, List<Long> tagIds);
}
