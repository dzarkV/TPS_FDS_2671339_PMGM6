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
import org.springframework.web.bind.annotation.RestController;

import com.proyecto.sena.mgm.entity.CategoriaEntity;
import com.proyecto.sena.mgm.entity.ProveedoresEntity;
import com.proyecto.sena.mgm.service.ProveedoresService;


@RestController
@RequestMapping(path = "api/proveedores")
@CrossOrigin(origins = "*")
public class ProveedoresController {
	
	@Autowired
	private ProveedoresService ProveedoresService;
	
	@GetMapping("/listado")
    public ResponseEntity<List<ProveedoresEntity>> consultarTodos(){
        return new ResponseEntity<>(ProveedoresService.getAll(), HttpStatus.OK);
    }
	
	@GetMapping("/listado/{id}")
    public ResponseEntity<ProveedoresEntity> consultarPorId(@PathVariable("id") Integer idProducto){
        return new ResponseEntity<>(ProveedoresService.findById(idProducto), HttpStatus.OK);
    }
	
	@PostMapping("/registar")
    public ResponseEntity<ProveedoresEntity> guardar(@RequestBody ProveedoresEntity proveedor){
        return new ResponseEntity<>(ProveedoresService.save(proveedor), HttpStatus.OK);
    }
	
}
