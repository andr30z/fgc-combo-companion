package com.fgc.combo.companion.mapper;

import com.fgc.combo.companion.dto.ManyTagsReponseDTO;
import com.fgc.combo.companion.dto.TagResponseDTO;
import com.fgc.combo.companion.model.Tag;
import java.util.List;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Component;

@Component
public class TagMapper extends BaseMapper<Tag> {

  public TagMapper(ModelMapper modelMapper) {
    super(modelMapper);
  }

  public TagResponseDTO toDTO(Tag tag) {
    return this.toDTO(tag, TagResponseDTO.class);
  }

  public ManyTagsReponseDTO toManyTagsReponseDTO(List<Tag> tags) {
    return new ManyTagsReponseDTO(
      tags.stream().map(tag -> this.toDTO(tag)).toList()
    );
  }
}
