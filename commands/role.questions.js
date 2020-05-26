module.exports = {
  questions: [
    {
      name: 'first',
      question: 'Please provide your First Name.',
      withValidation: false,
    },
    {
      name: 'last',
      question: 'Also your Last Name.',
      withValidation: false,
    },
    {
      name: 'contact',
      question: 'How about your phone number?',
      withValidation: false,
    },
    {
      name: 'email',
      question: 'What\'s your email address?',
      withValidation: true,
      validation: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/,
    },
  ],
};