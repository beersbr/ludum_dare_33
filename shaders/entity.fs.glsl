precision mediump float;

uniform sampler2D u_sampler2D_texture;
uniform int u_i_texture_index;

varying vec2 o_v2_texture_position;
varying vec4 o_v4_color;

void main(void)
{
	vec4 color = vec4(1.0);

	if(u_i_texture_index >= 0)
	{
		float x = mod(float(u_i_texture_index), 64.0);
		float y = floor((float(u_i_texture_index) / 64.0));

		float cx = ((x * 32.0) + (fract(o_v2_texture_position.x) * 32.0)) / 2048.0;
		float cy = ((y * 32.0) + (fract(o_v2_texture_position.y) * 32.0)) / 2048.0;

		color = texture2D(u_sampler2D_texture, vec2(cx, cy));
	}
	else
	{
		color = o_v4_color;	
	}

	gl_FragColor = color;
}
