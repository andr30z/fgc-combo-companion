package com.fgc.combo.companion.service;

import com.fgc.combo.companion.dto.SearchAllResourcesDto;
import com.fgc.combo.companion.enums.ComboGameTypes;
import java.util.List;

public interface SearchService {
  SearchAllResourcesDto searchAllResources(
    String search,
    List<ComboGameTypes> comboGameTypes
  );
}
