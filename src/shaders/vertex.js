export const simulationVertexShader = `
varying vec2 vUv;

void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;

export const simulationFragmentShader = `
precision highp float;

uniform sampler2D textureA;
uniform vec2 mouse;
uniform vec2 resolution;
uniform float time;
uniform int frame;
varying vec2 vUv;

const float DELTA = 1.4;
const float DAMPING = 0.005;
const float FRICTION = 0.002;
const float MOUSE_RADIUS = 0.02;
const float MOUSE_INTENSITY = 2.0;
const float PRESSURE_DECAY = 0.999;

void main() {
    vec2 uv = vUv;
    
    // Initialize on first frame
    if(frame == 0) {
        gl_FragColor = vec4(0.0, 0.0, 0.0, 0.0);
        return;
    }

    vec4 data = texture2D(textureA, uv);
    float pressure = data.x;
    float pressureVelocity = data.y;

    vec2 texelSize = 1.0 / resolution;
    
    // Sample neighboring pressures
    float p_right = texture2D(textureA, uv + vec2(texelSize.x, 0.0)).x;
    float p_left = texture2D(textureA, uv - vec2(texelSize.x, 0.0)).x;
    float p_up = texture2D(textureA, uv + vec2(0.0, texelSize.y)).x;
    float p_down = texture2D(textureA, uv - vec2(0.0, texelSize.y)).x;

    // Boundary conditions
    if(uv.x <= texelSize.x) p_left = p_right;
    if(uv.x >= 1.0 - texelSize.x) p_right = p_left;
    if(uv.y <= texelSize.y) p_down = p_up;
    if(uv.y >= 1.0 - texelSize.y) p_up = p_down;

    // Wave equation
    pressureVelocity += DELTA * (-2.0 * pressure + p_right + p_left) / 4.0;
    pressureVelocity += DELTA * (-2.0 * pressure + p_up + p_down) / 4.0;

    pressure += DELTA * pressureVelocity;
    pressureVelocity -= DAMPING * DELTA * pressure;

    // Apply damping and friction
    pressureVelocity *= 1.0 - FRICTION * DELTA;
    pressure *= PRESSURE_DECAY;

    // Mouse interaction
    vec2 mouseUv = mouse / resolution;
    if(mouse.x > 0.0) {
        float dist = distance(uv, mouseUv);
        if(dist < MOUSE_RADIUS) {
            pressure += MOUSE_INTENSITY * (1.0 - dist/MOUSE_RADIUS);
        }
    }

    gl_FragColor = vec4(
        pressure,
        pressureVelocity,
        (p_right - p_left) / 2.0,
        (p_up - p_down) / 2.0
    );
}`;

export const renderVertexShader = `
varying vec2 vUv;

void main() {
    vUv = uv;
    gl_Position = projectionMatrix * viewMatrix * modelMatrix * vec4(position, 1.0);
}
`;

export const renderFragmentShader = `
precision highp float;

uniform sampler2D textureA;
uniform sampler2D textureB;
varying vec2 vUv;

const float DISTORTION_STRENGTH = 0.3;
const float NORMAL_STRENGTH = 2.0;
const float SPECULAR_POWER = 60.0;
const float SPECULAR_INTENSITY = 1.5;

void main() {
    vec4 data = texture2D(textureA, vUv);
    
    // Calculate distortion
    vec2 distortion = DISTORTION_STRENGTH * data.zw;
    vec4 color = texture2D(textureB, vUv + distortion);

    // Calculate lighting
    vec3 normal = normalize(vec3(
        -data.z * NORMAL_STRENGTH,
        0.5,
        -data.w * NORMAL_STRENGTH
    ));
    vec3 lightDir = normalize(vec3(-3.0, 10.0, 3.0));
    float specular = pow(max(0.0, dot(normal, lightDir)), SPECULAR_POWER) * SPECULAR_INTENSITY;
    
    gl_FragColor = color + vec4(specular);
}
`;
