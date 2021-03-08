<?php

namespace Drupal\convocatorias\Plugin\Block;

use Drupal\Core\Block\BlockBase;

/**
 * Provides a block 
 * 
 * @Block(
 *   id = "convocatorias_recientes",
 *   admin_label = "Bloque de convocatorias recientes"
 * )
 */

class ConvocatoriasRecientes extends BlockBase
{

	private function getRecentCalls()
	{

		$data = array();
		$response = $data = $result = null;

		if (function_exists('authenticateSICON')) {
			authenticateSICON();
		}

		if (function_exists('my_module_reponse')) {
			$response = my_module_reponse('DrupalWS/convocatorias_publicadas_preview', 'POST', 'token=' .  substr(file('token.txt')[0], 0, -1) . "&cantidad=3", 2);
		}

		if ($response) {
			$result = json_decode($response['data']);
			return $result;
		}

		return [];
	}

	/**
	 * (@inheritdoc)
	 */
	public function Build()
	{

		$result =	$this->getRecentCalls();

		return [
			'#theme' => 'recent_call_block',
			'#title' => "Convocatorias",
			'#data' => $result,
		];
	}
}
