package com.fgc.combo.companion.mapper;

import com.fgc.combo.companion.dto.ManyTagsReponseDto;
import com.fgc.combo.companion.dto.TagResponseDto;
import com.fgc.combo.companion.model.Tag;
import java.util.List;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Component;

@Component
public class TagMapper extends BaseMapper<Tag> {

  public TagMapper(ModelMapper modelMapper) {
    super(modelMapper);
  }

  public TagResponseDto toDTO(Tag tag) {
    return this.toDTO(tag, TagResponseDto.class);
  }

  public ManyTagsReponseDto toManyTagsReponseDTO(List<Tag> tags) {
    return new ManyTagsReponseDto(
      tags.stream().map(tag -> this.toDTO(tag)).toList()
    );
  }
}
