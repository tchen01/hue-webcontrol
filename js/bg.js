var sliders = document.getElementsByClassName('slider')

for(var i=0; i < sliders.length ; i++){
	sliders[i].addEventListener("input", setButtonColor)
//	sliders[i].addEventListener("click", function(e){console.log('stop prop'); e.stopPropagation()})
}

data={}
// sets the colors of the lights in a button
function setButtonColor(e){
	data=e
	var parent = e.srcElement.parentElement
	var sliders = parent.getElementsByClassName('slider')
	var color=sliders[0].value+','+sliders[1].value+','+sliders[2].value
	
	parent.style.backgroundColor='rgb('+color+')'
}


var buttons = document.getElementsByClassName('send_state')

for(var i=0; i < buttons.length ; i++){
	buttons[i].addEventListener("click", sendLights)
}

// on event handler turns on the lights for a given duration
function sendLights(e){
	var controls = e.srcElement.parentElement.getElementsByClassName('rgb_control')
	data = e
	var r, g, b
	console.log('state sent')
	for(i=0 ; i<controls.length ; i++){
		sliders = controls[i].getElementsByClassName('slider')
		r= parseInt(sliders[0].value)
		g= parseInt(sliders[1].value)
		b= parseInt(sliders[2].value)
	
		var x, y, bri
		[[x,y],bri] = rgbToXY([r,g,b])
		
		state = '{"xy":['+x+','+y+'], "bri":'+parseInt(255*bri)+'}'
		setState(i+1,state)
	}
}