package com.fgc.combo.companion.service.impl;

import com.fgc.combo.companion.dto.CreateComboDTO;
import com.fgc.combo.companion.dto.PaginationResponse;
import com.fgc.combo.companion.dto.PlaylistComboSearchDTO;
import com.fgc.combo.companion.dto.UpdateComboDTO;
import com.fgc.combo.companion.exception.OperationNotAllowedException;
import com.fgc.combo.companion.exception.ResourceNotFoundException;
import com.fgc.combo.companion.mapper.ComboMapper;
import com.fgc.combo.companion.mapper.PaginationResponseMapper;
import com.fgc.combo.companion.model.Combo;
import com.fgc.combo.companion.model.User;
import com.fgc.combo.companion.repository.ComboRepository;
import com.fgc.combo.companion.service.ComboService;
import com.fgc.combo.companion.service.UserService;
import java.net.URLDecoder;
import java.nio.charset.StandardCharsets;
import java.util.Set;
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
    UserService userService
  ) {
    this.comboRepository = comboRepository;
    this.comboMapper = comboMapper;
    this.userService = userService;
  }

  @Override
  public Combo create(CreateComboDTO createComboDTO) {
    Combo combo = comboMapper.toOriginal(createComboDTO);
    User currentUser = userService.me();
    combo.setOwner(currentUser);
    combo.setGame(createComboDTO.getGame());
    log.info(
      "Creating combo with name: {} and game: {}",
      combo.getName(),
      combo.getGame().name()
    );
    return this.saveCombo(combo);
  }

  @Override
  public Combo update(Long id, UpdateComboDTO updateComboDTO) {
    User currentUser = userService.me();

    Combo combo =
      this.comboRepository.findById(id)
        .orElseThrow(() -> new ResourceNotFoundException("Combo not found!"));

    if (combo.getOwner().getId() != currentUser.getId()) {
      throw new OperationNotAllowedException(
        "This combo belongs to another user!"
      );
    }

    BeanUtils.copyProperties(updateComboDTO, combo);

    return this.saveCombo(combo);
  }

  @Override
  public PaginationResponse<Combo> getAllByCurrentUser(Pageable pageable) {
    User user = this.userService.me();
    Page<Combo> userCombos =
      this.comboRepository.findAllByOwner(user, pageable);

    return PaginationResponseMapper.create(userCombos);
  }

  @Override
  public Combo getByIdAndCurrentUser(Long id) {
    User currentUser = this.userService.me();

    Combo combo =
      this.comboRepository.findByIdAndOwner(id, currentUser)
        .orElseThrow(() -> new ResourceNotFoundException("Combo not found!"));

    return combo;
  }

  @Override
  public Combo saveCombo(Combo combo) {
    return this.comboRepository.save(combo);
  }

  @Override
  public PaginationResponse<Combo> getAllByComboNameOrTagName(
    PlaylistComboSearchDTO playlistComboSearchDTO,
    Pageable pageable
  ) {
    String name = playlistComboSearchDTO.getName() != null
      ? URLDecoder.decode(
        playlistComboSearchDTO.getName(),
        StandardCharsets.UTF_8
      )
      : null;
    return PaginationResponseMapper.create(
      name == null
        ? this.comboRepository.findAllByOwner(userService.me(), pageable)
        : this.comboRepository.findAllByNameContainingIgnoreCaseOrTagsTitleInIgnoreCase(
            name,
            Set.of(name),
            pageable
          )
    );
  }
}
