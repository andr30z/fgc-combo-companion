package com.fgc.combo.companion.utils;

import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.Arrays;
import java.util.Base64;
import javax.crypto.Cipher;
import javax.crypto.spec.SecretKeySpec;

import com.fgc.combo.companion.exception.SecurityCipherDecodeException;

import lombok.extern.slf4j.Slf4j;

@Slf4j
public class SecurityCipher {

  private static final String KEYVALUE = "secureKey";
  private static byte[] key;
  private static SecretKeySpec secretKey = setKey();

  private SecurityCipher() {
    throw new AssertionError("Static!");
  }

  public static SecretKeySpec setKey() {
    MessageDigest sha;
    try {
      key = KEYVALUE.getBytes(StandardCharsets.UTF_8);
      sha = MessageDigest.getInstance("SHA-1");
      key = sha.digest(key);
      key = Arrays.copyOf(key, 16);
      return new SecretKeySpec(key, "AES");
    } catch (NoSuchAlgorithmException e) {
      e.printStackTrace();
      return null;
    }
  }

  public static String encrypt(String strToEncrypt) {
    if (strToEncrypt == null) return null;

    try {
      Cipher cipher = Cipher.getInstance("AES/ECB/PKCS5Padding");
      cipher.init(Cipher.ENCRYPT_MODE, secretKey);
      log.info("Encryption Key: {}", key.toString());
      return Base64
        .getEncoder()
        .encodeToString(
          cipher.doFinal(strToEncrypt.getBytes(StandardCharsets.UTF_8))
        );
    } catch (Exception e) {
      e.printStackTrace();
    }
    return null;
  }

  public static String decrypt(String strToDecrypt, boolean throwException) {
    if (strToDecrypt == null) return null;

    try {
      setKey();
      Cipher cipher = Cipher.getInstance("AES/ECB/PKCS5Padding");
      cipher.init(Cipher.DECRYPT_MODE, secretKey);
      return new String(
        cipher.doFinal(Base64.getDecoder().decode(strToDecrypt))
      );
    } catch (Exception e) {
      log.error("Error while decrypting token: {},  encryption key: {} stackTrace: {}", Base64.getDecoder().decode(strToDecrypt), key.toString(), e.getMessage());
    }
    if (throwException) throw new SecurityCipherDecodeException(
      "Malformed token"
    );
    return null;
  }

  public static String decrypt(String strToDecrypt) {
    if (strToDecrypt == null) return null;

    try {
      setKey();
      Cipher cipher = Cipher.getInstance("AES/ECB/PKCS5Padding");
      cipher.init(Cipher.DECRYPT_MODE, secretKey);
      return new String(
        cipher.doFinal(Base64.getDecoder().decode(strToDecrypt))
      );
    } catch (Exception e) {
      e.printStackTrace();
    }
    return null;
  }
}
