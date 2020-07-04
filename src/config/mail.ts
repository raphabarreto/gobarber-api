interface IMailConfig {
  driver: 'ethereal' | 'ses';

  defaults: {
    from: {
      email: string;
      name: string;
    };
  };
}

export default {
  driver: process.env.MAIL_DRIVER || 'ethereal',

  defaults: {
    from: {
      email: 'admin@raphabarreto.com.br',
      name: 'Raphael da GoBarber',
    },
  },
} as IMailConfig;
