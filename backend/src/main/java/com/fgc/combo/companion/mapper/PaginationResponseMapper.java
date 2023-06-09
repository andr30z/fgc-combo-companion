package com.fgc.combo.companion.mapper;

import com.fgc.combo.companion.dto.PaginationResponse;
import java.util.List;
import java.util.function.Function;
import java.util.stream.Collectors;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public class PaginationResponseMapper {

  private static <L, P> PaginationResponse<L> generatePagination(
    List<L> content,
    Page<P> page
  ) {
    Pageable pageable = page.getPageable();

    return PaginationResponse
      .<L>builder()
      .data(content)
      .totalPages(page.getTotalPages())
      .perPage(pageable.getPageSize())
      .currentPage(pageable.getPageNumber())
      .totalItems(page.getTotalElements())
      .hasNext(page.hasNext())
      .build();
  }

  public static <P> PaginationResponse<P> create(Page<P> page) {
    return generatePagination(page.getContent(), page);
  }

  public static <P, R> PaginationResponse<R> create(
    Page<P> page,
    Function<P, ? extends R> mapper
  ) {
    return generatePagination(
      page.getContent().stream().map(mapper).collect(Collectors.toList()),
      page
    );
  }
}
