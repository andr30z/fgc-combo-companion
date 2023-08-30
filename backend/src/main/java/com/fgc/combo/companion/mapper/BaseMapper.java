package com.fgc.combo.companion.mapper;

import com.fgc.combo.companion.dto.PaginationResponse;
import java.util.List;
import java.util.function.Function;
import org.modelmapper.ModelMapper;
import org.springframework.beans.BeanUtils;

public abstract class BaseMapper<M> {

  private final ModelMapper modelMapper;

  public BaseMapper(ModelMapper modelMapper) {
    this.modelMapper = modelMapper;
  }

  public <R> R toDto(Object model, Class<R> dtoClass) {
    return this.modelMapper.map(model, dtoClass);
  }

  public M toOriginal(Object dto, Class<M> originalClass) {
    return modelMapper.map(dto, originalClass);
  }

  public <R> List<R> toDto(List<M> collection, Class<R> dtoClass) {
    return collection.stream().map(item -> this.toDto(item, dtoClass)).toList();
  }

  public <R> PaginationResponse<R> toPaginationDto(
    PaginationResponse<?> pagination,
    Function<? super Object, R> mapperFunction
  ) {
    PaginationResponse<R> convertedPagination = new PaginationResponse<>();
    BeanUtils.copyProperties(pagination, convertedPagination);
    convertedPagination.setData(
      pagination.getData().stream().map(mapperFunction).toList()
    );

    return convertedPagination;
  }

  public <R, T> PaginationResponse<R> toPaginationDto(
    PaginationResponse<T> pagination,
    Class<R> targetClass
  ) {
    Function<? super Object, R> mapperFunction = item ->
      toDto(item, targetClass);
    return toPaginationDto(pagination, mapperFunction);
  }
}
