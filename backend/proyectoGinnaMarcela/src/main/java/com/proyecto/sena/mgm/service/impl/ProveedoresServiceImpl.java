package com.proyecto.sena.mgm.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.proyecto.sena.mgm.entity.ProveedoresEntity;
import com.proyecto.sena.mgm.repository.ProveedoresRepository;
import com.proyecto.sena.mgm.service.ProveedoresService;

@Service
public class ProveedoresServiceImpl implements ProveedoresService {

	@Autowired
	private ProveedoresRepository proveedoresRepository;
	
	public List<ProveedoresEntity> getAll() {
		return proveedoresRepository.findAll();
	}
	
	public ProveedoresEntity findById(Integer id) {
		return proveedoresRepository.findById(id).orElse(null);
	}

	public ProveedoresEntity save(ProveedoresEntity producto) {
		return proveedoresRepository.save(producto);
	}

	public void delete(Integer id) {
		proveedoresRepository.deleteById(id);
	}
	
}
