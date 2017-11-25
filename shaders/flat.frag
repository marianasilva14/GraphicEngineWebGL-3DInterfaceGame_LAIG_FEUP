#ifdef GL_ES
precision highp float;
#endif

uniform float normScale;
varying vec4 vFinalColor;

varying vec2 vTextureCoord;

uniform sampler2D uSampler;

uniform bool uUseTexture;

void main() {
	// Branching should be reduced to a minimal.
	// When based on a non-changing uniform, it is usually optimized.
	if (uUseTexture)
	{
		vec4 textureColor = texture2D(uSampler, vTextureCoord);
		gl_FragColor = textureColor * vFinalColor+normScale*vec4(0.82,0.70,0.70,1.0);
	}
	else
		gl_FragColor = vFinalColor+normScale*vec4(0.82,0.70,0.70,1.0);

}
