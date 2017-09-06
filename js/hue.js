var ip = '192.168.0.176'
var username = "ArI7wWR-PjQTVU7pQeNmTPd3ReNWT1g6-URn1Wqo"

var testdata = {}
var lights = {}

function syncBridge(name){
	d = '{"devicetype":"'+name+'"}'
	$.ajax({
		url: 'http://'+ip+'/api/', // your api url
		method: 'POST', // method is any HTTP method
		data: d, // data as js object
		success: function(data) { 
			testdata=data
			if( data[0].error == undefined ){
				username = d[0].success.username
				console.log('successfully paired')
				console.log('username:'+username)
			} else {
				console.log(data[0].error.description)
			}			
		}
	});
}

function getLights(){
	$.ajax({
		url: 'http://'+ip+'/api/'+username+'/lights', // your api url
		method: 'GET', // method is any HTTP method
		data: '', // data as js object
		success: function(data) { 
			lights=data
		}
	});
}


function setState(light, state){
	$.ajax({
		url: 'http://'+ip+'/api/'+username+'/lights/'+light+'/state', // your api url
		method: 'PUT', // method is any HTTP method
		data: state, // data as js object
		success: function(data) { 
			testdata=data
		}
	});
}


function rgbToXY(rgb){
    // get normalized rgb values
    red = rgb[0] / 255
	green = rgb[1] / 255
	blue = rgb[2] / 255
    
    // apply gamma correction
    r = (red > 0.04045) ? Math.pow((red + 0.055) / (1.0 + 0.055), 2.4) : (red / 12.92)
    g = (green > 0.04045) ? Math.pow((green + 0.055) / (1.0 + 0.055), 2.4) : (green / 12.92)
    b = (blue > 0.04045) ? Math.pow((blue + 0.055) / (1.0 + 0.055), 2.4) : (blue / 12.92)

    // convert RGB to XYZ
    X = r * 0.664511 + g * 0.154324 + b * 0.162028
    Y = r * 0.283881 + g * 0.668433 + b * 0.047685
    Z = r * 0.000088 + g * 0.072310 + b * 0.986039
    
    // convert XYZ to xy
    x = X / (X + Y + Z)
    y = Y / (X + Y + Z)
	
	return [[x,y],Y]
}

function xyToRGB(xy,bri){
    x = xy[0]
	y = xy[1]
	z = 1-x-y
	
	Y = bri
	X = (Y / y) * x
	Z = (Y / y) * z
	
	// Convert to RGB using Wide RGB
	r =  X * 1.656492 - Y * 0.354851 - Z * 0.255038
	g = -X * 0.707196 + Y * 1.655397 + Z * 0.036152
	b =  X * 0.051713 - Y * 0.121364 + Z * 1.011530

	// apply reverse gamma correction
	r = (r <= 0.0031308) ? (12.92 * r) : (1.0 + 0.055) * Math.pow(r, (1.0 / 2.4)) - 0.055;
	g = (g <= 0.0031308) ? (12.92 * g) : (1.0 + 0.055) * Math.pow(g, (1.0 / 2.4)) - 0.055;
	b = (b <= 0.0031308) ? (12.92 * b) : (1.0 + 0.055) * Math.pow(b, (1.0 / 2.4)) - 0.055;
	
	return [r,g,b]
}