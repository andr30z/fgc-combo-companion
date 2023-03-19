package com.fgc.combo.companion.service;

import com.fgc.combo.companion.dto.CreateManyTagsDTO;
import com.fgc.combo.companion.dto.CreateTagDTO;
import com.fgc.combo.companion.model.Tag;
import java.util.List;

public interface TagService {
  Tag createTag(CreateTagDTO createTagDTO);
  List<Tag> createManyTagsForCombo(
    Long comboId,
    CreateManyTagsDTO createManyTagsDTO
  );
  List<Tag> createManyTagsForPlaylist(
    Long playlistId,
    CreateManyTagsDTO createManyTagsDTO
  );
  boolean deleteTagsByPlaylistId(Long playlistId, List<Long> tagIds);
  boolean deleteTagsByComboId(Long comboId, List<Long> tagIds);
}
