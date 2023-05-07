package com.fgc.combo.companion.utils;

import java.net.URLDecoder;
import java.nio.charset.StandardCharsets;

public class URLDecoderUtil {

  public static String decodeParamToUTF8(String undecodedParam) {
    if (undecodedParam == null) return null;
    return URLDecoder.decode(undecodedParam, StandardCharsets.UTF_8);
  }
}
