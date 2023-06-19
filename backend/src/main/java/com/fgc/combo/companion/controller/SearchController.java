package com.fgc.combo.companion.controller;

import com.fgc.combo.companion.dto.SearchAllResourcesDto;
import com.fgc.combo.companion.enums.ComboGameTypes;
import com.fgc.combo.companion.service.SearchService;
import com.fgc.combo.companion.validation.ValueOfEnum;
import jakarta.validation.constraints.NotEmpty;
import java.util.List;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/search")
public class SearchController {

  private final SearchService searchService;

  public SearchController(SearchService searchService) {
    this.searchService = searchService;
  }

  @GetMapping
  public SearchAllResourcesDto searchAllResources(
    @Validated @NotEmpty @RequestParam(name = "search") String search,
    @Validated @RequestParam(
      name = "gameTypes",
      required = false
    ) List<@ValueOfEnum(
      enumClass = ComboGameTypes.class,
      message = "must be one of: " + ComboGameTypes.Constants.ALL_GAME_TYPES
    ) ComboGameTypes> comboGameTypes
  ) {
    return this.searchService.searchAllResources(
        search,
        comboGameTypes == null ? List.of() : comboGameTypes
      );
  }
}
