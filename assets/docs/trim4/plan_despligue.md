---
author: Diego Vargas
---

# Plan de despliegue de la aplicación MGM

## Introducción
El propósito del presente documento es establecer cómo se llevará a cabo la instalación del sistema MGM propuesta como solución a la Miscelanea Ginna Marcela, en su ámbito de producción final.

## Propósito
El software de invetario MGM permitirá a sus usuarios realizar el registro y seguimiento de los procesos de venta y compra de la microempresa beneficiada, con lo que se pretende obtener información precisa de las ganancias y de los gastos, así como el detalle de los productos existentes, los proveedores y las facturas que se generan.

## Alcance
Este documento es de interés para el cliente y para los involucrados en el desarrollo, pues se refiere a la primera puesta en marcha de la solución en la nube, y posterior uso a través del navegador web.

## Planificación del despliegue
Se provee un script declarativo de aprovisionamiento de recursos en la nube con la herramienta Terraform y una serie de instrucciones para configurar ciertos recursos importantes que contienen el código del sistema MGM. El aprovisionamiento se hará usando infraestructura como código.

### ¿Por qué infraestructura como código?
Infraestructura como código (o IaC) es el proceso de administrar y aprovisionar recursos de manera declarativa, en archivos legibles por máquina, en lugar de configuración de hardware físico o de configuración manual. Se usa para simplificar el despliegue y aprovechar las ventajas que permite:
 
 * reutilización, 
 * consistencia de la configuración, 
 * versionamiento de la infraestructura y 
 * declaración de entornos estables y escalables

Por lo general, el procedimiento de la IaC implica los siguientes 3 pasos:

1. Los desarrolladores definen y escriben las especificaciones de la infraestructura en un lenguaje que es específico del dominio.
2. Los archivos que se crean se envían a una API de gestión, a un servidor de nube o a un repositorio de código.
3. La plataforma toma todas las acciones necesarias para crear y configurar los recursos de computación.

Para el caso que nos ocupa, se describe la infraestructura necesaria para el sistema MGM como código con Terraform en el lenguaje de dominio HCL. Pero necesitamos instalar otras herramientas que nos permitirán integrar el código y los servicios necesarios.

## Herramientas de despliegue
Las siguientes herramientas se usarán para el despliegue de los componentes necesarios para el funcionamiento del sistema MGM:

* Cuenta en la nube de Microsoft Azure
* La interfaz de la línea de comandos de Azure o Azure CLI
* Terraform como herramienta de infraestructura como código 
* Azure portal para detalles de configuración
* Git
* Docker

Algunas de estas herramientas son necesarias para apoyar la ejecución del despliegue (como Docker), como se verá más adelante. Por lo demás, Git, Docker, Azure CLI y Terraform son herramientas que deben estar instaladas en el equipo desde donde se lanzará el despliegue, por lo que se menciona a continuación su instalación (también puede optar por ejecutar el script [install-tools](../../../terraform/install-tools.ps1) en la terminal de Powershell), específicamente para el sistema operativo Windows 10 o Windows 11 (antes de iniciar a instalar las herramientas necesarias, asegúrese de que su equipo tiene conexión a internet):

### Instalar Git
Vaya a la [página de git](https://git-scm.com/download/win), haga clic en 64-bit y espere a que complete la descarga. Al finalizar esta, ejecute el archivo `.exe` y dé clic en _siguiente_ hasta finalizar la instalación.

### Instalar Docker
Para instalar Docker en Windows, es necesario tener [WSL](https://learn.microsoft.com/en-us/windows/wsl/install) (Windows Subsystem for Linux) instalado y habilitado. Esto le permitirá tener una distribución con Linux en su equipo Windows. 

Para instalar WSL, vaya al menú de inicio de Windows, y escriba `características de windows`, le aparecerá una opción llamada _Activar o desactivar las características de Windows_. De clic en _Abrir_ y le saldrá una ventana emergente en donde podrá habilitar o deshabilitar algunas características de su sistema operativo.

En este caso solo necesitamos habilitar dos características: PLataforma de máquina virtual y Subsistema de Windows para Linux. Asegúrese de marcar estas dos características y dar clic en _Aceptar_ (tenga en cuenta que el nombre de estas características pueden variar si el idioma de su sistema operativo está en inglés). Debe esperar a que temine de buscar los archivos necesarios para habilitar esta característica y aplique los cambios. Al finalizar podrá dar clic en _Reiniciar ahora_.

Al volver del reinicio del equipo, vaya a la [página de Docker](https://docs.docker.com/desktop/install/windows-install/), haga clic en _Docker Desktop for Windows_, y, al finalizar la descarga, ejecute el archivo `.exe` que se descarga. En la ventana del instalador, dé clic en Ok, y espere a que finalice. Finalmente le pedirá que cierre su sesión de Windows, dé clic en _Close and logout_. Cuando vuelva a iniciar su sesión de Windows, le pedirá que acepte los términos y condiciones de uso, acepte para que se complete el proceso de inicio de Docker Desktop. Al final de esto, puede dar clic en _Skip tutorial_.

### Instalar Azure CLI
Vaya a la página [página de Azure CLI](https://learn.microsoft.com/es-es/cli/azure/install-azure-cli-windows?tabs=azure-cli) y haga clic en el botón _Versión más reciente de la CLI de Azure (64 bits)_. Siga los pasos de instalación.

### Instalar Terraform
Vaya a la página [página de Terraform](https://developer.hashicorp.com/terraform/install) y, en el apartado de Windows, haga clic en el botón de descarga de _AMD64_. Siga los pasos de instalación. Deberá descomprimir el archivo que se descarga. 

1. Cree una carpeta en `C:/` llamada terraform
2. Copie el archivo que descargó de terraform y extraiga su contenido en la carpeta creada en el paso anterior.
3. Vaya al menú de inicio de Windows, y escriba `variables de entorno`
4. En la ventana que sale, dé clic en _Variables de entorno_
5. En la sección llamada Variables de sistema, dé clic en Nuevo, agregue el onmbre de `terraform` y el valor, la ruta `C:/terraform`. Finalmente dé clic en Aceptar
6. En la lista de variables de entorno (la venta que queda), busque la variable Path y dé clic en Editar. En la ventana que surge, dé clic en Nuevo, y pegue nuevamente la ruta `C:/terraform`.
7. Ahora solo haga clic en Aceptar.

Este paso es fundamental para poder desplegar los recursos que necesita el sistema MGM. 

## Descripción de los recursos definidos con Terraform

Terraform permite maniobrar sobre los proveedores de nube, interactuar con APIs y realizar otras tareas por medio de plugins llamados **providers** o proveedores. 

![Terraform](../trim4/terraform.png)

Tanto los providers como los recursos están definidos en su respectiva carpeta. Los providers necesarios para el despliegue del sistema MGM son:

### Providers
Se definen dos providers: **azurerm** para interactuar con la cuenta de nube de Azure y **atlas** para poder correr el script de creación de base de datos dentro del recurso de base de datos de MySQL.

| Nombre | Versión |
|------|---------|
| [atlas](https://registry.terraform.io/providers/hashicorp/azurerm/latest/docs) | 0.5.8 |
| [azurerm](https://registry.terraform.io/providers/ariga/atlas/latest/docs) | 3.79.0 |

### Recursos

Cada proveedor agrega un conjunto de tipos de recursos y/o fuentes de datos que Terraform puede gestionar. Cada tipo de recurso es implementado por un proveedor; sin proveedores, Terraform no puede gestionar ningún tipo de infraestructura.

Los siguientes son los recursos necesarios para el sistema MGM:

| Nombre | Tipo |
|------|------|
| [atlas_schema.mgm-db-schema](https://registry.terraform.io/providers/ariga/atlas/0.5.8/docs/resources/schema) | esquema de base de datos |
| [azurerm_app_service_connection.mgm-inventary-to-mysql-sc](https://registry.terraform.io/providers/hashicorp/azurerm/latest/docs/resources/app_service_connection) | recurso de conexión para la comunicación entre web app y base de datos |
| [azurerm_linux_web_app.mgm-inventary](https://registry.terraform.io/providers/hashicorp/azurerm/latest/docs/resources/linux_web_app) | recurso web app para servicio de inventario |
| [azurerm_linux_web_app.mgm-users](https://registry.terraform.io/providers/hashicorp/azurerm/latest/docs/resources/linux_web_app) | recurso web app para servicio de usuarios |
| [azurerm_mysql_flexible_database.mgm-db](https://registry.terraform.io/providers/hashicorp/azurerm/latest/docs/resources/mysql_flexible_database) | recurso de base de datos |
| [azurerm_mysql_flexible_server.mgm-db-server](https://registry.terraform.io/providers/hashicorp/azurerm/latest/docs/resources/mysql_flexible_server) | recurso de servidor de base de datos |
| [azurerm_resource_group.mgm-rg](https://registry.terraform.io/providers/hashicorp/azurerm/latest/docs/resources/resource_group) | recurso de grupo de recursos en Azure|
| [azurerm_service_plan.mgm-sp](https://registry.terraform.io/providers/hashicorp/azurerm/latest/docs/resources/service_plan) | recurso de plan de servicio para web apps|
| [atlas_schema.mgm-db-schema](https://registry.terraform.io/providers/ariga/atlas/0.5.8/docs/data-sources/schema) | recurso gestor de esquema de base de datos como código |

### Inputs
Datos necesarios para la creación de algunos recursos.

| Nombre | Descripción | Tipo | Default | Requerido |
|------|-------------|------|---------|:--------:|
| <a name="input_db_password"></a> [db\_password](#input\_db\_password) | Clave de administrador de base de datos | `string` | n/a | yes |
| <a name="input_db_username"></a> [db\_username](#input\_db\_username) | Nombre de usuario administrador de base de datos | `string` | n/a | yes |
| <a name="input_prefix"></a> [prefix](#input\_prefix) | Prefijo del grupo de recursos que es único en la suscripción de Azure | `string` | `"sistema-mgm"` | no |
| <a name="input_resource_group_location"></a> [resource\_group\_location](#input\_resource\_group\_location) | Localización (región) para el grupo de recursos | `string` | `"southcentralus"` | no |

## Procedimiento de despliegue
Una vez cuente con las herramientas de despliegue instaladas en su pc siga los siguientes pasos:

1. Cree una carpeta
2. Dentro de la carpeta, de click derecho y abra Git bash
3. Escriba el comando: `git clone https://github.com/dzarkV/TPS_FDS_2671339_PMGM6.git`
4. Escriba el comando: `cd TPS_FDS_2671339_PMGM6`
5. Escriba el comando: `code .`
6. 

Establecer la cuenta "Azure para estudiantes" como la cuenta por defecto con el siguiente comando `az account set --subscription "Azure para estudiantes"`.