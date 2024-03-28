package com.proyecto.sena.mgm.service.impl;

import java.util.List;
import java.util.Optional;

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

	public List<ProveedoresEntity> findByEmpresa(String empresa) {
		return proveedoresRepository.findByEmpresa(empresa);
	}
	
	public ProveedoresEntity save(ProveedoresEntity producto) {
		return proveedoresRepository.save(producto);
	}
	
	public boolean actualizarProveedor(Integer id, ProveedoresEntity proveedor) {
        Optional<ProveedoresEntity> proveedorExistente = proveedoresRepository.findById(id);
        if (proveedorExistente.isPresent()) {
            ProveedoresEntity proveedorActualizado = proveedorExistente.get();
            proveedorActualizado.setEmpresa(proveedor.getEmpresa());
            proveedorActualizado.setEmailProveedor(proveedor.getEmailProveedor());
            proveedorActualizado.setDireccionProveedor(proveedor.getDireccionProveedor());
            proveedorActualizado.setNombreProveedor(proveedor.getNombreProveedor());
            proveedorActualizado.setTelefonoProveedor(proveedor.getTelefonoProveedor());
            proveedorActualizado.setDescripcionProveedor(proveedor.getDescripcionProveedor());
            proveedoresRepository.save(proveedorActualizado);
            return true;
        } else {
            return false;
        }
    }
	
	public void eliminarProveedor(Integer idProveedor) {
		proveedoresRepository.deleteById(idProveedor);
	}
}
