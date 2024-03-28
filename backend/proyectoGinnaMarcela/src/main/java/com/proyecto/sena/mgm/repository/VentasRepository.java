package com.proyecto.sena.mgm.repository;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.proyecto.sena.mgm.entity.ProductosEntity;
import com.proyecto.sena.mgm.entity.VentasEntity;

@Repository
public interface VentasRepository extends JpaRepository<VentasEntity, Integer>{
	
	@Query(value = "select * from ventas where fecha_venta like %:fecha%", 
			nativeQuery = true)
	
	List<VentasEntity> findByFechaVenta(@Param("fecha") String fechaVenta);
	
	List<VentasEntity> findByFechaVentaBetween(LocalDate startDate, LocalDate endDate);
	
	void deleteById(Integer idVenta);
	
//	@Query(value = "select * from ventas where nombre_producto like %:nombre% and id_producto = :id", 
//			nativeQuery = true)
//	List<VentasEntity> findByNombreProductoAndIdProducto(@Param("nombre") String nombreProducto, @Param("id") Integer idProducto);

}
