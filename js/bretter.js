requestAnimFrame = (function() {
	return window.requestAnimationFrame ||
		window.webkitRequestAnimationFrame ||
		window.mozRequestAnimationFrame ||
		window.oRequestAnimationFrame ||
		window.msRequestAnimationFrame ||
		function(/* function FrameRequestCallback */ callback, /* DOMElement Element */ element) {
			window.setTimeout(callback, 1000/60);
		};
})();

Object.defineProperty(Array.prototype, "last", {
	get: function(){
		return function(){ return this[this.length-1] };
	},
	enumerable: false
});

Object.defineProperty(Array.prototype, "first", {
	get: function(){
		return function(){ return this[0] };
	},
	enumerable: false
});


/**
 *	FOR VECTORS
 */

Object.defineProperty(Array.prototype, "x", {
	get: function(){
		return this[0];
	},
	set: function(v){
		this[0] = v;
	},
	enumerable: false
});

Object.defineProperty(Array.prototype, "y", {
	get: function(){
		return this[1];
	},
	set: function(v){
		this[1] = v;
	},
	enumerable: false
});

Object.defineProperty(Array.prototype, "z", {
	get: function(){
		return this[2];
	},
	set: function(v){
		this[2] = v;
	},
	enumerable: false
});

Object.defineProperty(Array.prototype, "w", {
	get: function(){
		return this[3];
	},
	set: function(v){
		this[3] = v;
	},
	enumerable: false
});


/**
 *	FOR COLORS
 */

Object.defineProperty(Array.prototype, "r", {
	get: function(){
		return this[0];
	},
	set: function(v){
		this[0] = v;
	},
	enumerable: false
});

Object.defineProperty(Array.prototype, "g", {
	get: function(){
		return this[1];
	},
	set: function(v){
		this[1] = v;
	},
	enumerable: false
});

Object.defineProperty(Array.prototype, "b", {
	get: function(){
		return this[2];
	},
	set: function(v){
		this[2] = v;
	},
	enumerable: false
});

Object.defineProperty(Array.prototype, "a", {
	get: function(){
		return this[3];
	},
	set: function(v){
		this[3] = v;
	},
	enumerable: false
});


/**
 * MATH HELPERS
 */

Math.radians = function(degrees) {
	return degrees * Math.PI / 180.0;
}

Math.degrees = function(radians) {
	return radians * 180.0 / Math.PI;
}


/**
 * VECTOR HELPERS
 */

Vector2 = {};

Vector2.add = function(A, B) {
	return [A.x + B.x, A.y + B.y];
}

Vector2.subtract = function(A, B) {
	return [A.x - B.x, A.y - B.y];
}

Vector2.sub = Vector2.subtract;

Vector2.multiply = function(A, B) {
	return [A.x * B.x, A.y * B.y];
}

Vector2.mult = Vector2.multiply;

Vector2.divide = function(A, B) {
	return [A.x / B.x, A.y / B.y];
}

Vector2.scale = function(A, S) {
	return [A.x * S, A.y * S];
}

Vector2.dot = function(A, B) {
	return (A.x * B.x + A.y * B.y);
}

//NOTE(brett): this is in 2d so only a scalar is returned, basically the z component of the 3d cross
Vector2.cross = function(A, B) {
	return A.x*B.y - A.y*B.x;
}

Vector2.length = function(A) {
	return Math.sqrt(A.x * A.x + A.y * A.y);
}

Vector2.unit = function(A) {
	var l = Vector2.length(A);
	return [A.x/l, A.y/l];
}

Vector2.projection = function(A, B) {
	var a = Vector2.dot(A, B) / (Vector2.length(B) * Vector2.length(B));
	return Vector2.scale(B, a);
}

Vector2.scalar_projection = function(A, B) {
	return Vector2.dot(A, B) / Vector2.length(B);
}

Vector3 = {};

Vector3.add = function(A, B) {
	return [A.x + B.x, A.y + B.y, A.z + B.z];
}

Vector3.subtract = function(A, B) {
	return [A.x - B.x, A.y - B.y, A.z - B.z];
}

Vector3.sub = Vector3.subtract;

Vector3.multiply = function(A, B) {
	return [A.x * B.x, A.y * B.y, A.z * B.z];
}

Vector3.mult = Vector3.multiply;

Vector3.divide = function(A, B) {
	return [A.x / B.x, A.y / B.y, A.z / B.z];
}

Vector3.scale = function(A, S) {
	return [A.x * S, A.y * S, A.z * S];
}

Vector3.dot = function(A, B) {
	return (A.x * B.x + A.y * B.y + A.z * B.z);
}

//NOTE(brett): this is in 2d so only a scalar is returned, basically the z component of the 3d cross
Vector3.cross = function(A, B) {
	return [A.y*B.z - A.z*B.y, A.z*B.x - A.x*B.z, A.x*B.y - A.y*B.x];
}

Vector3.length = function(A) {
	return Math.sqrt(A.x * A.x + A.y * A.y + A.z * A.z);
}

Vector3.unit = function(A) {
	var l = Vector3.length(A);
	return [A.x/l, A.y/l, A.z/l];
}

// Vector3.projection = function(A, B) {
// 	var a = Vector3.dot(A, B) / (Vector3.length(B) * Vector3.length(B));
// 	return Vector3.scale(B, a);
// }

// Vector3.scalar_projection = function(A, B) {
// 	return Vector3.dot(A, B) / Vector3.length(B);
// }

function ProjectPolygonOnAxis2D(polygon, axis)
{

	var projection = [10000000, -1000000];
	for(var i = 0; i < polygon.length; ++i)
	{
		var t = Vector2.dot(polygon[i], axis);
		projection[1] = Math.max(projection[1], t);
		projection[0] = Math.min(projection[0], t);
	}

	return projection;
}

function LinesOverlap(lineA, lineB)
{
	var ha = (lineA.y - lineA.x)/2;
	var hb = (lineB.y - lineB.x)/2;

	var a = lineA.x + ha;
	var b = lineB.x + hb;

	return (ha+hb) - Math.abs(b-a);
}

function PolygonCenter(polygon)
{
	var d = polygon.reduce(function(p, c){
		p.x += c.x;
		p.y += c.y;

		return p;
	}, [0, 0])

	return [d.x/polygon.length, d.y/polygon.length];
}

/**
 * Triangulates a convex polygon. This function assumes a CC winding order.
 * @param {[type]} points polygon points as an array of [[x, y], [x, y], [x, y], ... ]
 */
function TriangulateConvexPolygon(points)
{
	var points = points.slice();
	var triangles = [];

	for(var i = 0; i+2 < points.length; ++i)
	{	
		triangles.push([points[0], points[i+1], points[i+2]])
	}

	return triangles;
}

function SATCollision(polygonA, polygonB)
{
	var collision = [[0, 0], 1000000];
	var done = false;
	// NOTE(Brett): get axis for A
	for(var i = 0; i < polygonA.length; ++i)
	{
		var axis = Vector2.unit(Vector2.subtract(polygonA[(i+1)%polygonA.length], polygonA[i]));
		axis = [axis.y,-axis.x];

		var pa = ProjectPolygonOnAxis2D(polygonA, axis);
		var pb = ProjectPolygonOnAxis2D(polygonB, axis);

		var overlap = LinesOverlap(pa, pb);
		if(overlap > 0)
		{
			if(overlap < collision[1])
				collision = [axis, overlap];
		}
		else
		{
			done = true;
			break;
		}
	}

	if(!done)
	{
		for(var i = 0; i < polygonB.length; ++i)
		{
			var axis = Vector2.unit(Vector2.subtract(polygonB[(i+1)%polygonB.length], polygonB[i]));
			axis = [axis.y, -axis.x];

			var pa = ProjectPolygonOnAxis2D(polygonA, axis);
			var pb = ProjectPolygonOnAxis2D(polygonB, axis);

			var overlap = LinesOverlap(pa, pb);

			if(overlap > 0)
			{
				if(overlap < collision[1])
					collision = [axis, overlap];
			}
			else
			{
				done = true;
				break;
			}
		}
	}
	
	if(done)
		return false;

	var ca = PolygonCenter(polygonA);
	var cb = PolygonCenter(polygonB);
	var r = Vector2.dot(Vector2.subtract(cb, ca), collision[0]);

	if(r > 0) collision[0] = Vector2.scale(collision[0], -1);

	// collision[0] = Vector2.unit(collision[0]);
	return collision;
}
