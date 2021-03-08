<?php

/**
 * @file
 * Contains \Drupal\convocatorias\Controller\ConvocatoriasController.
 */

namespace Drupal\convocatorias\Controller;

use Drupal\Core\Controller\ControllerBase;

/**
 * Controller routines for calls routes.
 */

class ConvocatoriasPDACController extends ControllerBase
{
	public function getPDACCalls()
	{

		// $param_value = \Drupal::routeMatch()->getRawParameter('sort');
		$query_anio_value = \Drupal::request()->query->get('anio');
		$query_pagina_value = \Drupal::request()->query->get('pagina');
		$query_orden_fecha_value = \Drupal::request()->query->get('orden_fecha');
		$query_display = \Drupal::request()->query->get('display');

		$all_params = [
			"anio" => $query_anio_value,
			"offset" => $query_pagina_value,
			"orden_fecha" => $query_orden_fecha_value,
			"display" => $query_display
		];

		$number_items_page = 8;

		$data = array();
		$response = $data = $result = null;

		if (function_exists('authenticateSICON')) {
			authenticateSICON();
		}

		if (function_exists('my_module_reponse')) {
			$response = my_module_reponse(
				'DrupalWS/convocatorias_publicadas',
				'POST',
				'token=' .  substr(file('token.txt')[0], 0, -1) .
					($query_anio_value ? "&anio=" . $query_anio_value : "") .
					($query_orden_fecha_value ? "&orden_fecha=" . $query_orden_fecha_value : "") .
					($query_pagina_value ? "&offset=" . (($query_pagina_value - 1) * 8) : "&offset=0") .
					"&limit=" . $number_items_page .
					"&tipo_programa=2",
				2
			);
		}

		$result = json_decode($response['data']);

		if ($result) {
			return [
				'#theme' => 'calls_list_pdac', // assign the theme [calls-list-pdac.html.twig]
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
