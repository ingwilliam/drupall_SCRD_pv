<?php

/**
 * @file
 * Contains \Drupal\convocatorias\Controller\ApiAlfrescoController.
 */

namespace Drupal\convocatorias\Controller;

use Symfony\Component\HttpFoundation\JsonResponse;

/**
 * Class JsonApiApiAlfrescoController
 * @package Drupal\convocatorias\Controller
 */
class ApiAlfrescoController
{

	/**
	 * @return JsonResponse
	 */
	public function index()
	{
		return new JsonResponse(['data' => substr(file('token.txt')[0], 0, -1), 'method' => 'GET', 'status' => 200]);
	}
}
