var levels = [
	// level 0
	function(game){

		game.level_text = "Bugs should stay where they're put. They dont have A/D keys on their keyboards.";

		var some_entity = new Entity([[0, 50], [0, 0], [800, 0], [800, 50]], null, "tile");
		TranslateEntity(some_entity, [0, 50]);
		some_entity.texture_id = 256;

		some_entity = new Entity([[0, 0], [0, 50], [50, 50]], null, "tile");
		TranslateEntity(some_entity, [0, 0]);
		some_entity.texture_id = 256;

		some_entity = new Entity([[0, 0], [50, 0], [50, -50]], null, "tile");
		TranslateEntity(some_entity, [750, 50]);
		some_entity.texture_id = 256;

		some_entity = new Entity([[0, 0], [0, 50], [5000, 50], [5000, 0]], null, "tile");
		TranslateEntity(some_entity, [-2500, 350]);
		some_entity.texture_id = 257;
		some_entity.id = "GRASS";
	},

	// level 1
	function(game){

		game.level_text = "Maybe they should be put in jars.";

		TranslateEntity(game.player, [400, -50]);
		game.player.velocity = [0, 0];
		game.player.power_vector = [0, 0];

		var some_entity = new Entity([[0, 50], [0, 0], [800, 0], [800, 50]], null, "tile");
		TranslateEntity(some_entity, [0, 50]);
		some_entity.texture_id = 256;

		some_entity = new Entity([[0, 0], [0, 500], [50, 500], [50, 0]], null, "tile");
		TranslateEntity(some_entity, [0, -450]);
		some_entity.texture_id = 256;

		some_entity = new Entity([[0, 0], [50, 0], [50, -50]], null, "tile");
		TranslateEntity(some_entity, [650, 0]);
		some_entity.texture_id = 256;

		some_entity = new Entity([[0, 0], [150, 0], [150, -50], [100, -50]], null, "tile");
		TranslateEntity(some_entity, [550, 50]);
		some_entity.texture_id = 256;

		some_entity = new Entity([[0, 0], [50, 0], [50, -300], [0, -100]], null, "tile");
		TranslateEntity(some_entity, [700, 50]);
		some_entity.texture_id = 256;

		some_entity = new Entity([[0, 0], [0, 400], [50, 400], [50, 0]], null, "tile");
		TranslateEntity(some_entity, [750, -350]);
		some_entity.texture_id = 256;

		some_entity = new Entity([[0, 0], [0, 50], [5000, 50], [5000, 0]], null, "tile");
		TranslateEntity(some_entity, [-2500, 350]);
		some_entity.texture_id = 257;
		some_entity.id = "GRASS";
	},

	// level 2
	function(game) {
		game.level_text = "All jars are not created equally equal";

		TranslateEntity(game.player, [400, -50]);
		game.player.velocity = [0, 0];
		game.player.power_vector = [0, 0];

		var some_entity = new Entity([[0, 50], [0, 0], [800, 0], [800, 50]], null, "tile");
		TranslateEntity(some_entity, [0, 50]);
		some_entity.texture_id = 256;

		some_entity = new Entity([[0, 0], [0, 800], [50, 800], [50, 0]], null, "tile");
		TranslateEntity(some_entity, [0, -750]);
		some_entity.texture_id = 256;

		some_entity = new Entity([[0, 0], [0, 250], [50, 250], [50, 100]], null, "tile");
		TranslateEntity(some_entity, [50, -500]);
		some_entity.texture_id = 256;

		some_entity = new Entity([[0, 0], [0, 150], [50, 150], [50, 50]], null, "tile");
		TranslateEntity(some_entity, [100, -400]);
		some_entity.texture_id = 256;

		some_entity = new Entity([[0, 0], [50, 0], [50, -50]], null, "tile");
		TranslateEntity(some_entity, [650, 0]);
		some_entity.texture_id = 256;

		some_entity = new Entity([[0, 0], [0, 100], [100, 100], [100, 50]], null, "tile");
		TranslateEntity(some_entity, [150, -350]);
		some_entity.texture_id = 256;

		some_entity = new Entity([[0, 50], [0, 100], [100, 100], [100, 0]], null, "tile");
		TranslateEntity(some_entity, [300, -350]);
		some_entity.texture_id = 256;

		some_entity = new Entity([[0, 0], [0, 50], [50, 50], [50, 0]], null, "tile");
		TranslateEntity(some_entity, [250, -300]);
		some_entity.texture_id = 256;		

		var some_entity = new Entity([[0, 50], [0, 0], [400, 0], [400, 50]], null, "tile");
		TranslateEntity(some_entity, [0, -250]);
		some_entity.texture_id = 256;

		some_entity = new Entity([[0, 0], [150, 0], [150, -50], [100, -50]], null, "tile");
		TranslateEntity(some_entity, [550, 50]);
		some_entity.texture_id = 256;

		some_entity = new Entity([[0, 0], [50, 0], [50, -300], [0, -100]], null, "tile");
		TranslateEntity(some_entity, [700, 50]);
		some_entity.texture_id = 256;

		some_entity = new Entity([[0, 0], [0, 800], [50, 800], [50, 0]], null, "tile");
		TranslateEntity(some_entity, [750, -750]);
		some_entity.texture_id = 256;

		some_entity = new Entity([[0, 0], [0, 50], [100000, 50], [100000, 0]], null, "tile");
		TranslateEntity(some_entity, [-2500, 350]);
		some_entity.texture_id = 257;
		some_entity.id = "GRASS";

	},

	// level 3
	function(game) {
		game.level_text = "Pesky bugs, how about a box?";

		TranslateEntity(game.player, [400, -50]);
		game.player.velocity = [0, 0];
		game.player.power_vector = [0, 0];

		var some_entity = new Entity([[0, 50], [0, 0], [1500, 0], [1500, 50]], null, "tile");
		TranslateEntity(some_entity, [0, 50]);
		some_entity.texture_id = 256;

		some_entity = new Entity([[0, 50], [0, 0], [2500, 0], [2500, 50]], null, "tile");
		TranslateEntity(some_entity, [-300, 300]);
		some_entity.texture_id = 256;

		some_entity = new Entity([[0, 0], [0, 1000], [50, 1000], [50, 0]], null, "tile");
		TranslateEntity(some_entity, [-300, -700]);
		some_entity.texture_id = 256;

		some_entity = new Entity([[0, 0], [0, 400], [50, 400], [50, 0]], null, "tile");
		TranslateEntity(some_entity, [2150, -50]);
		some_entity.texture_id = 256;

		// ramps
		some_entity = new Entity([[0, 0], [0, 250], [50, 250], [50, 100]], null, "tile");
		TranslateEntity(some_entity, [-250, 50]);
		some_entity.texture_id = 256;

		some_entity = new Entity([[0, 0], [0, 150], [50, 150], [50, 50]], null, "tile");
		TranslateEntity(some_entity, [-200, 150]);
		some_entity.texture_id = 256;

		some_entity = new Entity([[0, 0], [0, 100], [100, 100], [100, 50]], null, "tile");
		TranslateEntity(some_entity, [-150, 200]);
		some_entity.texture_id = 256;

		some_entity = new Entity([[0, 0], [0, 50], [100, 50]], null, "tile");
		TranslateEntity(some_entity, [-50, 250]);
		some_entity.texture_id = 256;

		some_entity = new Entity([[0, 100], [200, 100], [200, 0]], null, "tile");
		TranslateEntity(some_entity, [1300, 0]);
		some_entity.texture_id = 256;

		some_entity = new Entity([[0, 0], [0, 50], [100000, 50], [100000, 0]], null, "tile");
		TranslateEntity(some_entity, [-2500, 350]);
		some_entity.texture_id = 257;
		some_entity.id = "GRASS";
	},

	// level 4
	function(game) {
		game.level_text = "The monster never wins. Thaks for playing.";


		TranslateEntity(game.player, [250, -50]);
		game.player.velocity = [0, 0];
		game.player.power_vector = [0, 0];

		some_entity = new Entity([[0, 0], [0, 800], [50, 800], [50, 0]], null, "tile");
		TranslateEntity(some_entity, [-300, -500]);
		some_entity.texture_id = 256;

		some_entity = new Entity([[0, 0], [0, 800], [50, 800], [50, 0]], null, "tile");
		TranslateEntity(some_entity, [450, -500]);
		some_entity.texture_id = 256;

		some_entity = new Entity([[0, 0], [0, 50], [800, 50], [800, 0]], null, "tile");
		TranslateEntity(some_entity, [-300, 300]);
		some_entity.texture_id = 256;

	}

]