package com.fgc.combo.companion.service;

import com.fgc.combo.companion.dto.CreateManyTagsDTO;
import com.fgc.combo.companion.dto.CreateTagDTO;
import com.fgc.combo.companion.model.Tag;
import java.util.List;
import java.util.UUID;

public interface TagService {
  Tag createTag(CreateTagDTO createTagDTO);
  List<Tag> createManyTagsForCombo(
    UUID comboId,
    CreateManyTagsDTO createManyTagsDTO
  );
  List<Tag> createManyTagsForPlaylist(
    UUID playlistId,
    CreateManyTagsDTO createManyTagsDTO
  );
  boolean deleteTagsByPlaylistId(UUID playlistId, List<Long> tagIds);
  boolean deleteTagsByComboId(UUID comboId, List<Long> tagIds);
}
