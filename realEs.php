<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST');

 if(isset($_GET['str']) && isset($_GET['cit']) && isset($_GET['sta'])){  //php code can be used almost everywhere in you file if it is "*.php" file
				$street = $_GET['str'];
				$city = $_GET['cit'];
				$state = $_GET['sta'];
				
				$vowel = array(" ",",");
				$dot = array(".");
				//Note: Comments in the php section are starting with two slashes! It won't work for html parts. In html use the comment signs as it is coded in this file.
				
				$street = str_replace($vowel,"+",$street);  //str_replace is a strong function that already exists in php you don't need to deal with it. Just learn how to use it. "Learn==Google"
				$city = str_replace($vowel,"+",$city);   
				
				// So just concatenate the strings to create the website that has to be searched.  In this link "zws-id=X1-ZWz1dy0afb2mff_8tgid" is hard coded because it was my id that I got from Zillow.
				$address = 'http://www.zillow.com/webservice/GetDeepSearchResults.htm?zws-id=X1-ZWz1dy0afb2mff_8tgid&address='.$street.'&citystatezip='.$city.'%2C+'.$state.'&rentzestimate=true';  
				//$chart1 = 'http://www.zillow.com/webservice/GetChart.htm?zws-id=X1-ZWz1dy0afb2mff_8tgid&unit-type=percent&zpid='..'&width=300&height=150';
				$xml = simplexml_load_file($address);}
				//$jason = json_encode($xml);
				$jason = json_encode($xml); //in this HW we were told not to use json functions becuase he returned jason is nasty
				
				/* 
				echo "here is by function:"."\r\n";
				echo $jason."\r\n"; */
				
				$homedetails = ""; $rentLow = ""; $rentHigh = ""; $taxAssessment = ""; $rentChange = ""; $taxAssessmentYear = "";  $rentAmount = ""; $rentUpdated = ""; $bedrooms = ""; $priceLow = ""; $bathrooms = ""; $finishedSqFt = ""; $lotSizeSqFt = ""; $lastSoldPrice = "";
				$useCode = ""; $valueChange = "";  $priceAmount = ""; $priceLastUpdated = ""; $longitude = "";$latitude = "";$zipcode = "";$state = "";$city = "";  $street = ""; $zipcode = ""; $signValueChange = "";
				$ch1ur1 = ""; $ch1ur5 = ""; $ch1ur10 = ""; $chid = ""; $lastSoldDate = "";$yearBuilt = "";$priceHigh = ""; 
				$rSValueChange = ""; $thumbnailPic = "";
				
				if (!empty($xml->response) && !empty($xml->response->results) && !empty($xml->response->results->result)) {
					$chid = $xml->response->results->result->zpid;
					$ch1url = 'http://www.zillow.com/app?chartDuration=1year&chartType=partner&height=300&page=webservice%2FGetChart&service=chart&showPercent=true&width=600&zpid='.$chid;
					$ch1ur5 = 'http://www.zillow.com/app?chartDuration=5years&chartType=partner&height=300&page=webservice%2FGetChart&service=chart&showPercent=true&width=600&zpid='.$chid;
					$ch1ur10 = 'http://www.zillow.com/app?chartDuration=10years&chartType=partner&height=300&page=webservice%2FGetChart&service=chart&showPercent=true&width=600&zpid='.$chid;
								//'http://www.zillow.com/app?chartDuration=10years&chartType=partner&height=300&page=webservice%2FGetChart&service=chart&showPercent=true&width=600&zpid=2108691793'
					           //'http://www.zillow.com/app?chartDuration=1year&chartType=partner&height=300&page=webservice%2FGetChart&service=chart&showPercent=true&width=600&zpid=2108691793"
				}
				
				if ($chid!=""){
					$thumbnailPicAddress = 'http://www.zillow.com/webservice/GetUpdatedPropertyDetails.htm?zws-id=X1-ZWz1dy0afb2mff_8tgid&zpid='.$chid;
					$xml2 = simplexml_load_file($thumbnailPicAddress);
					if (!empty($xml2->response) && !empty($xml2->response->images) && !empty($xml2->response->images->image[0]) && !empty($xml2->response->images->image[0]->url)) 
						$thumbnailPic = $xml2->response->images->image[0]->url;
				}
				
				
				if (!empty($xml->response) && !empty($xml->response->results) && !empty($xml->response->results->result[0])) {
						
						if (!empty($xml->response->results->result[0]->links) && !empty($xml->response->results->result[0]->links->homedetails)) $homedetails = $xml->response->results->result[0]->links->homedetails; else $homedetails = "";
						if (!empty($xml->response->results->result[0]->address)) {
							if (!empty($xml->response->results->result[0]->address->street)) $street = $xml->response->results->result[0]->address->street; else $street = "";
							if (!empty($xml->response->results->result[0]->address->city))  $city = $xml->response->results->result[0]->address->city; else $city = ""; 
							if (!empty($xml->response->results->result[0]->address->state))  $state = $xml->response->results->result[0]->address->state; else $state = "";
							if (!empty($xml->response->results->result[0]->address->zipcode))  $zipcode = $xml->response->results->result[0]->address->zipcode; else $zipcode = "";
							if (!empty($xml->response->results->result[0]->address->latitude))  $latitude = $xml->response->results->result[0]->address->latitude; else $latitude = "";
							if (!empty($xml->response->results->result[0]->address->longitude))  $longitude = $xml->response->results->result[0]->address->longitude; else $longitude = "";}
						if (!empty($xml->response->results->result[0]->zestimate)) {	
							if (!empty($xml->response->results->result[0]->zestimate->{'last-updated'} ))  $priceLastUpdated = $xml->response->results->result[0]->zestimate->{'last-updated'}; else $priceLastUpdated = "";
							if (!empty($xml->response->results->result[0]->zestimate->amount ))  $priceAmount = $xml->response->results->result[0]->zestimate->amount; else $priceAmount = "";
							if (!empty($xml->response->results->result[0]->zestimate->valueChange ))  $valueChange = $xml->response->results->result[0]->zestimate->valueChange; else $valueChange = "";
							if ($valueChange>0) $rsValueChange = '+'; else if ($valueChange>0) $rsValueChange = '-'; else $rsValueChange = "";}
							
						if (!empty($xml->response->results->result[0]->useCode))  $useCode = $xml->response->results->result[0]->useCode; else $useCode = "";
						if (!empty($xml->response->results->result[0]->lastSoldPrice ))  $lastSoldPrice = $xml->response->results->result[0]->lastSoldPrice; else $lastSoldPrice = "";
						if (!empty($xml->response->results->result[0]->lastSoldDate ))  $lastSoldDate = $xml->response->results->result[0]->lastSoldDate; else $lastSoldDate = "";
						if (!empty($xml->response->results->result[0]->yearBuilt ))  $yearBuilt = $xml->response->results->result[0]->yearBuilt; else $yearBuilt = "";
						if (!empty($xml->response->results->result[0]->lotSizeSqFt ))  $lotSizeSqFt = $xml->response->results->result[0]->lotSizeSqFt; else $lotSizeSqFt = "";
						if (!empty($xml->response->results->result[0]->finishedSqFt ))  $finishedSqFt = $xml->response->results->result[0]->finishedSqFt; else $finishedSqFt = "";
						if (!empty($xml->response->results->result[0]->bathrooms ))  $bathrooms = $xml->response->results->result[0]->bathrooms; else $bathrooms = "";
						if (!empty($xml->response->results->result[0]->zestimate->valuationRange->low ))  $priceLow = $xml->response->results->result[0]->zestimate->valuationRange->low; else $priceLow = "";
						if (!empty($xml->response->results->result[0]->zestimate->valuationRange->high ))  $priceHigh = $xml->response->results->result[0]->zestimate->valuationRange->high; else $priceHigh = "";
						if (!empty($xml->response->results->result[0]->bedrooms ))  $bedrooms = $xml->response->results->result[0]->bedrooms; else $bedrooms = "";
						if (!empty($xml->response->results->result[0]->rentzestimate->{'last-updated'} ))  $rentUpdated = $xml->response->results->result[0]->rentzestimate->{'last-updated'}; else $rentUpdated = "";
						if (!empty($xml->response->results->result[0]->rentzestimate->amount ))  $rentAmount = $xml->response->results->result[0]->rentzestimate->amount; else $rentAmount = "";
						if (!empty($xml->response->results->result[0]->taxAssessmentYear))  $taxAssessmentYear = $xml->response->results->result[0]->taxAssessmentYear; else $taxAssessmentYear = "";
						if (!empty($xml->response->results->result[0]->rentzestimate->valueChange))  $rentChange = $xml->response->results->result[0]->rentzestimate->valueChange; else $rentChange = "";
						if ($rentChange>0) $rSignValueChange = '+'; else if ($rentChange<0) $rsignValueChange = '-'; else $rsignValueChange = "";
						if (!empty($xml->response->results->result[0]->taxAssessment ))  $taxAssessment = $xml->response->results->result[0]->taxAssessment; else $taxAssessment = "";
						
						if (!empty($xml->response->results->result[0]->rentzestimate) && !empty($xml->response->results->result[0]->rentzestimate->valuationRange->low)){
							$rentLow = $xml->response->results->result[0]->rentzestimate->valuationRange->low;
							$rentHigh = $xml->response->results->result[0]->rentzestimate->valuationRange->high;} else {$rentLow = ""; $rentHigh = "";}
				}
				
					
				$phpJsn = '{"result":{"homedetails":"'.$homedetails.'","street":"'.$street.'","city":"'.$city.'","state":"'.$state.'","zipcode":"'.$zipcode.'","latitude":"'.$latitude.'","longitude":"'.$longitude.'","thumPic":"'.$thumbnailPic.'","useCode":"'.$useCode.'","lastSoldPrice":"'.$lastSoldPrice.'","yearBuilt":"'.$yearBuilt.'","lastSoldDate":"'.$lastSoldDate.'","lotSizeSqFt":"'.$lotSizeSqFt.'","estimateLastUpdate":"'.$priceLastUpdated.'","estimateAmount":"'.$priceAmount.'","finishedSqFt":"'.$finishedSqFt.'","estimateValueChangeSign":"'.$rsValueChange.
				'","imgn":"http:\/\/www-scf.usc.edu\/~csci571\/2014Spring\/hw6\/down_r.gif","imgp":"http:\/\/www-scf.usc.edu\/~csci571\/2014Spring\/hw6\/up_g.gif","estimateValueChange":"'.$valueChange.'","bathrooms":"'.$bathrooms.'","estimateValuationRangeLow":"'.$priceLow.'","estimateValuationRangeHigh":"'.$priceHigh.'","bedrooms":"'.$bedrooms.'","zestimateLastUpdate":"'.$rentUpdated.'","restimateAmount":"'.$rentAmount.'","taxAssessmentYear":"'.$taxAssessmentYear.'","restimateValueChangeSign":"'.$rSValueChange.'","restimateValueChange":"'.$rentChange.'","taxAssessment":"'.$taxAssessment.'","restimateValuationRangeLow":"'.$rentLow.'","restimateValuationRangeHigh":"'.$rentHigh.'"},"chart":{"year1":{"url":"'.$ch1url.'"},"years5":{"url":"'.$ch1ur5.'"},"years10":{"url":"'.$ch1ur10.'"}}}';
			
				
				echo $_GET['callback']."(".json_encode($phpJsn).");";
				//echo json_encode($phpJsn);
				
				
/*
				
				$phpJsn = '{"result":{"homedetails":"'.$homedetails.'","street":"'.$street.'","city":"'.$city.'","state":"'.$state.'","zipcode":"'.$zipcode.'","latitude":"'.$latitude.'","longitude":"'.$longitude.'","useCode":"'.$useCode.'","lastSoldPrice":"'.$lastSoldPrice.'","yearBuilt":"'.$yearBuilt.'","lastSoldDate":"'.$lastSoldDate.'","lotSizeSqFt":"'.$lotSizeSqFt.'","estimateLastUpdate":"'.$priceLastUpdated.'","estimateAmount":"'.$priceAmount.'","finishedSqFt":"'.$finishedSqFt.'","estimateValueChangeSign":"'.$rsValueChange.
				'","imgn":"http://www-scf.usc.edu/~csci571/2014Spring/hw6/down_r.gif","imgp":"http://www-scf.usc.edu/~csci571/2014Spring/hw6/up_g.gif","estimateValueChange":"'.$valueChange.'","bathrooms":"'.$bathrooms.'","estimateValuationRangeLow":"'.$priceLow.'","estimateValuationRangeHigh":"'.$priceHigh.'","bedrooms":"'.$bedrooms.'","zestimateLastUpdate":"'.$rentUpdated.'","restimateAmount":"'.$rentAmount.'","taxAssessmentYear":"'.$taxAssessmentYear.'","restimateValueChangeSign":"'.$rSValueChange.'","restimateValueChange":"'.$rentChange.'","taxAssessment":"'.$taxAssessment.'","restimateValuationRangeLow":"'.$rentLow.'","restimateValuationRangeHigh":"'.$rentHigh.'"},"chart":{"year1":{"url":"'.$ch1url.'"},"years5":{"url":"'.$ch1ur5.'"},"years10":{"url":"'.$ch1ur10.'"}}}';
			
				
				$return = json_encode($phpJsn);
				echo json_decode($return);
				
*/
?>