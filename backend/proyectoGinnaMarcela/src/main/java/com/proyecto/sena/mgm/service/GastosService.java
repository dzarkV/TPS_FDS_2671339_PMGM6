package com.proyecto.sena.mgm.service;

import java.util.List;

import com.proyecto.sena.mgm.entity.GastosEntity;
import com.proyecto.sena.mgm.entity.ProductosEntity;
import com.proyecto.sena.mgm.entity.VentasEntity;

public interface GastosService {

	List<GastosEntity> getAll();
	
	public GastosEntity findById(Integer id);
	
	public GastosEntity save(GastosEntity gasto);
	
	void eliminarGasto(Integer idGasto);
	
	boolean actualizarGasto(Integer id, GastosEntity gasto);
	
	
//	public List<GastosEntity> buscarGasto(Integer idGasto, String tipoDeGasto);
//	
}
