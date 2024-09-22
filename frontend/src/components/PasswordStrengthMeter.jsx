import { Check, X } from "lucide-react";

const PasswordCriteria = ({ password }) => {
  const criteria = [
    {
      name: 'Length',
      description: 'Must be at least 8 characters long',
      check: (password) => password.length >= 8,
    },
    {
      name: 'Lowercase',
      description: 'Must contain at least one lowercase letter',
      check: (password) => /[a-z]/.test(password),
    },
    {
      name: 'Uppercase',
      description: 'Must contain at least one uppercase letter',
      check: (password) => /[A-Z]/.test(password),
    },
    {
      name: 'Number',
      description: 'Must contain at least one number',
      check: (password) => /[0-9]/.test(password),
    },
    {
      name: 'Special Character',
      description: 'Must contain at least one special character (!@#$%^&*())',
      check: (password) => /[!@#$%^&*()]/.test(password),
    },
  ];

  return (
    <div className="mt-2 space-y-1">
      {criteria.map((item) => (
        <div key={item.name} className="flex items-center text-xs">
          {item.check(password) ? (
            <Check className="w-4 h-4 text-purple-500 mr-2" />
          ) : (
            <X className="w-4 h-4 text-gray-500 mr-2" />
          )}
          <span className={item.check(password) ? 'text-purple-500' : 'text-gray-400'}>
            {item.description}
          </span>
        </div>
      ))}
    </div>
  );
};

const PasswordStrengthMeter = ({ password }) => {
  const getStrength = (pass) => {
    let strength = 0;
    if (pass.length >= 8) strength += 1; // Password length criteria
    if (pass.match(/([a-z].*[A-Z])|([A-Z].*[a-z])/)) strength += 1; // Uppercase and lowercase criteria
    if (pass.match(/([0-9])/)) strength += 1; // Number criteria
    if (pass.match(/([!,%,&,@,#,$,^,*,?,_,~])/)) strength += 1; // Special character criteria
    return strength;
  };

  const strength = getStrength(password);
  const getStrengthText = (strength) => {
    if (strength === 0) return 'Very Weak';
    if (strength === 1) return 'Weak';
    if (strength === 2) return 'Medium';
    if (strength === 3) return 'Strong';
    return 'Very Strong';
  };

  const getColor = (strength) => {
    if (strength === 0) return 'bg-red-500';
    if (strength === 1) return 'bg-orange-500';
    if (strength === 2) return 'bg-yellow-500';
    if (strength === 3) return 'bg-green-500';
    return 'bg-purple-500';
  };

  return (
    <div className="mt-2">
      <div className="flex items-center justify-between mb-1">
        <span className="text-xs text-gray-400">Password Strength:</span>
        <span className="text-xs text-gray-400">{getStrengthText(strength)}</span>
      </div>
      <div className="flex space-x-1">
        {[...Array(4)].map((_, index) => (
          <div
            className={`h-1 w-1/4 rounded-full transition-colors duration-300 ${
              index < strength ? getColor(strength) : 'bg-gray-300'
            }`}
            key={index}
          />
        ))}
      </div>
      <PasswordCriteria password={password} />
    </div>
  );
};

export default PasswordStrengthMeter;
