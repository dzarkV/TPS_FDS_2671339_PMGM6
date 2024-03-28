package com.proyecto.sena.mgm.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.proyecto.sena.mgm.entity.GastosEntity;
import com.proyecto.sena.mgm.entity.ProductosEntity;

@Repository
public interface GastosRepository extends JpaRepository<GastosEntity, Integer>{
	
	@Query(value = "select * from ventas where tipo_gasto like %:tipoDeGasto%", 
			nativeQuery = true)
	List<GastosEntity> findByTipoDeGasto(@Param("tipoDeGasto") String tipoGasto);
	
	void deleteById(Integer idGasto);
	
//	@Query(value = "select * from ventas where valor_gasto like %:valorDelGasto% and id_gasto = :id", 
//			nativeQuery = true)
//	List<GastosEntity> findByValorGastoAndIdGasto(@Param("valorDelGasto") String nombreProducto, @Param("id") Integer idProducto);

}
