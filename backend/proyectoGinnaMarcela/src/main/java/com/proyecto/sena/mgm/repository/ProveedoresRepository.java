package com.proyecto.sena.mgm.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.proyecto.sena.mgm.entity.ProveedoresEntity;

@Repository
public interface ProveedoresRepository extends JpaRepository<ProveedoresEntity, Integer>{
	
    @Query(value = "select * from proveedores where empresa like %:empresa%", 
			nativeQuery = true)
	List<ProveedoresEntity> findByEmpresa(@Param("empresa") String empresa);
    
    void deleteById(Integer idProveedor);
    
}
