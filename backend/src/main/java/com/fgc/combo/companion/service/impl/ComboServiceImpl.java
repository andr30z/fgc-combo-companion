package com.fgc.combo.companion.service.impl;

import com.fgc.combo.companion.dto.CreateComboDto;
import com.fgc.combo.companion.dto.PaginationResponse;
import com.fgc.combo.companion.dto.PlaylistComboSearchDto;
import com.fgc.combo.companion.dto.UpdateComboDto;
import com.fgc.combo.companion.exception.BadRequestException;
import com.fgc.combo.companion.exception.OperationNotAllowedException;
import com.fgc.combo.companion.exception.ResourceNotFoundException;
import com.fgc.combo.companion.mapper.ComboMapper;
import com.fgc.combo.companion.mapper.PaginationResponseMapper;
import com.fgc.combo.companion.model.Combo;
import com.fgc.combo.companion.model.User;
import com.fgc.combo.companion.repository.ComboRepository;
import com.fgc.combo.companion.service.ComboService;
import com.fgc.combo.companion.service.UserService;
import com.fgc.combo.companion.utils.ComboCharactersValidation;
import com.fgc.combo.companion.utils.URLDecoderUtil;
import java.util.UUID;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.BeanUtils;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
@Slf4j
public class ComboServiceImpl implements ComboService {

  private final ComboRepository comboRepository;
  private final ComboMapper comboMapper;
  private final UserService userService;

  public ComboServiceImpl(
      ComboRepository comboRepository,
      ComboMapper comboMapper,
      UserService userService) {
    this.comboRepository = comboRepository;
    this.comboMapper = comboMapper;
    this.userService = userService;
  }

  private void validateComboCharacter(String character, String game) {
    if (character != null &&
        !ComboCharactersValidation.isComboCharacterValid(
            character,
            game)) {
      throw new BadRequestException("Invalid combo character!");
    }
  }

  @Override
  public Combo create(CreateComboDto createComboDTO) {

    String gameType = createComboDTO.getGame();

    Combo combo = comboMapper.toOriginal(createComboDTO);
    User currentUser = userService.me();
    combo.setOwner(currentUser);
    combo.setGame(gameType);
    log.info(
        "Creating combo with name: {} and game: {}",
        combo.getName(),
        combo.getGame().name());
    return this.saveCombo(combo);
  }

  @Override
  public Combo update(UUID id, UpdateComboDto updateComboDTO) {
    Combo combo = this.comboRepository.findById(id)
        .orElseThrow(() -> new ResourceNotFoundException("Combo not found!"));

    User currentUser = userService.me();
    if (!combo.getOwner().getId().equals(currentUser.getId())) {
      throw new OperationNotAllowedException(
          "This combo belongs to another user!");
    }

    BeanUtils.copyProperties(updateComboDTO, combo);
    combo.setCombo(updateComboDTO.getCombo());

    return this.saveCombo(combo);
  }

  @Override
  public PaginationResponse<Combo> getAllByCurrentUser(Pageable pageable) {
    User user = this.userService.me();
    Page<Combo> userCombos = this.comboRepository.findAllByOwner(user, pageable);

    return PaginationResponseMapper.create(userCombos);
  }

  @Override
  public Combo getByIdAndCurrentUser(UUID id) {
    User currentUser = this.userService.me();

    Combo combo = this.comboRepository.findByIdAndOwner(id, currentUser)
        .orElseThrow(() -> new ResourceNotFoundException("Combo not found!"));

    return combo;
  }

  @Override
  public Combo saveCombo(Combo combo) {
    return this.comboRepository.save(combo);
  }

  @Override
  public PaginationResponse<Combo> getAllByOwnerAndSearchParam(
      PlaylistComboSearchDto playlistComboSearchDTO,
      Pageable pageable) {
    String name = URLDecoderUtil.decodeParamToUTF8(
        playlistComboSearchDTO.getName());
    User currentUser = userService.me();
    return PaginationResponseMapper.create(
        name == null
            ? this.comboRepository.findAllByOwner(currentUser, pageable)
            : this.comboRepository.findAllByOwnerAndSearchParam(
                currentUser,
                name,
                pageable));
  }

  @Override
  public boolean deleteByIdAndCurrentUser(UUID id) {
    Combo combo = this.comboRepository.findById(id)
        .orElseThrow(() -> new ResourceNotFoundException("Combo not found!"));
    User me = userService.me();

    if (!combo.getOwner().getId().equals(me.getId()))
      throw new OperationNotAllowedException(
          "This combo belongs to another user!");

    this.comboRepository.delete(combo);
    return true;
  }

  @Override
  public PaginationResponse<Combo> getAllBySearchParams(
      PlaylistComboSearchDto playlistComboSearchDTO,
      Pageable pageable) {
    String name = URLDecoderUtil.decodeParamToUTF8(
        playlistComboSearchDTO.getName());
    return PaginationResponseMapper.create(
        name == null
            ? this.comboRepository.findAll(pageable)
            : this.comboRepository.findAllBySearchParam(name, pageable));
  }

  @Override
  public PaginationResponse<Combo> getByOwner(User user, Pageable pageable) {
    return PaginationResponseMapper.create(
        this.comboRepository.findAllByOwner(user, pageable));
  }

  @Override
  public PaginationResponse<Combo> getByOwner(UUID userId, Pageable pageable) {
    return this.getByOwner(this.userService.findById(userId), pageable);
  }

  @Override
  public Combo getById(UUID id) {
    return this.comboRepository.findById(id)
        .orElseThrow(() -> new ResourceNotFoundException("Combo not found!"));
  }
}
