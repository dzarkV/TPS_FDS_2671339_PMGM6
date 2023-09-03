package com.proyecto.sena.mgm.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "proveedores")
public class ProveedoresEntity {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer idProveedor;
	
	@Column(name = "id_entrada")
	private Integer idEntrada;
	
	@Column(name = "empresa")
	private String empresa;
	
	@Column(name = "direccion_proveedor")
	private String direccionProveedor;
	
	@Column(name = "nombre_proveedor")
	private String nombreProveedor;
	
	@Column(name = "telefono_proveedor")
	private String telefonoProveedor;
	
	@Column(name = "descripcion_proveedor")
	private String descripcionProveedor;
	
	@Column(name = "email_proveedor")
	private String emailProveedor;

	public ProveedoresEntity(Integer idProveedor, Integer idEntrada, String empresa, String direccionProveedor,
			String nombreProveedor, String telefonoProveedor, String descripcionProveedor, String emailProveedor) {
		this.idProveedor = idProveedor;
		this.idEntrada = idEntrada;
		this.empresa = empresa;
		this.direccionProveedor = direccionProveedor;
		this.nombreProveedor = nombreProveedor;
		this.telefonoProveedor = telefonoProveedor;
		this.descripcionProveedor = descripcionProveedor;
		this.emailProveedor = emailProveedor;
	}

	public ProveedoresEntity() {}

	public String getEmpresa() {
		return empresa;
	}

	public void setEmpresa(String empresa) {
		this.empresa = empresa;
	}

	public String getEmailProveedor() {
		return emailProveedor;
	}


	public void setEmailProveedor(String emailProveedor) {
		this.emailProveedor = emailProveedor;
	}



	public Integer getIdProveedor() {
		return idProveedor;
	}

	public void setIdProveedor(Integer idProveedor) {
		this.idProveedor = idProveedor;
	}

	public Integer getIdEntrada() {
		return idEntrada;
	}

	public void setIdEntrada(Integer idEntrada) {
		this.idEntrada = idEntrada;
	}

	public String getDireccionProveedor() {
		return direccionProveedor;
	}

	public void setDireccionProveedor(String direccionProveedor) {
		this.direccionProveedor = direccionProveedor;
	}

	public String getNombreProveedor() {
		return nombreProveedor;
	}

	public void setNombreProveedor(String nombreProveedor) {
		this.nombreProveedor = nombreProveedor;
	}

	public String getTelefonoProveedor() {
		return telefonoProveedor;
	}

	public void setTelefonoProveedor(String telefonoProveedor) {
		this.telefonoProveedor = telefonoProveedor;
	}

	public String getDescripcionProveedor() {
		return descripcionProveedor;
	}

	public void setDescripcionProveedor(String descripcionProveedor) {
		this.descripcionProveedor = descripcionProveedor;
	}

}
