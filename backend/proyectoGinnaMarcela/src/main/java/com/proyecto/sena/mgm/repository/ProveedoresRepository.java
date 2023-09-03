package com.proyecto.sena.mgm.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.proyecto.sena.mgm.entity.ProveedoresEntity;

@Repository
public interface ProveedoresRepository extends JpaRepository<ProveedoresEntity, Integer>{

}
