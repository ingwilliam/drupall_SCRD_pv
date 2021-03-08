<?php

/**
 * @file
 * Contains \Drupal\convocatorias\Controller\ApiFechaCierreController.
 */

namespace Drupal\convocatorias\Controller;

use Symfony\Component\HttpFoundation\JsonResponse;

/**
 * Class JsonApiApiFechaCierreController
 * @package Drupal\convocatorias\Controller
 */
class ApiFechaCierreController
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
		$query_date = \Drupal::request()->query->get('fecha');

		$response = null;

		if (function_exists('my_module_reponse')) {
			$response = my_module_reponse('DrupalWS/cierre_convocatoria', 'POST', 'token=' .  substr(file('token.txt')[0], 0, -1) . "&fecha=" . $query_date, 2);
		}

		return json_decode($response['data']);
	}
}
