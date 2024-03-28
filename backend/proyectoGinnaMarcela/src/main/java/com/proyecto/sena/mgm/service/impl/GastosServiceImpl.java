package com.proyecto.sena.mgm.service.impl;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestParam;

import com.proyecto.sena.mgm.entity.GastosEntity;
import com.proyecto.sena.mgm.entity.ProductosEntity;
import com.proyecto.sena.mgm.entity.VentasEntity;
import com.proyecto.sena.mgm.repository.GastosRepository;
import com.proyecto.sena.mgm.repository.Productosrepository;
import com.proyecto.sena.mgm.service.GastosService;
import com.proyecto.sena.mgm.service.ProductoService;

@Service
public class GastosServiceImpl implements GastosService {

	@Autowired
	private GastosRepository gastosRepository;
	
	public List<GastosEntity> getAll() {
		return gastosRepository.findAll();
	}
	
	public GastosEntity save(GastosEntity venta) {
		return gastosRepository.save(venta);
	}
	
	public GastosEntity findById(Integer id) {
		return gastosRepository.findById(id).orElse(null);
	}
	
	public boolean actualizarGasto(Integer id, GastosEntity gasto) {
        Optional<GastosEntity> gastoExistente = gastosRepository.findById(id);
        if (gastoExistente.isPresent()) {
        	GastosEntity gastoActualizado = gastoExistente.get();
            gastoActualizado.setTipoGasto(gasto.getTipoGasto());
            gastoActualizado.setValorGasto(gasto.getValorGasto());
            gastosRepository.save(gastoActualizado);
            return true;
        } else {
            return false;
        }
    }
	
	public void eliminarGasto(Integer idGasto) {
		gastosRepository.deleteById(idGasto);
	}
	
//	public List<GastosEntity> buscarProducto(Integer idProducto, String nombreProducto) {
//		if(idProducto == null && nombreProducto == null) {
//			return gastosRepository.findAll();
//		}
//		if(idProducto != null && nombreProducto == null) {
//			List objeto = new ArrayList<>();
//			objeto.add(gastosRepository.findById(idProducto).orElse(null));
//			return objeto;
//		}
//		if(idProducto == null && nombreProducto != null) {
//			System.out.println(nombreProducto);
//			return gastosRepository.findByNombreProducto(nombreProducto);
//		}
//		return gastosRepository.findByNombreProductoAndIdProducto(nombreProducto, idProducto);
//	}
	


//	public void delete(Integer id) {
//		 productosrepository.deleteById(id);
//	}

}
