const { validarToken, verificarCantidadCaracteresPass } = require('../middlewares/validaciones.middlewares');


test('debe bloquear si no hay token', () => {
    const req = { headers: {} };
    const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
    };
    const next = jest.fn();

    // Aquí deberías llamar a la función que estás probando, por ejemplo:
    // validarToken(req, res, next);
    validarToken(req, res, next);
    // Luego puedes hacer las aserciones
    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ message: 'Token no proporcionado' });
});

test('debe bloquear si la contraseña no cumple con la cantidad de caracteres', () => {
    const req = { body: { password: '123' } };
    const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
    };
    const next = jest.fn();

    verificarCantidadCaracteresPass(req, res, next);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ message: 'La contraseña debe tener al menos 8 caracteres, al menos una letra y un número' });
});