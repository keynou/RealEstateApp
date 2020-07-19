		$('#States').focusin(function() {var div = $('#States').closest("div"); div.removeClass("has-error");$('#Sta_v').text(''); return true;});
		$('#city').focusin(function() {var div = $('#city').closest("div"); div.removeClass("has-error");$('#c_v').text(''); return true;});
		$('#street').focusin(function() {var div = $('#street').closest("div"); div.removeClass("has-error"); $('#st_v').text(''); return true;});

		window.fbAsyncInit = function() {
			FB.init({
			  appId      : 'XXXXXXXXXXXXXX', // App ID
			  status     : true,    // check login status
			  cookie     : true,    // enable cookies to allow the
									// server to access the session
			  xfbml      : true,     // parse page for xfbml or html5
									// social plugins like login button below
			  version    : 'v2.1',  // Specify an API version
			});
			//Next, find out if the user is logged in
			FB.getLoginStatus(function(response) {
				if (response.status === 'connected') {
					var uid = response.authResponse.userID;
					accessToken = response.authResponse.accessToken;

					FB.api('/me', function(info) {
						console.log(info);
					});


					} else if (response.status === 'not_authorized') {
						//User is logged into Facebook, but not your App
				
					} else {
						if (k==1){
						// User is not logged into Facebook at all
						
						SW=window.open('https://www.facebook.com/index.php','NewWin','toolbar=no,menubar=no,location=no,resizable=no,status=no,width=350,height=135,scrollbars=no')
						// change the name, features and the figures of width and height above to customize the popup window.
						SW.moveTo(190,190);
						k=0;}
					} //response.status
				}); //getLoginStatus
		}
		
		// Additional JS functions here
				
		 /*
			FB.ui({
		  method: 'feed',
		  action_type: 'og.likes',
		  action_properties: JSON.stringify({
			  object:'https://developers.facebook.com/docs/',
		  })
		}, function(response){});
		*/

		function postToFeed(myLink,myPic,myAddress,priceANDchange) {
			k=1;
			FB.ui({
				method: 'feed',
				
				//href: 'http://yahoo.com',
				link: myLink,
				picture: thPic,//myPic,//'http://iviewsource.com/images/viewsourcemonogram-sm.png', //'myPic',
				name: myAddress,
				caption: 'Property information from Zillow.com',
				description: priceANDchange,
				//image: '1.jpg',
				//picture: '2.jpg',
				url: 'http://google.com',
				action_type: 'og.likes',
				action_properties: JSON.stringify({
					object:'https://developers.facebook.com/docs/',
		  })
		  }, function(response) {
				if (response) {
					window.alert("Posted Successfully.");
				} else {
					window.alert("Nothing Posted.");//document.getElementById('mymessage').innerHTML = "The post was not published.";
				} //Response from post attempt
			});
		} // postToFeed
			

		// Load the JavaScript SDK Asynchronously
		(function(d, s, id) {
		  var js, fjs = d.getElementsByTagName(s)[0];
		  if (d.getElementById(id)) return;
		  js = d.createElement(s); js.id = id;
		  js.src = "//connect.facebook.net/en_US/sdk.js#xfbml=1&appId=XXXXXXXXXXXXXXX&version=v2.0"; //language
		  fjs.parentNode.insertBefore(js, fjs);
		}(document, 'script', 'facebook-jssdk'));

		
		function validateText(id) {
				if ($("#"+id).val()==null || $("#"+id).val()==""){
					$('#notmatch').css('display','none');
					$('#mainDiv').css('left','-3000px');
					var div = $("#"+id).closest("div");

					if (id=='street') {
						$('#st_v').text('This field is required').css('color','red'); div.addClass("has-error"); return false;}
						
					if (id=='city') {
						$('#c_v').text('This field is required').css('color','red'); div.addClass("has-error"); return false;}
				
				}else if (id=='States' && $("#"+id).val()=='a'){
					$('#notmatch').css('display','none');
					$('#mainDiv').css('left','-3000px');
					var div = $("#"+id).closest("div");
					$('#notmatch').css('display','none');
					$('#Sta_v').text('This field is required').css('color','red'); div.addClass("has-error"); return false;
						
				}else{
				
					var div = $("#"+id).closest("div");
					div.removeClass("has-error");
					if (id=='street') {
						$('#st_v').text(''); return true;}
						
					if (id=='city') {
						$('#c_v').text(''); return true;}
					
					if (id=='States') {
						$('#Sta_v').text(''); return true;}
				}
			}
			function myPopUpFunction() {
			  var popup = document.getElementById("myPopup");
			  popup.classList.toggle("show");
			}

			var i=0;
			var j=0;
			var k=0;
			var initialValue = 1;
			var mapOptions;
			var map;
			
			function mapShowTab(){
				if (initialValue==1){
					initialValue = 2;
					mapOptions = {
						center:new google.maps.LatLng(lat, lng),
						zoom: 12,
						scaleControl: true,
						//backgroundColor: '#ff0000',
						mapTypeId: google.maps.MapTypeId.ROADMAP,
						//imageDefaultUI: true
					};
					map = new google.maps.Map(document.getElementById("map-canvas"), mapOptions);
					initMap();
				}
			}
			
			function initMap() {	
			
				
				var center = map.getCenter();
				google.maps.event.trigger(map, 'resize');
				var marker = new google.maps.Marker({'position': new google.maps.LatLng(lat, lng),'map': map, 'title': 'Your Property'});
				if (thPic==null || thPic=="")
					thPic = "zillowpic.jpg";
				var contentString= '<div id="content"><table><tr><td rowspan=4>'+'<img src="'+thPic+'" style="width:70px;height:60px;">&nbsp&nbsp</td><td>Last Sold Price:</td><td>'+soldPriceIs+'</td></tr><tr><td>Sq.ft.:</td><td>'+nArea+'</td></tr><tr rowspan=2><td colspan=2 ><a href="'+linkToZillow+'" style="text-decoration:none; color:blue; font-weight: bold;" target="_blank">Link To Property</td></tr></table></div>';
				var infowindow = new google.maps.InfoWindow({ content: contentString});
				google.maps.event.addListener(marker, 'click', function() { 
				infowindow.open(map, marker) } ); 
				
				google.maps.event.addListenerOnce(map, 'idle', function(){
					google.maps.event.trigger(map, 'resize');
					map.setCenter(new google.maps.LatLng(lat, lng));
				});
			}
			
			$(window).resize(function() {
				if (!$('#tabs2').hasClass('active'))
					initialValue=1;
			});
			
			$(document).ready(function(){
				
				//var mapOptions= {center: new google.maps.LatLng(34.020, -118.290),zoom: 12   };
				/*
				var mapOptions= {center: new google.maps.LatLng(34.020, -118.290),zoom: 12   };
				var map = new google.maps.Map(document.getElementById("map-canvas"), mapOptions);
				var marker = new google.maps.Marker({'position': new google.maps.LatLng(34.020, -118.290),'map': map, 'title': 'CS Dept!'})
				var contentString= '<div id="content">'+'<div id="siteNotice">CS Dept</div></div>';
				var infowindow = new google.maps.InfoWindow({ content: contentString});
				google.maps.event.addListener(marker, 'click', function() { 
				infowindow.open(map, marker) } ); */
				
				$('#street').keyup(function(){
					validateText("street");
				});
				
				
				
				if (j==0) {$('#mainDiv').css('left','-3000px'); $('#notmatch').css('display','none');}
				//if (j==2) {if (screen.width<300) $('#mainDiv').css('margin-left','-100px'); else $('#mainDiv').css('margin-left','-400px');}
				
				
				$('#city').keyup(function(){
					validateText("city");
				});
				
				$('#States').click(function(){
					i++;
					if (i>1)
						validateText("States");
				});

				
				
			});
			var lat;
			var lng;
			var thPic;
			var soldPriceIs;
			var nArea;
			var linkToZillow;
			function againFunction(add,cit,state) {
				console.log("hellow");
				document.getElementById("street").value = add;
				document.getElementById("city").value = cit;
				document.getElementById("States").value = state;
				document.getElementById('search').click();
			}
			
			$('#search').click(function(){
					
					
					$('#sectionB').removeClass("fade in active");
					$('#sectionC').removeClass("fade in active");
					$('#sectionD').removeClass("fade in active");
					$('#sectionA').addClass("fade in active");
					
					$('#tabs2').removeClass("active");
					$('#tabs3').removeClass("active");
					$('#tabs4').removeClass("active");
					$('#tabs5').removeClass("active");
					$('#tabs1').addClass("active");
					
					thPic = "";
					
					initialValue = 1;
					validateText("street");
					validateText("city");
					validateText("States");
					
					if ($('#street').val()!='' && $('#city').val()!='' && $('#States').val()!='a'){
						
						var streetAJ = $('#street').val();
						var cityAJ = $('#city').val();
						var stateAJ = $('#States').val();
						
						$.ajax({
						url: 'http://cs-server.usc.edu:1111/realEs.php/',
						data: 'str='+streetAJ+'&cit='+cityAJ+'&sta='+stateAJ,
						dataType: 'jsonp',
						success: function(data){ //The data here is different than the data in above. Data in here is the input from the php file.
							$.ajax({
								url: 'http://cs-server.usc.edu:1111/realEsAdd.php/',
								data: 'str='+streetAJ+'&cit='+cityAJ+'&sta='+stateAJ,
								dataType: 'jsonp',
								success: function(data){
									var jfilee = '['+data+']';
									var parsedd = JSON.parse(jfilee);
									var loop = 0;
									$('#mySqlIPs').html( '<tr><td colspan="5" align="left"><strong>The top last 5 valid queries from this computer (using IP)</strong></td></tr>');
									$('#mySqlIPs').append( '<tr><td align="left" style="color:red;">Time</td><td align="right" style="color:red;">Address</td><td align="right" style="color:red;">City</td><td align="right" style="color:red;">State</td><td width="80px;"></td></tr>');
									for (loop = 0;loop < parsedd[0].count;loop++){
										$('#mySqlIPs').append( '<tr> <td align="left" width="200px;">'+
												parsedd[0].queries[loop].Time + '</td><td align="right" width="140px;">'+
												parsedd[0].queries[loop].Address + ' </td><td align="right" width="120px;">'+
												parsedd[0].queries[loop].City + ' </td><td align="right" width="45px;">'+
												parsedd[0].queries[loop].State + ' </td>'+
												'<td><input type="button" class="col-md-1 control-label" value="Again!" align="left" style="height:28px;width:70px;background-color:gray;color:white;border-radius:4px;border: 1px solid gray;" onclick="againFunction(\''+ parsedd[0].queries[loop].Address + '\',\'' +
												parsedd[0].queries[loop].City + '\',\'' + parsedd[0].queries[loop].State+'\')"/></td></tr>');
									}
								}}).error(function(){
									console.log("failed1");
								});
							j++;
							$('#notmatch').css('display','none');
							var jfile = '['+data+']';
							var parsed = JSON.parse(jfile); //validate the input data and then make use of it.
							
							//$('#jsDeb').html(parsed); debugging purposes
							
							
							//$('#mainDiv').css('display','none');
							//$('#code1').html('<div class="fb-share-button" data-href="http://localhost/" data-type="button" ></div>');
							//$('#jsDeb').html(parsed[0].result.homedetails);
							
							if (parsed[0].result.homedetails!="") {$('#mainDiv').css('left','50%');} else {$('#mainDiv').css('left','-3000px');$('#notmatch').css('display','block');}
							
							if (parsed[0].result.homedetails!=""){
									linkToZillow = parsed[0].result.homedetails;
									lat = parsed[0].result.latitude;
									lng  = parsed[0].result.longitude;
									if (parsed[0].result.thumPic!="")
										thPic  = parsed[0].result.thumPic;
									$('#moreDetails').html('  <p colspan=4 align="left" width="450"> See more details for <a href="' + 
												parsed[0].result.homedetails+'"style="text-decoration:none; color:orange; font-weight: bold;" target="_blank;">'+
												parsed[0].result.street+', '+parsed[0].result.city+', '+parsed[0].result.state+'-'+
												parsed[0].result.zipcode+' </a> on Zillow. <p>');
									$('.carCap').html(parsed[0].result.street+', '+parsed[0].result.city+', '+parsed[0].result.state+'-'+
												parsed[0].result.zipcode);
							} 
							
							if (parsed[0].result.useCode!="")	$("#r1d2").html(parsed[0].result.useCode); else $("#r1d2").html('N/A');
							if (parsed[0].result.lastSoldPrice!=""){
								var soldPrice = parseInt(parsed[0].result.lastSoldPrice);
								soldPrice = '$'+soldPrice.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
								$("#r1d4").html(soldPrice); soldPriceIs = soldPrice;} else { var soldPrice = 'N/A'; $("#r1d4").html(soldPrice); soldPriceIs = soldPrice;}
							if (parsed[0].result.yearBuilt!="")	$("#r2d2").html(parsed[0].result.yearBuilt); else $("#r2d2").html('N/A');
							if (parsed[0].result.lastSoldDate!="")	{
								var date = parsed[0].result.lastSoldDate;
								var day = date.substring(3, 5); 
								var month = parseInt(date.substring(0, 2));  
								var year = date.substring(6, 10);
								var mons= new Array(12);
								mons = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
								$("#r2d4").html(day+'-'+mons[month-1]+'-'+year);} else $("#r2d4").html('N/A');
							if (parseInt(parsed[0].result.lotSizeSqFt)>0 && parsed[0].result.lotSizeSqFt!="")	{
								nArea = parseInt(parsed[0].result.lotSizeSqFt);
								nArea = nArea.toFixed(0).replace(/\d(?=(\d{3})+\.)/g, '$&,');
								$("#r3d2").html(nArea+' sq. ft.');} else $("#r3d2").html('N/A');
							if 	(parsed[0].result.estimateLastUpdate!=""){
								var date = parsed[0].result.estimateLastUpdate;
								var day = date.substring(3, 5); 
								var month = parseInt(date.substring(0, 2)); 
								var year = date.substring(6, 10);
								var mons=new Array(12);
								mons = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
								if ((day==01 && year==1970 && month==1) || (day==31 && year==1969 && month==12))
									$("#r3d3").html('Zestimate <sup> &#0174 </sup> Property Estimate as of N/A:');
								else
									$("#r3d3").html('Zestimate <sup> &#0174 </sup> Property Estimate as of '+day+'-'+mons[month-1]+'-'+year+' :');} else $("#r3d3").html('Zestimate <sup> &#0174 </sup> Property Estimate as of N/A:');
							if (parsed[0].result.estimateAmount>0 && parsed[0].result.estimateAmount!=""){
								var n = parseInt(parsed[0].result.estimateAmount);
								n = n.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
								$("#r3d4").html('$'+n);} else $("#r3d4").html('N/A');
							if (parsed[0].result.finishedSqFt!=""){
								var n = parseInt(parsed[0].result.finishedSqFt);
								n = n.toFixed(0).replace(/\d(?=(\d{3})+\.)/g, '$&,');
								$("#r4d2").html(n+' sq. ft.');} else $("#r4d2").html('N/A');
							if (parsed[0].result.estimateValueChange!="") {
								var absV = Math.abs(parsed[0].result.estimateValueChange); 
								//$('#jsDeb').html('salam'+parsed[0].result.estimateValueChange);
								absV = absV.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
								if (parsed[0].result.valueChange<0){ 
									$("#r4d4").html('<img src="down_r.gif"/>'+'$'+absV);
									$('#fbbut').html('<img src="fbbut.jpg" width="90px" height="35px" onClick="postToFeed(\''+parsed[0].result.homedetails+'\',\''+parsed[0].chart.year1.url+'\',\''+parsed[0].result.street+', '+parsed[0].result.city+', '+parsed[0].result.state+'-'+parsed[0].result.zipcode+'\',\'Last Sold Price: '+soldPrice+', 30 Days Overall Change: -'+'$'+absV+'\')"/>');
									} else{ $("#r4d4").html('<img src="up_g.gif"/>'+'$'+absV);
										$('#fbbut').html('<img src="fbbut.jpg" width="90px" height="35px" onClick="postToFeed(\''+parsed[0].result.homedetails+'\',\''+parsed[0].chart.year1.url+'\',\''+parsed[0].result.street+', '+parsed[0].result.city+', '+parsed[0].result.state+'-'+parsed[0].result.zipcode+'\',\'Last Sold Price: '+soldPrice+', 30 Days Overall Change: '+'$'+absV+'\')"/>');
									}
							} else {$("#r4d4").html('N/A');
										$('#fbbut').html('<img src="fbbut.jpg" width="90px" height="35px" onClick="postToFeed(\''+parsed[0].result.homedetails+'\',\''+parsed[0].chart.year1.url+'\',\''+parsed[0].result.street+', '+parsed[0].result.city+', '+parsed[0].result.state+'-'+parsed[0].result.zipcode+'\',\'Last Sold Price: '+soldPrice+', 30 Days Overall Change: N/A\')"/>');
							}
							if (parsed[0].result.bathrooms!="")	$("#r5d2").html(parsed[0].result.bathrooms); else $("#r5d2").html('N/A');
							if (Math.abs(parsed[0].result.estimateValuationRangeLow)>0 && parsed[0].result.estimateValuationRangeLow != ""){
								var nlow = parseInt(parsed[0].result.estimateValuationRangeLow);
								var nhigh = parseInt(parsed[0].result.estimateValuationRangeHigh);
								nlow = nlow.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
								nhigh = nhigh.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
								$("#r5d4").html('$'+nlow+' - $'+nhigh);} else $("#r5d4").html('N/A');
							if (parsed[0].result.bedrooms!="")	$("#r6d2").html(parsed[0].result.bedrooms); else $("#r6d2").html('N/A');
							if (parsed[0].result.zestimateLastUpdate!=""){	
								var date = parsed[0].result.zestimateLastUpdate;
								var day = date.substring(3, 5); 
								var month = parseInt(date.substring(0, 2)); 
								var year = date.substring(6, 10);
								var mons=new Array(12);
								mons = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
								$("#r6d3").html('Rent Zestimate <sup> &#0174 </sup> Valuation as of '+day+'-'+mons[month-1]+'-'+year+' :');} else $("#r6d3").html('N/A');
							if (parsed[0].result.restimateAmount!="")	{
								var n = parseInt(parsed[0].result.restimateAmount);
								n = n.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
								$("#r6d4").html('$'+n);} else $("#r6d4").html('N/A');
							if (parsed[0].result.taxAssessmentYear!="")	$("#r7d2").html(parsed[0].result.taxAssessmentYear); else $("#r7d2").html('N/A');
							if (parsed[0].result.restimateValueChange!="")	{
								var absV = Math.abs(parsed[0].result.restimateValueChange);
								absV = absV.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
								if (parsed[0].result.restimateValueChange<0) 
									$("#r7d4").html('<img src="down_r.gif"/>'+'$'+absV); 
									else $("#r7d4").html('<img src="up_g.gif"/>'+'$'+absV);} 
							else $("#r7d4").html('N/A');
							if (parsed[0].result.taxAssessment!=""){
								var n = parseInt(parsed[0].result.taxAssessment);
								n = n.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
								$("#r8d2").html('$'+n);} else $("#r8d2").html('N/A');
							if (parsed[0].result.restimateValuationRangeLow!="")	{
								var nlow = parseInt(parsed[0].result.restimateValuationRangeLow);
								var nhigh = parseInt(parsed[0].result.restimateValuationRangeHigh);
								nlow = nlow.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
								nhigh = nhigh.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
								$("#r8d4").html('$'+nlow+' - $'+nhigh);} else $("#r8d4").html('N/A');
							if (parsed[0].chart.year1.url!="") $('#pic1').html('<img src="'+parsed[0].chart.year1.url+'" class="ChartPic" alt="First slide">'); else $('#pic1').html('<img src="" alt="First slide">');
							if (parsed[0].chart.year1.url!="") $('#pic2').html('<img src="'+parsed[0].chart.years5.url+'" class="ChartPic" alt="Second slide">'); else $('#pic1').html('<img src="" alt="First slide">');
							if (parsed[0].chart.year1.url!="") $('#pic3').html('<img src="'+parsed[0].chart.years10.url+'" class="ChartPic" style="margin-bottom:20px;" alt="Third slide">'); else $('#pic1').html('<img src="" alt="First slide">');
						}
						}).error(function(){
							$('#mainDiv').css('left','-3000px');
							$('#notmatch').css('display','block');
							
						});
					}
					return false;
			});
