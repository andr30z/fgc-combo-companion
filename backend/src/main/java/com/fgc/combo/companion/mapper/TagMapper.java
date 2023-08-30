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

  public TagResponseDto toDto(Tag tag) {
    return this.toDto(tag, TagResponseDto.class);
  }

  public ManyTagsReponseDto toManyTagsReponseDto(List<Tag> tags) {
    return new ManyTagsReponseDto(
      tags.stream().map(tag -> this.toDto(tag)).toList()
    );
  }
}
