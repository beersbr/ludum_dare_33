precision mediump float;

attribute vec2 a_v2_position;
attribute vec2 a_v2_texture_position;
attribute vec4 a_v4_color;

uniform mat4 u_m4_projection;
uniform mat4 u_m4_view;
uniform mat4 u_m4_model;

varying vec2 o_v2_texture_position;
varying vec4 o_v4_color;

void main(void)
{
	o_v2_texture_position = a_v2_texture_position;
	o_v4_color = a_v4_color;
	
	gl_Position = u_m4_projection * u_m4_view * u_m4_model * vec4(a_v2_position, 0.0, 1.0);
}