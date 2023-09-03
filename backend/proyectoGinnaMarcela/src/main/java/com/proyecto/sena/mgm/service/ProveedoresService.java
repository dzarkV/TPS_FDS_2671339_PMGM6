package com.proyecto.sena.mgm.service;

import java.util.List;

import com.proyecto.sena.mgm.entity.ProveedoresEntity;

public interface ProveedoresService {

	List<ProveedoresEntity> getAll();
	
	public ProveedoresEntity findById(Integer id);
	
	public ProveedoresEntity save(ProveedoresEntity producto);
	
}
