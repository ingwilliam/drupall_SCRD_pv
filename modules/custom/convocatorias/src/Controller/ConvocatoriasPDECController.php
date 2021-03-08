<?php

/**
 * @file
 * Contains \Drupal\convocatorias\Controller\ConvocatoriasController.
 */

namespace Drupal\convocatorias\Controller;

use Drupal\Core\Controller\ControllerBase;
use stdClass;

/**
 * Controller routines for calls routes.
 */

class ConvocatoriasPDECController extends ControllerBase
{

	private function itemsArrayToString($itemsArray, $queryName)
	{
		$text = "";
		foreach ($itemsArray as $key => $value) {
			$text = $text . "&" . $queryName . "[]" . "=" . $value;
		}
		return $text;
	}

	public function getPDECCalls()
	{

		// $param_value = \Drupal::routeMatch()->getRawParameter('sort');
		$query_nombre_value = \Drupal::request()->query->get('nombre');
		$query_anio_value = \Drupal::request()->query->get('anio') ? \Drupal::request()->query->get('anio') : date("Y");
		$query_tipo_programa_value = \Drupal::request()->query->get('tipo_programa');
		$query_entidad_value = \Drupal::request()->query->get('entidad');
		$query_perfil_value = \Drupal::request()->query->get('perfil');
		$query_area_value = \Drupal::request()->query->get('area');
		$query_linea_estrategica_value = \Drupal::request()->query->get('linea_estrategica');
		$query_enfoque_value = \Drupal::request()->query->get('enfoque');
		$query_estado_value = \Drupal::request()->query->get('estado');
		$query_modalidad_value = \Drupal::request()->query->get('modalidad');
		$query_pagina_value = \Drupal::request()->query->get('pagina');
		$query_orden_fecha_value = \Drupal::request()->query->get('orden_fecha');
		$query_display = \Drupal::request()->query->get('display');

		$all_params = [
			"nombre" => $query_nombre_value,
			"anio" => $query_anio_value,
			"tipo_programa" => $query_tipo_programa_value,
			"entidad" => $query_entidad_value,
			"area" => $query_area_value,
			"perfil" => $query_perfil_value,
			"linea_estrategica" => $query_linea_estrategica_value,
			"enfoque" => $query_enfoque_value,
			"estado" => $query_estado_value,
			"modalidad" => $query_modalidad_value,
			"pagina" => $query_pagina_value,
			"orden_fecha" => $query_orden_fecha_value,
			"display" => $query_display
		];

		$number_items_page = 8;

		$data = array();
		$response = $data = $result = null;

		if (function_exists('authenticateSICON')) {
			authenticateSICON();
		}

		// debug(file('token.txt'));

		if (function_exists('my_module_reponse')) {
			$response = my_module_reponse(
				'DrupalWS/convocatorias_publicadas',
				'POST',
				'token=' .  substr(file('token.txt')[0], 0, -1) .
					($query_nombre_value ? "&nombre=" . $query_nombre_value : "") .
					($query_anio_value ? "&anio=" . $query_anio_value : "") .
					($query_entidad_value ? $this->itemsArrayToString($query_entidad_value, "entidad") : "") .
					($query_area_value ? "&area=" . $query_area_value : "") .
					($query_perfil_value ? $this->itemsArrayToString($query_perfil_value, "perfil") : "") .
					($query_linea_estrategica_value ? "&linea_estrategica=" . $query_linea_estrategica_value : "") .
					($query_enfoque_value ? "&enfoque=" . $query_enfoque_value : "") .
					($query_estado_value ? $this->itemsArrayToString($query_estado_value, "estado") : "") .
					($query_modalidad_value ? "&modalidad=" . $query_modalidad_value : "") .
					($query_orden_fecha_value ? "&orden_fecha=" . $query_orden_fecha_value : "") .
					($query_pagina_value ? "&offset=" . (($query_pagina_value - 1) * 8) : "&offset=0") .
					"&limit=8" .
					"&tipo_programa=1",
				2
			);
		}

		$result = json_decode($response['data']);

		if ($result) {
			return [
				'#theme' => 'calls_list_pdec', // assign the theme [calls-list-pdec.html.twig]
				'#data' => $result,
				'#queryParams' => $all_params,
				'#number_items_page' => $number_items_page
			];
		}

		return [
			'#theme' => 'calls_list_error', // assign the theme [calls-list-error.html.twig]
			'#data' => ['title' => 'Buscar convocatoria', 'calls' => []]
		];
	}
}
