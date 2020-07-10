"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _default = {
  driver: process.env.MAIL_DRIVER || 'ethereal',
  defaults: {
    from: {
      email: 'admin@raphabarreto.com.br',
      name: 'Raphael da GoBarber'
    }
  }
};
exports.default = _default;