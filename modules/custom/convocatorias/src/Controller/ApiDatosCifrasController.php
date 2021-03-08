<?php

/**
 * @file
 * Contains \Drupal\convocatorias\Controller\ApiDatosCifrasController.
 */

namespace Drupal\convocatorias\Controller;

use Symfony\Component\HttpFoundation\JsonResponse;

/**
 * Class JsonApiApiDatosCifrasController
 * @package Drupal\convocatorias\Controller
 */
class ApiDatosCifrasController
{

	/**
	 * @return JsonResponse
	 */
	public function index()
	{
		$result = $this->getData();
		$code = 200;

		if ($result->error == 0) {
			$code = 200;
		} else {
			$code = 500;
		}

		return new JsonResponse(['data' => $result, 'method' => 'GET', 'status' => $code]);
	}

	/**
	 * @return array
	 */
	public function getData()
	{
		$query_anio = \Drupal::request()->query->get('anio');
		$query_tipo_programa = \Drupal::request()->query->get('tipo_programa');
		$query_entidad = \Drupal::request()->query->get('entidad');
		$query_tipo_grafica = \Drupal::request()->query->get('tipo_grafica');

		$response = null;

		$param_tipo_grafica = "";

		$param_entidad = "";

		for ($i = 0; $i < count($query_tipo_grafica); $i++) {
			$param_tipo_grafica = $param_tipo_grafica . "&tipo_grafica[]=" . $query_tipo_grafica[$i];
		}

		if (count($query_entidad) === 0) {
			$param_entidad = "&entidad[]=2&entidad[]=4&entidad[]=5&entidad[]=6&entidad[]=7";
		} else {
			$param_entidad = "&entidad[]=" . $query_entidad[0];
		}

		$urlStr = "&anio=" . $query_anio . "&tipo_programa=" . $query_tipo_programa . $param_entidad . $param_tipo_grafica;

		if (function_exists('my_module_reponse')) {
			$response = my_module_reponse('DrupalWS/datos_cifras', 'POST', 'token=' .  substr(file('token.txt')[0], 0, -1) . "&anio=" . $query_anio . "&tipo_programa=" . $query_tipo_programa . $param_entidad . $param_tipo_grafica, 2);
		}

		// return $urlStr;


		return json_decode($response['data']);
	}
}
