package com.proyecto.sena.mgm.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.proyecto.sena.mgm.entity.ProductosEntity;
import com.proyecto.sena.mgm.entity.VentasEntity;
import com.proyecto.sena.mgm.service.ProductoService;
import com.proyecto.sena.mgm.service.VentasService;


@RestController
@RequestMapping(path = "api/ventas")
@CrossOrigin(origins = "*")
public class VentasController {
	
	@Autowired
	private VentasService ventasService;
	
	@GetMapping("/listado")
    public ResponseEntity<List<VentasEntity>> consultarTodos(){
        return new ResponseEntity<>(ventasService.getAll(), HttpStatus.OK);
    }
	
	@GetMapping("/listado/{id}")
    public ResponseEntity<VentasEntity> consultarPorId(@PathVariable("id") Integer idVenta){
        return new ResponseEntity<>(ventasService.findById(idVenta), HttpStatus.OK);
    }
	
//	@PostMapping("/guardar")
//    public ResponseEntity<VentasEntity> guardar(@RequestBody VentasEntity venta){
//        return new ResponseEntity<>(VentasService.save(venta), HttpStatus.OK);
//    }
//	
//	@GetMapping("/buscar")
//    public ResponseEntity<List<VentasEntity>> buscarProducto(@RequestParam(required = false) Integer idProducto, @RequestParam(required = false) String nombreProducto){
//        return new ResponseEntity<>(VentasService.buscarVenta(idProducto, nombreProducto), HttpStatus.OK);
//    }
	

}