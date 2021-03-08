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

class ConvocatoriaPorIdController extends ControllerBase
{
	public function getCallById()
	{

		$param_id = \Drupal::routeMatch()->getRawParameter('id_call');

		$data = array();
		$response = $data = $result = null;

		if (function_exists('authenticateSICON')) {
			authenticateSICON();
		}

		if (function_exists('my_module_reponse')) {
			$response = my_module_reponse('DrupalWS/convocatoria/' . $param_id, 'POST', 'token=' .  substr(file('token.txt')[0], 0, -1), 2);
		}

		$result = json_decode($response['data']);

		if ($result) {
			$data = new stdClass();
			$data->error = 0;
			$data->respuesta = new stdClass();

			foreach ($result->respuesta as $key => $value) {
				if (
					$key == "documentos_administrativos" ||
					$key == "documentos_tecnicos" ||
					$key == "criterios_evaluacion" ||
					$key == "listados" ||
					$key == "avisos_modificatorios" ||
					$key == "distribucion_estimulos" ||
					$key == "tipo_de_participante" ||
					$key == "cronograma" ||
					$key == "informacion_categorias"
				) {
					$data->respuesta->$key = json_decode(json_encode($value), true);
				} else {
					$data->respuesta->$key = $value;
				}
			}

			return [
				'#theme' => 'call_detail', // assign the theme [calls-detail.html.twig]
				'#data' => $data,
				'#call_id' => $param_id
			];
		}

		return [
			'#theme' => 'call_list_error', // assign the theme [calls-list-error.html.twig]
			'#data' => ['title' => 'Buscar convocatoria', 'calls' => []]
		];
	}
}
