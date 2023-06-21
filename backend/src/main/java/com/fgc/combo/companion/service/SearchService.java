package com.fgc.combo.companion.service;

import java.util.List;

import com.fgc.combo.companion.dto.SearchAllResourcesDto;

public interface SearchService {
  SearchAllResourcesDto searchAllResources(
    String search,
    List<String> comboGameTypes
  );
}
