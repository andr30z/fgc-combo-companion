package com.fgc.combo.companion.service.impl;

import java.util.List;

import org.webjars.NotFoundException;

import com.fgc.combo.companion.dto.ComboResponseDTO;
import com.fgc.combo.companion.dto.CreateComboDTO;
import com.fgc.combo.companion.mapper.ComboMapper;
import com.fgc.combo.companion.model.Combo;
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
        userService.me(null);
        Combo combo = this.comboRepository.findById(id).orElseThrow(() -> new NotFoundException("Combo not found!"));

        throw new UnsupportedOperationException("Unimplemented method 'update'");
    }

    @Override
    public List<ComboResponseDTO> getAllByCurrentUser(CreateComboDTO createComboDTO) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'getAllByCurrentUser'");
    }

}
