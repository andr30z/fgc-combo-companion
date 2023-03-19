package com.fgc.combo.companion.mapper;

import com.fgc.combo.companion.dto.PaginationResponse;
import java.util.function.Function;
import org.modelmapper.ModelMapper;
import org.springframework.beans.BeanUtils;

public abstract class BaseMapper<M> {

  private final ModelMapper modelMapper;

  public BaseMapper(ModelMapper modelMapper) {
    this.modelMapper = modelMapper;
  }

  public <R> R toDTO(Object model, Class<R> dtoClass) {
    return this.modelMapper.map(model, dtoClass);
  }

  public M toOriginal(Object dto, Class<M> originalClass) {
    return modelMapper.map(dto, originalClass);
  }

  public <R> PaginationResponse<R> toPaginationDTO(
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

  public <R, T> PaginationResponse<R> toPaginationDTO(
    PaginationResponse<T> pagination,
    Class<R> targetClass
  ) {
    Function<? super Object, R> mapperFunction = item ->
      toDTO(item, targetClass);
    return toPaginationDTO(pagination, mapperFunction);
  }
}
