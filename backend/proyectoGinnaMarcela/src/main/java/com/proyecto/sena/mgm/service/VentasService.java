package com.proyecto.sena.mgm.service;

import java.time.LocalDate;
import java.util.List;

import com.proyecto.sena.mgm.entity.ProveedoresEntity;
import com.proyecto.sena.mgm.entity.VentasEntity;

public interface VentasService {

	List<VentasEntity> getAll();
	
	public VentasEntity findById(Integer id);
	
	public VentasEntity save(VentasEntity venta);

	int getTotalVentaDia(LocalDate fecha);
	
	int getTotalVentaSemana(LocalDate fecha);
	
	int getTotalVentaMes(LocalDate fecha);
	
	void eliminarVenta(Integer idVenta);
	
	boolean actualizarVenta(Integer id, VentasEntity venta);
	

	
	
	
//	public VentasEntity findByFechaVenta(String fechaVenta);
	
	//public List<ProductosEntity> buscarProducto(Integer idProducto, String nombreProducto);
	
}
