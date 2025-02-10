package com.fgc.combo.companion.validation;

import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;

public class ValueOfEnumValidator
    implements ConstraintValidator<ValueOfEnum, String> {
  private Class<? extends Enum<?>> enumClass;

  @Override
  public void initialize(ValueOfEnum annotation) {
    this.enumClass = annotation.enumClass();
  }

  @SuppressWarnings({ "unchecked", "rawtypes" })
  @Override
  public boolean isValid(String value, ConstraintValidatorContext context) {
    if (value == null) {
      return true;
    }

    try {
      Enum.valueOf((Class) enumClass, value.trim().toUpperCase());
      return true;
    } catch (IllegalArgumentException e) {
      return false;
    }
  }
}
