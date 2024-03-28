package com.proyecto.sena.mgm.service.impl;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestParam;

import com.proyecto.sena.mgm.entity.ProductosEntity;
import com.proyecto.sena.mgm.entity.ProveedoresEntity;
import com.proyecto.sena.mgm.entity.VentasEntity;
import com.proyecto.sena.mgm.repository.Productosrepository;
import com.proyecto.sena.mgm.repository.VentasRepository;
import com.proyecto.sena.mgm.service.ProductoService;
import com.proyecto.sena.mgm.service.VentasService;
import java.util.Optional;
	

@Service
public class VentasServiceImpl implements VentasService {

	@Autowired
	private VentasRepository ventasRepository;
	
	public List<VentasEntity> getAll() {
		return ventasRepository.findAll();
	}
	
	public VentasEntity findById(Integer id) {
		return ventasRepository.findById(id).orElse(null);
	}
	
	public int getTotalVentaDia(LocalDate fecha) {
        LocalDate startDate = fecha;
        LocalDate endDate = startDate.plusDays(1);
        List<VentasEntity> ventasDelDia = ventasRepository.findByFechaVentaBetween(startDate, endDate);
        return ventasDelDia.stream().mapToInt(VentasEntity::getValorTotalVenta).sum();
    }
	
	public int getTotalVentaSemana(LocalDate fecha) {
	    LocalDate startDate = fecha.with(java.time.temporal.TemporalAdjusters.previousOrSame(java.time.DayOfWeek.MONDAY));
	    LocalDate endDate = startDate.plusWeeks(1);
	    List<VentasEntity> ventasDeLaSemana = ventasRepository.findByFechaVentaBetween(startDate, endDate);
	    return ventasDeLaSemana.stream().mapToInt(VentasEntity::getValorTotalVenta).sum();
	}

	public int getTotalVentaMes(LocalDate fecha) {
	    LocalDate startDate = fecha.withDayOfMonth(1);
	    LocalDate endDate = startDate.plusMonths(1);
	    List<VentasEntity> ventasDelMes = ventasRepository.findByFechaVentaBetween(startDate, endDate);
	    return ventasDelMes.stream().mapToInt(VentasEntity::getValorTotalVenta).sum();
	}
	
	public boolean actualizarVenta(Integer id, VentasEntity venta) {
        Optional<VentasEntity> ventaExistente = ventasRepository.findById(id);
        if (ventaExistente.isPresent()) {
        	VentasEntity ventaActualizado = ventaExistente.get();
            ventaActualizado.setIdStock(venta.getIdStock());
            ventaActualizado.setFechaVenta(venta.getFechaVenta());
            ventaActualizado.setCantidadItemsVentaXProducto(venta.getCantidadItemsVentaXProducto());
            ventaActualizado.setValorTotalVenta(venta.getValorTotalVenta());
            ventasRepository.save(ventaActualizado);
            return true;
        } else {
            return false;
        }
    }
	
	public void eliminarVenta(Integer idventa) {
		ventasRepository.deleteById(idventa);
	}
	
	public VentasEntity save(VentasEntity venta) {
		return ventasRepository.save(venta);
	}

//	public void delete(Integer id) {
//		 productosrepository.deleteById(id);
//	}

}
