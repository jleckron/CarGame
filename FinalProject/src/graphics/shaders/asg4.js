// Vertex Shader
var ASG4_VSHADER =
  `precision mediump float;
  attribute vec4 a_Position;
  varying vec3 v_Position;
  attribute vec4 a_Color;
  varying vec4 v_Color;
  attribute vec4 a_Normal;
  varying vec3 v_Normal;
  attribute vec2 a_TexCoord;
  varying vec2 v_TexCoord;

  varying float v_Dist;

  uniform mat4 u_ProjectionMatrix;
  uniform mat4 u_ViewMatrix;
  uniform mat4 u_ModelMatrix;
  uniform mat4 u_NormalMatrix;

  void main() {
    v_Color = a_Color;
    v_TexCoord = a_TexCoord;
    v_Position = vec3(u_ModelMatrix * a_Position);
    v_Normal = normalize(vec3(u_NormalMatrix * a_Normal));
    gl_Position = u_ProjectionMatrix * u_ViewMatrix * u_ModelMatrix * a_Position;
    v_Dist = gl_Position.w;
  }`;

// Fragment Shader
var ASG4_FSHADER =
  `precision mediump float;
  varying vec3 v_Position;
  varying vec4 v_Color;
  varying vec3 v_Normal;
  varying vec2 v_TexCoord;

  uniform sampler2D u_Sampler;
  uniform vec3 u_DiffuseColor;
  uniform vec3 u_AmbientColor;
  uniform vec3 u_LightPosition;
  uniform vec3 u_SpecularColor;
  uniform vec3 u_CameraPosition;

  uniform vec3 u_FogColor;
  uniform vec2 u_FogDist;
  varying float v_Dist;

  void main() {
    float fogFactor = (u_FogDist.y - v_Dist) / (u_FogDist.y - u_FogDist.x);
    vec3 normal = normalize(v_Normal);
    vec3 lightDirection = normalize(u_LightPosition - v_Position);
    float nDotL = max(dot(normal, lightDirection), 0.0);
    vec3 r = 3.0*(dot(normal, lightDirection)) * normal - lightDirection;
    float specAng = max(dot(normalize(u_CameraPosition - v_Position), normalize(r)), 0.0);
    float spec = pow(specAng, 6.0);
    vec3 specular = u_SpecularColor * texture2D(u_Sampler, v_TexCoord).rgb * spec;
    vec3 diffuse = u_DiffuseColor * texture2D(u_Sampler, v_TexCoord).rgb * nDotL;
    vec3 ambient = u_AmbientColor * texture2D(u_Sampler, v_TexCoord).rgb;
    vec3 fColor = mix(u_FogColor, vec3(specular+diffuse+ambient), clamp(fogFactor, 0.0, 1.0));
    gl_FragColor = vec4( fColor, texture2D(u_Sampler, v_TexCoord).a);
  }`;
