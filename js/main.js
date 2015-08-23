function CreateShader(v_source, f_source, attributes, uniforms)
{
	var shader = gl.createProgram();
	shader.uniforms = {};
	shader.attributes = {};

	var vid = gl.createShader(gl.VERTEX_SHADER);
	gl.shaderSource(vid, v_source);
	gl.compileShader(vid);

	if(!gl.getShaderParameter(vid, gl.COMPILE_STATUS))
	{
		console.error("Error in vertex shader:", gl.getShaderInfoLog(vid));
	}

	var fid = gl.createShader(gl.FRAGMENT_SHADER);
	gl.shaderSource(fid, f_source);
	gl.compileShader(fid);

	if(!gl.getShaderParameter(fid, gl.COMPILE_STATUS))
	{
		console.error("Error in fragment shader:", gl.getShaderInfoLog(fid));
	}

	gl.attachShader(shader, vid);
	gl.attachShader(shader, fid);
	gl.linkProgram(shader);

	if(!gl.getProgramParameter(shader, gl.LINK_STATUS))
	{
		console.error("Error linking program!");
	}

	gl.useProgram(shader);

	for(var n in attributes)
	{
		shader.attributes[attributes[n]] = gl.getAttribLocation(shader, attributes[n]);
		gl.enableVertexAttribArray(shader.attributes[attributes[n]]);
	}

	for(var n in uniforms)
	{
		shader.uniforms[uniforms[n]] = gl.getUniformLocation(shader, uniforms[n])
	}

	return shader;
}

function CreateTexture(image)
{
	var texture = gl.createTexture();
	texture.image = image;
	// texture.width = width;
	// texture.height = height;

	gl.activeTexture(gl.TEXTURE0);
	gl.bindTexture(gl.TEXTURE_2D, texture);

	gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, texture.image);
	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);

	gl.bindTexture(gl.TEXTURE_2D, null);

	return texture
}

function Entity(polygon, color, texture_hint)
{

	this.frame_time = 1/7.0;
	this.current_frame_time = 0.0;
	this.frame_index_list = [];
	this.frame_index = 0;

	this.id = (Entity.id++);
	this.velocity = [0.0, 0.0];
	this.drag = 0.965;
	this.position = [0.0, 0.0];
	this.move_speed = 90;
	this.power_vector = [1.0, 0.0];

	this.scale = [1.0, 1.0];
	this.rotation = [0.0, 0.0, 0.0];

	this.collider = [];
	this.polygon = polygon;
	this.original_polygon = polygon.slice();
	this.triangles = TriangulateConvexPolygon(polygon);
	this.triangle_count = this.triangles.length*3;

	var minmax = this.polygon.reduce(function(p, c) {
		if(p.length == 0)
		{
			p = [c.x, c.y, c.x, c.y];
		}
		else
		{
			p[0] = Math.min(p[0], c[0]);
			p[1] = Math.min(p[1], c[1]);
			p[2] = Math.max(p[2], c[0]);
			p[3] = Math.max(p[3], c[1]);
		}
		return p;
	}, []);	

	var bb = [minmax[0], minmax[1], minmax[2]-minmax[0], minmax[3]-minmax[1]];
	this.bb = bb;
	var color = color || [1.0, 1.0, 1.0, 1.0];
	this.color = color;

	var offset = [this.bb[2]/2, this.bb[3]/2];

	this.texture_id = -1;

	var w = bb[2];
	var h = bb[3];

	if(texture_hint == "tile") {
		w = 50;
		h = 50;
	}


	this.data = this.triangles.reduce(function(p, c){ 
		p.push(c[0].x, c[0].y, (c[0].x + offset.x) / w, (c[0].y - offset.y) / h, color[0], color[1], color[2], color[3]);
		p.push(c[1].x, c[1].y, (c[1].x + offset.x) / w, (c[1].y - offset.y) / h, color[0], color[1], color[2], color[3]);
		p.push(c[2].x, c[2].y, (c[2].x + offset.x) / w, (c[2].y - offset.y) / h, color[0], color[1], color[2], color[3]);
		return p;
	}, []);

	this.gl_buffer = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, this.gl_buffer);
	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.data), gl.STATIC_DRAW);
	gl.bindBuffer(gl.ARRAY_BUFFER, null);

	game.entities.push(this);
}
Entity.id = 0;

function Doodad(polygon, color)
{
	this.id = (Doodad.id++);
	this.polygon = polygon;
	this.original_polygon = polygon.slice();
	this.triangles = TriangulateConvexPolygon(polygon);
	this.triangle_count = this.trangles.length * 3;

	var minmax = this.polygon.reduce(function(p, c) {
		if(p.length == 0)
		{
			p = [c.x, c.y, c.x, c.y];
		}
		else
		{
			p[0] = Math.min(p[0], c[0]);
			p[1] = Math.min(p[1], c[1]);
			p[2] = Math.max(p[2], c[0]);
			p[3] = Math.max(p[3], c[1]);
		}
		return p;
	}, []);

	this.bb = [minmax[0], minmax[1], minmax[2]-minmax[0], minmax[3]-minmax[1]];

	var color = color || [1.0, 1.0, 1.0, 1.0];
	this.color = color;

	var offset = [this.bb[2]/2, this.bb[3]/2];
	this.texture_id = -1;

	this.data = this.triangles.reduce(function(p, c){ 
		p.push(c[0].x, c[0].y, (c[0].x) / this.bb[2], (c[0].y) / this.bb[3], color[0], color[1], color[2], color[3]);
		p.push(c[1].x, c[1].y, (c[1].x) / this.bb[2], (c[1].y) / this.bb[3], color[0], color[1], color[2], color[3]);
		p.push(c[2].x, c[2].y, (c[2].x) / this.bb[2], (c[2].y) / this.bb[3], color[0], color[1], color[2], color[3]);
		return p;
	}, []);

	game.doodads.push(this);
}
Doodad.id = 0;

function CreateDoodadFromEntity(entity)
{
	var d = new Doodad(entity.polygon, entity.color);

}

function TranslateEntity(entity, position)
{
	// if(isNaN(position.x) || isNaN(position.y)){
	// 	debugger;
	// 	throw "IS NAN";
	// }

	for(var i = 0; i < entity.polygon.length; ++i)
		entity.polygon[i] = Vector2.add(entity.original_polygon[i], position);

	entity.bb.x += position;
	entity.bb.y += position;

	entity.position = position;
}


game = {};
gl = {};

function MakeViewFromCamera(camera)
{
	var view = []
	mat4.lookAt(view, camera.eye, camera.center, camera.up);

	return view;
}

function RenderEntity(entity)
{
	var model = mat4.create();
	mat4.translate(model, model, [entity.position.x, entity.position.y, 0.0, 1.0] );

	gl.uniform1i(game.shader.uniforms["u_i_texture_index"], entity.texture_id);
	gl.uniformMatrix4fv(game.shader.uniforms["u_m4_model"], false, model);

	gl.bindBuffer(gl.ARRAY_BUFFER, entity.gl_buffer);
	gl.vertexAttribPointer(game.shader.attributes["a_v2_position"], 2, gl.FLOAT, false, 8*4, 0);
	gl.vertexAttribPointer(game.shader.attributes["a_v2_texture_position"], 2, gl.FLOAT, false, 8*4, 2*4);
	gl.vertexAttribPointer(game.shader.attributes["a_v4_color"], 4, gl.FLOAT, false, 8*4, 4*4);

	gl.drawArrays(gl.TRIANGLES, 0, entity.triangle_count);
	gl.bindBuffer(gl.ARRAY_BUFFER, null);
}


function UpdatePlayer(player){

	if(KEYBOARD.keyIsDown("a"))
	{
		// player.velocity.x -= (player.move_speed) * game.dt;
		player.velocity = Vector2.add(player.velocity, Vector2.scale(player.power_vector, -player.move_speed * game.dt));
	}
	if(KEYBOARD.keyIsDown("d"))
	{
		// player.velocity.x += (player.move_speed) * game.dt;
		player.velocity = Vector2.add(player.velocity, Vector2.scale(player.power_vector, player.move_speed * game.dt));

	}
	// if(KEYBOARD.keyIsDown("s"))
	// {
	// 	player.velocity.y += (player.move_speed + player.extra_power.y) * game.dt;
	// }

	// if(KEYBOARD.keyIsDown("w"))
	// {
	// 	// player.velocity.y -= (player.move_speed * 0.5 * game.dt;	
	// }

	// if(isNaN(player.velocity.x) || isNaN(player.velocity.y)){
	// 	debugger;
	// }

	player.velocity = Vector2.scale(player.velocity, player.drag);
	TranslateEntity(player, Vector2.add(player.position, player.velocity));
	player.velocity = Vector2.add(player.velocity, Vector2.scale(game.gravity, game.dt));

	if(player.velocity.x > 2.0)
	{
		player.frame_index_list = player.right_index_list;
	}
	else if(player.velocity.x < -2.0)
	{
		player.frame_index_list = player.left_index_list;
	}
	else 
	{
		player.frame_index_list = player.front_index_list;
	}

	player.current_frame_time += game.dt;
	if(player.current_frame_time > player.frame_time) {
		player.current_frame_time = player.current_frame_time - player.frame_time;
		player.frame_index = (player.frame_index + 1) % player.frame_index_list.length;
		player.texture_id = player.frame_index_list[player.frame_index];
	}

}

function LoadLevel(idx)
{
	game.entities = [];
	game.entities.push(game.player);
	
	console.log(game.level_index, idx, levels);
	levels[idx](game);

	$("#level_text").text(game.level_text).addClass("start").removeClass("stop");
	setTimeout(function(){
		$("#level_text").addClass("stop").removeClass("start")
	}, 2500);

	setTimeout(function(){
		game.level_end = false;
		game.run();
	}, 100)

	game.level_end = true;
}

function EndLevel()
{
	game.level_index += 1;
	game.level_end = true;
}

game.load = function(evt) {
	game.store = {};

	function b64EncodeUnicode(str) {
	    return btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, function(match, p1) {
	        return String.fromCharCode('0x' + p1);
	    }));
	}

	var to_load = game.load_list.length;

	for(var i = 0; i < game.load_list.length; ++i)
	{
		var t;
		switch(game.load_list[i].type)
		{
			case "image":
				t = "image/png"
				break;
			case "text":
				t = "text";
				break;
		}

		(function(item){
			switch(item.type)
		 	{
		 		case "text":
			 		$.ajax({url: item.url, contentType: t})
					 .done(function(ev){
					 	game.store[item.name] = ev;
					 	to_load -= 1;
					 });

		 			break;

		 		case "image":
		 			game.store[item.name] = new Image();
		 			game.store[item.name].src = item.url;
		 			game.store[item.name].onload = function(ev){ to_load -= 1; }
		 			break;

		 	}

			
		})(game.load_list[i]);
	}

	game.interval = setInterval(function() {
		if(to_load == 0)
		{
			clearInterval(game.interval);
			game.setup();
		}

	}, 300);
}

game.setup = function(evt) {
	KEYBOARD = new KeyboardHandler();

	game.canvas = document.getElementById("canvas");
	gl = game.canvas.getContext("webgl");

	gl.enable(gl.BLEND);
	gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);

	game.previous_time = +new Date();
	game.current_time = +new Date();
	game.dt = game.current_time - game.previous_time; 
	game.run_time = 0.0;

	game.entities = [];

	game.window_size = [1200, 800];

	var uniforms = ["u_m4_projection", "u_m4_view", "u_m4_model", "u_i_texture_index", "u_sampler2D_texture"];
	var attributes = ["a_v2_position", "a_v2_texture_position", "a_v4_color"];

	game.shader = CreateShader(game.store["entity-vertex"], game.store["entity-fragment"], attributes, uniforms);
	game.texture = CreateTexture(game.store["sprite"]);

	gl.activeTexture(gl.TEXTURE0);
	gl.bindTexture(gl.TEXTURE_2D, game.texture);

	game.projection = [];
	mat4.ortho(game.projection,
				game.window_size.x/2, 
				-game.window_size.x/2,
				game.window_size.y/2,
				-game.window_size.y/2,
				0.1, 100.0);

	game.view = []
	mat4.lookAt(game.view, [0, 0, -1], [0, 0, 0], [0, 1, 0]);

	game.camera = {};

	game.camera.eye = [0, 0, -1];
	game.camera.center = [0, 0, 0];
	game.camera.up = [0, 1, 0];

	game.player = new Entity([[-25, 25], [-25, -25], [25, -25], [25, 25]], [1.0, 0.0, 1.0, 1.0]);
	game.player.front_index_list = [0, 1, 2];
	game.player.left_index_list = [64, 65, 66];
	game.player.right_index_list = [128, 129, 130];
	game.player.frame_index_list = game.player.front_index_list;
	game.player.texture_id = game.player.frame_index_list[game.player.frame_index];
	TranslateEntity(game.player, [400, -50])

	game.gravity = [0.0, 55.0];

	game.level_index = 0;

	LoadLevel(game.level_index);

	// game.run();
};

game.update = function(evt) {
	game.previous_time = game.current_time;
	game.current_time = +new Date();
	game.dt = (game.current_time - game.previous_time) / 1000;
	game.run_time += game.dt;

	game.player.power_vector = [1, 0];

	for(var i = 0; i < game.entities.length; ++i)
	{
		if(game.player.id == game.entities[i].id) continue;

		var c = SATCollision(game.player.polygon, game.entities[i].polygon);

		if(c != false)
		{

			var r = Vector2.scale(c[0], c[1]);
			TranslateEntity(game.entities[0], Vector2.add(game.entities[0].position, r));

			game.player.velocity = Vector2.add(game.player.velocity, r);
			game.player.power_vector = Vector2.unit([(-r.y), (r.x)]);
			// game.player.velocity = Vector2.add(game.player.velocity, Vector2.scale(Vector2.unit(game.player.velocity), c[1]));
			// 
			if(game.entities[i].id == "GRASS")
			{
				EndLevel();

			}
		}
	}

	UpdatePlayer(game.player);

	// TranslateEntity(game.player, Vector2.add(game.player.position, player_return_vec));
	
	var player_camera_delta = Vector2.subtract([game.camera.eye.x, game.camera.eye.y], game.player.position);
	player_camera_delta = Vector2.scale(player_camera_delta, 0.1);
	game.camera.eye = [game.camera.eye.x-player_camera_delta.x, game.camera.eye.y-player_camera_delta.y, -1];
	game.camera.center = [game.camera.eye.x, game.camera.eye.y, 0];

	game.view = MakeViewFromCamera(game.camera);
};

game.render = function(evt) { 

	gl.uniformMatrix4fv(game.shader.uniforms["u_m4_projection"], false, game.projection);
	gl.uniformMatrix4fv(game.shader.uniforms["u_m4_view"], false, game.view);
	gl.uniform1i(game.shader.uniforms["u_sampler2D_texture"], 0);

	gl.clearColor(0.0, 0.0, 0.3, 1.0);
	gl.clear(gl.COLOR_BUFFER_BIT);

	for(var ei = 0; ei < game.entities.length; ++ei)
	{
		RenderEntity(game.entities[ei]);
	}
};

game.run = function(evt) {
	game.update();
	game.render();

	if(!game.level_end)
		requestAnimFrame(game.run);
	else
	{
		LoadLevel(game.level_index);
	}
};
