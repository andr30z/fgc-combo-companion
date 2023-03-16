package com.fgc.combo.companion.service.impl;

import org.springframework.beans.BeanUtils;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.webjars.NotFoundException;

import com.fgc.combo.companion.dto.ComboResponseDTO;
import com.fgc.combo.companion.dto.CreateComboDTO;
import com.fgc.combo.companion.dto.PaginationResponse;
import com.fgc.combo.companion.exception.OperationNotAllowedException;
import com.fgc.combo.companion.mapper.ComboMapper;
import com.fgc.combo.companion.mapper.PaginationResponseMapper;
import com.fgc.combo.companion.model.Combo;
import com.fgc.combo.companion.model.User;
import com.fgc.combo.companion.repository.ComboRepository;
import com.fgc.combo.companion.service.ComboService;
import com.fgc.combo.companion.service.UserService;

public class ComboServiceImpl implements ComboService {

    private final ComboRepository comboRepository;
    private final ComboMapper comboMapper;
    private final UserService userService;

    public ComboServiceImpl(ComboRepository comboRepository, ComboMapper comboMapper, UserService userService) {
        this.comboRepository = comboRepository;
        this.comboMapper = comboMapper;
        this.userService = userService;
    }

    @Override
    public ComboResponseDTO create(CreateComboDTO createComboDTO) {

        Combo combo = comboMapper.toCombo(createComboDTO);
        return comboMapper.toComboReponseDTO(this.comboRepository.save(combo));
    }

    @Override
    public ComboResponseDTO update(Long id, CreateComboDTO createComboDTO) {
        User currentUser = userService.me();

        Combo combo = this.comboRepository.findById(id).orElseThrow(() -> new NotFoundException("Combo not found!"));

        if (combo.getOwner().getId() != currentUser.getId())
            throw new OperationNotAllowedException("That combo belongs to another user!");

        BeanUtils.copyProperties(createComboDTO, combo);

        return this.comboMapper.toComboReponseDTO(this.comboRepository.save(combo));
    }

    @Override
    public PaginationResponse<ComboResponseDTO> getAllByCurrentUser(Pageable pageable) {
        User user = this.userService.me();
        Page<Combo> userCombos = this.comboRepository.findAllByOwner(user, pageable);

        return PaginationResponseMapper
                .create(userCombos, comboMapper::toComboReponseDTO);

    }

    @Override
    public ComboResponseDTO getByIdAndCurrentUser(Long id) {
        User currentUser = this.userService.me();

        Combo combo = this.comboRepository.findByIdAndOwner(id, currentUser)
                .orElseThrow(() -> new NotFoundException("Combo not found!"));

        return this.comboMapper.toComboReponseDTO(combo);
    }

}
