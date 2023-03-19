package com.fgc.combo.companion.dto;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotEmpty;
import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CreateManyTagsDTO {

  @NotEmpty
  private List<@Valid CreateTag> tags;

  public record CreateTag(@NotEmpty String title, @NotEmpty String color) {}
}
